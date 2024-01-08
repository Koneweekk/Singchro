'''
No need any Library!
Python code for communication between Jupyter and django, taking care of request from django using multiprocess

writer : PANZER
Date : 2023-09-12 
'''

import time                                             #시간 측정, sleep에 사용
import os
import multiprocessing                                  
import subprocess
from handleVoiceModel import getVoiceDataFromDjango, makeVoiceModel, postModelDataToDjango
from handleCoveredSong import getMOSDataFromDjango, makeCoveredSong, postSongDataToDjango

def work1(MVM):                                         #-> 목소리 모델 학습을 지시할 함수
    # sum = 0
    # for i in range(5):
    #     sum += i
    #     print("p1 : %d" %sum)
    #     time.sleep(3)
    # print("work1 is completed! sum : {0}", format(sum))
#    id = getVoiceDataFromDjango()
#    if id != -1:
    makeVoiceModel()
#        postModelDataToDjango(id)
    MVM.value = 0
    
def work2(MCS):                                         #-> 커버송 생성을 지시할 함수
    # sum = 0
    # for i in range(5,10):
    #     sum+=i
    #     print("p2 : %d" %sum)
    #     time.sleep(5)
    # print("work2 is completed! sum : {0}", format(sum))
#    id = getMOSDataFromDjango()
#    if id != -1:
    makeCoveredSong()
#        postSongDataToDjango(id)
#        os.chdir('data_inference')
#        subprocess('cp result_vocie.wav result_coversong.mp3 coversong_inst.wav coversong_vocal.wav ../tmp/', shell=True)
#        subprocess('rm *.wav *.mp3', shell=True)
#        os.chdir('..')
    MCS.value = 0
    

if __name__ == '__main__':          # 제일 처음 시작하는 부분

 
    MakingVoiceModel = multiprocessing.Value('i', 0)    # shared memory, 프로세스간 변수 공유목적
    MakingCoveredSong = multiprocessing.Value('i', 0)   # shared memory, 프로세스간 변수 공유목적
   # start = time.time()    시간 측정용 
    while(True) :
        if MakingVoiceModel.value == 0 :                # MakingVoiceModel.value == 0 -> 목소리 학습이 진행중이지 않다면
            MakingVoiceModel.value = 1                  # MakingVoiceModel.value = 1  -> 목소리 학습 착수
            p1 = multiprocessing.Process(target=work1, args=(MakingVoiceModel,))    # work1 실행, MakingVoiceModel을 공유
            p1.start()
            print("p1 start!")
        else : print("p1 is working already.")          # 이미 목소리 모델 제작중이면 그냥 넘어감
        if MakingCoveredSong.value == 0 :               # MakingCoveredSong.value == 0 -> 커버송 제작이 진행중이지 않다면
            MakingCoveredSong.value = 1                 # MakingCoveredSong.value = 1  -> 커버송 제작 착수
            p2 = multiprocessing.Process(target=work2, args=(MakingCoveredSong,))   # work2 실행, MakingCoveredSong을 공유
            p2.start()
            print("p2 start!")
        else : print("p2 is working already.")          # 이미 커버송 제작중이면 그냥 넘어감
        time.sleep(5)                                   # 5초 마다 반복하여 확인
            
            
    #end = time.time()      시간 측정용
