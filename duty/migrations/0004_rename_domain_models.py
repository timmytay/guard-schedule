from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("duty", "0003_employee_shift")]

    operations = [
        migrations.RenameModel("Site", "ObjectSite"),
        migrations.RenameModel("Slot", "ShiftPosition"),
        migrations.RenameModel("Notice", "Notification"),
        migrations.RenameModel("EmailDelivery", "Delivery"),
        migrations.RenameModel("Audit", "AuditEntry"),
    ]
