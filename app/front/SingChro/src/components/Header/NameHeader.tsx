// 태그 import
import { View, Text, StyleSheet, Alert } from "react-native";
// 함수 import
import { useState } from "react";
import { checkAlarmPermission, openAppSettings } from '@functions/permissionFunc';
// 상태정보 import
import { useRecoilValue } from "recoil";
import { userState } from "@states/modelState";
import { alarmCntState, requestCntState } from "@states/featureState";
// 컴포넌트 import
import Badge from "@components/shared/Badge"
import AlarmModal from "./AlarmModal";
import RequestModal from "./RequestModal";

// 스타일 정의
const styles = StyleSheet.create({
  header: {
    width:"100%",
    height:50,
    marginTop:15,
    marginBottom: 40,
    paddingHorizontal:20,
    justifyContent: "space-between",
  },
  // 뱃지 박스
  badgeBox: {
    flexDirection:"row",
    justifyContent:"space-between"
  },
  // 텍스트 박스
  txtBox:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  nameTxt: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
  smTxt: {
    color:"black",
    fontSize: 15,
  },
})

// 컴포넌트 정의
const NameHeader = ({ name, page }:{ name: string, page:string}):JSX.Element => {
  // 상태정보 - 알람 관련 변수
  const alarmCnt = useRecoilValue(alarmCntState);
  const requestCnt = useRecoilValue(requestCntState);
  // 상태정보 - 유저정보
  const userInfo = useRecoilValue(userState)

  // 변수 - 모달창 조절
  const [ alarmShow, setAlarmShow ] = useState(false);
  const [ requestShow, setRequestShow ] = useState(false);

  // 함수 - 알람창 열기
  const openAlarmModal = async() => {
    const alarmPermission = await checkAlarmPermission();
    if (!alarmPermission) {
      Alert.alert(
        "푸쉬 알람 권한 요청",          
        "푸쉬 알람 권한을 수락해주세요.",
        [ 
          {text: "확인"},
          {onPress: openAppSettings}
        ],
        // 뒤로가기 버튼으로 Alert 창을 닫을 수 있게 할지 여부
        { cancelable: true } 
      );
    } else {
      await setAlarmShow(true)
    }
  }

  return (
    <View style={styles.header}>
      <AlarmModal visible={alarmShow} setVisible={setAlarmShow}/>
      <RequestModal visible={requestShow} setVisible={setRequestShow}/>
      <View style={styles.badgeBox}>
        <Badge 
          size={35} count={alarmCnt}
          func={openAlarmModal} 
          icon={require("@assets/icon/alarm.png")}
        />
        <Badge 
          size={35} count={requestCnt}
          func={() => setRequestShow(true)} 
          icon={require("@assets/icon/request.png")}
        />
      </View>
      <View style={styles.txtBox}>
        <Text style={styles.nameTxt}>{name}</Text>
        <Text style={styles.smTxt}>님의 {page}</Text>
      </View>
    </View>
  )
}

export default NameHeader