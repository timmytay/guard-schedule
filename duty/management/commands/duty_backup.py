import os
import sqlite3
from pathlib import Path
from tempfile import NamedTemporaryFile

from django.core.management.base import BaseCommand, CommandError
from django.db import connection
from django.utils import timezone


class Command(BaseCommand):
    help = "Создаёт согласованную SQLite-копию в указанном внешнем каталоге."

    def add_arguments(self, parser):
        parser.add_argument("directory", type=Path)

    def handle(self, *args, **options):
        directory = options["directory"]
        directory.mkdir(parents=True, exist_ok=True)
        target = directory / f"duty-{timezone.localdate():%Y-%m-%d}.sqlite3"
        if Path(connection.settings_dict["NAME"]).resolve() == target.resolve():
            raise CommandError("Путь назначения совпадает с рабочей базой.")
        connection.ensure_connection()
        with NamedTemporaryFile(dir=directory, delete=False) as temporary:
            path = Path(temporary.name)
        try:
            destination = sqlite3.connect(path)
            try:
                connection.connection.backup(destination)
                if destination.execute("PRAGMA integrity_check").fetchone() != ("ok",):
                    raise CommandError("Проверка резервной копии завершилась ошибкой.")
            finally:
                destination.close()
            os.replace(path, target)
        finally:
            path.unlink(missing_ok=True)
        self.stdout.write(str(target))
