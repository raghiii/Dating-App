import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const BasicScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    justifyContent: 'center',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity
        onPress={() =>
          navigation.push('Details', {
            item: {
              id: 1,
              url: require('../assets/profiles/1.jpg'),
            },
          })
        }>
        <SharedElement id={`item.${1}.photo`}>
          <Image
            source={require('../assets/profiles/1.jpg')}
            style={styles.image}
          />
        </SharedElement>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
});

export default BasicScreen;
