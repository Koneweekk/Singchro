// 태그 import
import { View } from "react-native";
// 컴포넌트 import
import MascotBg from "@components/shared/MascotBg";
import TitleBox from '@components/shared/TitleBox';
import GuideBox from '@components/Record/GuideBox';
import RecordBox from '@components/Record/RecordBox';
// 스타일 import
import { recordStyles } from "@styles/recordStlyes";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

// 페이지
const RecordDoingView = ({navigation}: NavigationProps<"RecordDoing">):JSX.Element => {
  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("@assets/images/mascot1.jpg");

  return (
    <View style={recordStyles.container}>
      <MascotBg ImgUrl={imgUrl}/>
      <View style={recordStyles.betweenBox}>
        {/* 헤더 */}
        <TitleBox
          title="목소리 녹음 중..."
          small="아래 지시사항을 따라주세요"
        />
        {/* 녹음 가이드 */}
        <GuideBox/>
        {/* 녹음 컨트롤러 */}
        <RecordBox navigation={navigation} />
      </View>
    </View>
  )
}

export default RecordDoingView