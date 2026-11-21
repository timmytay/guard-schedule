import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = os.getenv("DUTY_DEBUG", "1") == "1"
SECRET_KEY = os.environ.get("DUTY_SECRET_KEY")
if not SECRET_KEY:
    if not DEBUG:
        raise RuntimeError("Set DUTY_SECRET_KEY")
    SECRET_KEY = "local-development-only-duty-schedule"
ALLOWED_HOSTS = os.getenv("DUTY_HOSTS", "localhost,127.0.0.1").split(",")
ROOT_URLCONF = "duty.urls"
INSTALLED_APPS = [
    "django.contrib.auth", "django.contrib.contenttypes", "django.contrib.sessions",
    "django.contrib.messages", "django.contrib.staticfiles", "rest_framework",
    "drf_spectacular", "duty",
]
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware", "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware", "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware", "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
TEMPLATES = [{
    "BACKEND": "django.template.backends.django.DjangoTemplates", "APP_DIRS": True,
    "OPTIONS": {"context_processors": [
        "django.template.context_processors.request", "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
    ]},
}]
DATABASES = {"default": {
    "ENGINE": "django.db.backends.sqlite3",
    "NAME": os.getenv("DUTY_DATABASE", BASE_DIR / "duty.sqlite3"),
    "OPTIONS": {"transaction_mode": "IMMEDIATE", "timeout": 15},
}}
AUTH_USER_MODEL = "duty.User"
LANGUAGE_CODE = "ru"
TIME_ZONE = "Asia/Irkutsk"
USE_I18N = True
USE_TZ = True
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
LOGIN_URL = "/login/"
LOGIN_REDIRECT_URL = "/home/"
LOGOUT_REDIRECT_URL = "/login/"
SESSION_COOKIE_SECURE = CSRF_COOKIE_SECURE = not DEBUG
REST_FRAMEWORK = {"DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema"}
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
]
SECURE_SSL_REDIRECT = not DEBUG
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
EMAIL_HOST = os.getenv("DUTY_SMTP_HOST", "localhost")
EMAIL_PORT = int(os.getenv("DUTY_SMTP_PORT", "587"))
EMAIL_HOST_USER = os.getenv("DUTY_SMTP_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("DUTY_SMTP_PASSWORD", "")
EMAIL_USE_TLS = True
EMAIL_TIMEOUT = 10
DEFAULT_FROM_EMAIL = os.getenv("DUTY_EMAIL_FROM", "schedule@localhost")
