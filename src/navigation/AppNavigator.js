import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {enableScreens} from 'react-native-screens';
import Basic from '../screens/Basic';
import Details from '../screens/Details';

enableScreens();

const Stack = createSharedElementStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Basic">
        <Stack.Screen name="Basic" component={Basic} />
        <Stack.Screen
          name="Details"
          component={Details}
          sharedElements={(route, otherRoute, showing) => {
            const {item} = route.params;
            return [
              {
                id: `item.${item.id}.photo`,
                // animation: 'fade',
                // resize: 'clip',
                // align: 'left-top',
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
