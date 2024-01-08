// 모듈 import
import axios from "axios";
import testApi from "@functions/test";
// 함수 import
import { loadToken, resetToken } from "./authFunc";
// props import
import { User, VoiceModel, CoverSong, CoverRequest } from "@constants/modelTypes";
import { Song, PwCheck, PostRequest } from "@constants/featureTypes";

// 관련변수
const url = "https://j9a404.p.ssafy.io/api/"
const serverUrl = ""

// 1-1. 회원 기능 관련 api 함수(토큰 필요 x)
export const axiosAuth = async (api:string, method:string, data?:Partial<User>) => {
  try {
    const response = await axios({
      method: method,
      url: `${url}user${api}`,
      data: data,
    });
     // 비동기 처리 결과를 반환
    return response.data;
    // 에러가 발생한 경우, 이를 외부로 던져서 처리
  } catch (error) {
    throw error; 
  }
};

// 1-2. 회원 기능 관련 api 함수(토큰 필요)
export const axiosAuthed = async (api:string, method:string, data?:Partial<User>|PwCheck) => {
  try {
    // 토큰 불러오기
    const token = await loadToken();
    if (token === null) {
      await resetToken();
      return;
    }
    // 토큰에 문제없으면 axios 실행
    const response = await axios({
      method: method,
      url: `${url}user${api}`,
      data: data,
      headers: {
        Authorization: `Token ${token}`
      }
    });
     // 비동기 처리 결과를 반환
    return response.data;
  // 에러가 발생한 경우, 이를 외부로 던져서 처리
  } catch (error) {
    throw error; 
  }
};

// 2. 모델 기능 관련 api 함수 (토큰 필요)
export const axiosVoice = async (api:string, method:string, data?:FormData) => {
  try {
    // 토큰 불러오기
    const token = await loadToken();
    if (token === null) {
      await resetToken();
      return;
    }
    // 토큰에 문제없으면 axios 실행
    const response = await axios({
      method: method,
      url: `${url}voice${api}`,
      data: data,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    // 비동기 처리 결과를 반환
    return response.data;
  // 에러가 발생한 경우, 이를 외부로 던져서 처리
  } catch (error) {
    throw error; 
  }
};

// 3. 원곡 기능 관련 api 함수 (토큰 필요)
export const axiosOriginal = async (api:string, method:string, data?:FormData) => {
  try {
    // 토큰 불러오기
    const token = await loadToken();
    if (token === null) {
      await resetToken();
      return;
    }
    // 토큰에 문제없으면 axios 실행
    const response = await axios({
      method: method,
      url: `${url}original${api}`,
      data: data,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    // 비동기 처리 결과를 반환
    return response.data;
  // 에러가 발생한 경우, 이를 외부로 던져서 처리
  } catch (error) {
    throw error; 
  }
};

// 4. 커버송 기능 관련 api 함수 (토큰 필요)
export const axiosCover = async (api:string, method:string, data?:Partial<CoverSong>|{title:string}) => {
  try {
    // 토큰 불러오기
    const token = await loadToken();
    if (token === null) {
      await resetToken();
      return;
    }
    // 토큰에 문제없으면 axios 실행
    const response = await axios({
      method: method,
      url: `${url}cover${api}`,
      data: data,
      headers: {
        Authorization: `Token ${token}`,
      }
    });
    // 비동기 처리 결과를 반환
    return response.data;
  // 에러가 발생한 경우, 이를 외부로 던져서 처리
  } catch (error) {
    throw error; 
  }
};

// 5. 커버 요청 기능 관련 api(토큰 필요)
export const axiosRequest = async (api:string, method:string, data?:Partial<CoverRequest>|PostRequest) => {
  try {
    // 토큰 불러오기
    const token = await loadToken();
    if (token === null) {
      await resetToken();
      return;
    }
    // 토큰에 문제없으면 axios 실행
    const response = await axios({
      method: method,
      url: `${url}request${api}`,
      data: data,
      headers: {
        Authorization: `Token ${token}`,
      }
    });
     // 비동기 처리 결과를 반환
    return response.data;
  // 에러가 발생한 경우, 이를 외부로 던져서 처리
  } catch (error) {
    throw error; 
  }
};

// 6. 좋아요 기능 관련 api(토큰 필요)
export const axiosLike = async (api:string, method:string) => {
  try {
    // 토큰 불러오기
    const token = await loadToken();
    if (token === null) {
      await resetToken();
      return;
    }
    // 토큰에 문제없으면 axios 실행
    const response = await axios({
      method: method,
      url: `${url}like${api}`,
      headers: {
        Authorization: `Token ${token}`,
      }
    });
    // 비동기 처리 결과를 반환
    return response.data;
  // 에러가 발생한 경우, 이를 외부로 던져서 처리
  } catch (error) {
    throw error; 
  }
};