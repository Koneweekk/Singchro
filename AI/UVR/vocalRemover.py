import soundfile as sf
import librosa
import os
import subprocess
from pydub import AudioSegment
from audio_separator import Separator

def UVR():
    subprocess.call('ffmpeg -i ../data_inference/coversong.mp3 ../data_inference/coversong.wav -y', shell=True)
    subprocess.call('rm ../data_inference/coversong.mp3', shell=True)
    
   # print("mp3 to wav done")
    # Initialize the Separator with the audio file and model name(MDX_NET_MAIN)
    separator = Separator('../data_inference/coversong.wav', model_name='UVR_MDXNET_MAIN')
    
    # Perform the separation
    primary_stem_path, secondary_stem_path = separator.separate()
    
    #print("done UVR")
    #print(f'Primary stem saved at {primary_stem_path}')
    #print(f'Secondary stem saved at {secondary_stem_path}')

def flacTowav():
    subprocess.call("mv coversong_\(Vocals\)_UVR_MDXNET_MAIN.wav ./coversong_vocal.flac", shell=True)
    subprocess.call("mv coversong_\(Instrumental\)_UVR_MDXNET_MAIN.wav ./coversong_inst.flac", shell=True)

    # save dir
    save_dir = '../data_inference/'
    # read file
    w_flac = './coversong_vocal.flac'
    m_flac = './coversong_inst.flac'
    # get dir, file name for saving
    _, w_id = os.path.split(w_flac)
    _, m_id = os.path.split(m_flac)

    # change name xxx.flac -> xxx
    w_id = w_id[:-5]
    m_id = m_id[:-5]

    # data, sampling rate divide
    w_data, w_sr = sf.read(w_flac)
    m_data, m_sr = sf.read(m_flac)

    # file write for wav
    sf.write(save_dir + w_id + '.wav', w_data, w_sr, format='WAV', endian='LITTLE', subtype='PCM_16')
    sf.write(save_dir + m_id + '_ori.wav', m_data, m_sr, format='WAV', endian='LITTLE', subtype='PCM_16')

    subprocess.call("rm coversong_vocal.flac", shell=True)
    subprocess.call("rm coversong_inst.flac", shell=True)
    #print("flac to wav done")
