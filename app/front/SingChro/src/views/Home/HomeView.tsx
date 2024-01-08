// 모듈 import
import messaging from '@react-native-firebase/messaging';
// 태그 import
import { ScrollView, View  } from "react-native";
// 함수 import
import { resetToken } from "@functions/authFunc";
import { useState, useEffect } from "react"
import { axiosAuthed, axiosCover, axiosRequest } from "@functions/axiosFunc";
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playListState, playPositionState, playingState, voiceOwnerState, requestsState, alarmsState } from "@states/featureState";
import { userState, myCoversState, likeCoversState } from "@states/modelState";
import { useRecoilState } from "recoil";
// 컴포넌트 import
import NameHeader from "@components/Header/NameHeader";
import CoverItem from "@components/shared/CoverItem";
import BottomBar from "@components/Footer/BottomBar";
import FilterBtn from "@components/Home/FilterBtn";
import WhiteBtn from "@components/shared/WhiteBtn";
import Loading from "@components/shared/Loading";
// 스타일 import
import { homeStyles } from "@styles/homeStyles";
// 타입 import
import { CoverTotal, NavigationProps } from "@constants/featureTypes";

const HomeView = ({ navigation }:NavigationProps<"Home">):JSX.Element => {
  // 상태정보 - 유저 정보
  const [user, setUser] = useRecoilState(userState);
  // 상태정보 - 커버 요청 받는 유저
  const [voiceOwner, setVoiceOwner] = useRecoilState(voiceOwnerState);
  // 상태정보 - 알람 리스트
  const [ requests, setRequests] = useRecoilState(requestsState);
  const [ alarms, setAlarms ] = useRecoilState(alarmsState);
  // 상태정보 - 플레이리스트
  const [ myCovers, setMyCovers ] = useRecoilState(myCoversState);
  const [ likeCovers, setLikeCovers ] = useRecoilState(likeCoversState);
  const [ playPosition, setPlayPosition ] = useRecoilState(playPositionState);
  const [ playList, setPlayList ] = useRecoilState(playListState);
  const [ playing, setPlaying ] = useRecoilState(playingState);

  // 변수 - 커버송 필터 관련 변수
  const mineIcon = require("@assets/icon/mine.png");
  const likeIcon = require("@assets/icon/like.png");
  const [ filter, setFilter ] = useState(true);
  // 변수 - 로딩
  const [ isLoading, setIsLoading ] = useState(false)

  // 함수 - 유저 정보 가져오기
  const loadUserData = async() => {
    try {
      // 유저id 들고오기
      const id = await AsyncStorage.getItem("id");
      // 유저 정보 들고오기
      const userData  = await axiosAuthed(`/${id}/`, "GET");
      await setUser(userData);
    // 예외 처리
    } catch(err) {
    }
  };

  // 함수 - 사용자가 만든 커버송 들고오기
  const loadUserCover = async() => {
    try{
      // 유저id 들고오기
      const id = await AsyncStorage.getItem("id");
      // 유저 정보 들고오기
      const coverDatas = await axiosCover(`/user/${id}/`, "GET");
      await setMyCovers(coverDatas);
    // 예외처리
    } catch {
    }
  };

  // 함수 - 사용자가 좋아요 누른 커버송 들고오기
  const loadLikeCover = async() => {
    try{
      // 유저id 들고오기
      const id = await AsyncStorage.getItem("id");
      // 유저 정보 들고오기
      const coverDatas = await axiosCover(`/like/${id}/`, "GET");
      await setLikeCovers(coverDatas);
    // 예외처리
    } catch(err) {
    }
  };

  // 함수 - 받은 커버 요청 가져오기
  const loadRequests = async() => {
    const userId = await AsyncStorage.getItem("id");
    // api 요청
    try {
      const currentRequests = await axiosRequest(`/user/${userId}/`,"GET")
      await setRequests(currentRequests);
    // 예외처리 
    } catch {
    }
  }

  // 함수 - 알람 들고오기
  const loadAlarms = async() => {
    // 알람 가져오기
    const storedAlarms = await AsyncStorage.getItem("alarmLog");
    const currentAlarms = storedAlarms? JSON.parse(storedAlarms) : [];
    await setAlarms(currentAlarms);
  }

  // 함수 - 현재 필터링된 노래들을 플레이리스트에 넣고 재생 화면으로 이동
  const movePlayer = async(index:number, cover:CoverTotal) => {
    if (filter) {
      await setPlayList(myCovers);
    } else {
      await setPlayList(likeCovers);
    }
    await setPlayPosition(index);
    await setPlaying(false);
    navigation.navigate("MusicPlayer", {coverTotal: cover});
  }

  // 함수 - 커버송 제작 화면으로 이동
  const makeCover = async() => {
    await setVoiceOwner(user.id);
    navigation.navigate("RecordStart");
  };

  // 기능 - 렌더링되면 유저 정보 가져오기
  useEffect(() => {
    // 컴포넌트가 화면에 다시 나타날 때
    const unsubscribe = navigation.addListener("focus", async() => {
      try {
        await setIsLoading(true);
        await loadUserData();
        await loadUserCover();
        await loadLikeCover();
        await loadAlarms();
        await loadRequests();
      // 오류가 발생하면 로그인 화면으로
      } catch(err) {
        console.log(err)
      } finally {
        await setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [])

  // 기능 - 알람을 받을 때마다 데이터 갱신
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      try {
        await loadUserCover();
        await loadAlarms();
        await loadRequests();
      // 예외 처리
      } catch {
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={homeStyles.container}>
      {/* 헤더 */}
      <NameHeader name={user.nickname} page="홈"/>
      {/* 버튼 박스 */}
      <View style={homeStyles.btnBox}>
        <WhiteBtn 
          btnFunc={makeCover} 
          btnText="커버송 제작" 
          width={40}
        />
        <View style={homeStyles.filterBox}>
          <FilterBtn icon={mineIcon} choosed={filter} action={() => setFilter(true)}/>
          <FilterBtn icon={likeIcon} choosed={!filter} action={() => setFilter(false)}/>
        </View>
      </View>
      {/* 노래 리스트 */}
      { isLoading && <Loading/>}
      <ScrollView contentContainerStyle={homeStyles.scrollTag}>
        { filter?
          myCovers.map((cover, index) => (
            <CoverItem 
              cover={cover}
              func={() => movePlayer(index, cover)}
              key={index} 
            />
          )):
          likeCovers.map((cover, index) => (
            <CoverItem 
              cover={cover}
              func={() => movePlayer(index, cover)}
              key={index} 
            />
          ))
        }
      </ScrollView>
      {/* 하단 바 */}
      <BottomBar navigation={navigation}/>
    </View>
  )
}

export default HomeView