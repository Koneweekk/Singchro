import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User, CoverSong, VoiceModel, OriginalSong, CoverRequest } from './modelTypes';

// user 모델 props
// 1. 유저 관련
export interface PwCheck {
  new_password1: string;
   new_password2: string; 
   old_password: string;
}

// 2. 원곡 관련
export interface Song {
  id: number
  title: string,
  path: string | null,
}

// 3. 커버송 관련
export interface CoverTotal extends CoverSong{
  user: Partial<User>;
  voice:Partial<VoiceModel>;
  original: Partial<OriginalSong>;
}

// 4. 커버요청 관련
export interface GetRequest extends CoverRequest{
  user: Partial<User>;
  original: Partial<OriginalSong>;
}
export interface PostRequest {
  userId: number,
  originalId: number,
  voiceId: number
}

// 5. 알람 관련
export interface Alarm {
  title: string,
  body: string
}

// 네비게이션 props
export type RootStackParamList = {
  Start: undefined,
  // 회원관련 화면
  Login: undefined,
  Signup: undefined,
  EmailVerify: Partial<User>,
  // 홈 화면
  Home: undefined,
  OtherHome: {user: {id: number, nickname: string}},
  // 마이페이지
  Profile: undefined,
  // 음악 재생 화면
  MusicPlayer: { coverTotal: CoverTotal },
  // 검색 화면
  SearchCover: undefined,
  // 녹음 화면
  RecordStart: undefined,
  RecordDoing: undefined,
  RecordDone: undefined,
  RecordRequest: { waiting: number },
  // 커버송 화면
  VoicePick: undefined,
  SongPick: undefined,
  CoverConfirm: undefined,
  CoverDone: { waiting: number | null }
};
export type NavigationProps<RouteName extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, RouteName>;


