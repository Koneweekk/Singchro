// 태그 import
import { View, Text } from "react-native";
// 함수 import
import { axiosVoice } from "@functions/axiosFunc";
import { useState } from "react";
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from "recoil";
import { recordState } from "@states/featureState";
// 컴포넌트 import
import MascotBg from "@components/shared/MascotBg";
import FunctionBtn from "@components/shared/FunctionBtn";
import PlayBox from '@components/Record/PlayBox';
import Loading from "@components/shared/Loading";
// 스타일 import
import { recordStyles } from "@styles/recordStlyes";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";


const RecordDoneView = ({navigation}: NavigationProps<"RecordDone">):JSX.Element => {
  // 상태 정보 - 녹음 파일 경로
  const [ recordPath ] = useRecoilState(recordState);

  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("@assets/images/mascot1.jpg");
  // 변수 - 로딩
  const [ isLoading, setIsLoading ] = useState(false);

  // 함수 - 학습 시키기
  const startLearning = async() => {
    await setIsLoading(true);
    // 폼 데이터 정의 - 녹음 파일 실어보내기
    const id = await AsyncStorage.getItem("id");
    const formData = new FormData();
    formData.append("user_id",  id);
    formData.append("voice_file",  {
      uri: recordPath,
      name: "sound.mp4",
      type: "video/mp4",
    });
    const result = await axiosVoice("/", "POST", formData);
    await setIsLoading(false);
    navigation.navigate("RecordRequest", { waiting: result.waiting });
  }
  
  // 함수 - 뒤로 돌아가기
  const goBack = async() => {
    await navigation.goBack();
  }

  // 함수 - 홈으로 돌아가기
  const goHome = async() => {
    await navigation.navigate("Home");
  }

  return (
    isLoading?
    <Loading/>:
    <View style={recordStyles.container}>
      <MascotBg ImgUrl={imgUrl}/>
      {/* 액션 박스 */}
      <View style={recordStyles.centerBox}>
        <Text style={recordStyles.titleTxt}>목소리를 학습시키겠습니까?</Text>
        <FunctionBtn btnFunc={startLearning} btnText="네"/>
        <FunctionBtn btnFunc={goBack} btnText="다시 녹음하기"/>
        <FunctionBtn btnFunc={goHome} btnText="취소하고 홈으로"/>
      </View>
      {/* 녹음재생 박스 */}
      <PlayBox navigation={navigation}/>
    </View>
  )
}

export default RecordDoneView