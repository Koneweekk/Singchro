// 모듈 import
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// 태그 import
import { View, StyleSheet, Text } from "react-native";
import Slider from '@react-native-community/slider';
// 상태정보 import
// 함수 import
import { useState, useEffect } from "react";
// 컴포넌트 import
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
  playBox: {
    width: "100%",
    paddingTop:10,
    paddingBottom:40,
    paddingHorizontal:"5%",
    justifyContent: "space-between",
    alignItems:"center"
  },
  txtBox:{
    width:"85%",
    marginBottom:"5%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeTxt:{
    fontSize: 20,
    fontWeight: "bold",
    color:"white"
  },
  slider: {
    marginTop:"5%",
    alignSelf:"stretch"
  },
});

// 플레이어 선언 및 설정
const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);

// 컴포넌트
const PlayBox = ({navigation}:{navigation:NavigationProp<any>}):JSX.Element => {
  // 변수 - 재생 관련
  const [isStarted, setIsStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [durationTxt, setDurationTxt] = useState("00:00:00");
  const [positionTxt, setPositionTxt] = useState("00:00:00");

  // 변수 - 아이콘
  const playIcon = require("@assets/icon/play.png");
  const stopIcon = require("@assets/icon/stop.png");

  // 함수 - 녹음 재생 시작
  const startPlay = async(url?:string) => {
    const result = await audioRecorderPlayer.startPlayer(url);
    audioRecorderPlayer.addPlayBackListener(async(e) => {
      // 총 재생 시간 설정
      if (!duration) {
        setDuration(e.duration);
        setDurationTxt(audioRecorderPlayer.mmssss(e.duration))
      }
      // 재생 완료
      if (e.currentPosition === e.duration) {
        await stopPlayer();
        setPosition(0);
        setIsStarted(false);
        setPlaying(false);
      }
      // 현재 재생 시간 설정
      setPosition(e.currentPosition)
      setPositionTxt(audioRecorderPlayer.mmssss(e.currentPosition));
    })
    setIsStarted(true);
    setPlaying(true);
  }

  // 함수 - 플레이어 종료
  const stopPlayer = async() => {
    const result = await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  }

  // 함수 - 녹음 재생 재시작 및 일시 중지
  const handlePlay = async() => {
    if (playing) {
      const result = await audioRecorderPlayer.pausePlayer();
      await setPlaying(false);
    } else {
      const result = audioRecorderPlayer.resumePlayer();
      await setPlaying(true);
    }
  }

  // 함수 - 녹음 재생 시각 변경
  const handlePosition = async(time:number) => {
    if (isStarted) {
      const result = await audioRecorderPlayer.seekToPlayer(time);
      await setPosition(time);
    }
  }

  // 기능 - 페이지가 렌더링되면 권한 부여 & 녹음 초기화
  useEffect(() => {
    // 포커스가 벗어날 때 녹음을 정지
    const unsubscribe = navigation.addListener("beforeRemove",  stopPlayer);
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View style={styles.playBox}>
      <View style={styles.recordBg}></View>
      {/* 재생 슬라이더 */}
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        step={10}
        onValueChange={(value) => handlePosition(value)}
        minimumTrackTintColor='black'
        maximumTrackTintColor='white'
        thumbTintColor='#5667FD'
      />
      {/* 재생시간 표기 */}
      <View style={styles.txtBox}>
        <Text style={styles.timeTxt}>{positionTxt}</Text>
        <Text style={styles.timeTxt}>{durationTxt}</Text>
      </View>
      {/* 재생버튼 */}
      <RoundBtn 
        btnFunc={isStarted? handlePlay : startPlay} 
        btnIcon={playing? stopIcon: playIcon}
      />
    </View>
  )
}

export default PlayBox