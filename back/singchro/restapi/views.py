from .models import (VoiceModel, CoverSong, CoverRequest, OriginSong, SongLike)
from accounts.serializers import (UserSerializer)
from .serializers import (VoiceModelSerializer, CoverSongSerializer,
                          VoiceFileUpdateSerializer, OriginalSongSerializer,
                          CoverRequestSerializer, SongLikeSerializer, SongFileUpdateSerializer)

from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from rest_framework import (status, generics)
from rest_framework.decorators import api_view

from django.db.models import Q

from rest_framework.parsers import MultiPartParser, FormParser

from accounts.models import User

from restapi.fcm import send_fcm_message, send_fcm_msg

class HaveModelWork(APIView):
    """
    if ai have work that create new model is return voice file
    else return
    """
    def get(self, request, format=None):
        voiceModel = (VoiceModel.objects.filter(Q(modelPath='') & ~Q(voicePath=''))
                      .order_by('createdAt').first())

        if voiceModel:
            serializer = VoiceModelSerializer(voiceModel)
            return Response({'id': serializer.data['id'], 'voice_path': serializer.data['voicePath']})
        else:
            return Response({})

class HaveSongWork(APIView):
    """
    if ai have work that create new model is return voice file
    else return
    """
    def get(self, request, format=None):
        coverSong = (CoverSong.objects.filter(coverPath='').order_by('createdAt')).first()
        if coverSong:
            serializer = CoverSongSerializer(coverSong)
            voiceModel = VoiceModel.objects.get(id=serializer.data['voiceId'])
            if voiceModel is None:
                coverSong.delete()
                return self.get(self, request, format=None)
            vserializer = VoiceModelSerializer(voiceModel)
            originSong = OriginSong.objects.get(id=serializer.data['originalId'])
            oserializer = OriginalSongSerializer(originSong)

            data = {
                'id': serializer.data['id'],
                'voice_model_path': vserializer.data['modelPath'],
                'origin_song_path': oserializer.data['path'],
            }
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({})

class VoiceFileUpdateView(APIView):
    def post(self, request, model_id, format=None):
        voiceModel = get_object_or_404(VoiceModel, id=model_id)
        vserializer = VoiceModelSerializer(voiceModel)
        serializer = VoiceFileUpdateSerializer(voiceModel, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            user = get_object_or_404(User, id=vserializer.data['userId'])
            userializer = UserSerializer(user)
            send_fcm_msg("SingChro", "모델 생성이 완료 되었습니다.", userializer.data['alarmToken'])
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SongFileUpdateView(APIView):
    def post(self, request, cover_song_id, format=None):
        coverSong = get_object_or_404(CoverSong, id=cover_song_id)
        cserializer = CoverSongSerializer(coverSong)
        serializer = SongFileUpdateSerializer(coverSong, data=request.data, partial=True)

        if serializer.is_valid():
            # 커버송 저장 하기
            serializer.save()

            # 신청자
            originSong = get_object_or_404(OriginSong, id=cserializer.data['originalId'])
            oserializer = OriginalSongSerializer(originSong)
            originSongUser = get_object_or_404(User, id=oserializer.data['userId'])
            ouserializer = UserSerializer(originSongUser)
            # 모델 주인
            voiceModel = get_object_or_404(VoiceModel, id=cserializer.data['voiceId'])
            vserializer = VoiceModelSerializer(voiceModel)
            modelUser = get_object_or_404(User, id=vserializer.data['userId'])
            vuserializer = UserSerializer(modelUser)

            if ouserializer.data['id'] != vuserializer.data['id']:
                # 좋아요 목록 업데이트 하기
                data = {
                    'userId': originSongUser.id,
                    'coverSongId': cover_song_id
                }
                serializer = SongLikeSerializer(data=data)

                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # FCM 전송
                send_fcm_msg("SingChro", "커버송 생성이 완료 되었습니다.", ouserializer.data['alarmToken'])
                return Response(serializer.data, status=status.HTTP_200_OK)

            send_fcm_msg("SingChro", "커버송 생성이 완료 되었습니다.", vuserializer.data['alarmToken'])
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def isModeling(request, userId):
    myVoiceModel = VoiceModel.objects.filter(Q(userId=userId) & Q(modelPath="")).order_by('createdAt')
    if not myVoiceModel:
        return Response({'result': False, 'waiting': 0}, status=status.HTTP_200_OK)

    min_created_at = myVoiceModel.first().createdAt
    totalVoicModel = VoiceModel.objects.filter(Q(modelPath="") & Q(createdAt__lt=min_created_at))
    totalCnt = totalVoicModel.count()
    return Response({'result': True, 'waiting': totalCnt}, status=status.HTTP_200_OK)

class VoiceModelCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        data = {
            'userId': request.data['user_id'],
            'voicePath': request.FILES['voice_file'],
            'activated': False,
        }
        serializer = VoiceModelSerializer(data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            # id, waiting: number
            myVoiceModel = VoiceModel.objects.filter(userId=data['userId'], modelPath="").order_by('createdAt')
            min_created_at = myVoiceModel.first().createdAt
            totalVoicModel = VoiceModel.objects.filter(Q(modelPath="") & Q(createdAt__lt=min_created_at))
            totalCnt = totalVoicModel.count()
            return Response({'result': True, 'waiting': totalCnt}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetVoiceModelsByUser(APIView):
    def get(self, request, user_id, format=None):
        voice_models = VoiceModel.objects.filter(
            Q(userId=user_id) & (~Q(voicePath='') & ~Q(modelPath='')))

        if voice_models.exists():  # 검색된 모델이 존재하는 경우
            serializer = VoiceModelSerializer(voice_models, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_200_OK)


class ToggleModelActivated(APIView):
    def put(self, request, model_id, format=None):
        try:
            voice_model = VoiceModel.objects.get(id=model_id)
        except VoiceModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        voice_model.activated = not voice_model.activated
        voice_model.save()

        return Response({'activated': voice_model.activated}, status=status.HTTP_200_OK)
    
    def delete(self, request, model_id, format=None):
        try:
            voice_model = VoiceModel.objects.get(id=model_id)
        except VoiceModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        voice_model.voicePath = ''
        voice_model.save()

        return Response(status=status.HTTP_200_OK)
    
class GetCoverSongByUser(APIView):
    def get(self, request, userId, format=None):
        orignSongs = OriginSong.objects.filter(userId=userId)
        serializer = OriginalSongSerializer(orignSongs, many=True)
            
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetTotalCoverSongByUser(APIView):
    def get(self, request, userId, format=None):
        voiceModels = VoiceModel.objects.filter(userId=userId)

        data = []
        for voiceModel in voiceModels:
            coverSongs = CoverSong.objects.filter(voiceId=voiceModel.id)

            for coverSong in coverSongs:
                serializer = CoverSongSerializer(coverSong)
                dic = serializer.data
                if serializer.data['coverPath'] == '' or serializer.data['coverPath'] is None:
                    continue
                # user
                myUser = User.objects.get(id=userId)
                dic["user"] = {"id": myUser.id, "nickname": myUser.nickname}

                # original
                originalSong = OriginSong.objects.get(id=dic['originalId'])
                serializer = OriginalSongSerializer(originalSong)
                dic['original'] = serializer.data

                # voice
                voice = VoiceModel.objects.get(id=dic['voiceId'])
                serializer = VoiceModelSerializer(voice)
                dic['voice'] = serializer.data

                data.append(dic)

        return Response(data, status=status.HTTP_200_OK)

class GetTotalCoverSongByLike(APIView):
    def get(self, request, userId, format=None):
        songLikes = SongLike.objects.filter(userId=userId)

        data = []
        for songLike in songLikes:
            serializer = SongLikeSerializer(songLike)
            coverSongs = CoverSong.objects.filter(id=serializer.data['coverSongId'])

            for coverSong in coverSongs:
                serializer = CoverSongSerializer(coverSong)
                dic = serializer.data

                # user
                voiceModel = get_object_or_404(VoiceModel, id=serializer.data['voiceId'])
                voiceModelSerializer = VoiceModelSerializer(voiceModel)
                myUser = User.objects.get(id=voiceModelSerializer.data['userId'])
                dic["user"] = {"id": myUser.id, "nickname": myUser.nickname}

                # original
                originalSong = OriginSong.objects.get(id=dic['originalId'])
                serializer = OriginalSongSerializer(originalSong)
                dic['original'] = serializer.data

                # voice
                voice = VoiceModel.objects.get(id=dic['voiceId'])
                serializer = VoiceModelSerializer(voice)
                dic['voice'] = serializer.data

                data.append(dic)

        return Response(data, status=status.HTTP_200_OK)

class GetCoverSongByTitle(APIView):
    def post(self, request, format=None):
        originSongs = OriginSong.objects.filter(title__icontains=request.data['title'])

        data = []
        for originSong in originSongs:
            coverSongs = CoverSong.objects.filter(originalId=originSong.id)

            for coverSong in coverSongs:
                serializer = CoverSongSerializer(coverSong)
                dic = serializer.data

                # user
                myVoiceModel = VoiceModel.objects.get(id=dic['voiceId'])
                myUser = User.objects.get(email=myVoiceModel.userId)
                dic["user"] = {"id": myUser.id, "nickname": myUser.nickname}

                # original
                originalSong = OriginSong.objects.get(id=dic['originalId'])
                serializer = OriginalSongSerializer(originalSong)
                dic['original'] = serializer.data

                # voice
                voice = VoiceModel.objects.get(id=dic['voiceId'])
                serializer = VoiceModelSerializer(voice)
                dic['voice'] = serializer.data

                data.append(dic)

        return Response(data, status=status.HTTP_200_OK)


class DeleteCoverSong(APIView):
    def delete(self, request, coverSongId, format=None):
        try:
            coverSong = CoverSong.objects.get(id=coverSongId)
        except CoverSong.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # 권한 검사 또는 삭제 조건 추가

        coverSong.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OriginSongCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        data = {
            'userId': request.data['user_id'],
            'title': request.data['title'],
            'path': request.FILES['song_file'],
        }
        serializer = OriginalSongSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'id': serializer.data['id']}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class CoverSongCreateView(APIView):
    # { voiceId, originalId }
    # { id, waiting }

    def post(self, request):
        serializer = CoverSongSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            min_created_at = serializer.data['createdAt']
            totalVoicModel = CoverSong.objects.filter(Q(voicePath=None) & Q(createdAt__lt=min_created_at))
            totalCnt = totalVoicModel.count()
            return Response({'id': serializer.data['id'], 'waiting': totalCnt}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class RequestCoverSong(APIView):
    def post(self, request):
        data = {
            'requestUser': request.data['userId'],
            'useModel': request.data['voiceId'],
            'originSongId': request.data['originalId'],
        }
        serializer = CoverRequestSerializer(data=data, partial=True)

        if serializer.is_valid():
            # 데이터베이스에 저장하기
            serializer.save()

            # 요청을 받은 사람에서 알람 보내기
            voiceModel = get_object_or_404(VoiceModel, id=serializer.data['useModel'])
            voiceModelSerializer = VoiceModelSerializer(voiceModel)
            user = get_object_or_404(User, id=voiceModelSerializer.data['userId'])
            userSerializer = UserSerializer(user)
            send_fcm_msg("SingChro", "누군가가 당신의 노래를 원해요.", userSerializer.data['alarmToken'])

            return Response({'id': serializer.data['id']}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CoverRequest + user:{nickname : 요청자} +original:{title}
# 자신의 모델이 CoverRequest에 들어가 있고 isChecked가 False인
class RequestListView(APIView):
    def get(self, request, userId):
        try:
            myUser = User.objects.get(id=userId)
            voiceModels = VoiceModel.objects.filter(userId=myUser)
            
            data = []
            
            for voiceModel in voiceModels:
                vSerializer = VoiceModelSerializer(voiceModel)

                # 해당 모델이 받은 것 찾기
                myRequests = CoverRequest.objects.filter(useModel=vSerializer.data['id'], isChecked=False)

                for myRequest in myRequests:
                    rSerializer = CoverRequestSerializer(myRequest)
                    # CoverRequest
                    dic = rSerializer.data

                    # user
                    tmpUser = User.objects.get(id=rSerializer.data['requestUser'])
                    dic['user'] = {'nickname': tmpUser.nickname}

                    # original
                    tmpOriginal = OriginSong.objects.get(id=rSerializer.data['originSongId'])
                    dic['original'] = {'title': tmpOriginal.title}
                    data.append(dic)
            
            return Response(data)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            

class ReviewRequest(APIView):
    """
    put : set CoverRequest.isAccepted, .isChecked and then create CoverSong record
    """
    def put(self, request, requestId):
        state = request.data.get('isAccepted')
        myRequest = get_object_or_404(CoverRequest, id=requestId)
        
        # set CoverRequest.isAccepted, .isChecked
        myRequest.isAccepted = state
        myRequest.isChecked = True
        myRequest.save()

        rserializer = CoverRequestSerializer(myRequest)
        originSong = get_object_or_404(OriginSong, id=rserializer.data['originSongId'])
        orserializer = OriginalSongSerializer(originSong)
        user = get_object_or_404(User, id=orserializer.data['userId'])
        userializer = UserSerializer(user)

        if not state:
            send_fcm_msg("SingChro", "커버송 요청이 거절되었습니다.", userializer.data['alarmToken'])
            return Response({'message': "커버송 요청을 거절했습니다."}, status=status.HTTP_200_OK)

        # create CoverSong record
        data = {
            'voiceId': myRequest.useModel.id,
            'originalId': myRequest.originSongId.id,
        }

        serialize = CoverSongSerializer(data=data, partial=True)

        if serialize.is_valid():
            serialize.save()
            send_fcm_msg("SingChro", "커버송 요청이 수락되었습니다.", userializer.data['alarmToken'])
            return Response({'coverSong_id': serialize.data['id']}, status=status.HTTP_200_OK)
        else:
            return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)


class SongLikeView(APIView):
    def get(self, request, userId, coverSongId):
        myUser = User.objects.get(id=userId)
        myCoverSong = CoverSong.objects.get(id=coverSongId)
        Likes = SongLike.objects.filter(userId=myUser, coverSongId=myCoverSong)

        if not Likes.exists():
            return Response({'isLike' : False}, status=status.HTTP_200_OK)
        else:
            return Response({'isLike' : True}, status=status.HTTP_200_OK)

    def post(self, request, userId, coverSongId):
        myUser = User.objects.get(id=userId)
        myCoverSong = CoverSong.objects.get(id=coverSongId)

        # 중복 체크
        try:
            song_like = SongLike.objects.get(userId=myUser, coverSongId=myCoverSong)
            return Response({'isLike': True}, status=status.HTTP_200_OK)
        except SongLike.DoesNotExist:
            data = {
                'userId': myUser.id,
                'coverSongId': myCoverSong.id
            }
            serializer = SongLikeSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({'isLike': True}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, userId, coverSongId):
        try:
            myUser = User.objects.get(id=userId)
            myCoverSong = CoverSong.objects.get(id=coverSongId)
            
            song_like = SongLike.objects.get(userId=myUser, coverSongId=myCoverSong)
            
            song_like.delete()
            
            return Response({'isLike': False}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except CoverSong.DoesNotExist:
            return Response({'message': 'Cover song not found'}, status=status.HTTP_404_NOT_FOUND)
        except SongLike.DoesNotExist:
            return Response({'message': 'Song like not found'}, status=status.HTTP_404_NOT_FOUND)
        
