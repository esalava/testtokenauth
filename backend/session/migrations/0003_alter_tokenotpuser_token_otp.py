# Generated by Django 5.1.1 on 2024-09-22 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0002_tokenotpuser_secret'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tokenotpuser',
            name='token_otp',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
