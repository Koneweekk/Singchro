// 모듈 import
import { PERMISSIONS, requestMultiple, checkMultiple  } from 'react-native-permissions';
// 태그 import
import { Image, Text, Alert, Animated, TouchableOpacity, Platform, Linking } from "react-native";
// 상태정보 import
import { loadToken } from "@functions/authFunc";
// 함수 import
import { useState, useEffect, useRef } from "react"
import { checkMediaPermission, checkAlarmPermission, openAppSettings } from '@functions/permissionFunc';
// 스타일 import
import { startStyles } from "@styles/startStyles";
// 네비게이션 import
import { NavigationProps } from "@constants/featureTypes";

const StartView = ({navigation}:NavigationProps<"Start">):JSX.Element => {
  // 변수 - 애니메이션 관련 변수
  const [isDone, setIsDone] = useState(false);
  const animatedMargin = useRef(new Animated.Value(100)).current;

  // 함수 - 애니메이션 작동
  const startAnimation = () => {
    // 애니메이션 변수 초기화
    animatedMargin.setValue(100);
    setIsDone(false);
    // 애니메이션 실행
    Animated.timing(animatedMargin, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setIsDone(true);
    });
  };

  // 함수 - 토큰 여부에 따라 이동할 페이지 선택
  const moveScreen = async() => {
    // 토큰 저장여부 판단
    const token = await loadToken();
    // 저장 여부에 따라 이동 위치 선정
    if (token === null) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Home");
    }
  }

  // 함수 - 로그인 페이지로 이동
  const checkPermissions = async() => {
    // 애니메이션이 완료될 때까지 대기
    if (!isDone) {
      return;
    }
    // 미디어 권한 요청 확인
    const mediaPermission = await checkMediaPermission();
    const alarmPermission = await checkAlarmPermission();
    if (!mediaPermission) {
      Alert.alert(
        "미디어 권한 요청",          
        "원활한 서비스을 위해 녹음과 미디어 파일에 대한 권한을 수락해주세요.",
        [ 
          {text: "확인"},
          {onPress: openAppSettings}
        ],
        // 뒤로가기 버튼으로 Alert 창을 닫을 수 있게 할지 여부
        { cancelable: true } 
      );
      return
    }
    // 알람 권한 요청 확인
    if (!alarmPermission) {
      Alert.alert(
        "푸쉬 알람 권한 거절",          
        "푸쉬 알람 권한을 거절하였습니다.\n알람창에서 차후 변경하실 수 있습니다.",
        [ 
          {onPress: moveScreen}
        ],
        // 뒤로가기 버튼으로 Alert 창을 닫을 수 있게 할지 여부
        { cancelable: true } 
      );
    } else {
      moveScreen();
    }
  };

  // 기능 - 컴포넌트가 화면에 나타나면 애니메이션 시작
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // 컴포넌트가 화면에 다시 나타날 때 애니메이션을 재시작합니다.
      startAnimation();
    });
    return unsubscribe;
  }, [navigation]);

  // 페이지 구현
  return (
    <TouchableOpacity 
      style={startStyles.totalBox} 
      onPress={checkPermissions} 
      activeOpacity={1}
    >
      {/* 타이틀 이미지 + 애니메이션*/}
      <Animated.View style={{ ...startStyles.titleImg, opacity: animatedMargin.interpolate({
        inputRange: [0, 100], // input 범위 설정
        outputRange: [1, 0], // output 범위 설정
      }) }}>
        <Image 
          source={require("@assets/images/Headline.png")} 
        />
      </Animated.View>
      {/* 안내 텍스트 */}
      <Text 
        style={startStyles.pushMsg}
      >
        {isDone && "터치하여 시작"}
      </Text>
      {/* 마스코트 이미지 + 애니메이션 */}
      <Animated.View style={{ ...startStyles.imgBox, marginTop: animatedMargin.interpolate({
        inputRange: [0, 100], // input 범위 설정
        outputRange: ["0%", "110%"], // output 범위 설정
      }) }}>
        <Image 
          source={require("@assets/images/mascot3.jpg")} 
          style={startStyles.startImg}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default StartView;





