# Generated by Django 5.1.1 on 2024-09-24 04:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0009_alter_tokenotpuser_user_alter_tokenuserlog_token_otp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tokenotpuser',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='tokenotpuser',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='tokenuserlog',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='tokenuserlog',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
