// 태그 import
import { View, BackHandler } from "react-native";
// 함수 import
import { useEffect, useState } from 'react';
// 컴포넌트 import
import TitleBox from "@components/shared/TitleBox";
import FunctionBtn from "@components/shared/FunctionBtn";
import MascotBottom from "@components/shared/MascotBottom";
// 스타일 import
import { recordStyles } from "@styles/recordStlyes";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";


const RecordRequestView = ({navigation, route}: NavigationProps<"RecordRequest">):JSX.Element => {
  // 변수 - 대기열
  const { waiting } = route.params;
  // 변수 - dot
  const [ dot, setDot ] = useState(".");

  // 함수 - 홈으로 이동
  const moveHome = () => {
    navigation.navigate("Home");
    return true;
  }

  // 기능 - 뒤로 가기시 바로 홈으로 가게 하기
  useEffect(() => {
    // 1초마다 .을 추가하고 순환합니다.
    const dotInterval = setInterval(() => {
      if (dot === '...') {
        const newDot = ".";
        setDot(newDot);
      } else {
        const newDot = dot + ".";
        setDot(newDot);
      }
    }, 1000);
    // 뒤로가기를 하면 홈으로 이동
    BackHandler.addEventListener("hardwareBackPress", moveHome);
    return () => {
      clearInterval(dotInterval);
      BackHandler.removeEventListener("hardwareBackPress", moveHome);
    };
  }, [dot]);

  return (
    <View style={recordStyles.container}>
      {/* 텍스트, 버튼 박스 */}
      <View style={recordStyles.requestBox}>
        {/* 헤더 */}
        <TitleBox
          title={`모델 생성 중${dot}`}
          small={`앞에 ${waiting}개의 요청이 남았어요!`}
        />
        {/* 홈 버튼 */}
        <FunctionBtn btnFunc={moveHome} btnText="홈으로 이동" width={50}/>
      </View>
      {/* 하단 이미지 */}
      <MascotBottom/>
    </View>
  )
}

export default RecordRequestView