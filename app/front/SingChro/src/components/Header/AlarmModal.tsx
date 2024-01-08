// 함수 import
import { useEffect } from "react";
// 상태정보
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from "recoil";
import { alarmsState } from "@states/featureState";
// 컴포넌트 import
import CommonModal from "@components/shared/CommonModal";
import AlarmListItem from "./AlarmListItem";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function,
}

// 컴포넌트 정의
const AlarmModal = ({visible, setVisible}:Props):JSX.Element => {
  // 상태정보 - 알람 리스트
  const [ alarms, setAlarms ] = useRecoilState(alarmsState);

  // 함수 - 알람 제거
  const deleteAlarm = async(idx: number) => {
    // 알람 삭제
    const updatedAlarms = [...alarms];
    updatedAlarms.splice(idx, 1);
    // 삭제한 알람 업데이트
    await AsyncStorage.setItem("alarmLog", JSON.stringify(updatedAlarms));
    await setAlarms(updatedAlarms);
  }

  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={() => setVisible(false)}
      sumbitModal={() => setVisible(false)}
      title="알람"
      guide="알람을 확인하고 제거해주세요"
      body={
        <>
          {alarms.map((alarm, index) => (
            <AlarmListItem key={index} alarm={alarm} 
              deleteAlarm={() => deleteAlarm(index)} 
            />
          ))}
        </>
      }
    />
  )
}

export default AlarmModal