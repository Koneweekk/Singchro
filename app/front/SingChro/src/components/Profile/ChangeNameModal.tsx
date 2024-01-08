// 함수 import
import { useState } from "react";
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userState } from "@states/modelState";
import { useRecoilState } from "recoil";
import { axiosAuth, axiosAuthed } from "@functions/axiosFunc";
// 컴포넌트 import
import AuthInput from "@components/shared/AuthInput";
import CommonModal from "@components/shared/CommonModal";

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
}

// 컴포넌트 정의
const ChangeNameModal = ({visible, setVisible}:Props):JSX.Element => {
  // 변수 - 입력값, 오류 메시지
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [pwErr, setPwErr] = useState("")
  const [nameErr, setNameErr] = useState("")

  // 변수 - 유저 정보
  const [user, setUser] = useRecoilState(userState);

  // 변수 - 입력창 컴포넌트
  const inputBody = ():JSX.Element => {
    return(
      <>
        <AuthInput label="새로운 닉네임" val={name} change={setName} secure={false} errorMsg={nameErr}/>
        <AuthInput label="비밀번호 확인" val={password} change={setPassword} secure={true} errorMsg={pwErr}/>
      </>
    )
  }

  // 함수 - 에러 메시지 초기화
  const resetErr = () => {
    setNameErr("");
    setPwErr("");
  }


  // 함수 - 모달창 종료 함수
  const closeModal = () => {
    setVisible(false);
    setPassword("");
    setName("");
    resetErr();
  }

  // 함수 - 변경 완료 함수
  const submitModal = async() => {
    resetErr();
    const nameLen = name.length;
    if (nameLen < 1 || nameLen > 8) {
      setNameErr("1~8글자를 입력해주세요");
      return;
    }
    // 닉네임 중복 체크
    const nicknameDuplication = await axiosAuth('/nickname-check/','POST', {nickname: name});
    if (!nicknameDuplication.result){
      setNameErr("중복된 닉네임입니다.");
      return;
    }
    try {
      // api 호출
      const id = await AsyncStorage.getItem("id");
      const bodyInput = { password: password, nickname: name }
      const result = await axiosAuthed(`/${id}/nickname/`, "PUT", bodyInput);
      // 넥네임 표시 변경
      const newUserInfo = await axiosAuthed(`/${id}/`, "GET", bodyInput);
      await setUser(newUserInfo);
      closeModal();
      // 예외 처리
    } catch(err) {
      setPwErr("비밀번호가 틀립니다!");
    }
  } 

  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={closeModal}
      sumbitModal={submitModal}
      title="닉네임 수정"
      guide="비밀 번호 확인 필요"
      body={inputBody()} 
    />
  )
}

export default ChangeNameModal