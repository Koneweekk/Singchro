#pip install requests
#pip install subprocess
'''
 
Python code for getting sovits5.0 to train Voice Model using user's Voice

writer : PANZER
Date : 2023-09-14 
'''


import sys
import os
import requests
import subprocess
import json

sys.path.append('/home/j-j9a404/workspace/AI/UVR/')
from vocalRemover import UVR, flacTowav

# 모델 생성시 준비물과 산출물은 동일한 폴더에서 생성됩니다., 또한 ~를 사용하면 안됩니다. 절대경로 지정할 것
UnCoveredSongDirPath = '/home/j-j9a404/workspace/AI/data_inference/coversong.mp3' # django 서버로부터 받은 원곡 파일을 저장할 경로와 파일명 설정
TargzDirPath = '/home/j-j9a404/workspace/AI/data_inference/production.tar.gz' #django로 부터 받은 목소리 모델 압축파일이 저장될 경로

def makeCoveredSong(id) :
    try:
        print(f"[P2 STATE] : Started makeCoveredSong.               | Covered Song : ({id})")
        #압축해제
        os.chdir('data_inference')
        #subprocess.check_output(f"cd /home/j-j9a404/workspace/AI/data_inference/ && tar -zxf production.tar.gz && rm production.tar.gz", shell=True)
        subprocess.call('tar -xf production.tar.gz', shell=True)
    # subprocess.call('rm production.tar.gz', shell=True)
        os.chdir('..')
        # 커버송 제작을 시키는 명령코드 작성
        # 음성파일이 .mp4 형식이므로 .mp4를 .wav로 변환필요.
        # 음원 분리
        os.chdir('UVR')
        UVR()
        flacTowav()
        os.chdir('..')
        # inference 추출
        os.chdir('user_inference')
        subprocess.call('CUDA_VISIBLE_DEVICES=3 python svc_inference.py', shell=True)
        os.chdir('..')
        # 최종 커버곡
        os.chdir('data_inference')
        subprocess.call('ffmpeg -i coversong_inst_ori.wav -filter:a "volume=0.7" coversong_inst.wav -y', shell=True)
        subprocess.call('ffmpeg -i coversong_inst.wav -i result_voice.wav -filter_complex amerge -c:a libmp3lame -q:a 4 result_coversong.mp3 -y', shell=True)
        os.chdir('..')
        print(f"[P2 STATE] : Finished makeCoveredSong.              | Covered Song : ({id})")
        return postSongDataToDjango(id)
    except Exception as e2:
        print(f"[P2 STATE] : Error! in makeCoveredSong              | Covered Song : ({id})")
        return -2

def postSongDataToDjango(id) :
    try:
        print(f"[P2 STATE] : Started postSongDataToDjango.          | Covered Song : ({id})")
        urls = f'https://j9a404.p.ssafy.io:443/api/cover-song/create/{id}/'      #필요한 인자 : url 도메인, CoverRequestID
        CoveredSongDirPath = '/home/j-j9a404/workspace/AI/data_inference/result_coversong.mp3'  # 커버송이 저장될 경로
        removedMRDirPath = '/home/j-j9a404/workspace/AI/data_inference/result_voice.wav' # MR제거버전이 저장될 경로
        
        NCoveredSongDirPath = f'/home/j-j9a404/workspace/AI/data_inference/{id}.mp3'  # 커버송파일이 변경될 이름
        NremovedMRDirPath = f'/home/j-j9a404/workspace/AI/data_inference/{id}.wav' # MR제거버전파일 변경될 이름
        
        subprocess.check_output(f"mv {CoveredSongDirPath} {NCoveredSongDirPath}", shell=True)  #커버송파일이름 변경
        subprocess.check_output(f"mv {removedMRDirPath} {NremovedMRDirPath}", shell=True)       #MR제거버전파일이름 변경
        
        #resultfiles = {'file' : open('커버송 파일이 저장된 경로','rb')}   #필요한 인자 : 커버송 파일이 저장된 로컬 경로
        resultfiles = {                                                 #-> 파일 여러개 동시에 보내기
            'coverPath': open(NCoveredSongDirPath, 'rb'),
            'voicePath': open(NremovedMRDirPath, 'rb')
        }
        response = requests.post(urls, files = resultfiles)
        #print(response.status_code)    -> 디버깅용
        #print(response.text)           -> 디버깅용
        for file in resultfiles.values():       # 파일 닫아주는 과정
            file.close()

        print(f"[P2 STATE] : Sent Covered Song Files.               | Covered Song : ({id})")
        # remove data_inference production
        os.chdir('data_inference')
        #subprocess('cp result_vocie.wav result_coversong.mp3 coversong_inst.wav coversong_vocal.wav ../tmp/', shell=True)
        subprocess.check_output('rm /home/j-j9a404/workspace/AI/data_inference/*', shell=True)
        os.chdir('..')
        print(f"[P2 STATE] : removed related Files.                 | Covered Song : ({id})")
        print(f"[P2 STATE] : Finished postSongDataToDjango.         | Covered Song : ({id})")
        return id
    except Exception as e3:
        print(f"[P2 STATE] : Error! in postSongDataToDjango         | Covered Song : ({id})")
        return -2

def getMOSDataFromDjango(PCS) :   
    try:                                              
        print(f'[P2 STATE] : Started getMOSDataFromDjango.          | Prev : ({PCS})')
        urlg = f'https://j9a404.p.ssafy.io:443/api/cover-song/remain-in-queue/'            
        response = requests.get(urlg)                           #json형식으로 받아옴
        result = json.loads(response.content.decode())                      #json을 dict형으로 변환필요
                                                                #django서버로부터 고유 id와, 사용자의 목소리 모델파일, 원곡파일을 가져온다.
                                                                
        if result :                                    #result가 null(None)이 아니라면 
                                                                #voiceRawData와 id값 전달받아서 저장시키고 makeVoiceModel(result) 실행 
            if int(result['id']) == PCS:
                print(f"[P2 STATE] : Finishing up this due to same id.      | Prev : ({PVM}), result['id'] : ({result['id']})")
                return PCS
            else :
                print(f"[P2 STATE] : Downloading Model tar File.            | Covered Song : ({result['id']})")
                S3ModelResponse = requests.get(result['voice_model_path'])     #수신한 S3경로로 requests요청을 보내 목소모델을 get
                with open(TargzDirPath, "wb") as file:
                    file.write(S3ModelResponse.content)           #result의 구조는 사전 협의 필요
                file.close()                                          # 파일 닫아주는 과정
                print(f"[P2 STATE] : Downloaded Model tar File.             | Covered Song : ({result['id']})")

                print(f"[P2 STATE] : Downloading Original Song File.        | Covered Song : ({result['id']})")
                S3OriginalSongResponse = requests.get(result['origin_song_path'])     #수신한 S3경로로 requests요청을 보내 원곡파일을 get
                with open(UnCoveredSongDirPath, "wb") as file:
                    file.write(S3OriginalSongResponse.content)           #result의 구조는 사전 협의 필요
                file.close()                                          # 파일 닫아주는 과정
            
                print(f"[P2 STATE] : Downloaded Original Song File.         | Covered Song : ({result['id']})")
                
                return makeCoveredSong(result['id'])                                #id값만 반환

        else : 
            print("[P2 STATE] : There isn't any task left.")
            return PCS 
    except Exception as e1:
        print(f"[P2 STATE] : Error! in getMOSDataFromDjango")
        return -2

# getVoiceDataFromS3(result)함수는 폐기되었습니다.(2023-09-21) 사유 : aws s3 Access Denied: 403 Forbidden 
'''
def getMOSDataFromS3(result) :
    # 아래 4개 항목은 비밀로 할것, 유출되면 안된다.
    AWS_ACCESS_KEY_ID = ''          
    AWS_SECRET_ACCESS_KEY = ''
    AWS_STORAGE_BUCKET_NAME = ''
    region = ''
    #AWS_QUERYSTRING_AUTH = False   //꼭v 필요한건 아님

    s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY,region_name=region)

    # 파일 경로는 앱서버(django)에서 부터 받음. 모든 url이 아닌 서브 디렉토리 부터 받으면 된다. 모든 url을 입력하면 404 에러 발생
    modelSource = "모델 파일의 경로"                  # getDataFromDjango() 에서 받아온 모델 파일의 경로 활용
    originSongSource = "원곡 파일의 경로"             # getDataFromDjango() 에서 받아온 원곡 파일의 경로 활용

    # 저장시킬 위치와 저장할 파일작명. 저장할 디렉토리가 존재해야한다.
    modelfile_path = os.path.join('모델 파일을 저장시킬 디렉토리명','변경할 파일이름')
    originSongfile_path = os.path.join('원곡 파일을 저장시킬 디렉토리명','변경할 파일이름')   

    s3.download_file(AWS_STORAGE_BUCKET_NAME,modelSource,modelfile_path)        #모델파일을 다운받아서 저장
    s3.download_file(AWS_STORAGE_BUCKET_NAME,originSongSource,originSongfile_path)  #원곡파일을 다운받아서 저장
    makeCoveredSong(result)
'''

# 파이썬 스크립트로 리눅스 명령어를 실행해주는 코드
# 1. os
# import os
# os.system() 이용 ex) os.system('ping ' + s + ' -c ' + p)



# 2. subprocess  
# import subprocess
# subprocess.call() 이용 ex) subprocess.call("whoami"), subprocess.call(["touch", "a"])
# -> 출력값을 저장해주진 않음
# 
# subprocess.check_output() 이용  
# ex) subprocess.check_output(["cat", "README.md"]), subprocess.check_output("cat README.md", shell=True) shell=True면 명령어 한번에 입력가능
# -> 출력값 변수에 저장 가능 
# ex) value =  subprocess.check_output(["cat", "README.md"])

# ! subprocess가 os.system을 대체하고 있으므로 subprocess 사용을 권장

