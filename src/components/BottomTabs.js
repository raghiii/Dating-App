import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export const BottomTabs = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonContainer}>
              <Text style={{color: isFocused ? '#FFF' : '#7F6384'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#13151A'},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#1D1925',
    position: 'relative',
    bottom: 20,
    borderRadius: 30,
    margin: 10,
  },
  buttonContainer: {flex: 1, alignItems: 'center'},
});
