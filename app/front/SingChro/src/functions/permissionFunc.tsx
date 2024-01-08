// 모듈 import
import { Platform, Linking } from "react-native";
import { PERMISSIONS, check, request } from "react-native-permissions";
import { requestMultiple, checkMultiple  } from "react-native-permissions";

// 1. 미디어 관련 권한 요청
export const checkMediaPermission = async () => {
  // 안드로이드 버전 확인
  const androidVersion = await Platform.Version;
  const adroidVersionInt = typeof androidVersion === "string"? parseInt(androidVersion) : androidVersion
  let permissions
  // 안드로이드 33미만 일 경우
  if (adroidVersionInt < 33) {
    permissions = [
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ];
  // 그 이상일 경우
  } else {
    permissions = [
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  ];
  }
  // 권한 상태 확인
  const status = await checkMultiple(permissions);
  // 이미 권한이 부여되어 있는지 확인
  const isAllPermissionsGranted = Object.values(status).every((perm) => perm === "granted");
  if (isAllPermissionsGranted) {
    return true;
  }
  // 이미 권한이 부여되지 않았다면 권한 요청
  else {
    const results = await requestMultiple(permissions);
    return(Object.values(results).every((perm) => perm === "granted"));
  }
};

// 2. 알람 관련 권한 요청
export const checkAlarmPermission = async() => {
  const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
  const status = await check(permission);
  if (status === "granted") {
    return true;
  } else {
    const result = await request(permission);
    return (result === "granted");
  }
}

// 3. 권한 설정창 열기
export const openAppSettings = () => {
  if (Platform.OS === 'android') {
    Linking.openSettings();
  }
};