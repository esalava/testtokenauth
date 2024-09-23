from .classes import TokenOTPConsumer
from django.urls import path

websocket_urlpatterns = [
    path('ws/otp/generarToken/', TokenOTPConsumer.as_asgi()),
]