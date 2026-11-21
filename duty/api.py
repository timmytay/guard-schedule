from datetime import date

from django.core.exceptions import ValidationError
from django.urls import reverse
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from . import services

from rest_framework import generics, permissions, serializers

from .models import Assignment
from .views import visible_assignments


class AssignmentSerializer(serializers.ModelSerializer):
    day = serializers.DateField(source="slot.day")
    site = serializers.CharField(source="slot.site.name")
    position = serializers.IntegerField(source="slot.number")
    employee = serializers.CharField(source="guard")

    class Meta:
        model = Assignment
        fields = ["id", "day", "site", "position", "employee", "state", "active"]


class AssignmentList(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return visible_assignments(self.request.user).order_by("slot__shift__day", "slot__shift__site_id", "slot__number")


class IsDispatcher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.dispatcher


class ScheduleSerializer(serializers.Serializer):
    month = serializers.IntegerField(min_value=1, max_value=12)
    year = serializers.IntegerField(min_value=1, max_value=9998)


class GeneratedScheduleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    month = serializers.DateField()
    status = serializers.CharField()
    url = serializers.CharField()


class ScheduleConflictSerializer(serializers.Serializer):
    detail = serializers.CharField()
    dates = serializers.ListField(child=serializers.DateField())


class GenerateScheduleView(APIView):
    permission_classes = [IsDispatcher]

    @extend_schema(
        request=ScheduleSerializer,
        responses={201: GeneratedScheduleSerializer, 409: ScheduleConflictSerializer},
    )
    def post(self, request):
        serializer = ScheduleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        period = date(serializer.validated_data["year"], serializer.validated_data["month"], 1)
        try:
            schedule = services.generate(period, request.user, require_full=True)
        except services.ScheduleConflict as error:
            return Response(
                {"detail": "Недостаточно сотрудников на даты из списка.", "dates": error.dates},
                status=409,
            )
        except ValidationError as error:
            return Response({"detail": error.messages[0]}, status=400)
        return Response(
            {
                "id": schedule.pk,
                "month": schedule.month,
                "status": "draft",
                "url": f"{reverse('schedule')}?month={period:%Y-%m}",
            },
            status=201,
        )
