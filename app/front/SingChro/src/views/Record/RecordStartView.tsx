// 태그 import
import { View, Text } from "react-native";
// 함수 import
import { axiosVoice } from "@functions/axiosFunc";
import { useState } from "react";
// 상태정보 import 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { voiceOwnerState } from "@states/featureState";
import { useSetRecoilState } from "recoil";
// 컴포넌트 import
import MascotBg from "@components/shared/MascotBg";
import FunctionBtn from "@components/shared/FunctionBtn";
import Loading from "@components/shared/Loading";
// 스타일 import
import { recordStyles } from "@styles/recordStlyes";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const RecordStartView = ({navigation}: NavigationProps<"RecordStart">):JSX.Element => {
  // 상태정보 - 유저정보
  const setVoiceOwner = useSetRecoilState(voiceOwnerState)

  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("../../assets/images/mascot1.jpg");
  // 변수 - 로딩
  const [ isLoading, setIsLoading ] = useState(false)

  // 함수 - 스크린 이동
  const moveScreen = (target:"VoicePick"|"RecordDoing"|"Home") => {
    navigation.navigate(target)
  }

  // 함수 - 새로운 모델 생성
  const checkCreatingModel = async() => {
    try {
      await setIsLoading(true);
      const userId = await AsyncStorage.getItem("id");
      // 이미 생성중인 모델이 존재하는지 판단
      const {result, waiting} = await axiosVoice(`/modeling/${userId}`,"GET");
      await setIsLoading(false)
      // 존재하지 않으면 녹음창으로 이동
      if (!result) {
        navigation.navigate("RecordDoing");
      } else {
        navigation.navigate("RecordRequest", { waiting: waiting });
      }
    // 예외처리
    } catch {
    }
  }

  // 함수 - 새로운 커버송 만들기
  const makeNewCover = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      await setVoiceOwner(parseInt(userId||""));
      navigation.navigate("VoicePick");
    // 예외 처리
    } catch {
    }
  }

  return (
    isLoading?
    <Loading/>:
    <View style={recordStyles.container}>
      <MascotBg ImgUrl={imgUrl}/>
      <View style={recordStyles.centerBox}>
        <Text style={recordStyles.titleTxt}>커버송을 제작하시겠습니까?</Text>
        <FunctionBtn btnFunc={makeNewCover} btnText="새로운 커버송 만들기"/>
        <FunctionBtn btnFunc={checkCreatingModel} btnText="새 음성 모델 만들기"/>
        <FunctionBtn btnFunc={() => moveScreen("Home")} btnText="홈으로"/>
        {/* <FunctionBtn btnFunc={() => moveScreen("CoverStart")} btnText="추가 학습하기"/> */}
      </View>
    </View>
  )
}

export default RecordStartView