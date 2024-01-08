from .models import (VoiceModel, CoverSong, OriginSong, CoverRequest, SongLike)
from rest_framework import serializers


class VoiceModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceModel
        fields = ['id', 'userId', 'voicePath', 'modelPath', 'createdAt', 'activated']


class VoiceFileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceModel
        fields = ['modelPath']

class SongFileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverSong
        fields = ['coverPath', 'voicePath']
    

class CoverSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverSong
        fields = ['id', 'voiceId', 'originalId', 'voicePath', 'coverPath', 'createdAt']


class OriginalSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = OriginSong
        fields = ['id', 'userId', 'title', 'path']

class CoverRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverRequest
        fields = ['id', 'requestUser', 'useModel', 'originSongId', 
                  'message', 'createdAt', 'isChecked', 'isAccepted']

class SongLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SongLike
        fields = ['id', 'userId', 'coverSongId']