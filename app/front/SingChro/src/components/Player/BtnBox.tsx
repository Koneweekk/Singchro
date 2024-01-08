// 모듈 import
import RNFetchBlob from 'rn-fetch-blob';
// 태그 import 
import { View, StyleSheet } from 'react-native';
// 함수 import
import { useEffect, useState } from 'react';
import { axiosLike } from '@functions/axiosFunc';
// 컴포넌트 import
import RoundBtn from '@components/shared/RoundBtn';
// 타입 import
import { CoverTotal } from '@constants/featureTypes';
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { likeCoversState } from "@states/modelState";
import { useRecoilState } from "recoil";
// 네비게이션 import
import { NavigationProp } from '@react-navigation/native';

// Props 정의
interface Props {
  navigation: NavigationProp<any>;
  cover: CoverTotal
}

// 스타일 정의
const styles = StyleSheet.create({
  btnBox: {
    width: "100%",
    height: 120,
    paddingTop: 40,
    paddingHorizontal:"10%",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems:"flex-start"
  },
  recordBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:"#5667FD",
    opacity: 0.5
  },
})

// 컴포넌트 정의
const BtnBox = ({ navigation, cover }: Props):JSX.Element => {
  // 상태 정보 - 좋아요 누른 커버송
  const [ likeCovers, setLikeCovers ] = useRecoilState(likeCoversState);

  // 변수 - 커버송 정보
  const coverTotal = cover;
  const [ isMine, setIsMine ] = useState(false);
  const [ like, setLike ] = useState(false);
  // 변수 - 아이콘 url
  const likeIcon = require("@assets/icon/like.png");
  const notLikeIcon = require("@assets/icon/notLike.png");
  const downloadIcon = require("@assets/icon/download.png");
  const listIcon = require("@assets/icon/list.png");

  // 함수 - 로그인한 사용자의 노래인지 판단
  const checkUserId = async () => {
    const userId = await AsyncStorage.getItem("id");
    if (userId === null) {
      return;
    } else if (parseInt(userId) === coverTotal.user.id) {
      setIsMine(true);
    }
  }

  // 함수 - 사용자가 좋아요를 누른 노래인지 판단
  const checkLike = async() => {
    const userId = await AsyncStorage.getItem("id");
    // api 호출
    try {
      const { isLike } = await axiosLike(`/${userId}/${cover.id}/`, "GET");
      await setLike(isLike);
    // 예외 처리
    } catch {
    }
  }

  // 함수 - 좋아요 토글
  const handleLike = async() => {
    const userId = await AsyncStorage.getItem("id");
    const likeMethod = like? "DELETE":"POST";
    // api 호출
    try {
      const { isLike } = await axiosLike(`/${userId}/${cover.id}/`, likeMethod);
      await setLike(isLike);
      const nowLikeList = [...likeCovers];
      // 좋아요 리스트 수정
      if ( isLike ) {
        nowLikeList.push(cover);
      } else {
        const removeIndex = nowLikeList.findIndex(item => item.id === cover.id);
        nowLikeList.splice(removeIndex, 1);
      }
      await setLikeCovers(nowLikeList);
    // 예외 처리
    } catch {
    }
  }

  // 함수 - 다운로드
  const handleDownload = async() => {
    await RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${RNFetchBlob.fs.dirs.DownloadDir}/${cover.original.title}.mp3`,
      },
    }).fetch('GET', cover.coverPath || "");
  }

  // 기능 - 로그인한 사용자의 노래인지 판단
  useEffect(() => {
    checkUserId();
    checkLike();
  }, [coverTotal])
  

  return (
    // 좋아요, 다운로드, 프로필 이동 홈페이지
    <View style={styles.btnBox}>
      <View style={styles.recordBg}></View>
      {/* 좋아요 버튼 */}
      <RoundBtn 
        btnFunc={handleLike} 
        btnIcon={like? likeIcon: notLikeIcon} 
        size={40}
      />
      {/* 다운로드 버튼 */}
      {isMine && <RoundBtn btnFunc={handleDownload} btnIcon={downloadIcon} size={40}/>}
      {/* 커버송 주인 홈으로 이동 */}
      <RoundBtn 
        btnFunc={isMine? () => navigation.navigate("Home"):
        () => navigation.navigate("OtherHome", {user: {id:cover.user.id, nickname:cover.user.nickname}})} 
        btnIcon={listIcon} 
        size={40}
      />
    </View>
  )
}

export default BtnBox