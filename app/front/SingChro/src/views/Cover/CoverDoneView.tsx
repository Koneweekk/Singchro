// 태그 import
import { View, BackHandler } from "react-native";
// 함수 import
import { useEffect } from 'react';
// 상태정보 import
import { useRecoilValue } from "recoil";
import { isVoiceOwnerState } from "@states/featureState";
// 컴포넌트 import
import TitleBox from "@components/shared/TitleBox";
import FunctionBtn from "@components/shared/FunctionBtn";
import MascotBottom from "@components/shared/MascotBottom";
// 스타일 import
import { coverStyles } from "@styles/coverStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const CoverDoneView = ({navigation, route}: NavigationProps<"CoverDone">):JSX.Element => {
  // 상태 정보 - 선택한 모델과 노래
  const isVoiceOwner = useRecoilValue(isVoiceOwnerState);

  // 변수 - 대기열
  const { waiting } = route.params;

  // 함수 - 홈으로 이동
  const moveHome = () => {
    navigation.navigate("Home");
    return true;
  }

  // 기능 - 뒤로 가기시 바로 홈으로 가게 하기
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", moveHome);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", moveHome);
    };
  }, []);

  return (
    <View style={coverStyles.container}>
      {/* 텍스트, 버튼 박스 */}
      <View style={coverStyles.requestBox}>
        {/* 헤더 */}
        <TitleBox
          title={isVoiceOwner? "커버송 제작 중!" : "커버 요청 완료!"}
          small={isVoiceOwner? 
            `대기열 : ${waiting}명` : 
            "요청 수락을 기다려주세요"
          }
        />
        {/* 홈 버튼 */}
        <FunctionBtn btnFunc={moveHome} btnText="홈으로 이동" width={50}/>
      </View>
      {/* 하단 이미지 */}
      <MascotBottom/>
    </View>
  )
}

export default CoverDoneView