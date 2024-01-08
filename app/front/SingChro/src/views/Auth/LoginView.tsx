// 태그 import
import { ScrollView, View  } from "react-native";
// 함수 import
import { useState, useEffect  } from "react";
import { axiosAuth } from "@functions/axiosFunc";
import { startHome } from '@functions/authFunc';
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
// 컴포넌트 import
import FunctionBtn from "@components/shared/FunctionBtn";
import AuthInput from "@components/shared/AuthInput";
import MascotBg from "@components/shared/MascotBg";
import AuthSide from "@components/Auth/AuthSide";
// 스타일 import
import { loginStyles } from "@styles/loginStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const LoginView = ({navigation}:NavigationProps<"Login">):JSX.Element => {
  // 변수 - 이메일, 비밀번호 입력값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("../../assets/images/mascot1.jpg");

  // 변수 - 오류 메시지
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // 함수 - 회원가입 페이지 이동
  const moveSignup = () => {
    navigation.navigate("Signup");
  };

  // 함수 -  비밀번호 찾기 페이지 이동
  const findPw = () => {

  }

  // 함수 - 오류 메시지 초기화
  const errorReset = () => {
    setEmailError(null);
    setPasswordError(null);
  }

  // 함수 - 로그인
  const handleLogin = async() => {
    // 오류 메시지 초기화
    errorReset();
    // 이메일 중복 검증
    const emailDuplication = await axiosAuth("/email-check/","POST", {email: email});
    if (emailDuplication.result) {
      setEmailError("존재하지 않는 이메일입니다.");
      return;
    }
    // 비밀번호 검증
    try {
      const {token, id} = await axiosAuth("/login/", "POST", {email: email, password: password});
        // userId, token 스토리지에 저장
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("id", id.toString());
        // 홈으로 이동
        startHome(navigation);
    } catch {
      setPasswordError("비밀번호가 틀립니다.");
    }
  }

  // 기능 - 포커스가 이동되면 입력값 및 오류메시지 초기화
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail("");
      setPassword("");
      errorReset();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={loginStyles.container}>
      {/* 배경 이미지 */}
      <MascotBg ImgUrl={imgUrl}/>
      {/* 입력창 박스 */}
      <View style={loginStyles.contentBox}>
        {/* 이메일 입력창 */}
        <AuthInput val={email} change={setEmail} secure={false} label="이메일" errorMsg={emailError}/>
        {/* 비밀번호 입력창 */}
        <AuthInput val={password} change={setPassword} secure={true} label="비밀번호" errorMsg={passwordError}/>
        {/* 회원기능 이동 링크 */}
        <AuthSide txt1="회원가입" fn1={moveSignup} txt2="비밀번호 찾기" fn2={findPw}/>
        {/* 로그인 버튼 */}
        <FunctionBtn btnFunc={handleLogin} btnText="로그인"/>
      </View>
    </ScrollView>
  )
}

export default LoginView