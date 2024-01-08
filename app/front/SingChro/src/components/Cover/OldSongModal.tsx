// 함수 import
import { axiosOriginal } from "@functions/axiosFunc";
import { useEffect, useState } from "react";
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
// 타입 import
import { OriginalSong } from "@constants/modelTypes";
// 컴포넌트 import
import CommonModal from "@components/shared/CommonModal";
import OldSongList from "./OldSongList";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
}

// 컴포넌트 정의
const OldSongModal = ({visible, setVisible}:Props):JSX.Element => {
  // 변수 - 보이스 모델 정보
  const [ songs, setSongs ] = useState<Array<OriginalSong>>([]);

  // 함수 - 유저가 보유하고 있는 보이스 모델 로드
  const findOldSongs = async() => {
    const userId = await AsyncStorage.getItem("id");
    try {
      // api 요청
      const result = await axiosOriginal(`/user/${userId}/`, "GET");
      await setSongs(result);
    } catch(err) {
      // api 오류
      console.log(err)
    }
  }
  
  // 함수 - 모달창 종료 함수
  const closeModal = () => {
    setVisible(false);
  }

  // 기능 - 모달창이 로드되면 보이스 모델 로드
  useEffect(() => {
    findOldSongs();
  }, []);


  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={closeModal}
      sumbitModal={closeModal}
      title="노래 선택"
      guide="커버할 노래 선택"
      body={<OldSongList songs={songs}/>}
    />
  )
}

export default OldSongModal