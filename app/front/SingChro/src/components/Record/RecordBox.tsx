// 모듈 import
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// 태그 import
import { View, Text, StyleSheet } from "react-native";
// 함수 import
import { useState, useEffect } from "react";
// 상태정보 import
import { useRecoilState } from 'recoil';
import { recordState } from '@states/featureState';
// 컴포넌트 import
import FunctionBtn from "@components/shared/FunctionBtn";
import RoundBtn from '@components/shared/RoundBtn';
// 네비게이션 import
import { NavigationProp } from '@react-navigation/native';

// 스타일
const styles = StyleSheet.create({
  recordBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:"#5667FD",
    opacity: 0.5
  },
  recordBox: {
    height:"40%",
    width: "100%",
    paddingHorizontal:"5%",
    justifyContent: "space-evenly",
    alignItems: "center",

  },
  btnBox:{
    width:"100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  timeTxt: {
    fontSize: 70,
    fontWeight:"bold",
    color: "white"
  }
});

// 레코더 선언 및 설정
const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);

// 컴포넌트
const RecordBox = ({navigation}:{navigation:NavigationProp<any>}):JSX.Element => {
  // 상태정보 - 녹음 파일 경로
  const [ record, setRecord ] = useRecoilState(recordState)

  // 변수 - 녹음 관련
  const [isStarted, setIsStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [second, setSecond ] = useState(0);

  // 변수 - 레코드 아이콘
  const startIcon = require("@assets/icon/record.png");
  const playIcon = require("@assets/icon/play.png");
  const stopIcon = require("@assets/icon/stop.png");

  // 함수 - 녹음 시작
  const startRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    await setRecord(result);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setTimer(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      // console.log(e.currentPosition);
    });
    setIsStarted(true);
    setRecording(true);
  }

  // 함수 - 녹음 재시작 | 일시정지
  const handleRecord = async () => {
    // 녹음 재시작
    if (!recording) {
      const result = await audioRecorderPlayer.resumeRecorder();
      setRecording(true);
    // 녹음 일시정지
    } else {
      const result = await audioRecorderPlayer.pauseRecorder();
      setRecording(false);
    }
  }

  // 함수 - 녹음 초기화
  const resetRecord = async() => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    await setRecording(false);
    await setIsStarted(false);
    await setTimer("00:00:00");
  }

  // 함수 - 녹음 완료
  const completeRecord = async() => {
    await resetRecord();
    await navigation.navigate("RecordDone");
  }

  // 기능 - 페이지가 렌더링되면 권한 부여 & 녹음 초기화
  useEffect(() => {
    // 포커스가 벗어날 때 녹음을 정지
    const unsubscribe = navigation.addListener("beforeRemove",  resetRecord);
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View style={styles.recordBox}>
      <View style={styles.recordBg}></View>
      <Text style={styles.timeTxt}>{timer}</Text>
      <View style={styles.btnBox}>
        {/* 초기화 버튼 */}
        {isStarted && !recording &&
          <FunctionBtn btnFunc={resetRecord} btnText="초기화" width={30}/>
        }
        {/* 시작 버튼 */}
        {!isStarted && 
          <RoundBtn btnFunc={startRecord} btnIcon={startIcon}/>
        }
        {/* 재시작 | 일시정지 버튼 */}
        {isStarted &&
          <RoundBtn btnFunc={handleRecord} btnIcon={recording? stopIcon: playIcon}/>
        }
        {/* 완료 버튼 */}
        {isStarted && !recording &&
          <FunctionBtn btnFunc={completeRecord} btnText="완료" width={30}/>
        }
      </View>
    </View>
  )
}

export default RecordBox