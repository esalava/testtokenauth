from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.urls import path, include
from session import views
from session.serializers import router

urlpatterns = [
    path('jwt/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('jwt/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('otp/generarToken/', views.generar_otp, name='generar_otp'),
    path('otp/usarToken/', views.usar_otp, name='usar_otp'),
    path('otp/token/all/', include(router.urls), name='token_all'),
]
