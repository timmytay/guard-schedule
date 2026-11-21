from django.contrib.auth import views as auth
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from . import api, views

urlpatterns = [
    path("home/", views.home, name="home"),
    path("", views.schedule_view, name="schedule"),
    path("login/", views.VueLoginView.as_view(), name="login"),
    path("logout/", auth.LogoutView.as_view(), name="logout"),
    path("schedule/<int:pk>/approve/", views.approve, name="approve"),
    path("schedule/<int:pk>/pdf/", views.pdf, name="pdf"),
    path("position/<int:pk>/", views.slot_view, name="slot"),
    path("absences/", views.absences, name="absences"),
    path("absences/<int:pk>/close/", views.close_absence, name="close_absence"),
    path("directory/<str:kind>/", views.directory, name="directory"),
    path("directory/<str:kind>/<int:pk>/", views.directory, name="directory_edit"),
    path("reports/", views.reports, name="reports"),
    path("reports/<int:pk>/", views.report_view, name="report"),
    path("notifications/", views.notices, name="notices"),
    path("notifications/<int:pk>/ack/", views.acknowledge, name="acknowledge"),
    path("notifications/<int:pk>/repeat/", views.repeat_notice, name="repeat"),
    path("audit/export/", views.audit_excel, name="audit-excel"),
    path("audit/", views.audit_view, name="audit"),
    path("api/schedule/generate/", api.GenerateScheduleView.as_view(), name="generate-schedule"),
    path("api/assignments/", api.AssignmentList.as_view(), name="api-assignments"),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="api-docs"),
]
