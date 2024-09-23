from rest_framework import serializers, routers, viewsets
from session.models import TokenUserLog


class TokenUserLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenUserLog
        fields = ('created_at', 'token_otp', 'is_already_used', 'date_used')
        read_only_fields = ('itoken',)


class TokenUserLogViewSet(viewsets.ModelViewSet):
    serializer_class = TokenUserLogSerializer
    queryset = TokenUserLog.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset


router = routers.DefaultRouter()
router.register(r'', TokenUserLogViewSet, basename='TokenUserLog')