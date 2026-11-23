from django.db import migrations, models


def fill_missing_emails(apps, schema_editor):
    User = apps.get_model("duty", "User")
    users = list(User.objects.order_by("pk"))
    used = set()
    for user in users:
        email = (user.email or "").strip().lower()
        if not email or email in used:
            email = f"user{user.pk}@example.invalid"
            suffix = 1
            while email in used or any((other.email or "").strip().lower() == email for other in users):
                email = f"user{user.pk}-{suffix}@example.invalid"
                suffix += 1
        used.add(email)
        if user.email != email:
            User.objects.filter(pk=user.pk).update(email=email)


class Migration(migrations.Migration):
    dependencies = [("duty", "0006_replacement_actual_rest_hours_and_more")]
    operations = [
        migrations.RunPython(fill_missing_emails, migrations.RunPython.noop),
        migrations.AlterField(model_name="user", name="email", field=models.EmailField(max_length=254, unique=True, verbose_name="Электронная почта")),
    ]
