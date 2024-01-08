from django.db import models
from django.contrib.auth.models import (AbstractUser, PermissionsMixin, BaseUserManager)
from uuid import uuid4
import os

from rest_framework import (status)
from rest_framework.response import (Response)

class UserManager(BaseUserManager):
    def create_user(self, email, password, nickname, **extra_fields):
        if not email:
            raise ValueError()
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.nickname = nickname
        user.username = email
        user.save()
        return user
    

    def create_superuser(self, email, nickname, password):
        user = self.create_user(email=email, nickname=nickname, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


def api_upload_to_img(instance, filename):
    api_directory = "user_imgs"
    return f'{api_directory}/{filename}'


class User(AbstractUser, PermissionsMixin):
    # id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(unique=True)
    nickname = models.CharField(unique=True, max_length=20, default='')
    imgPath = models.ImageField(upload_to=api_upload_to_img, blank=True, null=True)
    alarmToken = models.TextField(unique=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_email_confirmed = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']
    objects = UserManager()


def get_upload_path(instance, filename):
    return os.path.join('images', 'avatars', str(instance.pk), filename)