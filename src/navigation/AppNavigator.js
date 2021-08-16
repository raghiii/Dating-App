import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Basic from '../screens/Basic';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Basic />
    </NavigationContainer>
  );
};

export default AppNavigator;
