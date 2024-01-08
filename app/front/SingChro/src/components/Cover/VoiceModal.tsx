// 함수 import
import { axiosVoice } from "@functions/axiosFunc";
import { useEffect, useState } from "react";
// 상태정보 import
import { voiceOwnerState } from "@states/featureState";
import { useRecoilState } from "recoil";
// 타입 import
import { VoiceModel } from "@constants/modelTypes";
// 컴포넌트 import
import CommonModal from "@components/shared/CommonModal";
import VoiceList from "./VoiceList";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
}

// 컴포넌트 정의
const VoiceModal = ({visible, setVisible}:Props):JSX.Element => {
  // 상태정보 - 현재 선택된 유저의 아이디
  const [ voiceOwner ] = useRecoilState(voiceOwnerState);

  // 변수 - 보이스 모델 정보
  const [voices, setVoices] = useState<Array<VoiceModel>>([]);

  // 함수 - 유저가 보유하고 있는 보이스 모델 로드
  const findVoices = async() => {
    // api 요청
    try {
      const result = await axiosVoice(`/user/${voiceOwner}`, "GET");
      await setVoices(result);
    // api 오류
    } catch(err) {
    }
  }

  // 함수 - 모달창 종료 함수
  const closeModal = () => {
    setVisible(false);
  }

  // 기능 - 모달창이 로드되면 보이스 모델 로드
  useEffect(() => {
    findVoices();
  }, []);


  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={closeModal}
      sumbitModal={closeModal}
      title="음성 모델 선택"
      guide="노래를 부르게 할 음성 모델 선택"
      body={<VoiceList voices={voices}/>}
    />
  )
}

export default VoiceModal