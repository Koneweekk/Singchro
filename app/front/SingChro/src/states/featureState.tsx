import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";
import { Song, Alarm, CoverTotal, GetRequest } from "@constants/featureTypes";
import { VoiceModel } from "@constants/modelTypes";

// 1. 보이스 모델과 커버송 제작
// 1-1. 보이스 모델 제작에 들어갈 녹음 파일
export const recordState = atom({
  key: "record",
  default: ""
})
// 1-2. 커버송 제작에 들어갈 보이스 모델
export const chooseVoiceState = atom<VoiceModel>({
  key: "chooseModel",
  default: {
    id: 0,
    userId: 0,
    voicePath: "",
    modelPath: "",
    createdAt: new Date(),
    activated: false,
  }
})
// 1-3.커버송 제작에 들어갈 노래
export const chooseSongState =  atom<Song>({
  key: "chooseSong",
  default: {
    id: 0,
    title: "", 
    path: "",
  }
})

// 2. 플레이리스트
// 2-1. 현재 플레이리스트 인덱스
export const playPositionState = atom<number>({
  key: "playPosition",
  default: 0
})
// 2-2. 플레이리스트 배열
export const playListState = atom<Array<CoverTotal>>({
  key: "playList",
  default: []
})
// 2-3. 이전곡 재생중 여부
export const playingState = atom<boolean>({
  key: "playing",
  default: false
})

// 3. 타유저에게 커버 요청
// 3-1. 커버 요청할 유저의 유저 아이디
export const voiceOwnerState = atom<number>({
  key: "voiceOwner",
  default: 0,
}) 
// 3-2. 타인에게 커버인지 판단
export const isVoiceOwnerState = selector({
  key: "isVoiceOwner",
  get: async ({get}) => {
    const userId = await AsyncStorage.getItem("id") || "";
    const voiceOwner = get(voiceOwnerState);
    return (parseInt(userId) === voiceOwner)
  }
});

// 4. 알람 관련 기능
// 4-1. 현재 기록된 알람
export const alarmsState = atom<Array<Alarm>>({
  key: "alarms",
  default: []
})
// 4-2. 알람 개수
export const alarmCntState = selector({
  key: "alarmsCnt",
  get: async({get}) => {
    const alarms = get(alarmsState);
    return alarms.length
  }
})

// 5. 커버요청 관련 기능
// 5-1. 이때까지 받은 커버요청
export const requestsState = atom<Array<GetRequest>>({
  key: "requests",
  default: []
})
// 5-2. 커버요청 개수
export const requestCntState = selector({
  key: "requestCnt",
  get: async({get}) => {
    const requests = get(requestsState);
    return requests.length
  }
})