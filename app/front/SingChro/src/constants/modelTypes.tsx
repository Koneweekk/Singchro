// user 모델 props
export interface User {
  id:number;
  email: string;
  password: string;
  nickname: string;
  imgPath: string|null;
  alarmToken: string;
}

// VoiceModel 모델 props 
export interface VoiceModel {
  id: number;
  userId: number;
  voicePath: string;
  modelPath: string;
  createdAt: Date;
  activated: boolean;
}

// OriginalSong 모델 props
export interface OriginalSong {
  id: number;
  userId: number;
  title: string;
  path: string | null;
  metaData?: string;
}

// CoverSong 모델 props
export interface CoverSong {
  id: number;
  voiceId: number;
  originalId: number;
  voicePath: string | null;
  coverPath: string | null;
  createdAt: Date
}

// CoverRequest 모델 props
export interface CoverRequest {
  id: number;
  requestUser: number;
  useModel: number;
  originalSongId: number;
  message: string | null;
  isChecked: boolean;
  isAccepted: boolean;
  createdAt: Date
}

// SongLike 모델 props
export interface SongLike {
  id: number;
  userId: number;
  CoverSongId: number;
}
