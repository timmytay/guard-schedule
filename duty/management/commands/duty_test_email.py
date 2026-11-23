from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Отправляет проверочное письмо на указанный адрес через выбранный email backend."

    def add_arguments(self, parser):
        parser.add_argument("recipient", help="Email получателя")

    def handle(self, *args, **options):
        if settings.DUTY_EMAIL_MODE == "off":
            raise CommandError("Установите DUTY_EMAIL_MODE=smtp или console")
        if settings.DUTY_EMAIL_MODE == "smtp":
            if not settings.EMAIL_HOST or settings.EMAIL_HOST == "localhost":
                raise CommandError("Задайте DUTY_SMTP_HOST для реальной отправки")
            if not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
                raise CommandError("Задайте DUTY_SMTP_USER и DUTY_SMTP_PASSWORD (пароль приложения/SMTP-ключ)")
        recipient = options["recipient"].strip()
        if "@" not in recipient or recipient.startswith("@") or recipient.endswith("@"):
            raise CommandError("Укажите корректный адрес получателя")
        try:
            count = send_mail(
                "Проверка почтовых уведомлений — график охраны",
                "Тестовое письмо из информационной системы графика охраны.",
                settings.DEFAULT_FROM_EMAIL,
                [recipient],
                fail_silently=False,
            )
        except Exception as exc:
            raise CommandError(f"Не удалось отправить письмо: {exc.__class__.__name__}: {exc}") from exc
        if count != 1:
            raise CommandError("Почтовый сервер не подтвердил принятие письма")
        self.stdout.write(self.style.SUCCESS("Письмо принято почтовым backend. Проверьте входящие/спам."))
