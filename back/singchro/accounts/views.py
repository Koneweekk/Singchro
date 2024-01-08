from rest_framework.generics import (CreateAPIView)
from rest_framework.permissions import (AllowAny)

from .serializers import (SignupSerializer, UserProfileSerializer)

from rest_framework import (status)
from rest_framework.response import (Response)
from rest_framework.decorators import api_view
from .models import User

from dj_rest_auth.views import (LoginView, LogoutView)
from django.http import QueryDict

from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView

from .utils import (generate_email_code, send_confirmation_email)

from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import (make_password, check_password)

@api_view(['POST'])
def email_check(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
        return Response({'result': False}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'result': True}, status=status.HTTP_200_OK)


@api_view(['POST'])
def nickname_check(request):
    nickname = request.data.get('nickname')

    try:
        user = User.objects.get(nickname=nickname)
        return Response({'result': False}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'result': True}, status=status.HTTP_200_OK)


class SignupAPIView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny,]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        print(serializer.data)
        return Response({'id' : serializer.data['id']}, status=status.HTTP_201_CREATED, headers=headers)


class LoginAPIView(LoginView):
    def post(self, request, *args, **kwargs):
        self.request = request
        email = self.request.data['email']
        username = self.request.data['email']
        password = self.request.data['password']

        query_string = f'email={email}&password={password}&username={username}'
        query_dict = QueryDict(query_string)
        
        self.serializer = self.get_serializer(data=query_dict)
        self.serializer.is_valid(raise_exception=True)

        self.login()
        response = self.get_response()
        id = User.objects.get(email=email).id
        token = response.data['key']
        newdata = {'id': id, 'token': token}
        response.data = newdata
        return response

class LogoutAPIView(LogoutView):
    pass


class UserProfileView(APIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, userId, format=None):
        user = get_object_or_404(User, id=userId)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, userId, format=None):
        sendUser = request.user
        deletedUser = get_object_or_404(User, id=userId)
        if sendUser.id != deletedUser.id:
            return Response({'message' : '계정 삭제는 본인만 가능합니다.'}, status=status.HTTP_404_NOT_FOUND)
        passwords_match = check_password(request.data['password'], sendUser.password)
        if not passwords_match:
            return Response({'message' : '비밀번호가 다릅니다.'}, status=status.HTTP_404_NOT_FOUND)
        sendUser.delete()
        return Response({'message' : '성공적으로 삭제되었습니다.'}, status=status.HTTP_200_OK)


class SendEmailCodeAPIView(APIView):

    def post(self, request, format=None):
        email = request.data['email']
        code = generate_email_code(8)

        send_confirmation_email(email=email, code=code)
        return Response({'code': code}, status=200)
    

class ChangNickNameAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, userId, format=None):
        sendUser = request.user
        deletedUser = get_object_or_404(User, id=userId)

        if sendUser.id != deletedUser.id:
            return Response({'message' : '닉네임 변경은 본인만 가능합니다.'}, status=status.HTTP_404_NOT_FOUND)
        passwords_match = check_password(request.data['password'], sendUser.password)
        if not passwords_match:
            return Response({'message' : '비밀번호가 다릅니다.'}, status=status.HTTP_404_NOT_FOUND)

        sendUser.nickname = request.data['nickname']
        sendUser.save()

        serializer = UserProfileSerializer(sendUser)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ChangPassWordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, userId, format=None):
        sendUser = request.user
        deletedUser = get_object_or_404(User, id=userId)

        if sendUser.id != deletedUser.id:
            return Response({'message' : '비밀번호 변경은 본인만 가능합니다.'}, status=status.HTTP_404_NOT_FOUND)
        passwords_match = check_password(request.data['old_password'], sendUser.password)
        if not passwords_match:
            return Response({'message' : '이전 비밀번호가 다릅니다.'}, status=status.HTTP_404_NOT_FOUND)
        if request.data['new_password1'] != request.data['new_password2']:
            return Response({'message' : '비밀번호가 같지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

        new_password = make_password(request.data['new_password1'], salt=None, hasher='pbkdf2_sha256')

        sendUser.password = new_password
        sendUser.save()

        serializer = UserProfileSerializer(sendUser)

        return Response(serializer.data, status=status.HTTP_200_OK)