from django import forms
from django.contrib.auth.password_validation import validate_password

from .models import Absence, ObjectSite, ShiftPosition, User
from .services import guards


def date_field(required=True, label=None):
    return forms.DateField(required=required, label=label, widget=forms.DateInput(attrs={"type": "date"}, format="%Y-%m-%d"))


class AbsenceForm(forms.ModelForm):
    guard = forms.ModelChoiceField(guards(), label="Охранник")
    start = date_field(label="Начало отсутствия")
    end = date_field(False, label="Окончание отсутствия")
    confirm = forms.BooleanField(label="Данные подтверждены")

    class Meta:
        model = Absence
        fields = ["guard", "kind", "start", "end", "reason"]
        labels = {"kind": "Вид отсутствия", "reason": "Причина или вид отпуска"}


class ChangeForm(forms.Form):
    operation = forms.ChoiceField(label="Действие", choices=[
        ("assign", "Назначить"), ("replace", "Заменить"), ("cancel", "Отменить назначение"), ("move", "Перенести"),
    ])
    guard = forms.ModelChoiceField(guards(), required=False, label="Новый охранник")
    destination = forms.IntegerField(required=False, min_value=1, label="Номер позиции для переноса")
    reason = forms.CharField(max_length=300, label="Причина изменения")
    emergency = forms.BooleanField(required=False, label="Экстренная замена. Подтверждаю сокращение отдыха до 1 суток")
    confirm = forms.BooleanField(label="Подтверждаю изменение")

    def clean_destination(self):
        value = self.cleaned_data["destination"]
        if value is not None:
            try:
                return ShiftPosition.objects.get(pk=value)
            except ShiftPosition.DoesNotExist as error:
                raise forms.ValidationError("Позиция не найдена.") from error

    def clean(self):
        data = super().clean()
        if data.get("operation") == "move" and not data.get("destination"):
            self.add_error("destination", "Укажите позицию для переноса.")
        return data


class GuardForm(forms.ModelForm):
    password = forms.CharField(label="Пароль", required=False, widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "phone", "is_active"]
        labels = {"phone": "Телефон"}

    def clean_password(self):
        password = self.cleaned_data["password"]
        if password:
            validate_password(password, self.instance)
        elif self.instance.pk is None:
            raise forms.ValidationError("Укажите пароль для нового сотрудника.")
        return password


class SiteForm(forms.ModelForm):
    class Meta:
        model = ObjectSite
        fields = ["name", "address", "active"]
        labels = {"name": "Название", "address": "Адрес", "active": "Действующий объект"}


class ReportForm(forms.Form):
    handover = forms.CharField(required=False, label="Отметки о приёме-передаче", widget=forms.Textarea(attrs={"rows": 4}))
    incidents = forms.CharField(required=False, label="Происшествия", widget=forms.Textarea(attrs={"rows": 3}))
