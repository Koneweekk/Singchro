// 태그 import
import { ScrollView, View } from "react-native";
// 함수 import
import { useState } from "react";
import { axiosAuth } from "@functions/axiosFunc";
import { checkEmail, checkPassword } from "@functions/validationFunc";
// 컴포넌트 import
import FunctionBtn from "@components/shared/FunctionBtn";
import AuthInput from "@components/shared/AuthInput";
import MascotBg from "@components/shared/MascotBg";
import AuthSide from "@components/Auth/AuthSide";
// 스타일 import
import { loginStyles } from "@styles/loginStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const SignupView = ({navigation} : NavigationProps<"Signup">):JSX.Element => {
  // 변수 - 이메일, 닉네임 , 비밀번호 입력값
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");

  // 변수 - 오류 메시지
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pw1Error, setPw1Error] = useState<string | null>(null);
  const [pw2Errpr, setPw2Error] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("../../assets/images/mascot1.jpg");

  // 함수 - 에러메시지 초기화
  const errorReset = () => {
    setEmailError(null);
    setPw1Error(null);
    setPw2Error(null);
    setNameError(null);
  }

  // 함수 - 로그인 페이지 이동
  const moveLogin = () => {
    navigation.navigate("Login");
  };

  // 함수 -  입력값 유효성 검사
  const handleValidation = async() => {
    // 에러메시지 초기화
    errorReset();
    try {
      // 이메일 검증
      const checkedEmail = checkEmail(email);
      if (!checkedEmail) {
        setEmailError("이메일 형식을 확인해주세요.");
        return;
      }
      // 이메일 중복 검증
      const emailDuplication = await axiosAuth('/email-check/','POST', {email: email});
      if (!emailDuplication.result) {
        setEmailError("이미 등록된 이메일입니다.");
        return;
      }
      // 비밀번호 검증
      if (!checkPassword(pw1)) {
        setPw1Error("영문, 숫자 조합으로 8~16자로 입력해주세요");
        return;
      }
      // 비밀번호 확인 검증
      if (pw1 !== pw2) {
        setPw2Error("비밀번호가 동일하지않습니다.");
        return;
      }
      // 닉네임 검증
      const nameLen = name.length;
      if (nameLen < 1 || nameLen > 8) {
        setNameError("1~8글자를 입력해주세요");
        return;
      }
      // 닉네임 중복 검증
      const nicknameDuplication = await axiosAuth('/nickname-check/','POST', {nickname: name});
      if (!nicknameDuplication.result){
        setNameError("중복된 닉네임입니다.");
        return;
      }
      // 모두 통과 시 이메일 인증 페이지로 이동
      navigation.navigate("EmailVerify", { email: email, password: pw1, nickname: name });
    // api 호출 오류
    } catch {

    }

  }

  // 페이지 구현
  return (
    <ScrollView contentContainerStyle={loginStyles.container}>
      {/* 배경 이미지 */}
      <MascotBg ImgUrl={imgUrl}/>
      {/* 입력창 박스 */}
      <View style={loginStyles.contentBox}>
        {/* 이메일 입력창 */}
        <AuthInput val={email} change={setEmail} secure={false} label="이메일" errorMsg={emailError}/>
        {/* 비밀번호 입력창 */}
        <AuthInput val={pw1} change={setPw1} secure={true} label="비밀번호" errorMsg={pw1Error}/>
        {/* 비밀번호 확인 입력창 */}
        <AuthInput val={pw2} change={setPw2} secure={true} label="비밀번호 확인" errorMsg={pw2Errpr}/>
        {/* 닉네임 입력창 */}
        <AuthInput val={name} change={setName} secure={false} label="닉네임" errorMsg={nameError}/>
        {/* 회원기능 이동 링크 */}
        <AuthSide txt1="이미 계정이 존재합니까?" fn1={moveLogin}/>
        {/* 회원가입 버튼 */}
        <FunctionBtn btnFunc={handleValidation} btnText="회원가입"/>
      </View>
    </ScrollView>
  )
}

export default SignupView