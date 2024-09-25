import json
import pyotp
import datetime
from abc import ABC, abstractmethod
from django.utils import timezone
from channels.generic.websocket import AsyncWebsocketConsumer
from session.models import TokenOTPUser, TokenUserLog
from django.contrib.auth.models import User
from channels.db import database_sync_to_async
from utils.hash import hash_sha256


class OTPProvider(ABC):

    @abstractmethod
    def generate_otp(self):
        pass

    @abstractmethod
    def validate_otp(self, otp):
        pass


class PyOTPProvider(OTPProvider):
    def __init__(self, user):
        self.user = user
        otpuser_record, iscreated = TokenOTPUser.objects.get_or_create(
            user=self.user
        )
        if iscreated:
            otpuser_record.secret = pyotp.random_base32()
            otpuser_record.save()
        self.secret = otpuser_record.secret
        self.totp = pyotp.TOTP(otpuser_record.secret, interval=TokenOTPUser.TOKEN_EXPIRATION_TIME)

    def generate_otp(self):
        token_otp = pyotp.TOTP(self.secret).now()
        ttl = datetime.timedelta(seconds=TokenOTPUser.TOKEN_EXPIRATION_TIME)

        # get recent token created
        existing_log = TokenUserLog.objects.filter(
            user=self.user,
            token_otp=token_otp,
        ).exists()

        if not existing_log:
            TokenUserLog.objects.create(
                user=self.user,
                token_otp=token_otp
            )
        return token_otp

    async def generate_otp_async(self):
        return await database_sync_to_async(self.generate_otp)()

    def validate_otp(self, otp_token):
        tokenuser_record = TokenOTPUser.objects.get(user=self.user)
        if tokenuser_record is None:
            raise Exception('Su usuario no cuenta con un registro de One Time Password')

        if otp_token == pyotp.TOTP(tokenuser_record.secret).now():
            otplog_record = TokenUserLog.objects.filter(token_otp=otp_token, user=self.user).last()
            otplog_record.is_already_used = True
            otplog_record.date_used = timezone.now()
            otplog_record.save()
            return True
        return False

    async def validate_otp_async(self, otp_token):
        return await database_sync_to_async(self.validate_otp)(otp_token)


class TokenOTPConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        token = await self.generate_token()
        await self.send(text_data=json.dumps({'token': token}))

    async def disconnect(self, code):
        pass

    async def receive(self, text_data):
        await self.send(text_data=text_data)
        # Logic to know what is the action from the user

    async def generate_token(self):
        user = await database_sync_to_async(User.objects.get)(username='eduardosg')
        otp_provider = PyOTPProvider(user)
        token = await otp_provider.generate_otp_async()
        return token


