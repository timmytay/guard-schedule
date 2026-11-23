from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import F, Q
from django.utils import timezone


class User(AbstractUser):
    email = models.EmailField("Электронная почта", unique=True, blank=False)
    dispatcher = models.BooleanField(default=False)
    phone = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.get_full_name() or self.username


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name="employee")
    personnel_number = models.CharField(max_length=30, unique=True, null=True, blank=True)

    def __str__(self):
        return str(self.user)


class ObjectSite(models.Model):
    name = models.CharField(max_length=120, unique=True)
    address = models.CharField(max_length=200, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Schedule(models.Model):
    month = models.DateField(unique=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.PROTECT, related_name="created_schedules")
    approved_by = models.ForeignKey(User, null=True, on_delete=models.PROTECT, related_name="approved_schedules")


class Shift(models.Model):
    schedule = models.ForeignKey(Schedule, on_delete=models.PROTECT)
    site = models.ForeignKey(ObjectSite, on_delete=models.PROTECT)
    day = models.DateField()
    class Meta:
        constraints = [models.UniqueConstraint(fields=["site", "day"], name="unique_shift")]


class ShiftPosition(models.Model):
    shift = models.ForeignKey(Shift, on_delete=models.PROTECT, related_name="positions")
    number = models.PositiveSmallIntegerField()

    @property
    def day(self):
        return self.shift.day

    @property
    def site(self):
        return self.shift.site

    @property
    def schedule(self):
        return self.shift.schedule

    class Meta:
        ordering = ["shift__day", "shift__site_id", "number"]
        constraints = [models.UniqueConstraint(fields=["shift", "number"], name="unique_shift_position")]


class Assignment(models.Model):
    class State(models.TextChoices):
        ASSIGNED = "assigned", "Назначен"
        CONFIRMED = "confirmed", "Подтверждён"
        REPLACED = "replaced", "Заменён"
        CANCELLED = "cancelled", "Отменён"
        TRANSFERRED = "transferred", "Перенесён"

    slot = models.ForeignKey(ShiftPosition, on_delete=models.PROTECT)
    guard = models.ForeignKey(Employee, on_delete=models.PROTECT)
    state = models.CharField(max_length=16, choices=State.choices, default=State.ASSIGNED)
    active = models.BooleanField(default=True)


    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["slot"], condition=Q(active=True), name="unique_active_assignment"),
            models.CheckConstraint(
                condition=Q(active=True, state__in=["assigned", "confirmed"]) |
                Q(active=False, state__in=["replaced", "cancelled", "transferred"]),
                name="assignment_status_matches_activity",
            ),
        ]


class Absence(models.Model):
    class Kind(models.TextChoices):
        SICK = "sick", "Больничный"
        VACATION = "vacation", "Отпуск"
        OTHER = "other", "Иное отсутствие"

    guard = models.ForeignKey(Employee, on_delete=models.PROTECT)
    kind = models.CharField(max_length=12, choices=Kind.choices)
    start = models.DateField()
    end = models.DateField(null=True, blank=True)
    reason = models.CharField(max_length=300)

    class Meta:
        constraints = [models.CheckConstraint(
            condition=Q(end__gte=F("start")) | Q(end__isnull=True, kind="sick"),
            name="valid_absence_dates",
        )]


class Replacement(models.Model):
    original = models.ForeignKey(Assignment, on_delete=models.PROTECT, related_name="replacement_requests")
    result = models.OneToOneField(Assignment, null=True, blank=True, on_delete=models.PROTECT)
    absence = models.ForeignKey(Absence, null=True, blank=True, on_delete=models.PROTECT)
    created = models.DateTimeField(default=timezone.now)
    reminder = models.BooleanField(default=False)
    closed = models.BooleanField(default=False)
    minimum_rest_hours = models.PositiveIntegerField(null=True)
    actual_rest_hours = models.PositiveIntegerField(null=True)


class Report(models.Model):
    class State(models.TextChoices):
        DRAFT = "draft", "Черновик"
        REVIEW = "review", "На проверке"
        RETURNED = "returned", "На доработке"
        APPROVED = "approved", "Утверждён"

    assignment = models.OneToOneField(Assignment, on_delete=models.PROTECT)
    handover = models.TextField(blank=True)
    incidents = models.TextField(blank=True)
    state = models.CharField(max_length=12, choices=State.choices, default=State.DRAFT)
    feedback = models.TextField(blank=True)
    updated = models.DateTimeField(auto_now=True)


class Notification(models.Model):
    body = models.TextField()
    created = models.DateTimeField(default=timezone.now)


class AuditEntry(models.Model):
    author = models.ForeignKey(User, null=True, on_delete=models.PROTECT)
    event = models.CharField(max_length=120)
    details = models.JSONField(default=dict)
    created = models.DateTimeField(default=timezone.now)


class Delivery(models.Model):
    class Channel(models.TextChoices):
        INTERNAL = "internal", "Внутреннее"
        EMAIL = "email", "Почта"

    notice = models.ForeignKey(Notification, on_delete=models.PROTECT, related_name="deliveries")
    recipient = models.ForeignKey(User, on_delete=models.PROTECT)
    channel = models.CharField(max_length=16, choices=Channel.choices)
    acknowledged = models.DateTimeField(null=True, blank=True)
    repeated = models.BooleanField(default=False)
    sent = models.DateTimeField(null=True, blank=True)
    next_attempt = models.DateTimeField(default=timezone.now)
    attempts = models.PositiveSmallIntegerField(default=0)
    failed = models.BooleanField(default=False)


    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["notice", "recipient", "channel"], name="unique_delivery_channel"),
            models.CheckConstraint(condition=Q(channel__in=["internal", "email"]), name="valid_delivery_channel"),
        ]
