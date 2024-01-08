/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { recordAlarmLog } from '@functions/alarmFunc';

messaging().setBackgroundMessageHandler(async msg => {
  await recordAlarmLog(msg);
});

AppRegistry.registerComponent(appName, () => App);
