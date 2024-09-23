from django.db import models
from django.contrib.auth.models import User
from base.models import BaseModel


class TokenOTPUser(BaseModel):
    TOKEN_EXPIRATION_TIME = 60
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    secret = models.CharField(max_length=32, null=True)


class TokenUserLog(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token_otp = models.CharField(max_length=32, null=True)
    is_already_used = models.BooleanField(default=False)
    date_used = models.DateTimeField(null=True)
