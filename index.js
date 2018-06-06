import { AppRegistry } from 'react-native';
import App from './App';
import BackgroundMessages from "./app/common/helpers/BackgroundMessages";

AppRegistry.registerComponent('trafficbuddy', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => BackgroundMessages);


