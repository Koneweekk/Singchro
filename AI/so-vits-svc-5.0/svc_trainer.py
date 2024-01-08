import sys,os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import argparse
import torch
import torch.multiprocessing as mp
from omegaconf import OmegaConf

from vits_extend.train import train

torch.backends.cudnn.benchmark = True

CONFIG_FILE = 'configs/base.yaml'
#CONFIG_FILE = 'configs/test.yaml' #DEBUG

def trainModel():
    hp = OmegaConf.load(CONFIG_FILE)
    with open(CONFIG_FILE, 'r') as f:
        hp_str = ''.join(f.readlines())

    assert hp.data.hop_length == 320, \
        'hp.data.hop_length must be equal to 320, got %d' % hp.data.hop_length

    torch.manual_seed(hp.train.seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed(hp.train.seed)
        num_gpus = torch.cuda.device_count()
        #print('Batch size per GPU :', hp.train.batch_size)

        if num_gpus > 1:
            mp.spawn(train, nprocs=num_gpus,
                     args=(num_gpus, None, hp, hp_str))
        else:
            train(0, num_gpus, None, hp, hp_str)
    else:
        print('No GPU found!')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--config', type=str, required=True,
                        help="yaml file for configuration")
    parser.add_argument('-p', '--checkpoint_path', type=str, default=None,
                        help="path of checkpoint pt file to resume training")
    parser.add_argument('-n', '--name', type=str, required=True,
                        help="name of the model for logging, saving checkpoint")
    args = parser.parse_args()

    hp = OmegaConf.load(args.config)
    with open(args.config, 'r') as f:
        hp_str = ''.join(f.readlines())

    assert hp.data.hop_length == 320, \
        'hp.data.hop_length must be equal to 320, got %d' % hp.data.hop_length

    args.num_gpus = 0
    torch.manual_seed(hp.train.seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed(hp.train.seed)
        #args.num_gpus = torch.cuda.device_count()
        args.num_gpus = 1
        os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
        os.environ["CUDA_VISIBLE_DEVICES"]="2"
        print('Batch size per GPU :', hp.train.batch_size)

        if args.num_gpus > 1:
            mp.spawn(train, nprocs=args.num_gpus,
                     args=(args, args.checkpoint_path, hp, hp_str,))
        else:
            train(0, args, args.checkpoint_path, hp, hp_str)
