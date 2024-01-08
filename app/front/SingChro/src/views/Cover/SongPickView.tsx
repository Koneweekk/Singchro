// 태그 import
import { View, Text, Alert } from "react-native";
// 함수 import
import { useEffect, useState } from "react";
// 상태정보 import
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { chooseSongState, isVoiceOwnerState } from "@states/featureState";
// 컴포넌트 import
import MascotBg from "@components/shared/MascotBg";
import FunctionBtn from "@components/shared/FunctionBtn";
import WithIconBtn from "@components/shared/WithIconBtn";
import NewSongModal from "@components/Cover/NewSongModal";
import OldSongModal from "@components/Cover/OldSongModal";
import PickedSongItem from "@components/Cover/PickedSongItem";
// 스타일 import
import { coverStyles } from "@styles/coverStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const SongPickView = ({navigation}: NavigationProps<"SongPick">):JSX.Element => {
  // 상태 정보 - 선택된 노래, 요청 유저
  const chooseSong = useRecoilValue(chooseSongState);
  const resetSong = useResetRecoilState(chooseSongState);
  const isVoiceOwner = useRecoilValue(isVoiceOwnerState);

  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("@assets/images/mascot1.jpg");
  const folderIcon = require("@assets/icon/folder.png");
  const SonglIcon = require("@assets/icon/coverSong.png");
  // 변수 - 모달창 컨트롤
  const [ visibleNew, setVisibleNew ] = useState(false);
  const [ visibleOld, setVisibleOld ] = useState(false); 

  // 기능 - 선택된 노래 초기화
  useEffect(() => {
    resetSong();
  }, []);

  // 함수 - 스크린 이동
  const moveNext = () => {
    if (chooseSong.id === 0) {
      Alert.alert(
        "노래 선택",          
        "아직 커버할 노래를 선택하지 않았습니다.",
        [ {text: "확인"} ],
        // 뒤로가기 버튼으로 Alert 창을 닫을 수 있게 할지 여부
        { cancelable: true } 
      );
    } 
    else {
      navigation.navigate("CoverConfirm")
    }
  }

  return (
    <View style={coverStyles.container}>
      <MascotBg ImgUrl={imgUrl}/>
      {/* 노래 선택 모달 */}
      <NewSongModal visible={visibleNew} setVisible={setVisibleNew}/>
      <OldSongModal visible={visibleOld} setVisible={setVisibleOld}/>
      {/* 노래 선택 화면 */}
      <View style={coverStyles.centerBox}>
        <Text style={coverStyles.titleTxt}>{`어떤 노래를 ${isVoiceOwner? "커버":"요청"}하십니까?`}</Text>
        <PickedSongItem/>
        <WithIconBtn btnFunc={() => setVisibleOld(true)} btnText="다시 커버하기" icon={SonglIcon}/>
        <WithIconBtn btnFunc={() => setVisibleNew(true)} btnText="새로 커버하기" icon={folderIcon}/>
        <FunctionBtn btnFunc={() => moveNext()} btnText="선택 완료"/>
      </View>
    </View>
  )
}

export default SongPickView