// 태그 import
import { View, Text, Alert } from "react-native";
// 함수 import
import { useState, useEffect } from "react";
// 상태정보 import
import { useRecoilState, useResetRecoilState } from "recoil";
import { chooseVoiceState } from "@states/featureState";
// 컴포넌트 import
import MascotBg from "@components/shared/MascotBg";
import VoiceModal from "@components/Cover/VoiceModal";
import FunctionBtn from "@components/shared/FunctionBtn";
import WithIconBtn from "@components/shared/WithIconBtn";
import PickedVoiceItem from "@components/Cover/PickedVoiceItem";
// 스타일 import
import { coverStyles } from "@styles/coverStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";


const VoicePickView = ({navigation}: NavigationProps<"VoicePick">):JSX.Element => {
  // 상태 정보 - 선택된 보이스 모델
  const resetVoice = useResetRecoilState(chooseVoiceState);
  const [ chooseVoice ] = useRecoilState(chooseVoiceState);

  // 변수 - 이미지, 아이콘 주소
  const imgUrl = require("@assets/images/mascot1.jpg");
  const playIcon = require("@assets/icon/play.png");

  // 변수 - 모달창 컨트롤
  const  [ visible, setVisible ] = useState(false);

  // 함수 - 다음단계로 넘어가기
  const moveNext = () => {
    if (chooseVoice.id === 0) {
      Alert.alert(
        "보이스 모델 선택",          
        "아직 보이스 모델을 선택하지 않았습니다.",
        [ {text: "확인"} ],
        // 뒤로가기 버튼으로 Alert 창을 닫을 수 있게 할지 여부
        { cancelable: true } 
      );
    } else {
      navigation.navigate("SongPick");
    }
  }

  // 기능 - 페이지를 들어오면 선택한 보이스 모델 초기화
  useEffect(() => {
    resetVoice();
  }, []);
  
  return (
    <View style={coverStyles.container}>
      <MascotBg ImgUrl={imgUrl}/>
      {/* 모델 선택 모달 */}
      <VoiceModal visible={visible} setVisible={setVisible}/>
      {/* 모델 선택 화면 */}
      <View style={coverStyles.centerBox}>
        <Text style={coverStyles.titleTxt}>보이스 모델을 선택하세요</Text>
        <PickedVoiceItem/>
        <WithIconBtn btnFunc={() => setVisible(true)} btnText="음성 모델 선택" icon={playIcon}/>
        <FunctionBtn btnFunc={moveNext} btnText="선택 완료"/>
      </View>
    </View>
  )
}

export default VoicePickView