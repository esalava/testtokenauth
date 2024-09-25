from rest_framework import serializers, routers, viewsets
from rest_framework.pagination import PageNumberPagination
from session.models import TokenUserLog


class TokenUserLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenUserLog
        fields = '__all__'
        read_only_fields = ('itoken',)


class TokenUserLogViewSet(viewsets.ModelViewSet):
    serializer_class = TokenUserLogSerializer
    pagination_class = PageNumberPagination
    queryset = TokenUserLog.objects.all().order_by('-created_at')

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)


router = routers.DefaultRouter()
router.register(r'', TokenUserLogViewSet, basename='TokenUserLog')