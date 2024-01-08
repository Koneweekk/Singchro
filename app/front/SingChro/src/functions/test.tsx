import axios from 'axios';
import MockAdapter  from 'axios-mock-adapter'
import { User, VoiceModel, OriginalSong, CoverSong, SongLike } from '@constants/modelTypes';
import { CoverTotal, GetRequest } from '@constants/featureTypes';

const testApi = axios.create();
const mock = new MockAdapter(testApi);

// 1. 회원 기능 테스트
const users:Array<User> = [
  {
    id: 1,
    email: "test1234@naver.com",
    password:"1234asdf",
    nickname: "테스트계정",
    alarmToken: "erCDnfM6TASU4LG4qzAHI-:APA91bHe7jY7XneGK4m0KMUawXoqTRV_ocxFMwgxR9I7qUueIq0v9c5hVCXDMbG45MnNzd7tMfHQkjD3OFRtQPsvQl7uEeR0ZABpsuHcx8ax31ha-suqcghKgZPTPqwWhHv0FbhCRg7w"
  },
  {
    id: 2,
    email: "rlagkswn73@naver.com", 
    password:"1234asdf", 
    nickname: "한주",
    alarmToken: "erCDnfM6TASU4LG4qzAHI-:APA91bHe7jY7XneGK4m0KMUawXoqTRV_ocxFMwgxR9I7qUueIq0v9c5hVCXDMbG45MnNzd7tMfHQkjD3OFRtQPsvQl7uEeR0ZABpsuHcx8ax31ha-suqcghKgZPTPqwWhHv0FbhCRg7w"
  }
]
// 1-1. 이메일 중복
// mock.onPost("user/email-check").reply((config) => {
//   const requestData = JSON.parse(config.data);
//   const { email } = requestData;
//   const result = users.some((user) => user.email === email);
//   if (result) {
//     return [200, { result: false }];
//   } else {
//     return [200, { result: true }];
//   }
// });
// 1-2. 닉네임 중복
mock.onPost("user/nickname-check").reply((config) => {
  const requestData = JSON.parse(config.data);
  const { nickname } = requestData;
  const result = users.some((user) => user.nickname === nickname);
  if (result) {
    return [200, { result: false }];
  } else {
    return [200, { result: true }];
  }
});
// 1-3. 이메일 인증번호 요청
mock.onPost("user/email-verify").reply((config) => {
  const requestData = JSON.parse(config.data);
  return [200, { code: "1234" }]
});
// 1-4. 회원 가입
mock.onPost("user").reply((config) => {
  const requestData = JSON.parse(config.data);
  return [200, { id: 2, token: "23oign023t234p9o5lkrawgn09" }]
});
// 1-5. 로그인
mock.onPost("user/login").reply((config) => {
  const requestData = JSON.parse(config.data);
  const { email, password } = requestData;
  const userData = users.find((user) => user.email === email);
  if (password === userData?.password) {
    return [200, { id: userData?.id, token: "23oign023t234p9o5lkrawgn09" }]
  } else {
    throw Error
  }
});
// 1-6. 로그아웃
mock.onPost("user/logout").reply((config) => {
  return [200, {}]
});
// // 1-7. 회원 정보 로드
// mock.onGet(/^user\/\d+$/).reply((config) => {
//   const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
//   const userData = users.find((user) => user.id === parseInt(userId, 10)); // ID와 일치하는 사용자 데이터를 찾습니다
//   if (userData) {
//     return [200, userData];
//   } else {
//     return [404, { error: 'User not found' }];
//   }
// });
// 1-8. 회원 탈퇴
mock.onDelete(/^user\/\d+$/).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { password } = requestData;
  const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const userData = users.find((user) => user.id === parseInt(userId, 10)); // ID와 일치하는 사용자 데이터를 찾습니다
  if (userData?.password === password) {
    return [200, { success: "success" }];
  } else {
    throw Error
  }
})
// 1-9. 비밀번호 변경
mock.onPut(/^user\/\d+\/password$/).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { new_password1, new_password2, old_password } = requestData;
  const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const userData = users.find((user) => user.id === parseInt(userId, 10)); // ID와 일치하는 사용자 데이터를 찾습니다
  if (userData?.password === old_password) {
    return [200, { success: "success" }];
  } else {
    throw Error
  }
})
// 1-10. 닉네임 변경
mock.onPut(/^user\/\d+\/nickname$/).reply((config) => {
  const requestData = JSON.parse(config.data);
  const { nickname, password } = requestData;
  const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const userData = users.find((user) => user.id === parseInt(userId, 10)); // ID와 일치하는 사용자 데이터를 찾습니다
  if (userData?.password === password) {
    return [200, { success: "success" }];
  } else {
    throw Error
  }
})


// 2. 보이스 모델 테스트
const voiceModels:Array<VoiceModel> = [
  {
    id: 1,
    userId: 1,
    voicePath: "",
    modelPath: "",
    createdAt: new Date("2023-09-08"),
    activated: true
  },
  {
    id: 2,
    userId: 1,
    voicePath: "",
    modelPath: "",
    createdAt: new Date("2023-09-08"),
    activated: false
  },
  {
    id: 3,
    userId: 2,
    voicePath: "",
    modelPath: "",
    createdAt: new Date("2023-09-08"),
    activated: true
  },
]
// 2-1. 녹음 요청
mock.onPost("voice").reply((config) => {
  return [200, { id: 2, waiting:6 }];
});
// 2-2. 유저별 보이스 모델 로드
mock.onGet(/^voice\/user\/\d+$/).reply((config) => {
  const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const voiceData = voiceModels.filter(voiceModel => voiceModel.userId === parseInt(userId, 10))
  return [200, voiceData];
});
// 2-3. 보이스 모델 수정
mock.onPut(/^voice\/\d+$/).reply((config) => {
  const voiceId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const voiceData = voiceModels.find(voiceModel => voiceModel.id === parseInt(voiceId, 10));
  return [200, { activated: !voiceData?.activated}];
});
// 2-4. 보이스 모델 삭제
mock.onDelete(/^voice\/\d+$/).reply((config) => {
  const voiceId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const voiceData = voiceModels.find(voiceModel => voiceModel.id === parseInt(voiceId, 10));
  return [200, "success"];
});

// 3. 원곡 테스트
const originalSongs:Array<OriginalSong> = [
  {
    id: 1,
    userId: 1,
    title: "윤하-03-비밀번호 486",
    path: "https://ssafy404found.s3.amazonaws.com/media/%EC%9C%A4%ED%95%98-03-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8+486.mp3"
  },
  {
    id: 2,
    userId: 1,
    title: "에픽 하이-16-우산 (Feat. 윤하)",
    path: "https://ssafy404found.s3.amazonaws.com/media/%EC%97%90%ED%94%BD+%ED%95%98%EC%9D%B4-16-%EC%9A%B0%EC%82%B0+(Feat.+%EC%9C%A4%ED%95%98).mp3",
  },
  {
    id: 3,
    userId: 2,
    title: "윤하-01-혜성",
    path: "https://ssafy404found.s3.amazonaws.com/media/%EC%9C%A4%ED%95%98-01-%ED%98%9C%EC%84%B1.mp3"
  },
  {
    id: 4,
    userId: 1,
    title: "너에게 못했던 내 마지막 말은_다비치",
    path: "https://ssafy404found.s3.amazonaws.com/media/%EB%84%88%EC%97%90%EA%B2%8C+%EB%AA%BB%ED%96%88%EB%8D%98+%EB%82%B4+%EB%A7%88%EC%A7%80%EB%A7%89+%EB%A7%90%EC%9D%80_%EB%8B%A4%EB%B9%84%EC%B9%98.mp3",
  },
  {
    id: 5,
    userId: 1,
    title: "에픽 하이-04-One (Feat. 지선)",
    path: "https://ssafy404found.s3.amazonaws.com/media/%EC%97%90%ED%94%BD+%ED%95%98%EC%9D%B4-04-One+(Feat.+%EC%A7%80%EC%84%A0).mp3",
  },
]
// 3-1. 유저별 원곡 로드
mock.onGet(/^original\/user\/\d+$/).reply((config) => {
  const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const originalData = originalSongs.filter(voiceModel => voiceModel.userId === parseInt(userId, 10))
  return [200, originalData];
});
// 3-2. 원곡 업로드
mock.onPost("original").reply((config) => {
  return [200, {id: 3}];
});

// 4. 커버송 테스트
const coverSongs:Array<CoverSong> = [
  {
    id: 1,
    voiceId: 1,
    originalId: 1,
    voicePath: "",
    coverPath: "https://ssafy404found.s3.amazonaws.com/media/%EC%9C%A4%ED%95%98-03-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8+486.mp3",
    createdAt: new Date("2023-09-14")
  },
  {
    id: 2,
    voiceId: 2,
    originalId: 2,
    voicePath: "",
    coverPath: "https://ssafy404found.s3.amazonaws.com/media/%EC%97%90%ED%94%BD+%ED%95%98%EC%9D%B4-16-%EC%9A%B0%EC%82%B0+(Feat.+%EC%9C%A4%ED%95%98).mp3",
    createdAt: new Date("2023-09-14")
  },
  {
    id: 3,
    voiceId: 3,
    originalId: 3,
    voicePath: "",
    coverPath: "https://ssafy404found.s3.amazonaws.com/media/%EC%9C%A4%ED%95%98-01-%ED%98%9C%EC%84%B1.mp3",
    createdAt: new Date("2023-09-14")
  },
  {
    id: 4,
    voiceId: 1,
    originalId: 4,
    voicePath: "",
    coverPath: "https://ssafy404found.s3.amazonaws.com/media/%EB%84%88%EC%97%90%EA%B2%8C+%EB%AA%BB%ED%96%88%EB%8D%98+%EB%82%B4+%EB%A7%88%EC%A7%80%EB%A7%89+%EB%A7%90%EC%9D%80_%EB%8B%A4%EB%B9%84%EC%B9%98.mp3",
    createdAt: new Date("2023-09-14")
  },
  {
    id: 5,
    voiceId: 1,
    originalId: 5,
    voicePath: "",
    coverPath: "https://ssafy404found.s3.amazonaws.com/media/%EC%97%90%ED%94%BD+%ED%95%98%EC%9D%B4-04-One+(Feat.+%EC%A7%80%EC%84%A0).mp3",
    createdAt: new Date("2023-09-14")
  }
]
const songLikes:Array<SongLike> = [
  {
    id: 1,
    userId: 1,
    CoverSongId: 2
  },
  {
    id: 1,
    userId: 1,
    CoverSongId: 3
  }
]
// 4-1. 커버송 제작 요청
mock.onPost("cover").reply((config) => {
  return [200, {id: 5, waiting: 2}];
});
// 4-2. 유저별 커버곡 들고오기
mock.onGet(/^cover\/user\/\d+$/).reply((config) => {
  // 유저별 모델 들고오기
  const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  const userData = users.find((user) => user.id === parseInt(userId, 10));
  const voiceData = voiceModels.filter(voiceModel => voiceModel.userId === parseInt(userId, 10))
  // 모델로 만들어진 노래 찾기
  const coverDatas = []
  for (const voice of voiceData) {
    const coverFiltered = coverSongs.filter(coverSong => coverSong.voiceId === voice.id)
    for (const cover of coverFiltered) {
      const orgianl = originalSongs.find(song => song.id === cover.originalId);
      const coverTotal = {
        ...cover, 
        user:{id: userData?.id, nickname: userData?.nickname},
        voice: voice,
        original: orgianl
      }
      coverDatas.push(coverTotal)
    }
  }
  return [200, coverDatas];
});
// 4-3. 유저가 좋아요 누른 커버곡 들고오기
mock.onGet(/^cover\/like\/\d+$/).reply((config) => {
  // 유저별 모델 들고오기
  const userId = config.url!.match(/\d+/)![0]; // 정수 값을 추출합니다
  // 모델로 만들어진 노래 찾기
  const coverDatas = []
  for (const like of songLikes) {
    if (like.userId.toString() !== userId) {
      continue;
    } else {
      const cover = coverSongs.find(coverSong => coverSong.id === like.CoverSongId);
      const orgianl = originalSongs.find(song => song.id === cover?.originalId);
      const voice = voiceModels.find(voiceModel => voiceModel.id === cover?.id);
      const user = users.find(userData => userData.id === voice?.userId);
      const coverTotal = {
        ...cover, 
        user:{id: user?.id, nickname: user?.nickname},
        voice: voice,
        original: orgianl
      }
      coverDatas.push(coverTotal)
    }
  }
  return [200, coverDatas];
});
// 4-4. 커버송 검색
mock.onGet(/^cover\/search\/(.+)$/).reply((config) => {
  // 유저별 모델 들고오기
  const search = config.url!.match(/^cover\/search\/(.+)$/)![1]; 
  // 모델로 만들어진 노래 찾기
  const coverDatas = []
  for (const cover of coverSongs) {
    const orgianl = originalSongs.find(song => song.id === cover.originalId);
    if (orgianl?.title.includes(search)){
      const voice = voiceModels.find(voice => voice.id === cover.voiceId);
      const user = users.find(user => user.id === voice?.userId);
      const coverTotal = {
        ...cover, 
        user:{id: user?.id, nickname: user?.nickname},
        voice: voice,
        original: orgianl
      };
      coverDatas.push(coverTotal);
    }
  }
  return [200, coverDatas];
});
// 4-5. 커버송 삭제
mock.onDelete(/^cover\/\d+$/).reply((config) => {
  return [200, "success"];
});

// 5. 커버요청 테스트
const CoverRequests:Array<GetRequest> = [
  {  
    id: 1,
    requestUser: 2,
    useModel: 1,
    originalSongId: 1,
    message: null,
    isChecked: false,
    isAccepted: false,
    createdAt: new Date("2023-09-22"),
    user: {nickname: "한주"},
    orginal: {title: "윤하-03-비밀번호 486"}
  }
]
// 5-1. 타유저에게 커버 요청
mock.onPost("request").reply((config) => {
  // 유저별 모델 들고오기
  const requestData = JSON.parse(config.data);
  const { userId, voiceId, originalId } = requestData;
  // 모델로 만들어진 노래 찾기
  return [200, {id: 3}];
});
// 5-2. 받은 요청 로드
mock.onGet(/^request\/user\/\d+$/).reply((config) => {
  return [200, 
  [
    {  
      id: 1,
      requestUser: 2,
      useModel: 1,
      originalSongId: 1,
      message: null,
      isChecked: false,
      isAccepted: false,
      createdAt: new Date("2023-09-22"),
      user: {nickname: "한주"},
      orginal: {title: "윤하-03-비밀번호 486"}
    }
  ]];
});
// 5-3. 요청 반응 보내기
mock.onPut(/^request\/\d+$/).reply((config) => {
  return [200, "success"]
});

// 6. 좋아요 테스트
// 6-1. 좋아요 확인
mock.onGet(/^like\/(\d+)\/(\d+)$/).reply((config) => {
  const likeInfo = config.url?.split("/")
  for (const like of songLikes) {
    if (like.userId.toString() === likeInfo![1] && like.CoverSongId.toString() === likeInfo![2]) {
      return [200, {isLike: true}] 
    }
  }
  return [200, {isLike: false}];
});

// 6-2. 좋아요 삭제
mock.onDelete(/^like\/(\d+)\/(\d+)$/).reply((config) => {
  return [200, {isLike: false}];
});

// 6-3. 좋아요 추가
mock.onPost(/^like\/(\d+)\/(\d+)$/).reply((config) => {
  return [200, {isLike: true}];
});

export default testApi