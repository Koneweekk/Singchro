#pip install requests
#pip install subprocess
'''

Python code for getting sovits5.0 to train Voice Model using user's Voice

writer : PANZER
Date : 2023-09-14 
'''

# import boto3   boto3는 더이상 쓰이지 않습니다.
import os
import requests
import json
import subprocess

import slicer2
import shutil

# 모델 생성시 준비물과 산출물은 동일한 폴더에서 생성됩니다., 또한 ~를 사용하면 안됩니다. 절대경로 지정할 것
VoiceDirPath = '/home/j-j9a404/workspace/AI/data_train/record.mp4' # django 서버로부터 받은 목소리 파일을 저장할 경로와 파일명 설정
ModelDirPath = '/home/j-j9a404/workspace/AI/data_train/model.pth'  # 목소리가 학습된 모델이 저장될 경로
NumpyDirPath = '/home/j-j9a404/workspace/AI/data_train/singer.spk.npy' # spk.npy가 저장될 경로

os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]="2"

def makeVoiceModel(id) :
    try: 
        print(f"[P1 STATE] : Started makeVoiceModel.                | Voice Model : ({id})")
        # 음성파일이 .mp4 형식이므로 .mp4를 .wav로 변환필요. 밑에 음성 .mp4파일 제거코드는 추가해놨음.
        # 모델 제작을 시키는 명령코드 작성
        # record.mp4 -> record.wav
        if os.path.exists('data_train/record.wav'):
            os.remove('data_train/record.wav')
        subprocess.call("ffmpeg -i data_train/record.mp4 data_train/record.wav", shell= True)
        # copy so-vits-svc-5.0 folder
        if os.path.exists('user_train'):
            shutil.rmtree('user_train')
        shutil.copytree('so-vits-svc-5.0', 'user_train', dirs_exist_ok=True)
        # slice record file (min 3s)
        slicer2.sliceRecord()

        # train model
        from user_train.svc_preprocessing import preprocessVoice
        from user_train.svc_trainer import trainModel
        from user_train.svc_export import exportModel
        os.chdir('user_train')
        preprocessVoice()
        trainModel()
        exportModel()
        os.chdir('..')
        shutil.copyfile('user_train/sovits5.0.pth', 'data_train/model.pth')
        shutil.copyfile('user_train/data_svc/singer/singer.spk.npy', 'data_train/singer.spk.npy')
        shutil.rmtree('user_train')

        copyResultFiles() # DEBUG
        print(f"[P1 STATE] : Finished makeVoiceModel.               | Voice Model : ({id})")
        return postModelDataToDjango(id)
    except Exception as e2:
        print(f"[P1 STATE] : Error! in makeVoiceModel               | Voice Model : ({id})")
        return -2

def copyResultFiles():
    shutil.copy('data_train/model.pth', 'tmp/model.pth')
    shutil.copy('data_train/singer.spk.npy', 'tmp/singer.spk.npy')
    shutil.copy('data_train/record.wav', 'tmp/record.wav')

def postModelDataToDjango(id) :
    try:
        print(f"[P1 STATE] : Started postModelDataToDjango.         | Voice Model : ({id})")
        # result에 담겨있는 model ID 이용
        urls = f'https://j9a404.p.ssafy.io:443/api/model/create/{id}/'      #필요한 인자 : url 도메인, CoverRequestID
        TargzDirPath = f'/home/j-j9a404/workspace/AI/data_train/{id}.tar.gz' #django로 보낼 압축파일이 저장될 경로
        
        #모델,npy를 tar로 archiving후,  {id}.tar.gz로 압축
        subprocess.check_output(f"cd /home/j-j9a404/workspace/AI/data_train/ && tar -zcf {id}.tar.gz model.pth singer.spk.npy", shell=True)
        resultfiles = {'modelPath' : open(TargzDirPath,'rb')}   #필요한 인자 : 산출물 압축 파일이 저장된 로컬 경로

        response = requests.post(urls, files = resultfiles)
        #print(response.status_code)    -> 디버깅용
        #print(response.text)           -> 디버깅용
        for file in resultfiles.values():       # 파일 닫아주는 과정
            file.close()

        print(f"[P1 STATE] : Sent Voice Model Files.                | Voice Model : ({id})")
        # Clear data_train folder
        os.remove('data_train/model.pth') 
        os.remove('data_train/singer.spk.npy')
        os.remove('data_train/record.wav')
        os.remove('data_train/record.mp4')      #s3에서 받은 record.mp4도 삭제
        os.remove(f'data_train/{id}.tar.gz')
        print(f"[P1 STATE] : removed related Files.                 | Voice Model : ({id})")
        print(f"[P1 STATE] : Finished postModelDataToDjango.        | Voice Model : ({id})")
        return id
    except Exception as e3:
        print(f"[P1 STATE] : Error! in postModelDataToDjango        | Voice Model : ({id})")
        return -2

def getVoiceDataFromDjango(PVM) :        
    try :                                
    
        os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
        os.environ["CUDA_VISIBLE_DEVICES"]="2"
        print(f'[P1 STATE] : Started getVoiceDataFromDjango.        | Prev : ({PVM})')
        urlg = f'https://j9a404.p.ssafy.io:443/api/model/remain-in-queue/'             
        response = requests.get(urlg)                           #json형식으로 받아옴
        result = json.loads(response.content.decode())                      #json을 dict형으로 변환필요
                                                                #django서버로부터 고유 id와, 사용자의 목소리 음성파일을 가져온다.
                                                                
        if result :                                    #result가 null(None)이 아니라면 
            if int(result['id']) == PVM:
                print(f"[P1 STATE] : Finishing up this due to same id.      | Prev : ({PVM}), result['id'] : ({result['id']})")
                return PVM
            else :
                print(f"[P1 STATE] : Downloading Voice File.                | Voice Model : ({result['id']})")
                S3response = requests.get(result['voice_path'])     #수신한 S3경로로 requests요청을 보내 목소리파일을 get
                        

                with open(VoiceDirPath, "wb") as file:                  #수신한 목소리파일을 저장
                    file.write(S3response.content)

                file.close()                                          # 파일 닫아주는 과정
                print(f"[P1 STATE] : Downloaded it.                         | Voice Model : ({result['id']})")
                
                return makeVoiceModel(result['id'])                                #id값만 반환
        else : 
            print("[P1 STATE] : There isn't any task left.")
            return PVM                                            #null(None)이면 일이 없다는 뜻이므로 -1을 반환
    except Exception as e1:
        print(f"[P1 STATE] : Error! in getVoiceDataFromDjango")
        return -2
# getVoiceDataFromS3(result)함수는 폐기되었습니다.(2023-09-21) 사유 : aws s3 Access Denied: 403 Forbidden 
'''
def getVoiceDataFromS3(result) :
    아래 4개 항목은 비밀로 할것, 유출되면 안된다.
    AWS_ACCESS_KEY_ID = ''          
    AWS_SECRET_ACCESS_KEY = ''
    AWS_STORAGE_BUCKET_NAME = ''
    region = ''
    AWS_QUERYSTRING_AUTH = False   //꼭 필요한건 아님

    s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY,region_name=region)

    파일 경로는 앱서버(django)에서 부터 받음. 모든 url이 아닌 서브 디렉토리 부터 받으면 된다. 모든 url을 입력하면 404 에러 발생
    VoiceSource = "목소리 파일의 경로"                  # getVoiceDataFromDjango() 에서 받아온 모델 파일의 경로 활용

    저장시킬 위치와 저장할 파일작명. 저장할 디렉토리가 존재해야한다.
    voicefile_path = os.path.join('저장시킬 디렉토리명','변경할 파일이름')
 

    s3.download_file(AWS_STORAGE_BUCKET_NAME,VoiceSource,voicefile_path)        #목소리파일을 다운받아서 저장
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

