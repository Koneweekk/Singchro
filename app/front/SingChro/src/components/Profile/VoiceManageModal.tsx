// 컴포넌트 import
import CommonModal from "@components/shared/CommonModal";
import VoiceManageList from "./VoiceManageList";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
}

// 컴포넌트 정의
const VoiceManageModal = ({visible, setVisible}:Props):JSX.Element => {
  // 함수 - 모달창 종료 함수
  const closeModal = () => {
    setVisible(false);
  }

  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={closeModal}
      sumbitModal={closeModal}
      title="음성 모델 관리"
      guide="삭제 및 비활성화 가능"
      body={<VoiceManageList/>}
    />
  )
}

export default VoiceManageModal