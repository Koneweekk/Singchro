// 모듈 import
import { CommonActions } from '@react-navigation/native';
// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
// 네비게이션 import
import { NavigationProp } from '@react-navigation/native';

// 함수 - 토큰 불러오기
const loadToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return Error;
  }
};

// 함수 - 토큰 초기화
const resetToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
  } catch (error) {
    return Error;
  }
};

// 함수 - 홈화면으로 처음 진입
const startHome = (navigation: NavigationProp<any>) => {
  navigation.navigate("Home");
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: "Start"},
        { name: "Home" }
      ],
    })
  );
}

export {loadToken, resetToken, startHome}