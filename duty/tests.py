from datetime import date, datetime, timedelta, timezone
from io import BytesIO

from openpyxl import load_workbook
from unittest.mock import patch

from django.test import SimpleTestCase, TestCase, override_settings
from django.urls import reverse
from django.utils import timezone as django_timezone

from .models import Assignment, AuditEntry, Employee, Notification, Schedule, Shift, ObjectSite, ShiftPosition, User
from .services import available_rest, notify


class GenerateScheduleTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.dispatcher = User.objects.create_user("dispatcher", dispatcher=True)
        cls.guard = User.objects.create_user("guard")
        Employee.objects.create(user=cls.guard)
        ObjectSite.objects.create(name="Объект")

    def setUp(self):
        self.client.force_login(self.dispatcher)
        self.url = reverse("generate-schedule")
        clock = patch("duty.services.timezone", wraps=django_timezone)
        clock.start().now.return_value = datetime(2028, 1, 1, tzinfo=timezone.utc)
        self.addCleanup(clock.stop)

    def post_period(self, month=2):
        return self.client.post(self.url, {"year": 2028, "month": month}, content_type="application/json")

    def test_dispatcher_generates_full_schedule(self):
        users = User.objects.bulk_create(User(username=f"guard{i}") for i in range(8))
        Employee.objects.bulk_create(Employee(user=user) for user in users)
        response = self.post_period()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["status"], "draft")
        self.assertEqual(ShiftPosition.objects.count(), 58)
        self.assertEqual(Assignment.objects.count(), 58)
        self.assertContains(self.client.get(response.json()["url"]), "<h1>Расписание</h1>", html=True)

    def test_shortage_reports_dates_and_rolls_back(self):
        response = self.post_period()
        self.assertEqual(response.status_code, 409)
        self.assertIn("2028-02-01", response.json()["dates"])
        self.assertFalse(Schedule.objects.exists())
        self.assertFalse(ShiftPosition.objects.exists())
        self.assertFalse(AuditEntry.objects.exists())

    def test_invalid_period(self):
        self.assertEqual(self.post_period(month=13).status_code, 400)

    def test_guard_cannot_generate(self):
        self.client.force_login(self.guard)
        self.assertEqual(self.post_period().status_code, 403)
        self.assertFalse(Schedule.objects.exists())

    def test_dispatcher_home_has_statistics(self):
        response = self.client.get(reverse("home"))
        self.assertContains(response, "<h1>Главная</h1>", html=True)
        self.assertEqual(response.context["vue_data"]["guards"], 1)


class DomainRelationsTests(TestCase):
    @override_settings(EMAIL_HOST="smtp.example.test")
    def test_notification_has_delivery_per_recipient_and_channel(self):
        first = User.objects.create_user("first", email="first@example.test")
        second = User.objects.create_user("second")
        notify([first, second], "График обновлён")
        notice = Notification.objects.get()
        self.assertCountEqual(
            notice.deliveries.values_list("recipient_id", "channel"),
            [(first.pk, "internal"), (first.pk, "email"), (second.pk, "internal")],
        )
        delivery = notice.deliveries.get(recipient=first, channel="internal")
        self.client.force_login(second)
        self.assertEqual(self.client.post(reverse("acknowledge", args=[delivery.pk])).status_code, 404)
        self.client.force_login(first)
        self.assertEqual(self.client.get(reverse("notices")).status_code, 200)
        self.assertRedirects(self.client.post(reverse("acknowledge", args=[delivery.pk])), reverse("notices"))
        delivery.refresh_from_db()
        self.assertIsNotNone(delivery.acknowledged)


class DispatcherInterfaceTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.dispatcher = User.objects.create_user("editor", dispatcher=True)
        cls.guard = Employee.objects.create(user=User.objects.create_user("current"))
        cls.candidate = Employee.objects.create(user=User.objects.create_user("candidate"))
        cls.day = django_timezone.localdate() + timedelta(days=40)
        schedule = Schedule.objects.create(month=cls.day.replace(day=1))
        shift = Shift.objects.create(schedule=schedule, site=ObjectSite.objects.create(name="Пост"), day=cls.day)
        cls.slot = ShiftPosition.objects.create(shift=shift, number=1)
        cls.assignment = Assignment.objects.create(slot=cls.slot, guard=cls.guard)

    def setUp(self):
        self.client.force_login(self.dispatcher)
        self.slot_url = reverse("slot", args=[self.slot.pk])
        self.modal_url = self.slot_url + "?modal=1"

    def test_schedule_contains_dialog_trigger(self):
        response = self.client.get(reverse("schedule"))
        self.assertContains(response, 'data-vue-page="schedule"')
        self.assertEqual(response.context["vue_data"]["days"][0]["slots"][0]["href"], self.slot_url)

    def test_modal_returns_candidate_and_form_without_sidebar(self):
        response = self.client.get(self.modal_url)
        self.assertContains(response, "candidate")
        self.assertContains(response, "Подтвердить")
        self.assertNotContains(response, "sidebar")

    def test_direct_position_page_remains_available(self):
        self.assertContains(self.client.get(self.slot_url), "Позиция смены")

    def test_guard_cannot_open_modal(self):
        self.client.force_login(self.guard.user)
        self.assertEqual(self.client.get(self.modal_url).status_code, 403)

    def test_valid_replacement_reassigns_position(self):
        response = self.client.post(self.modal_url, {
            "operation": "replace", "guard": self.candidate.pk, "reason": "Подмена", "confirm": "on",
        })
        self.assertEqual(response.status_code, 302)
        self.assignment.refresh_from_db()
        self.assertFalse(self.assignment.active)
        self.assertEqual(Assignment.objects.get(slot=self.slot, active=True).guard, self.candidate)

    def test_invalid_replacement_keeps_errors_in_modal(self):
        response = self.client.post(self.modal_url, {"operation": "replace", "guard": self.candidate.pk})
        self.assertTrue(response.context["form"].errors)
        self.assertTemplateUsed(response, "slot_content.html")
        self.assignment.refresh_from_db()
        self.assertTrue(self.assignment.active)

    def test_guard_cannot_export_journal(self):
        self.client.force_login(self.guard.user)
        self.assertEqual(self.client.get(reverse("audit-excel")).status_code, 403)

    def test_excel_includes_audit_data_and_literal_text(self):
        AuditEntry.objects.create(author=self.dispatcher, event="=1+1", details={"reason": "Подмена"})
        response = self.client.get(reverse("audit-excel"))
        self.assertEqual(response.status_code, 200)
        self.assertIn("audit-log.xlsx", response.headers["Content-Disposition"])
        with BytesIO(b"".join(response.streaming_content)) as stream:
            workbook = load_workbook(stream, read_only=True)
            try:
                row = next(workbook["Журнал"].iter_rows(min_row=2))
                self.assertEqual(row[1].value, "editor")
                self.assertEqual(row[2].value, "=1+1")
                self.assertEqual(row[2].data_type, "s")
                self.assertIn("Подмена", row[3].value)
            finally:
                workbook.close()


class AvailabilityUnitTests(SimpleTestCase):
    day = date(2030, 2, 10)

    def test_uses_shortest_gap_on_either_side(self):
        self.assertEqual(available_rest(self.day, [date(2030, 2, 6), date(2030, 2, 12)], []), 1)

    def test_absence_on_second_day_blocks_overnight_shift(self):
        self.assertEqual(available_rest(self.day, [], [(date(2030, 2, 11), date(2030, 2, 11))]), -1)

    def test_open_sick_leave_blocks_future_shift(self):
        self.assertEqual(available_rest(self.day, [], [(date(2030, 2, 1), None)]), -1)

    def test_absence_ending_before_shift_does_not_block(self):
        self.assertEqual(available_rest(self.day, [], [(date(2030, 2, 1), date(2030, 2, 9))]), 365)


class GuardAccountTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.dispatcher = User.objects.create_user("account_editor", dispatcher=True)
        cls.guard = User.objects.create_user("existing_guard")
        Employee.objects.create(user=cls.guard)

    def setUp(self):
        self.client.force_login(self.dispatcher)
        self.url = reverse("directory", args=["guards"])
        self.data = {"username": "new_guard", "password": "Secure-Guard-4821!", "is_active": "on"}

    def test_dispatcher_creates_guard_account_and_guard_can_log_in(self):
        self.assertContains(self.client.get(self.url), 'data-vue-page="guards"')
        self.assertRedirects(self.client.post(self.url, self.data), self.url)
        user = User.objects.get(username="new_guard")
        self.assertFalse(user.dispatcher)
        self.assertTrue(Employee.objects.filter(user=user).exists())
        self.assertNotEqual(user.password, self.data["password"])
        self.client.logout()
        self.assertTrue(self.client.login(username=user.username, password=self.data["password"]))
        self.assertEqual(self.client.get(reverse("home")).status_code, 200)

    def test_duplicate_username_is_rejected(self):
        response = self.client.post(self.url, {**self.data, "username": self.guard.username})
        self.assertIn("username", response.context["form"].errors)
        self.assertEqual(User.objects.filter(username=self.guard.username).count(), 1)

    def test_guard_cannot_create_accounts(self):
        self.client.force_login(self.guard)
        self.assertEqual(self.client.get(self.url).status_code, 403)
        self.assertEqual(self.client.post(self.url, self.data).status_code, 403)
        self.assertFalse(User.objects.filter(username=self.data["username"]).exists())

    def test_password_required_for_new_guard(self):
        response = self.client.post(self.url, {**self.data, "password": ""})
        self.assertIn("password", response.context["form"].errors)
        self.assertFalse(User.objects.filter(username=self.data["username"]).exists())

    def test_dispatcher_changes_login_and_resets_password(self):
        url = reverse("directory_edit", args=["guards", self.guard.pk])
        self.guard.set_password("Old-Guard-4821!")
        self.guard.save()
        self.assertRedirects(self.client.post(url, {**self.data, "username": "renamed_guard"}), self.url)
        self.guard.refresh_from_db()
        self.assertEqual(self.guard.username, "renamed_guard")
        self.assertTrue(self.guard.check_password(self.data["password"]))
        self.assertFalse(self.guard.check_password("Old-Guard-4821!"))
        self.assertRedirects(self.client.post(url, {**self.data, "username": "renamed_guard", "password": ""}), self.url)
        self.guard.refresh_from_db()
        self.assertTrue(self.guard.check_password(self.data["password"]))
