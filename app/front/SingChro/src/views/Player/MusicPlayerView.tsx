// 태그 import 
import { View } from 'react-native';
// 컴포넌트 import
import PlayController from "@components/Player/PlayController";
import BtnBox from '@components/Player/BtnBox';
import ImgBox from '@components/Player/ImgBox';
// 스타일
import { playerStyles } from '@styles/playerStyles';
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const MusicPlayerView = ({ navigation, route }:NavigationProps<"MusicPlayer">):JSX.Element => {
  // 변수 - 커버송 정보, 유저 정보
  const { coverTotal } = route.params;

  return (
    <View style={playerStyles.container}>
      <ImgBox cover={coverTotal}/>
       {/* 좋아요, 다운로드, 프로필 이동 홈페이지 */}
      <BtnBox navigation={navigation} cover={coverTotal}/>
      {/* 음악 컨트롤러 */}
      <PlayController navigation={navigation} cover={coverTotal}/>
    </View>
  )
}

export default MusicPlayerView