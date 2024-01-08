// 태그 import
import { View, Text } from "react-native";
// 함수 import
import { useState } from "react";
import { axiosOriginal, axiosCover, axiosRequest } from "@functions/axiosFunc";
// 상태정보 import
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useRecoilValue } from "recoil";
import { chooseSongState, chooseVoiceState, isVoiceOwnerState } from "@states/featureState";
// 컴포넌트 import
import MascotBg from "@components/shared/MascotBg";
import PickedSongItem from "@components/Cover/PickedSongItem";
import PickedVoiceItem from "@components/Cover/PickedVoiceItem";
import FunctionBtn from "@components/shared/FunctionBtn";
import Loading from "@components/shared/Loading";
// 스타일 import
import { coverStyles } from "@styles/coverStyles";
// 타입 import
import { NavigationProps } from "@constants/featureTypes";

const CoverConfirmView = ({navigation}: NavigationProps<"CoverConfirm">):JSX.Element => {
  // 상태 정보 - 선택한 모델과 노래
  const [ chooseVoice ] = useRecoilState(chooseVoiceState);
  const [ chooseSong ] = useRecoilState(chooseSongState);
  const isVoiceOwner = useRecoilValue(isVoiceOwnerState);

  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("@assets/images/mascot1.jpg");
  // 변수 - 로딩
  const [ isLoading, setIsLoading ] = useState(false);

  // 함수 - 커버송 제작
  const makeCover = async() => {
    await setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem("id") || "";
      let originalId = chooseSong.id
      // 1. 새로운 곡일 경우 원곡 POST
      if ( chooseSong.id === -1 ) {
        // 폼데이터 정의
        const formData = new FormData();
        // 파일명 인코딩 
        formData.append("user_id", userId);
        formData.append("title", chooseSong.title);
        formData.append("song_file", {
          name: chooseSong.title + ".mp3",
          uri: "file:///" + chooseSong.path,
          type: "audio/mpeg"
        })
        // api요청
        const result = await axiosOriginal("/", "POST", formData);
        originalId = result.id;
      }
      // 2. 내가 나의 목소리로 커버송을 제작할 경우
      if (isVoiceOwner) {
        const coverDatas = {
          voiceId: chooseVoice.id,
          originalId: originalId
        };
        const result = await axiosCover("/", "POST", coverDatas);
        navigation.navigate("CoverDone", { waiting: result.waiting });
      // 3. 타인에게 커버송을 요청할 경우
      } else {
        const requestData = {
          voiceId: chooseVoice.id,
          originalId: originalId,
          userId: parseInt(userId)
        };
        const result = await axiosRequest("/", "POST", requestData);
        navigation.navigate("CoverDone", { waiting: null });
      }
    // 예외처리
    } catch(err) {
      console.log(err);
    } finally {
      await setIsLoading(false);
    }
  };

  return (
    isLoading?
    <Loading/>:
    <View style={coverStyles.container}>
      <MascotBg ImgUrl={imgUrl}/>
      <View style={coverStyles.centerBox}>
        <Text style={coverStyles.titleTxt}>모델과 노래를 확인해주세요</Text>
        <PickedVoiceItem/>
        <PickedSongItem/>
        <FunctionBtn btnText={isVoiceOwner? "커버송 제작":"커버송 요청"} btnFunc={makeCover}/>
        <FunctionBtn btnText="다시 고를래요" btnFunc={() => navigation.navigate("VoicePick")}/>
      </View>
    </View>
  )
}

export default CoverConfirmView