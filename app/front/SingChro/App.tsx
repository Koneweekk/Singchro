// 모듈 import
import messaging from '@react-native-firebase/messaging';
// 기본 요소 import
import * as React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// 태그 import
import { StatusBar, useColorScheme } from 'react-native';
// 함수 import
import { useEffect } from 'react';
import { displayNoti, recordAlarmLog } from '@functions/alarmFunc';
// 상태정보 import
import { RecoilRoot } from 'recoil';
// 네비게이션 import
import { RootStackParamList } from '@constants/featureTypes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// 뷰 import
import StartView from '@views/Start/StartView';
import LoginView from '@views/Auth/LoginView';
import SignupView from '@views/Auth/SignupView';
import EmailVerifyView from '@views/Auth/EmailVerifyView';
import HomeView from '@views/Home/HomeView';
import OtherHomeView from '@views/Home/OtherHomeView';
import ProfileView from '@views/Profile/ProfileView';
import SearchCoverView from '@views/Search/SearchCoverView';
import MusicPlayerView from '@views/Player/MusicPlayerView';
import RecordStartView from '@views/Record/RecordStartView';
import RecordDoingView from '@views/Record/RecordDoingView';
import RecordDoneView from '@views/Record/RecordDoneView';
import RecordRequestView from '@views/Record/RecordRequestView';
import VoicePickView from '@views/Cover/VoicePickView';
import SongPickView from '@views/Cover/SongPickView';
import CoverConfirmView from '@views/Cover/CoverConfirmView';
import CoverDoneView from '@views/Cover/CoverDoneView';

// 스택 선언
const Stack = createNativeStackNavigator<RootStackParamList>();

// 앱 구현
function App(): JSX.Element {
  // 변수 - 상단 바 다크 모드 설정
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 기능 - 푸쉬 알람 및 알람 기록
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await displayNoti(remoteMessage);
      await recordAlarmLog(remoteMessage);
    });
    return unsubscribe;
  }, []);

  // 렌더링 코드
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <RecoilRoot>
        
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Start" 
            screenOptions={{ headerShown: false }}
          > 
            {/* 앱을 구성하는 페이지들을 넣는 곳 */}
            <Stack.Screen name="Start" component={ StartView } />
            {/* 회원 */}
            <Stack.Screen name="Login" component={ LoginView } />
            <Stack.Screen name="Signup" component={ SignupView } />
            <Stack.Screen name="EmailVerify" component={ EmailVerifyView } />
            {/* 마이페이지 */}
            <Stack.Screen name="Profile" component={ ProfileView } />
            {/* 커버곡 검색 */}
            <Stack.Screen name="SearchCover" component={ SearchCoverView } />
            {/* 음악 재생 */}
            <Stack.Screen name="MusicPlayer" component={ MusicPlayerView } />
            {/* 홈 */}
            <Stack.Screen name="Home" component={ HomeView } />
            <Stack.Screen name="OtherHome" component={ OtherHomeView } />
            {/* 녹음 */}
            <Stack.Screen name="RecordStart" component={ RecordStartView } />
            <Stack.Screen name="RecordDoing" component={ RecordDoingView } />
            <Stack.Screen name="RecordDone" component={ RecordDoneView } />
            <Stack.Screen name="RecordRequest" component={ RecordRequestView } />
            {/* 커버 */}
            <Stack.Screen name="VoicePick" component={ VoicePickView } />
            <Stack.Screen name="SongPick" component={ SongPickView } />
            <Stack.Screen name="CoverConfirm" component={ CoverConfirmView } />
            <Stack.Screen name="CoverDone" component={ CoverDoneView } />
            {/* 여기까지 */}
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}

export default App;
