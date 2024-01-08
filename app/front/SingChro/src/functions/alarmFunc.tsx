// 상태정보 import
import AsyncStorage from '@react-native-async-storage/async-storage';
// 모듈 import
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, AndroidColor, AuthorizationStatus} from '@notifee/react-native';

// 1. 기기 토큰 요청
export const getAlarmToken = async () => {
  // 토큰 발행 요청
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
  authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // 요청이 승인되면 토큰 요청
  if (enabled) {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  }
};

// 2. 푸쉬알람 설정
export const displayNoti = async(message:FirebaseMessagingTypes.RemoteMessage) => {
  // 채널 설정(안드로이드 필요)
  const channelAnoucement = await notifee.createChannel({
    id: 'a404-singchro',
    name: 'singchro',
    importance: AndroidImportance.HIGH,
  });
  // 알람 푸시
  const result = await notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId: channelAnoucement,
    },
  });
};

// 3. 알람 로그 기록
export const recordAlarmLog = async(remoteMessage:FirebaseMessagingTypes.RemoteMessage) => {
  const storedAlarms = await AsyncStorage.getItem("alarmLog");
  const currentAlarms = storedAlarms? JSON.parse(storedAlarms) : []
  const nowAlarm = {
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body  
  };
  const alarms = [nowAlarm, ...currentAlarms];
  await AsyncStorage.setItem('alarmLog', JSON.stringify(alarms));
  return alarms
}