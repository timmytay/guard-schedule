# Настоящая отправка email через SMTP

## Важно
Для доставки **реальных** писем необходим почтовый ящик/SMTP-провайдер и его пароль приложения или SMTP-ключ. Режим `console` только печатает письма в CMD, реальных писем не доставляет. Пароли в репозиторий не записывать.

## Настройка в Windows CMD
Откройте CMD в каталоге `guard-schedule`, задайте переменные **в том же окне**:

```bat
set DUTY_EMAIL_MODE=smtp
set DUTY_SMTP_HOST=smtp.example.com
set DUTY_SMTP_PORT=587
set DUTY_SMTP_TLS=1
set DUTY_SMTP_SSL=0
set DUTY_SMTP_USER=your-account@example.com
set DUTY_SMTP_PASSWORD=YOUR_APP_PASSWORD
set DUTY_EMAIL_FROM=your-account@example.com
```

Замените `smtp.example.com` и остальные примеры настройками вашего почтового провайдера. Для SSL на порту 465 используйте `DUTY_SMTP_TLS=0`, `DUTY_SMTP_SSL=1`.

**Проверка соединения и реальной доставки:**

```bat
python manage.py duty_test_email your-real-address@example.com
```

После этого проверьте входящие и спам. Сообщение «принято почтовым backend» означает, что SMTP принял письмо, но не гарантирует, что получатель его прочитал.

## Отправка уведомлений приложения

1. `python manage.py migrate`
2. Убедитесь, что у охранников заполнено поле email настоящими адресами.
3. Запустите сайт: `python manage.py runserver` (в другом CMD с теми же переменными).
4. Выполните действие, которое создаёт уведомление (например, утвердите расписание).
5. Выполните `python manage.py duty_tick` из CMD с настроенными SMTP-переменными.

`duty_tick` обрабатывает накопленную очередь и отмечает принятые SMTP письма как отправленные. При временной ошибке повторяет попытку через 10 минут; после второй неудачи отмечает доставку ошибочной. Для регулярной отправки запланируйте `duty_tick` в Планировщике заданий Windows раз в минуту (один процесс за раз), обеспечив те же переменные окружения. При остановке планировщика сообщения останутся в очереди.

## Без SMTP-пароля: демонстрационный режим

```bat
set DUTY_EMAIL_MODE=console
python manage.py duty_test_email example@example.com
python manage.py test duty.tests.EmailConsoleTests duty.tests.EmailSMTPTests
```

В этом режиме письма печатаются на экране, а не отправляются в интернет.
