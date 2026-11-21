import calendar
from collections import defaultdict
from datetime import datetime, time, timedelta

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import Q
from django.utils import timezone

from .models import Absence, Assignment, AuditEntry, Delivery, Employee, Notification, Replacement, Schedule, Shift, ObjectSite, ShiftPosition, User

DAY = timedelta(days=1)


def shift_start(day):
    return timezone.make_aware(datetime.combine(day, time(8)))


def guards():
    return Employee.objects.filter(user__is_active=True, user__dispatcher=False).select_related("user").order_by("user__last_name", "user__first_name", "pk")


def audit(actor, event, **details):
    AuditEntry.objects.create(author=actor, event=event, details=details)


@transaction.atomic
def notify(users, body, dispatch=False, email=True):
    ids = {user.pk for user in users}
    if dispatch:
        ids.update(User.objects.filter(dispatcher=True, is_active=True).values_list("pk", flat=True))
    if not ids:
        return
    notice = Notification.objects.create(body=body)
    deliveries = [
        Delivery(notice=notice, recipient_id=pk, channel=Delivery.Channel.INTERNAL) for pk in ids
    ]
    if email and settings.EMAIL_HOST != "localhost":
        recipients = User.objects.filter(pk__in=ids).exclude(email="").values_list("pk", flat=True)
        deliveries.extend(
            Delivery(notice=notice, recipient_id=pk, channel=Delivery.Channel.EMAIL) for pk in recipients
        )
    Delivery.objects.bulk_create(deliveries)


def slot_label(slot):
    return f"{slot.day:%d.%m.%Y}, 08:00–08:00 (+1 день), {slot.site}, пост {slot.number}"


def available_rest(day, assignments, absences):
    if any(start <= day + DAY and (end is None or end >= day) for start, end in absences):
        return -1
    return min((abs((day - other).days) - 1 for other in assignments), default=365)


class Availability:
    def __init__(self, first, last, skip=None, historical=False):
        self.people = list(guards())
        self.absences = defaultdict(list)
        self.days = defaultdict(list)
        self.counts = defaultdict(int)
        for row in Absence.objects.filter(start__lte=last + DAY).filter(Q(end__gte=first) | Q(end__isnull=True)):
            self.absences[row.guard_id].append((row.start, row.end))
        assignments = Assignment.objects.filter(active=True)
        if not historical:
            assignments = assignments.filter(slot__shift__day__range=(first - 3 * DAY, last + 3 * DAY))
        for guard_id, day in assignments.exclude(pk=skip).values_list("guard_id", "slot__shift__day"):
            self.add(guard_id, day)

    def add(self, guard_id, day):
        self.days[guard_id].append(day)
        self.counts[guard_id] += 1

    def rest(self, guard_id, day):
        return available_rest(day, self.days[guard_id], self.absences[guard_id])

    def candidates(self, day, minimum):
        rows = [(guard, self.rest(guard.pk, day)) for guard in self.people]
        return sorted(
            ((guard, rest) for guard, rest in rows if rest >= minimum),
            key=lambda row: (-row[1], self.counts[row[0].pk], row[0].pk),
        )


class ScheduleConflict(Exception):
    def __init__(self, dates):
        self.dates = dates


@transaction.atomic
def generate(month, actor, *, require_full=False):
    if Schedule.objects.filter(month=month).exists():
        raise ValidationError("График за этот месяц уже существует.")
    if shift_start(month) <= timezone.now():
        raise ValidationError("Выберите будущий месяц.")
    sites = list(ObjectSite.objects.filter(active=True).order_by("pk"))
    if not sites:
        raise ValidationError("Добавьте активный объект.")
    last = month.replace(day=calendar.monthrange(month.year, month.month)[1])
    availability = Availability(month, last)
    schedule = Schedule.objects.create(month=month, created_by=actor)
    shifts = Shift.objects.bulk_create(
        Shift(schedule=schedule, site=site, day=month + offset * DAY)
        for offset in range(last.day) for site in sites
    )
    slots = ShiftPosition.objects.bulk_create(
        ShiftPosition(shift=shift, number=number) for shift in shifts for number in (1, 2)
    )
    capacity = len(sites) * 2
    days = [month + offset * DAY for offset in range(last.day)]
    eligible = {
        day: {guard.pk for guard, _ in availability.candidates(day, 3)}
        for day in days
    }
    days_by_guard = defaultdict(set)
    for day, guard_ids in eligible.items():
        for guard_id in guard_ids:
            days_by_guard[guard_id].add(day)
    assignments = []
    vacant_days = []
    for offset, day in enumerate(days):
        day_slots = slots[offset * capacity:(offset + 1) * capacity]
        chosen = sorted(
            (guard_id for guard_id in eligible[day] if availability.rest(guard_id, day) >= 3),
            key=lambda guard_id: (
                sum(day + n * DAY in days_by_guard[guard_id] for n in (1, 2, 3)),
                availability.counts[guard_id],
                guard_id,
            ),
        )
        if len(chosen) < capacity:
            vacant_days.append(day)
        for slot, guard_id in zip(day_slots, chosen):
            assignments.append(Assignment(slot=slot, guard_id=guard_id))
            availability.add(guard_id, day)
    if require_full and vacant_days:
        raise ScheduleConflict(vacant_days)
    Assignment.objects.bulk_create(assignments)
    audit(actor, "Сформирован график", month=str(month), assigned=len(assignments), vacant=len(slots)-len(assignments))
    return schedule


@transaction.atomic
def approve(schedule, actor):
    if schedule.approved_at:
        raise ValidationError("График уже утверждён.")
    schedule.approved_at = timezone.now()
    schedule.approved_by = actor
    schedule.save(update_fields=["approved_at", "approved_by"])
    ids = Assignment.objects.filter(slot__shift__schedule=schedule, active=True).values("guard__user_id")
    notify(User.objects.filter(pk__in=ids), f"Утверждён график за {schedule.month:%m.%Y}.")
    audit(actor, "Утверждён график", month=str(schedule.month))


@transaction.atomic
def change(slot, actor, operation, reason, guard=None, emergency=False, destination=None):
    if shift_start(slot.day) <= timezone.now():
        raise ValidationError("Изменять можно только будущие смены.")
    current = Assignment.objects.filter(slot=slot, active=True).select_related("guard").first()
    target = destination if operation == "move" else slot
    if operation == "move":
        if not current or shift_start(target.day) <= timezone.now() or Assignment.objects.filter(slot=target, active=True).exists():
            raise ValidationError("Для переноса требуется свободная будущая позиция.")
        guard = current.guard
    if operation in {"cancel", "replace"} and not current:
        raise ValidationError("Позиция уже свободна.")
    if operation == "assign" and current:
        raise ValidationError("Позиция занята. Используйте замену.")
    if operation != "cancel":
        if not guard or (current and current.guard_id == guard.pk and operation != "move"):
            raise ValidationError("Выберите другого охранника.")
        availability = Availability(target.day, target.day, skip=current.pk if operation == "move" else None)
        minimum = 1 if operation == "replace" and emergency else 3
        rest = availability.rest(guard.pk, target.day)
        if rest < minimum:
            raise ValidationError(f"Сотрудник отсутствует, уже занят или отдых составляет менее {minimum} суток.")
    previous_state = current.state if current else None
    if current:
        current.active = False
        current.state = {"cancel": "cancelled", "move": "transferred", "replace": "replaced"}[operation]
        current.save(update_fields=["active", "state"])
    result = None
    if operation != "cancel":
        state = {"replace": "confirmed", "move": previous_state}.get(operation, "assigned")
        result = Assignment.objects.create(slot=target, guard=guard, state=state)
    if current:
        requests = Replacement.objects.filter(original=current, closed=False)
        if operation == "replace":
            pending = requests.first() or Replacement.objects.create(original=current)
            pending.result, pending.closed = result, True
            pending.minimum_rest_hours = minimum * 24
            pending.actual_rest_hours = rest * 24 if rest < 365 else None
            pending.save(update_fields=["result", "closed", "minimum_rest_hours", "actual_rest_hours"])
        requests.update(closed=True)
    label = {"assign": "Назначение", "cancel": "Отмена назначения", "replace": "Замена", "move": "Перенос"}[operation]
    persons = ([current.guard.user] if current else []) + ([guard.user] if result else [])
    dates = slot_label(slot) + (f" → {slot_label(target)}" if operation == "move" else "")
    notify(persons, f"{label}. {dates}. {', '.join(map(str, dict.fromkeys(persons)))}. Причина: {reason}", dispatch=True)
    audit(actor, label, slot=slot.pk, target=target.pk, before=current.guard_id if current else None,
          after=guard.pk if result else None, reason=reason, emergency=emergency)


@transaction.atomic
def register_absence(data, actor):
    absence = Absence.objects.create(**data)
    rows = affected(absence)
    if absence.kind == "sick":
        for assignment in rows:
            Replacement.objects.get_or_create(original=assignment, closed=False, defaults={"absence": absence})
    audit(actor, "Зарегистрировано отсутствие", id=absence.pk, guard=absence.guard_id, affected=len(rows))
    return absence, len(rows)


def affected(absence):
    first = max(absence.start - DAY, timezone.localdate())
    rows = Assignment.objects.filter(active=True, guard=absence.guard, slot__shift__day__gte=first)
    if absence.end:
        rows = rows.filter(slot__shift__day__lte=absence.end)
    return [assignment for assignment in rows.select_related("slot__shift__site", "guard")
            if shift_start(assignment.slot.day) > timezone.now()]


@transaction.atomic
def process_reminders():
    now = timezone.now()
    Replacement.objects.filter(closed=False, original__slot__shift__day__lt=timezone.localdate()).update(closed=True)
    for pending in Replacement.objects.filter(closed=False, reminder=False, created__lte=now-timedelta(minutes=30)):
        notify([], f"Замена ожидает подтверждения более 30 минут. {slot_label(pending.original.slot)}", dispatch=True)
        pending.reminder = True
        pending.save(update_fields=["reminder"])
    for notice in Delivery.objects.filter(
        channel=Delivery.Channel.INTERNAL, acknowledged__isnull=True, repeated=False,
        notice__created__lte=now-timedelta(minutes=10),
    ).exclude(notice__body__startswith="Повтор. ").select_related("recipient", "notice"):
        repeat_notice(notice, email=False)


def repeat_notice(notice, email=True):
    notice.repeated = True
    notice.save(update_fields=["repeated"])
    notify([notice.recipient], f"Повтор. {notice.notice.body}", email=email)
    audit(None, "Повторено уведомление", id=notice.pk)
