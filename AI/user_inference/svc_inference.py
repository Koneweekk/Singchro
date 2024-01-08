import sys,os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import torch
import argparse
import subprocess
import numpy as np

from omegaconf import OmegaConf
from scipy.io.wavfile import write
from vits.models import SynthesizerInfer
from pitch import load_csv_pitch


def load_svc_model(checkpoint_path, model):
    assert os.path.isfile(checkpoint_path)
    checkpoint_dict = torch.load(checkpoint_path, map_location="cpu")
    saved_state_dict = checkpoint_dict["model_g"]
    state_dict = model.state_dict()
    new_state_dict = {}
    for k, v in state_dict.items():
        try:
            new_state_dict[k] = saved_state_dict[k]
        except:
            print("%s is not in the checkpoint" % k)
            new_state_dict[k] = v
    model.load_state_dict(new_state_dict)
    return model


def svc_infer(model, spk, pit, ppg, vec, hp, device):
    len_pit = pit.size()[0]
    len_vec = vec.size()[0]
    len_ppg = ppg.size()[0]
    len_min = min(len_pit, len_vec)
    len_min = min(len_min, len_ppg)
    pit = pit[:len_min]
    vec = vec[:len_min, :]
    ppg = ppg[:len_min, :]

    with torch.no_grad():
        spk = spk.unsqueeze(0).to(device)
        source = pit.unsqueeze(0).to(device)
        source = model.pitch2source(source)
        pitwav = model.source2wav(source)
        write("svc_out_pit.wav", hp.data.sampling_rate, pitwav)

        hop_size = hp.data.hop_length
        all_frame = len_min
        hop_frame = 10
        out_chunk = 2500  # 25 S
        out_index = 0
        out_audio = []

        while (out_index < all_frame):

            if (out_index == 0):  # start frame
                cut_s = 0
                cut_s_out = 0
            else:
                cut_s = out_index - hop_frame
                cut_s_out = hop_frame * hop_size

            if (out_index + out_chunk + hop_frame > all_frame):  # end frame
                cut_e = all_frame
                cut_e_out = -1
            else:
                cut_e = out_index + out_chunk + hop_frame
                cut_e_out = -1 * hop_frame * hop_size

            sub_ppg = ppg[cut_s:cut_e, :].unsqueeze(0).to(device)
            sub_vec = vec[cut_s:cut_e, :].unsqueeze(0).to(device)
            sub_pit = pit[cut_s:cut_e].unsqueeze(0).to(device)
            sub_len = torch.LongTensor([cut_e - cut_s]).to(device)
            sub_har = source[:, :, cut_s *
                             hop_size:cut_e * hop_size].to(device)
            sub_out = model.inference(
                sub_ppg, sub_vec, sub_pit, spk, sub_len, sub_har)
            sub_out = sub_out[0, 0].data.cpu().detach().numpy()

            sub_out = sub_out[cut_s_out:cut_e_out]
            out_audio.extend(sub_out)
            out_index = out_index + out_chunk

        out_audio = np.asarray(out_audio)
    return out_audio

def generate_data(wave_file, ppg_file, vec_file, pit_file):
    # Auto run whisper/inference.py to generate ppg
    if not os.path.isfile(ppg_file):
        print(f"Auto run: python whisper/inference.py -w {wave_file} -p {ppg_file}")
        os.system(f"python whisper/inference.py -w {wave_file} -p {ppg_file}")

    # Auto run hubert/inference.py to generate vec
    if not os.path.isfile(vec_file):
        print(f"Auto run: python hubert/inference.py -w {wave_file} -v {vec_file}")
        os.system(f"python hubert/inference.py -w {wave_file} -v {vec_file}")

    # Auto run pitch/inference.py to generate pit
    if not os.path.isfile(pit_file):
        print(f"Auto run: python pitch/inference.py -w {wave_file} -p {pit_file}")
        os.system(f"python pitch/inference.py -w {wave_file} -p {pit_file}")

def main():
    # file paths
    config_file = "../so-vits-svc-5.0/configs/base.yaml"
    model_file = "../data_inference/model.pth"
    wave_file = "../data_inference/coversong_vocal.wav"
    spk_file = "../data_inference/singer.spk.npy"
    
    ppg_file = "./svc_tmp.ppg.npy"
    vec_file = "./svc_tmp.vec.npy"
    pit_file = "./svc_tmp.pit.csv"
    shift_value = 0  

    generate_data(wave_file, ppg_file, vec_file, pit_file)

    # Load configuration
    hp = OmegaConf.load(config_file)

    # Load model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = SynthesizerInfer(
        hp.data.filter_length // 2 + 1,
        hp.data.segment_size // hp.data.hop_length,
        hp)
    load_svc_model(model_file, model)
    model.eval()
    model.to(device)

    # Load data
    spk = np.load(spk_file)
    spk = torch.FloatTensor(spk)

    ppg = np.load(ppg_file)
    ppg = np.repeat(ppg, 2, 0)
    ppg = torch.FloatTensor(ppg)

    vec = np.load(vec_file)
    vec = np.repeat(vec, 2, 0)
    vec = torch.FloatTensor(vec)

    pit = load_csv_pitch(pit_file)
    
    # Apply pitch shift if needed
    if shift_value != 0:
        pit = np.array(pit)
        source = pit[pit > 0]
        source_ave = source.mean()
        source_min = source.min()
        source_max = source.max()
        print(f"source pitch statics: mean={source_ave:0.1f}, min={source_min:0.1f}, max={source_max:0.1f}")
        shift = 2 ** (shift_value / 12)
        pit = pit * shift
    pit = torch.FloatTensor(pit)

    # Run inference
    out_audio = svc_infer(model, spk, pit, ppg, vec, hp, device)

    # Save the output audio
    write("../data_inference/result_voice.wav", hp.data.sampling_rate, out_audio)
    subprocess.call("rm svc_tmp.*", shell=True)
if __name__ == '__main__':
    main()

