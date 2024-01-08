// 함수 import
import { useState } from "react";
import { checkPassword } from "@functions/validationFunc";
import { axiosAuthed } from "@functions/axiosFunc";
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userState } from "@states/modelState";
import { useRecoilState } from "recoil";
// 컴포넌트 import
import AuthInput from "@components/shared/AuthInput";
import CommonModal from "@components/shared/CommonModal";
// 스타일 import
import { basicShadow } from "@styles/shadowStyles";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
}

// 컴포넌트 정의
const ChangePwModal = ({visible, setVisible}:Props):JSX.Element => {
  // 변수 - 유저 정보
  const [user, setUser] = useRecoilState(userState);

  // 변수 - 입력값, 오류 메시지
  const [old, setOld] = useState("")
  const [new1, setNew1] = useState("")
  const [new2, setNew2] = useState("")
  const [oldErr, setOldErr] = useState("")
  const [new1Err, setNew1Err] = useState("")
  const [new2Err, setNew2Err] = useState("")

  // 변수 - 입력창 컴포넌트
  const inputBody = ():JSX.Element => {
    return(
      <>
        <AuthInput label="새 비밀번호" val={new1} change={setNew1} secure={true} errorMsg={new1Err}/>
        <AuthInput label="새 비밀번호 확인" val={new2} change={setNew2} secure={true} errorMsg={new2Err}/>
        <AuthInput label="이전 비밀번호" val={old} change={setOld} secure={true} errorMsg={oldErr}/>
      </>
    )
  }

  // 함수 - 에러 메시지 초기화
  const resetErr = () => {
    setOldErr("");
    setNew1Err("");
    setNew2Err("");
  }

  // 함수 - 모달창 종료 함수
  const closeModal = () => {
    setVisible(false);
    setOld("");
    setNew1("");
    setNew2("");
    resetErr();
  }

  // 함수 - 변경 완료 함수
  const submitModal = async() => {
    resetErr();
    if (!checkPassword(new1)) {
      setNew1Err("영문, 숫자 조합으로 8~16자로 입력해주세요");
      return;
    }
    if (new1 === old) {
      setNew1Err("이전 비밀번호와 동일합니다!");
      return;
    }
    if (new1 !== new2) {
      setNew2Err("새 비밀번호가 동일하지않습니다.");
      return;
    }
    try {
      const id = await AsyncStorage.getItem("id");
      const bodyInput = { new_password1: new1, new_password2: new2, old_password:old }
      const result = await axiosAuthed(`/${id}/password/`, "PUT", bodyInput);
      closeModal();
    } catch {
      setOldErr("비밀번호가 틀립니다!");
    }
  } 

  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={closeModal}
      sumbitModal={submitModal}
      title="비밀번호 변경"
      guide="비밀 번호를 확인 후 새 비밀번호 입력"
      body={inputBody()} 
    />
  )
}

export default ChangePwModal