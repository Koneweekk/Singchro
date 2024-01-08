from accounts.models import User
from django.db import models
from datetime import datetime
import os

def api_upload_to_model(instance, filename):
    api_directory = "model"
    return f'{api_directory}/{filename}'

def api_upload_to_covered_song(instance, filename):
    api_directory = "cover-song"
    return f'{api_directory}/{filename}'

def api_upload_to_voice_without_MR(instance, filename):
    api_directory = "without-MR"
    return f'{api_directory}/{filename}'

def api_upload_to_voice(instance, filename):
    user_id = instance.userId.id
    _, ext = os.path.splitext(filename)  # 파일 이름과 확장자 분리
    current_time = datetime.now()
    current_time_str = current_time.strftime('%Y_%m_%dT%H:%M:%S')
    new_filename = f"voice/{user_id}/{current_time_str}{ext}"
    return new_filename

def api_upload_to_origin(instance, filename):
    user_id = instance.userId.id
    _, ext = os.path.splitext(filename)
    current_time = datetime.now()
    current_time_str = current_time.strftime('%Y_%m_%dT%H:%M:%S')
    new_filename = f"origin/{user_id}/{current_time_str}{ext}"
    return new_filename

class VoiceModel(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)  # 등록한 유저(FK)
    voicePath = models.FileField(upload_to=api_upload_to_voice, null=True)  # 녹음 파일
    modelPath = models.FileField(upload_to=api_upload_to_model, null=True, default="")  # 음성 모델
    createdAt = models.DateTimeField(auto_now_add=True)  # 생성일
    activated = models.BooleanField(default=False)  # 공개 여부

class OriginSong(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(unique=True, null=False, max_length=1000)
    path = models.FileField(upload_to=api_upload_to_origin)


class CoverRequest(models.Model):
    requestUser = models.ForeignKey(User, on_delete=models.CASCADE)
    useModel = models.ForeignKey(VoiceModel, on_delete=models.CASCADE)
    originSongId = models.ForeignKey(OriginSong, on_delete=models.CASCADE)
    message = models.TextField(null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    isChecked = models.BooleanField(default=False)
    isAccepted = models.BooleanField(null=True, default=False)


class CoverSong(models.Model):
    voiceId = models.ForeignKey(VoiceModel, on_delete=models.CASCADE)
    originalId = models.ForeignKey(OriginSong, on_delete=models.CASCADE)
    voicePath = models.FileField(upload_to=api_upload_to_voice_without_MR, null=True, default="")
    coverPath = models.FileField(upload_to=api_upload_to_covered_song, null=True, default="")
    createdAt = models.DateTimeField(auto_now_add=True)

class SongLike(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    coverSongId = models.ForeignKey(CoverSong, on_delete=models.CASCADE)
