import csv
import io
import json
import os
from collections import defaultdict
from datetime import date
from functools import wraps
from xml.sax.saxutils import escape

from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied, ValidationError
from django.db import transaction
from django.db.models import Prefetch
from django.http import FileResponse, Http404, HttpResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils.formats import date_format
from django.utils import timezone
from django.views.decorators.http import require_POST

from . import services as svc
from .forms import AbsenceForm, ChangeForm, GuardForm, ReportForm, SiteForm, date_field
from .models import Absence, Assignment, AuditEntry, Delivery, Employee, Replacement, Report, Schedule, Shift, ObjectSite, User, ShiftPosition


class VueLoginView(LoginView):
    template_name = "vue_page.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        form = context["form"]
        context.update(vue_page="login", vue_data={
            "csrf": get_token(self.request),
            "next": context.get("next", ""),
            "errors": [str(error) for errors in form.errors.values() for error in errors],
            "username": form["username"].value() or "",
        })
        return context


def dispatcher(view):
    @login_required
    @wraps(view)
    def checked(request, *args, **kwargs):
        if not request.user.dispatcher:
            raise PermissionDenied
        return view(request, *args, **kwargs)
    return checked


def month_value(value):
    try:
        return date.fromisoformat(value + "-01")
    except (TypeError, ValueError):
        return None


def visible_assignments(user):
    rows = Assignment.objects.select_related("slot__shift__site", "slot__shift__schedule", "guard__user")
    if not user.dispatcher:
        rows = rows.filter(guard__user=user, slot__shift__schedule__approved_at__isnull=False)
    return rows


def slots_for(schedule):
    active = Assignment.objects.filter(active=True).select_related("guard__user")
    return ShiftPosition.objects.filter(shift__schedule=schedule).select_related("shift__site").prefetch_related(
        Prefetch("assignment_set", queryset=active, to_attr="occupants")
    )


@login_required
def home(request):
    today = timezone.localdate()
    context = {"title": "Главная", "dispatcher": request.user.dispatcher}
    if request.user.dispatcher:
        month = today.replace(day=1)
        context.update(
            guards=svc.guards().count(),
            shifts=Shift.objects.filter(schedule__month=month).count(),
            currentSchedule=f"{reverse('schedule')}?month={month:%Y-%m}",
            pending=Report.objects.filter(state=Report.State.REVIEW).count(),
            absences=Absence.objects.filter(start__gte=today).count(),
        )
    else:
        upcoming = visible_assignments(request.user).filter(
            active=True, slot__shift__day__gte=today,
        ).order_by("slot__shift__day", "pk")[:5]
        context["upcoming"] = [
            {"id": row.pk, "day": date_format(row.slot.day, "j E"), "site": str(row.slot.site),
             "number": row.slot.number} for row in upcoming
        ]
    return render(request, "vue_page.html", {**context, "vue_page": "home", "vue_data": context})


@login_required
def schedule_view(request):
    if request.method == "POST":
        if not request.user.dispatcher:
            raise PermissionDenied
        month = month_value(request.POST.get("month"))
        try:
            if not month:
                raise ValidationError("Укажите месяц.")
            svc.generate(month, request.user, require_full=True)
            messages.success(request, "Черновик расписания сформирован.")
        except svc.ScheduleConflict as error:
            dates = ", ".join(day.isoformat() for day in error.dates)
            messages.error(request, f"Недостаточно сотрудников на даты: {dates}.")
        except ValidationError as error:
            messages.error(request, error.messages[0])
        return redirect(f"/?month={month:%Y-%m}" if month else "/")

    month = month_value(request.GET.get("month"))
    schedules = Schedule.objects.order_by("-month")
    if not request.user.dispatcher:
        schedules = schedules.filter(approved_at__isnull=False)
    schedule = schedules.filter(month=month).first() if month else schedules.first()
    month = month or (schedule.month if schedule else timezone.localdate().replace(day=1))
    data = {
        "month": f"{month:%Y-%m}", "dispatcher": request.user.dispatcher,
        "csrf": get_token(request), "exists": schedule is not None,
        "approved": bool(schedule and schedule.approved_at), "days": [], "assignments": [],
        "generateUrl": reverse("generate-schedule"),
    }
    if request.user.dispatcher and schedule:
        days = defaultdict(list)
        for slot in slots_for(schedule):
            days[slot.day].append({
                "href": reverse("slot", args=[slot.pk]), "site": str(slot.site),
                "number": slot.number, "guard": str(slot.occupants[0].guard) if slot.occupants else "",
            })
        data.update(
            days=[{"label": date_format(day, "d.m"), "weekday": date_format(day, "l"), "slots": slots}
                  for day, slots in days.items()],
            total=sum(map(len, days.values())),
            vacant=sum(not slot["guard"] for slots in days.values() for slot in slots),
            pdf=reverse("pdf", args=[schedule.pk]), approve=reverse("approve", args=[schedule.pk]),
        )
    if not request.user.dispatcher and schedule:
        shifts = visible_assignments(request.user).filter(slot__shift__schedule=schedule).order_by("slot__shift__day")
        now = timezone.now()
        data["assignments"] = [
            {"id": a.pk, "day": date_format(a.slot.day, "d.m.Y"), "site": str(a.slot.site),
             "number": a.slot.number, "state": a.get_state_display(),
             "report": reverse("report", args=[a.pk]) if a.active and svc.shift_start(a.slot.day) + svc.DAY <= now else ""}
            for a in shifts
        ]
    return render(request, "vue_page.html", {"title": "Расписание", "vue_page": "schedule", "vue_data": data})


@dispatcher
@require_POST
@transaction.atomic
def approve(request, pk):
    schedule = get_object_or_404(Schedule, pk=pk)
    try:
        svc.approve(schedule, request.user)
        messages.success(request, "График утверждён. Охранникам отправлены уведомления.")
    except ValidationError as error:
        messages.error(request, error.messages[0])
    return redirect(f"/?month={schedule.month:%Y-%m}")


@dispatcher
@transaction.atomic
def slot_view(request, pk):
    slot = get_object_or_404(ShiftPosition.objects.select_related("shift__site", "shift__schedule"), pk=pk)
    current = Assignment.objects.filter(slot=slot, active=True).first()
    availability = svc.Availability(slot.day, slot.day, historical=True)
    pending = bool(current and Replacement.objects.filter(original=current, closed=False).exists())
    form = ChangeForm(request.POST or None, initial={"operation": "replace" if current else "assign"})
    if request.method == "POST" and form.is_valid():
        data = dict(form.cleaned_data)
        data.pop("confirm")
        try:
            svc.change(slot, request.user, **data)
            messages.success(request, "Изменение сохранено.")
            return redirect(f"/?month={slot.schedule.month:%Y-%m}")
        except ValidationError as error:
            form.add_error(None, error)
    fragment = request.GET.get("modal") == "1"
    return render(request, "slot_content.html" if fragment else "slot.html", {
        "title": "Позиция смены", "slot": slot, "label": svc.slot_label(slot), "current": current, "form": form,
        "candidates": availability.candidates(slot.day, 1 if current else 3), "pending": pending,
        "future": svc.shift_start(slot.day) > timezone.now(), "fragment": fragment,
        "history": Assignment.objects.filter(slot=slot).select_related("guard__user").order_by("-pk"),
    })


@dispatcher
@transaction.atomic
def absences(request):
    form = AbsenceForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        data = dict(form.cleaned_data)
        data.pop("confirm")
        _, count = svc.register_absence(data, request.user)
        messages.success(request, f"Отсутствие зарегистрировано. Будущих назначений к проверке: {count}.")
        return redirect("absences")
    rows = [(entry, svc.affected(entry)) for entry in Absence.objects.select_related("guard__user").order_by("-start")]
    return render(request, "absences.html", {"title": "Замены", "form": form, "rows": rows})


@dispatcher
@require_POST
@transaction.atomic
def close_absence(request, pk):
    entry = get_object_or_404(Absence, pk=pk, end__isnull=True)
    field = date_field()
    try:
        entry.end = field.clean(request.POST.get("end"))
        entry.full_clean()
        entry.save(update_fields=["end"])
        remaining = [row.pk for row in svc.affected(entry)]
        Replacement.objects.filter(absence=entry, closed=False).exclude(original_id__in=remaining).update(closed=True)
        svc.audit(request.user, "Закрыт больничный", id=pk, end=str(entry.end))
        messages.success(request, "Больничный закрыт.")
    except ValidationError as error:
        messages.error(request, " ".join(error.messages))
    return redirect("absences")


@dispatcher
@transaction.atomic
def directory(request, kind, pk=None):
    if kind == "guards":
        rows = User.objects.filter(dispatcher=False).order_by("last_name", "first_name")
        form_type, title = GuardForm, "Сотрудники"
    elif kind == "sites":
        rows = ObjectSite.objects.order_by("name")
        form_type, title = SiteForm, "Объекты охраны"
    else:
        raise Http404
    instance = get_object_or_404(rows, pk=pk) if pk else None
    form = form_type(request.POST or None, instance=instance)
    if request.method == "POST" and form.is_valid():
        obj = form.save(commit=False)
        if kind == "guards" and form.cleaned_data["password"]:
            obj.set_password(form.cleaned_data["password"])
        obj.save()
        if kind == "guards":
            Employee.objects.get_or_create(user=obj)
        svc.audit(request.user, "Обновлён справочник", directory=kind, id=obj.pk)
        messages.success(request, "Карточка сохранена.")
        return redirect("directory", kind=kind)
    return render(request, "directory.html", {"title": title, "rows": rows, "form": form, "kind": kind, "instance": instance})


@login_required
def reports(request):
    rows = Report.objects.select_related("assignment__guard__user", "assignment__slot__shift__site").order_by("-assignment__slot__shift__day")
    if request.user.dispatcher:
        rows = rows.exclude(state="draft")
    else:
        rows = rows.filter(assignment__guard__user=request.user)
    month = month_value(request.GET.get("month"))
    if month:
        rows = rows.filter(assignment__slot__shift__schedule__month=month)
    state = request.GET.get("state")
    if state in Report.State.values:
        rows = rows.filter(state=state)
    site = request.GET.get("site")
    if site and site.isdecimal():
        rows = rows.filter(assignment__slot__shift__site_id=int(site))
    guard = request.GET.get("guard", "").strip()
    if request.user.dispatcher and guard:
        rows = rows.filter(assignment__guard__user__last_name__icontains=guard)
    if request.GET.get("format") == "csv":
        if not request.user.dispatcher:
            raise PermissionDenied
        response = HttpResponse("\ufeff", content_type="text/csv; charset=utf-8")
        response["Content-Disposition"] = 'attachment; filename="reports.csv"'
        writer = csv.writer(response)
        writer.writerow(["Дата", "Объект", "Охранник", "Статус", "Приём-передача", "Происшествия"])
        for row in rows:
            assignment = row.assignment
            fields = [assignment.slot.day.isoformat(), str(assignment.slot.site), str(assignment.guard),
                      row.get_state_display(), row.handover, row.incidents]
            writer.writerow(["'" + value if value.lstrip().startswith(("=", "+", "-", "@")) else value
                             for value in fields])
        return response
    return render(request, "reports.html", {"title": "Отчеты", "rows": rows,
                                          "states": Report.State.choices, "sites": ObjectSite.objects.order_by("name")})


@login_required
@transaction.atomic
def report_view(request, pk):
    assignment = get_object_or_404(visible_assignments(request.user), pk=pk)
    report = Report.objects.filter(assignment=assignment).first()
    if request.user.dispatcher and (not report or report.state == "draft"):
        raise Http404
    if not request.user.dispatcher and not report and (
        not assignment.active or svc.shift_start(assignment.slot.day)+svc.DAY > timezone.now()
    ):
        raise PermissionDenied
    editable = not request.user.dispatcher and (not report or report.state in {"draft", "returned"})
    form = ReportForm(request.POST if request.method == "POST" and editable else None, initial={
        "handover": report.handover if report else "", "incidents": report.incidents if report else "",
    })
    if request.method == "POST":
        action = request.POST.get("action")
        if editable and action in {"draft", "submit"} and form.is_valid():
            if action == "submit" and not form.cleaned_data["handover"]:
                form.add_error("handover", "Укажите отметки о приёме-передаче объекта.")
            else:
                report = report or Report(assignment=assignment)
                report.handover = form.cleaned_data["handover"]
                report.incidents = form.cleaned_data["incidents"]
                if action == "submit":
                    report.state = "review"
                    svc.notify([], f"Отчёт на проверке. {assignment.guard}, {svc.slot_label(assignment.slot)}", dispatch=True)
                report.save()
                svc.audit(request.user, "Сохранён отчёт", id=report.pk, state=report.state)
                return redirect("report", pk=pk)
        elif request.user.dispatcher and report.state == "review" and action in {"approve", "return"}:
            feedback = request.POST.get("feedback", "").strip()[:2000]
            if action == "return" and not feedback:
                messages.error(request, "Укажите причину возврата.")
            else:
                report.state = "approved" if action == "approve" else "returned"
                report.feedback = feedback
                report.save()
                svc.notify([assignment.guard.user], f"Отчёт: {report.get_state_display()}. {svc.slot_label(assignment.slot)}. {feedback}")
                svc.audit(request.user, "Проверен отчёт", id=report.pk, state=report.state, feedback=feedback)
                return redirect("report", pk=pk)
        elif not editable:
            raise PermissionDenied
    return render(request, "report.html", {"title": "Отчёт о дежурстве", "assignment": assignment, "report": report,
                                          "editable": editable, "form": form, "label": svc.slot_label(assignment.slot)})


@login_required
def notices(request):
    email_rows = Delivery.objects.filter(channel=Delivery.Channel.EMAIL).select_related("recipient", "notice")
    rows = Delivery.objects.filter(channel=Delivery.Channel.INTERNAL).select_related(
        "recipient", "notice"
    ).order_by("-notice__created", "-pk")
    if not request.user.dispatcher:
        rows = rows.filter(recipient=request.user)
    rows = list(rows[:250])
    if request.user.dispatcher:
        email_by_recipient = {
            (row.notice_id, row.recipient_id): row
            for row in email_rows.filter(notice_id__in={row.notice_id for row in rows})
        }
        for row in rows:
            row.email_delivery = email_by_recipient.get((row.notice_id, row.recipient_id))
    return render(request, "notices.html", {
        "title": "Уведомления", "rows": rows,
        "failed": email_rows.filter(failed=True) if request.user.dispatcher else [],
    })


@login_required
@require_POST
@transaction.atomic
def acknowledge(request, pk):
    notice = get_object_or_404(Delivery, pk=pk, recipient=request.user, channel=Delivery.Channel.INTERNAL)
    if not notice.acknowledged:
        notice.acknowledged = timezone.now()
        notice.save(update_fields=["acknowledged"])
        svc.audit(request.user, "Подтверждено уведомление", id=pk)
    return redirect("notices")


@dispatcher
@require_POST
@transaction.atomic
def repeat_notice(request, pk):
    notice = get_object_or_404(Delivery, pk=pk)
    if notice.channel == Delivery.Channel.EMAIL:
        notice = get_object_or_404(Delivery, notice=notice.notice, recipient=notice.recipient, channel=Delivery.Channel.INTERNAL)
    svc.repeat_notice(notice)
    svc.audit(request.user, "Запрошен повтор уведомления", id=pk)
    return redirect("notices")


@dispatcher
def audit_view(request):
    rows = AuditEntry.objects.select_related("author").order_by("-created", "-pk")[:500]
    data = {
        "exportUrl": reverse("audit-excel"),
        "rows": [
            {"id": row.pk, "event": row.event, "author": str(row.author) if row.author else "Система",
             "date": date_format(timezone.localtime(row.created), "d.m.Y H:i"), "details": row.details}
            for row in rows
        ],
    }
    return render(request, "vue_page.html", {"title": "Журнал", "vue_page": "audit", "vue_data": data})


@dispatcher
def audit_excel(request):
    from openpyxl import Workbook

    workbook = Workbook(write_only=True)
    sheet = workbook.create_sheet("Журнал")
    sheet.append(["Дата и время (Иркутск)", "Пользователь", "Действие", "Описание"])
    rows = AuditEntry.objects.select_related("author").order_by("-created", "-pk")
    for row in rows.iterator():
        sheet.append([
            timezone.localtime(row.created).replace(tzinfo=None),
            audit_text_cell(sheet, str(row.author) if row.author else "Система"),
            audit_text_cell(sheet, row.event),
            audit_text_cell(sheet, json.dumps(row.details, ensure_ascii=False)),
        ])
    output = io.BytesIO()
    workbook.save(output)
    output.seek(0)
    return FileResponse(
        output, as_attachment=True, filename="audit-log.xlsx",
        content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


def audit_text_cell(sheet, value):
    from openpyxl.cell import WriteOnlyCell

    cell = WriteOnlyCell(sheet, value=value)
    cell.data_type = "s"
    return cell


@dispatcher
def pdf(request, pk):
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.platypus import Paragraph, SimpleDocTemplate, Table, TableStyle

    schedule = get_object_or_404(Schedule, pk=pk)
    from django.conf import settings
    font = os.getenv("DUTY_PDF_FONT", str(settings.BASE_DIR / "duty" / "assets" / "DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont("DutyFont", font))
    buffer = io.BytesIO()
    cell_style = ParagraphStyle("cell", fontName="DutyFont", fontSize=9, leading=12)
    title_style = ParagraphStyle("heading", fontName="DutyFont", fontSize=16, leading=22, spaceAfter=12)
    data = [["Дата", "Объект", "Пост", "Охранник"]]
    for slot in slots_for(schedule):
        occupant = str(slot.occupants[0].guard) if slot.occupants else "Требуется назначение"
        data.append([f"{slot.day:%d.%m.%Y}", Paragraph(escape(str(slot.site)), cell_style),
                     slot.number, Paragraph(escape(occupant), cell_style)])
    table = Table(data, colWidths=[75, 140, 40, 190], repeatRows=1)
    table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), "DutyFont"),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e0ecea")),
        ("LINEBELOW", (0, 0), (-1, -1), 0.25, colors.lightgrey),
    ]))
    status = "Утверждён" if schedule.approved_at else "Черновик"
    SimpleDocTemplate(buffer, pagesize=A4).build([
        Paragraph(f"График дежурств · {schedule.month:%m.%Y}", title_style),
        Paragraph(f"{status}. Смена с 08:00 до 08:00 следующего дня. Подпись: ____________________", cell_style),
        table,
    ])
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename=f"schedule-{schedule.month:%Y-%m}.pdf")
