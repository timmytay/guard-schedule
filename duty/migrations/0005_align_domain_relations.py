import django.db.models.deletion
from django.db import migrations, models


def migrate_relations(apps, schema_editor):
    db = schema_editor.connection.alias
    Employee = apps.get_model("duty", "Employee")
    Notification = apps.get_model("duty", "Notification")
    Delivery = apps.get_model("duty", "Delivery")
    for name in ("Assignment", "Absence"):
        rows = apps.get_model("duty", name).objects.using(db)
        for user_id in rows.values_list("guard_id", flat=True).distinct().order_by():
            employee, _ = Employee.objects.using(db).get_or_create(user_id=user_id)
            rows.filter(guard_id=user_id).update(employee_id=employee.pk)
    for notice in Notification.objects.using(db).iterator():
        Delivery.objects.using(db).filter(notice_id=notice.pk).update(
            recipient_id=notice.recipient_id, channel="email",
        )
        Delivery.objects.using(db).create(
            notice_id=notice.pk, recipient_id=notice.recipient_id, channel="internal",
            acknowledged=notice.acknowledged, repeated=notice.repeated,
        )


PROTECT = django.db.models.deletion.PROTECT


class Migration(migrations.Migration):
    dependencies = [("duty", "0004_rename_domain_models")]

    operations = [
        migrations.AddField("assignment", "employee", models.ForeignKey(null=True, on_delete=PROTECT, to="duty.employee")),
        migrations.AddField("absence", "employee", models.ForeignKey(null=True, on_delete=PROTECT, to="duty.employee")),
        migrations.AlterField("delivery", "notice", models.ForeignKey(on_delete=PROTECT, related_name="deliveries", to="duty.notification")),
        migrations.AddField("delivery", "recipient", models.ForeignKey(null=True, on_delete=PROTECT, to="duty.user")),
        migrations.AddField("delivery", "channel", models.CharField(max_length=16, null=True)),
        migrations.AddField("delivery", "acknowledged", models.DateTimeField(null=True, blank=True)),
        migrations.AddField("delivery", "repeated", models.BooleanField(default=False)),
        migrations.RunPython(migrate_relations),
        migrations.RemoveField("assignment", "guard"),
        migrations.RemoveField("absence", "guard"),
        migrations.RenameField("assignment", "employee", "guard"),
        migrations.RenameField("absence", "employee", "guard"),
        migrations.AlterField("assignment", "guard", models.ForeignKey(on_delete=PROTECT, to="duty.employee")),
        migrations.AlterField("absence", "guard", models.ForeignKey(on_delete=PROTECT, to="duty.employee")),
        migrations.RemoveField("notification", "recipient"),
        migrations.RemoveField("notification", "acknowledged"),
        migrations.RemoveField("notification", "repeated"),
        migrations.AlterField("delivery", "recipient", models.ForeignKey(on_delete=PROTECT, to="duty.user")),
        migrations.AlterField("delivery", "channel", models.CharField(max_length=16, choices=[("internal", "Внутреннее"), ("email", "Почта")])),
    ]
