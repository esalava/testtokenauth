from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from session.classes import PyOTPProvider
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
import datetime
from django.http import JsonResponse


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


@api_view(['POST'])
@permission_classes([])
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        response = JsonResponse({
            'message': 'Login successful',
        })

        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            samesite='Lax'
        )

        return response

    else:
        return Response(
            {'error': 'Invalid username or password'},
            status=status.HTTP_400_BAD_REQUEST)

