from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from session.classes import PyOTPProvider
import datetime


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generar_otp(request):
    user = request.user
    otp_provider = PyOTPProvider(user=user)
    token = otp_provider.generate_otp()
    ttl = otp_provider.totp.interval - datetime.datetime.now().timestamp() % otp_provider.totp.interval
    return Response({
        'token': token,
        'time_remaining': ttl
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def usar_otp(request):
    user = request.user
    token = request.GET.get('otp')
    otp_provider = PyOTPProvider(user=user)
    token_is_valid = otp_provider.validate_otp(token)
    return Response({
        'is_valid': token_is_valid
    })
