from django.db import migrations, models
import django.db.models.deletion


def migrate_employees_and_shifts(apps, schema_editor):
    db = schema_editor.connection.alias
    User = apps.get_model("duty", "User")
    Employee = apps.get_model("duty", "Employee")
    Shift = apps.get_model("duty", "Shift")
    Slot = apps.get_model("duty", "Slot")

    Employee.objects.using(db).bulk_create(
        Employee(user_id=pk)
        for pk in User.objects.using(db).filter(dispatcher=False).values_list("pk", flat=True)
    )
    shifts = {}
    slots = list(Slot.objects.using(db).order_by("pk"))
    for slot in slots:
        key = (slot.site_id, slot.day)
        shift = shifts.get(key)
        if shift is None:
            shift = Shift.objects.using(db).create(
                schedule_id=slot.schedule_id, site_id=slot.site_id, day=slot.day
            )
            shifts[key] = shift
        elif shift.schedule_id != slot.schedule_id:
            raise ValueError("Позиции одной смены относятся к разным расписаниям.")
        slot.shift_id = shift.pk
    Slot.objects.using(db).bulk_update(slots, ["shift"])


class Migration(migrations.Migration):
    dependencies = [("duty", "0002_emaildelivery")]

    operations = [
        migrations.CreateModel(
            name="Employee",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("personnel_number", models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.PROTECT,
                                              related_name="employee", to="duty.user")),
            ],
        ),
        migrations.CreateModel(
            name="Shift",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("day", models.DateField()),
                ("schedule", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="duty.schedule")),
                ("site", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="duty.site")),
            ],
            options={"constraints": [models.UniqueConstraint(fields=("site", "day"), name="unique_shift")]},
        ),
        migrations.AddField(
            model_name="slot", name="shift",
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT,
                                    related_name="positions", to="duty.shift"),
        ),
        migrations.RunPython(migrate_employees_and_shifts),
        migrations.RemoveConstraint(model_name="slot", name="unique_slot"),
        migrations.AlterModelOptions(name="slot", options={"ordering": ["shift__day", "shift__site_id", "number"]}),
        migrations.RemoveField(model_name="slot", name="day"),
        migrations.RemoveField(model_name="slot", name="schedule"),
        migrations.RemoveField(model_name="slot", name="site"),
        migrations.AlterField(
            model_name="slot", name="shift",
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="positions",
                                    to="duty.shift"),
        ),
        migrations.AddConstraint(
            model_name="slot", constraint=models.UniqueConstraint(fields=("shift", "number"),
                                                                  name="unique_shift_position"),
        ),
    ]
