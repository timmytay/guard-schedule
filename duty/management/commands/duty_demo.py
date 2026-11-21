from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone

from duty.models import Absence, Assignment, Delivery, Employee, ObjectSite, Report, Schedule, Shift, ShiftPosition, User
from duty.services import DAY, approve, audit, generate, notify, register_absence

PASSWORD = "Demo-duty-2601!"


class Command(BaseCommand):
    help = "Создаёт демонстрационные данные в пустой локальной базе."

    @transaction.atomic
    def handle(self, *args, **options):
        if not settings.DEBUG or User.objects.exists() or Schedule.objects.exists():
            raise CommandError("Для демонстрации требуется пустая база и локальный режим.")
        dispatcher = User.objects.create_user("dispatcher", password=PASSWORD, dispatcher=True,
                                              first_name="Анна", last_name="Волкова")
        names = [
            "Соколов", "Морозов", "Новиков", "Петров", "Иванов", "Орлов", "Кузнецов", "Лебедев",
            "Козлов", "Васильев", "Попов", "Григорьев", "Степанов", "Волков", "Зайцев", "Павлов",
            "Семёнов", "Голубев", "Ильин", "Макаров", "Смирнов", "Белов", "Фёдоров", "Давыдов", "Егоров",
        ]
        guards = [User.objects.create_user(f"guard{i:02}", password=PASSWORD, first_name="Александр",
                                         last_name=name) for i, name in enumerate(names, 1)]
        employees = Employee.objects.bulk_create(
            Employee(user=guard, personnel_number=f"ГО-{index:03}")
            for index, guard in enumerate(guards, 1)
        )
        sites = [
            ObjectSite.objects.create(name=name, address=address)
            for name, address in (
                ("Офисный центр", "Иркутск, ул. Деловая, 12"),
                ("Логистический комплекс", "Иркутск, ул. Транспортная, 8"),
                ("Складской терминал", "Иркутск, ул. Складская, 4"),
            )
        ]
        today = timezone.localdate()
        history = {}
        historical_assignments = []
        for offset in range(14, 1, -1):
            day = today - offset * DAY
            month = day.replace(day=1)
            if month not in history:
                history[month] = Schedule.objects.create(
                    month=month, created_by=dispatcher, approved_by=dispatcher, approved_at=timezone.now(),
                )
            for site_index, site in enumerate(sites):
                shift = Shift.objects.create(schedule=history[month], site=site, day=day)
                for number in (1, 2):
                    slot = ShiftPosition.objects.create(shift=shift, number=number)
                    guard_index = ((14 - offset) % 4) * 6 + 2 * site_index + number - 1
                    historical_assignments.append(Assignment(slot=slot, guard=employees[guard_index]))
        Assignment.objects.bulk_create(historical_assignments)
        states = [Report.State.REVIEW, Report.State.APPROVED, Report.State.RETURNED, Report.State.DRAFT]
        notes = [
            "Пост принят по журналу. Ключи и средства связи на месте.",
            "Выполнен обход территории и проверены запасные выходы.",
            "Смена передана по описи, запись внесена в журнал.",
        ]
        reports = []
        guard_example = next(row for row in historical_assignments if row.guard == employees[0])
        report_assignments = [guard_example] + [row for row in historical_assignments[-15:] if row != guard_example]
        for index, assignment in enumerate(report_assignments):
            state = states[index % len(states)]
            reports.append(Report(
                assignment=assignment, state=state, handover=notes[index % len(notes)],
                incidents="Передана заявка на проверку освещения у входа." if index % 5 == 2 else "Происшествий не зафиксировано.",
                feedback="Уточните время контрольного обхода." if state == Report.State.RETURNED else "",
            ))
        Report.objects.bulk_create(reports)

        next_month = (today.replace(day=28) + 4 * DAY).replace(day=1)
        schedule = generate(next_month, dispatcher)
        approve(schedule, dispatcher)
        draft_month = (next_month.replace(day=28) + 4 * DAY).replace(day=1)
        generate(draft_month, dispatcher)
        upcoming = list(Assignment.objects.filter(slot__shift__schedule=schedule).order_by("slot__shift__day", "pk")[:3])
        for assignment, kind, reason in zip(upcoming, (Absence.Kind.SICK, Absence.Kind.VACATION, Absence.Kind.OTHER),
                                             ("Больничный", "Ежегодный отпуск", "Обучение")):
            register_absence({
                "guard": assignment.guard, "kind": kind, "start": assignment.slot.day,
                "end": assignment.slot.day + DAY, "reason": reason,
            }, dispatcher)
        notify([guards[0]], "Отчёт передан диспетчеру на проверку.", email=False)
        notify([guards[0]], "Проверьте время начала ближайшего дежурства.", email=False)
        Delivery.objects.filter(recipient=guards[0], notice__body__startswith="Утверждён график").update(
            acknowledged=timezone.now(),
        )
        audit(dispatcher, "Подготовлены демонстрационные отчёты", count=len(reports))
        self.stdout.write(self.style.SUCCESS(f"dispatcher / guard01 — {PASSWORD}"))
