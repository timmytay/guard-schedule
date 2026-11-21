@echo off
cd /d "%~dp0"
set "DUTY_DATABASE=%~dp0demo.sqlite3"
python manage.py runserver 127.0.0.1:8000
if errorlevel 1 pause
