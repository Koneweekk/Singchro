from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'nickname', 'imgPath', 'alarmToken']

class SignupSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password', 'id', 'nickname', 'alarmToken']
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }
    

    def create(self, validated_data):
        email = validated_data['email']
        nickname = validated_data['nickname']
        password = validated_data['password']
        alarmToken = validated_data['alarmToken']

        # 비밀번호 유효성 검사
        try:
            validate_password(password=password)
        except serializers.ValidationError as err:
            raise serializers.ValidationError({'password': err.detail})
        
        # 사용자 생성
        user = User.objects.create_user(
            email=email,
            password=password,
            nickname=nickname,
            alarmToken=alarmToken
        )

        return user
    

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'nickname', 'password',  'imgPath']


class UserImgSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['imgPath']

    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('imgPath', instance.avatar)
        instance.save()
        return instance