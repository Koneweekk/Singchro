// 컴포넌트 import
import CommonModal from "@components/shared/CommonModal";
import CoverManageList from "./CoverManageList";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
}

// 컴포넌트 정의
const CoverManageModal = ({visible, setVisible}:Props):JSX.Element => {
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
      title="커버송 관리"
      guide="커버송 삭제 가능"
      body={<CoverManageList/>}
    />
  )
}

export default CoverManageModal