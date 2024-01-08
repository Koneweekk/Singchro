import { atom } from "recoil";
import { CoverTotal } from "@constants/featureTypes";
import { User } from "@constants/modelTypes";

// 1. 유저 정보
export const userState = atom<User>({
  key: "authState",
  default: {email:"", nickname:"", password:"", id:0, alarmToken:"", imgPath:""}
});

// 2. 커버송 정보
export const myCoversState = atom<Array<CoverTotal>>({
  key: "myCovers",
  default: []
});
export const likeCoversState = atom<Array<CoverTotal>>({
  key: "likeCovers",
  default: []
});
export const otherCoversState = atom<Array<CoverTotal>>({
  key: "otherCovers",
  default: []
});


