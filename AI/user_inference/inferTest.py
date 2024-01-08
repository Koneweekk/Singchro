import os
import sys
import subprocess

sys.path.append('/home/j-j9a404/workspace/AI/UVR/')
from vocalRemover import UVR, flacTowav

if __name__ == '__main__':
    os.chdir('UVR')
    UVR()
    flacTowav()
    os.chdir('..')
    os.chdir('user_inference')
    subprocess.call('CUDA_VISIBLE_DEVICES=3 python svc_inference.py', shell=True)
    os.chdir('..')
    os.chdir('data_inference')
    subprocess.call('ffmpeg -i coversong_inst.wav -i result_voice.wav -filter_complex amerge -c:a libmp3lame -q:a 4 result_coversong.mp3 -y', shell=True)
    os.chdir('..')
