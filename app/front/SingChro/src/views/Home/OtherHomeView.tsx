// 태그 import
import { ScrollView, View } from "react-native";
// 함수 import
import { useEffect } from "react"
import { axiosCover } from "@functions/axiosFunc";
// 상태정보 import
import { playListState, playPositionState, playingState, voiceOwnerState } from "@states/featureState";
import { otherCoversState } from "@states/modelState";
import { useRecoilState } from "recoil";
// 컴포넌트 import
import NameHeader from "@components/Header/NameHeader";
import CoverItem from "@components/shared/CoverItem";
import BottomBar from "@components/Footer/BottomBar";
import WhiteBtn from "@components/shared/WhiteBtn";
// 스타일 import
import { homeStyles } from "@styles/homeStyles";
// 타입 import
import { CoverTotal, NavigationProps } from "@constants/featureTypes";

const OtherHomeView = ({ navigation, route }:NavigationProps<"OtherHome">):JSX.Element => {
  // 상태정보 - 커버 요청 받는 유저
  const [voiceOwner, setVoiceOwner] = useRecoilState(voiceOwnerState);
  // 상태정보 - 플레이리스트
  const [ playPosition, setPlayPosition ] = useRecoilState(playPositionState);
  const [ playList, setPlayList ] = useRecoilState(playListState);
  const [ playing, setPlaying ] = useRecoilState(playingState);
  const [ otherCovers, setOtherCovers ] = useRecoilState(otherCoversState);

  // 변수 - 유저 정보
  const { user } = route.params;

  // 함수 - 사용자가 만든 커버송 들고오기
  const loadUserCover = async() => {
    try{
      // 유저 정보 들고오기
      const coverDatas = await axiosCover(`/user/${user.id}`, "GET");
      await setOtherCovers(coverDatas);
    // 예외처리
    } catch {
    }
  };
  // 함수 - 현재 필터링된 노래들을 플레이리스트에 넣고 재생 화면으로 이동
  const movePlayer = async(index:number, cover:CoverTotal) => {
    await setPlayList(otherCovers);
    await setPlayPosition(index);
    await setPlaying(false);
    navigation.navigate("MusicPlayer", {coverTotal: cover});
  }
  // 함수 - 커버 요청 화면으로 이동
  const requestCover = async() => {
    await setVoiceOwner(user.id);
    navigation.navigate("VoicePick");
  };

  // 기능 - 렌더링되면 유저 정보 가져오기
  useEffect(() => {
    loadUserCover();
  }, [])

  return (
    <>
      <View style={homeStyles.container}>
        {/* 헤더 */}
        <NameHeader name={user.nickname} page="홈"/>
        {/* 버튼 박스 */}
        <View style={homeStyles.btnBox}>
          <WhiteBtn 
            btnFunc={requestCover}
            btnText="커버송 요청" 
            width={40}
          />
        </View>
        {/* 노래 리스트 */}
        <ScrollView contentContainerStyle={homeStyles.scrollTag}>
          { otherCovers.map((cover, index) => (
            <CoverItem 
              cover={cover}
              func={() => movePlayer(index, cover)}
              key={index} 
            />
          ))}
        </ScrollView>
        {/* 하단 바 */}
        <BottomBar navigation={navigation}/>
      </View>
    </>
  )
}

export default OtherHomeView