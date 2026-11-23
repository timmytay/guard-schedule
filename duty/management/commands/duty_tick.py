from datetime import timedelta
from smtplib import SMTPException
from django.core.mail import BadHeaderError

from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.utils import timezone

from duty.models import Delivery
from duty.services import audit, process_reminders


class Command(BaseCommand):
    help = "Создаёт напоминания и обрабатывает очередь email. Запускайте раз в минуту одним процессом."

    def handle(self, *args, **options):
        process_reminders()
        if settings.DUTY_EMAIL_MODE == "off":
            return
        now = timezone.now()
        deliveries = Delivery.objects.filter(
            channel=Delivery.Channel.EMAIL, failed=False, sent__isnull=True, next_attempt__lte=now,
        ).select_related("notice", "recipient")
        for delivery in deliveries.iterator():
            if not delivery.recipient.email or delivery.recipient.email.lower().endswith(".invalid"):
                # Тестовые адреса не должны уходить на реальный SMTP-сервер.
                continue
            delivery.attempts += 1
            try:
                sent = send_mail("График охраны", delivery.notice.body, None, [delivery.recipient.email])
            except (SMTPException, OSError, BadHeaderError, ValueError):
                sent = 0
            if sent:
                delivery.sent = timezone.now()
            elif delivery.attempts >= 2:
                delivery.failed = True
                audit(None, "Письмо не принято SMTP", notice=delivery.notice_id)
            else:
                delivery.next_attempt = timezone.now() + timedelta(minutes=10)
            delivery.save()
