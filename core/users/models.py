from django.contrib.auth.models import AbstractUser
from django.db import models

from authors.models import Authors
from users.managers import CustomUserManager


class Users(AbstractUser):
    """ A custom user model """
    username = None
    email = models.EmailField(unique=True, blank=False)
    balance = models.FloatField(default=0)
    telegram_chat_id = models.CharField(unique=True, blank=True, max_length=124, null=True)
    patronymic = models.CharField(blank=True, null=True, max_length=128, verbose_name='Отчество')
    birthday_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, verbose_name='Номер телефона', null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.email
