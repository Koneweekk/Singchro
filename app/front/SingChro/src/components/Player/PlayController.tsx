// 모듈 import
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
// 태그 import
import { View, StyleSheet, Text } from "react-native";
import Slider from '@react-native-community/slider';
// 상태정보 import
import { playListState, playPositionState, playingState } from "@states/featureState";
import { useRecoilState } from "recoil";
// 타입 import
import { CoverTotal } from '@constants/featureTypes';
// 함수 import
import { useState, useEffect } from "react";
// 컴포넌트 import
import RoundBtn from '@components/shared/RoundBtn';
// 네비게이션 import
import { NavigationProp } from '@react-navigation/native';

// Props 정의
interface Props {
  navigation: NavigationProp<any>;
  cover: CoverTotal;
}

// 스타일
const styles = StyleSheet.create({
  // 전체 컨테이너
  playBox: {
    width: "100%",
    paddingBottom:30,
    paddingHorizontal:"5%",
    justifyContent: "space-between",
    alignItems:"center"
  },
  recordBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:"#5667FD",
    opacity: 0.5
  },
  // 슬라이더
  slider: {
    alignSelf:"stretch"
  },
  // 재생시간 표기
  txtBox:{
    width:"85%",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeTxt:{
    fontSize: 20,
    fontWeight: "bold",
    color:"white"
  },
  // 버튼 박스
  btnBox: {
    width: "90%",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

// 플레이어 선언 및 설정
const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

// 컴포넌트
const PlayController = ({navigation, cover}: Props):JSX.Element => {
  // 변수 - 플레이리스트 관련
  const [ playPosition, setPlayPosition ] = useRecoilState(playPositionState);
  const [ playList, setPlayList ] = useRecoilState(playListState);
  const [ playing, setPlaying ] = useRecoilState(playingState);

  // 변수 - 재생 관련
  const [isStarted, setIsStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [durationTxt, setDurationTxt] = useState("00:00");
  const [positionTxt, setPositionTxt] = useState("00:00");
  const [repeat, setRepeat] = useState(false);

  // 변수 - 아이콘
  const playIcon = require("@assets/icon/play.png");
  const stopIcon = require("@assets/icon/stop.png");
  const prevIcon = require("@assets/icon/prev.png");
  const nextIcon = require("@assets/icon/next.png");
  const shuffleIcon = require("@assets/icon/shuffle.png");
  const repeatIcon = require("@assets/icon/repeat.png");
  const rotateIcon = require("@assets/icon/rotation.png");

  // 함수 - 녹음 재생 시작
  const startPlay = async() => {
    const url = cover.coverPath || "";
    const result = await audioRecorderPlayer.startPlayer(url);
    audioRecorderPlayer.addPlayBackListener(async(e) => {
      // 총 재생 시간 설정
      if (duration !== e.duration) {
        setDuration(e.duration);
        setDurationTxt(audioRecorderPlayer.mmssss(e.duration).slice(0,5))
      }
      // 현재 재생 시간 설정
      setPosition(e.currentPosition)
      setPositionTxt(audioRecorderPlayer.mmssss(e.currentPosition).slice(0,5));
    })
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
    if (position === duration) {
      repeatSong();
    }
    else if (playing) {
      const result = await audioRecorderPlayer.seekToPlayer(time);
      await setPosition(time);
    }
  }

  // 함수 - 이전 곡으로 이동
  const movePrev = async() => {
    const playListSize = playList.length;
    const prevIndex = (playListSize + playPosition - 1) % playListSize;
    await setPlayPosition(prevIndex);
    navigation.navigate("MusicPlayer", {coverTotal: playList[prevIndex]});
  }

  // 함수 - 다음 곡으로 이동
  const moveNext = async() => {
    const playListSize = playList.length;
    const nextIndex = (playListSize + playPosition + 1) % playListSize;
    await setPlayPosition(nextIndex);
    navigation.navigate("MusicPlayer", {coverTotal: playList[nextIndex]});
  }

  // 함수 - 플레이리스트 셔플
  const handleShuffle = async() => {
    const shuffleList = [...playList];
    shuffleList.sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffleList.length; i++) {
      if (shuffleList[i].id === cover.id) {
        await setPlayPosition(i);
        await setPlayList(shuffleList);
      }
    }
  }

  // 함수 - 노래가 끝날 시 반복 or 다음 곡
  const repeatSong = async() => {
    await stopPlayer();
    // 반복
    if (repeat) await startPlay();
    // 다음곡 재생
    else await moveNext();
  }

  // 기능 - 페이지가 렌더링되면 재생 초기화
  useEffect(() => {
    // 포커스가 벗어날 때 재생을 정지
    const unsubscribe = navigation.addListener("beforeRemove",  async() => {
      await stopPlayer();
      await setPlaying(false);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // 기능 - 노래가 끝나면 반복 or 다음곡 재생
  useEffect(() => {
    if (position > 0 && position === duration) {
      repeatSong();
    }
  }, [position])

  // 기능 - 이 페이지로 이동하면 자동으로 노래 재생
  useEffect(() => {
    const startScreen = async() => {
      await stopPlayer();
      if (playing) {
        await startPlay();
      }
    }
    startScreen();
  }, [cover])

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
      {/* 컨트롤러 버튼 박스 */}
      <View style={styles.btnBox}>
        {/* 셔플 버튼 */}
        <RoundBtn btnFunc={handleShuffle} btnIcon={shuffleIcon} size={30}/>
        {/* 이전 곡 */}
        <RoundBtn btnFunc={movePrev} btnIcon={prevIcon} size={30}/>
        {/* 재생버튼 */}
        <RoundBtn 
          btnFunc={playing? handlePlay : startPlay} 
          btnIcon={playing? stopIcon: playIcon}
        />
        {/* 다음 곡 */}
        <RoundBtn btnFunc={moveNext} btnIcon={nextIcon} size={30}/>
        {/* 반복 여부 */}
        <RoundBtn btnFunc={() => setRepeat(!repeat)} size={30}
          btnIcon={repeat? repeatIcon : rotateIcon} />
      </View>
    </View>
  )
}

export default PlayController