
# Проверка email без почты и пароля

В Windows CMD, **в каждом окне**, где запускаются команды Django:

```bat
set DUTY_EMAIL_MODE=console
```

Далее:

1. `python manage.py migrate`
2. Указать охраннику тестовый адрес `guard01@example.com` (или другой непустой email).
3. `python manage.py runserver` — в первом окне CMD.
4. В приложении выполнить действие, создающее уведомление (например, утвердить расписание).
5. Во втором окне CMD из корня проекта: `set DUTY_EMAIL_MODE=console`, затем `python manage.py duty_tick`.

Письмо появится в консоли **второго окна**. В базе запись доставки email получит `sent`.
Никаких настоящих писем не отправляется, подтверждение прочтения письма не проверяется.

Режимы `DUTY_EMAIL_MODE`:
- `off` (по умолчанию): только внутренние уведомления;
- `console`: вывод email в консоль для демонстрации;
- `smtp`: настоящая отправка через настроенный SMTP (`DUTY_SMTP_HOST`, `DUTY_SMTP_PORT`, `DUTY_SMTP_USER`, `DUTY_SMTP_PASSWORD`, `DUTY_EMAIL_FROM`).

`duty_tick` обрабатывает очередь однократно. Для непрерывной работы требуется запуск по расписанию раз в минуту.

Тесты: `python manage.py test duty.tests.EmailConsoleTests`.
