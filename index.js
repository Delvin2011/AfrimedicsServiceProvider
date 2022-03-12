/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushBackground from './src/manager/PushBackground';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'android') {
  AppRegistry.registerHeadlessTask(
    'RNFirebaseBackgroundMessage',
    () => PushBackground,
  );
}

//main entry point of the project/application.
//metro is the compiler
//AppRegistry

/*import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName.toLowerCase(), () => App);*/
