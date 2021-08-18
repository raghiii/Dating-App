import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const BasicScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#13151A' : Colors.lighter,
    flex: 1,
    justifyContent: 'center',
  };

  const profiles = [
    {
      id: 1,
      photoUrl: require('../assets/profiles/1.jpg'),
    },
    {
      id: 2,
      photoUrl: require('../assets/profiles/2.jpg'),
    },
    {
      id: 3,
      photoUrl: require('../assets/profiles/3.jpg'),
    },
    {
      id: 4,
      photoUrl: require('../assets/profiles/4.jpg'),
    },
    {
      id: 5,
      photoUrl: require('../assets/profiles/5.jpg'),
    },
    {
      id: 6,
      photoUrl: require('../assets/profiles/6.jpg'),
    },
  ];

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(currentIndex + 1);
            pan.setValue({x: 0, y: 0}); // sets the original position
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(currentIndex + 1);
            pan.setValue({x: 0, y: 0});
          });
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const nextCardOpacity = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });

  const nextCardScale = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.92, 1],
    extrapolate: 'clamp',
  });

  const renderItem = ({item}) => (
    <View style={styles.circleContainer}>
      <Image source={item.photoUrl} style={styles.circleImage} />
    </View>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FlatList
            data={profiles}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Animated.View
          style={[
            styles.body,
            {
              transform: [{translateX: pan.x}, {translateY: pan.y}],
            },
          ]}
          {...panResponder.panHandlers}>
          <TouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 16,
  },
  circleImage: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  body: {
    flex: 0.8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default BasicScreen;
