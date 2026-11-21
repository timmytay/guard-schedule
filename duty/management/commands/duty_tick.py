from datetime import timedelta
from smtplib import SMTPException

from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.utils import timezone

from duty.models import Delivery
from duty.services import audit, process_reminders


class Command(BaseCommand):
    help = "Создаёт напоминания и обрабатывает очередь SMTP. Запускайте раз в минуту одним процессом."

    def handle(self, *args, **options):
        process_reminders()
        if settings.EMAIL_HOST == "localhost":
            return
        now = timezone.now()
        deliveries = Delivery.objects.filter(
            channel=Delivery.Channel.EMAIL, failed=False, sent__isnull=True, next_attempt__lte=now,
        ).select_related("notice", "recipient")
        for delivery in deliveries.iterator():
            delivery.attempts += 1
            try:
                sent = send_mail("График охраны", delivery.notice.body, None, [delivery.recipient.email])
            except (SMTPException, OSError):
                sent = 0
            if sent:
                delivery.sent = timezone.now()
            elif delivery.attempts >= 2:
                delivery.failed = True
                audit(None, "Письмо не принято SMTP", notice=delivery.notice_id)
            else:
                delivery.next_attempt = timezone.now() + timedelta(minutes=10)
            delivery.save()
