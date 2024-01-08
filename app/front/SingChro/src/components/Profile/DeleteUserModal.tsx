// 함수 import
import { useState } from "react";
import { axiosAuthed } from "@functions/axiosFunc";
import { resetToken } from "@functions/authFunc";
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
// 컴포넌트 import
import AuthInput from "@components/shared/AuthInput";
import CommonModal from "@components/shared/CommonModal";
import { NavigationProp } from '@react-navigation/native';

// props 정의
interface Props {
  visible: boolean,
  setVisible: Function
  navigation: NavigationProp<any>
}

// 컴포넌트 정의
const DeleteUserModal = ({visible, setVisible, navigation}:Props):JSX.Element => {
  // 변수 - 입력값, 오류 메시지
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")

  // 변수 - 입력창 컴포넌트
  const inputBody = ():JSX.Element => {
    return(
      <>
        <AuthInput label="비밀번호 확인" val={password} change={setPassword} secure={true} errorMsg={errMsg}/>
      </>
    )
  }

  // 함수 - 모달창 종료 함수
  const closeModal = () => {
    setVisible(false);
    setPassword("");
    setErrMsg("");
  }

  // 함수 - 변경 완료 함수
  const submitModal = async() => {
    const id = await AsyncStorage.getItem("id");
    try {
      const result = await axiosAuthed(`/${id}/`, "DELETE", {password:`${password}`});
      await resetToken();
      navigation.navigate("Start");
    } catch(err) {
      setErrMsg("비밀번호가 틀립니다.");
    }
  } 

  // 컴포넌트 구현
  return(
    <CommonModal
      visible={visible}
      closeModal={closeModal}
      sumbitModal={submitModal}
      title="회원탈퇴"
      guide="비밀 번호 확인 필요"
      body={inputBody()} 
    />
  )
}

export default DeleteUserModal