/**
 * @format
 */

import {AppRegistry} from 'react-native';
// Core App
import {App} from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
