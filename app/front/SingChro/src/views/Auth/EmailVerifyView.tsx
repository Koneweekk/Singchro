// 태그 import
import { ScrollView, View } from "react-native";
// 함수 import
import { useState, useEffect } from "react"
import { axiosAuth } from "@functions/axiosFunc";
import { getAlarmToken } from "@functions/alarmFunc";
// 컴포넌트 import
import FunctionBtn from "@components/shared/FunctionBtn";
import AuthInput from "@components/shared/AuthInput";
import MascotBg from "@components/shared/MascotBg";
import AuthSide from "@components/Auth/AuthSide";
// 스타일 import
import { loginStyles } from "@styles/loginStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";


const EmailVerifyView = ({ navigation, route }:NavigationProps<"EmailVerify">):JSX.Element => {
  // 변수 - 회원정보, 인증번호
  const { email, password, nickname } = route.params;
  const [ emailNum1, setEmailNum1 ] = useState<string>("");
  const [ emailNum2, setEmailNum2 ] = useState<string>("");

  // 변수 - 마스코트 이미지 주소
  const imgUrl = require("@assets/images/mascot1.jpg");

  // 변수 - 오류 메시지
  const [emailNumErr, setEmailNumError] = useState<string | null>(null);

  // 함수 - 인증번호 보내기
  const sendEmail = async() => {
    const { code } = await axiosAuth("/email-verify/","POST", {email: email});
    setEmailNum2(code);
  };

  // 함수 - 이메일 인증 후 회원가입
  const handleVerifyEmail = () => {
    // 인증 번호 검증
    if (emailNum1 !== emailNum2) {
      setEmailNumError("인증번호가 틀립니다.");
      return;
    } else {
    // 회원가입
      (async() => {
        const alarmToken = await getAlarmToken();
        try {
          const result = await axiosAuth("/","POST", {
            email: email, 
            password: password, 
            nickname: nickname,
            alarmToken: alarmToken
          });
          navigation.navigate("Login");
        // 예외 처리
        } catch(err) {
        }
        // 회원가입 성공시 로그인 페이지로 이동
      })();
    }
  };

  // 기능 - 화면이 렌더링되면 인증번호 보내기
  useEffect(() => {
    sendEmail();
  }, [])

  return (
    <ScrollView contentContainerStyle={loginStyles.container}>
      {/* 배경 이미지 */}
      <MascotBg ImgUrl={imgUrl}/>
      {/* 입력창 박스 */}
      <View style={loginStyles.contentBox}>
        {/* 인증번호 입력창 */}
        <AuthInput val={emailNum1} change={setEmailNum1} secure={false} label="인증번호" errorMsg={emailNumErr}/>
        {/* 회원기능 이동 링크 */}
        <AuthSide txt1="인증번호 다시 보내기" fn1={sendEmail}/>
        {/* 인증 버튼 */}
        <FunctionBtn btnFunc={handleVerifyEmail} btnText="이메일 인증"/>
      </View>
    </ScrollView>
  )
}

export default EmailVerifyView