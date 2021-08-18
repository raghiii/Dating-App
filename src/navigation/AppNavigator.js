import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import Basic from '../screens/Basic';
import Details from '../screens/Details';
import Profile from '../screens/Profile';
import {BottomTabs} from '../components/BottomTabs';

enableScreens();

const Tab = createBottomTabNavigator();

const Stack = createSharedElementStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabs {...props} />}>
      <Tab.Screen
        name="Home"
        component={Basic}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Basic" headerMode="none">
        <Stack.Screen name="Basic" component={HomeTabs} />
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
