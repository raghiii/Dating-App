/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
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
  Text,
  Easing,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const data = [
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

const BasicScreen = ({navigation}) => {
  const [profiles, setProfiles] = useState(data);
  const [overlayImage, setOverlayImage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setOverlayImage(profiles[1].photoUrl);
    }, 1000);
  }, [profiles]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#13151A' : Colors.lighter,
    flex: 1,
    justifyContent: 'center',
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const circleSize = useRef(new Animated.Value(0)).current;
  const circlePosition = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
            useNativeDriver: false,
          }).start(() => {
            setProfiles(prof => prof.filter((item, i) => i !== 0));
            opacity.setValue(1);

            Animated.parallel([
              Animated.spring(circlePosition, {
                toValue: {x: 1, y: 1},
                duration: 250,
                easing: Easing.quad,
                useNativeDriver: false,
              }),
              Animated.spring(circleSize, {
                toValue: 1,
                duration: 250,
                easing: Easing.quad,
                useNativeDriver: false,
              }),
            ]).start(() => {
              pan.setValue({x: 0, y: 0}); // sets the original position
              circleSize.setValue(0);
              circlePosition.setValue({x: 0, y: 0});
              opacity.setValue(0);
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            useNativeDriver: false,
          }).start(() => {
            pan.setValue({x: 0, y: 0});
          });
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const nextCardOpacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const nextCardScale = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.92, 1],
    extrapolate: 'clamp',
  });

  const animateCircleWidth = circleSize.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 330],
    extrapolate: 'clamp',
  });

  const animteCircleHeight = circleSize.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 380],
    extrapolate: 'clamp',
  });

  const animateCircleXPosition = circlePosition.x.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const animateCircleYPosition = circlePosition.y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110],
  });

  const renderItem = ({item, index}) => (
    <Animated.View style={styles.circleContainer}>
      <Image source={item.photoUrl} style={styles.circleImage} />
    </Animated.View>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <Animated.View
        style={[
          styles.circleContainer,
          {
            height: animteCircleHeight,
            width: animateCircleWidth,
            transform: [
              {translateX: animateCircleXPosition},
              {translateY: animateCircleYPosition},
            ],
            opacity: nextCardOpacity,
            top: 100,
            left: 20,
            position: 'absolute',
            zIndex: 99,
          },
        ]}>
        <Image source={overlayImage} style={styles.image} />
      </Animated.View>
      <View style={styles.container}>
        <View style={styles.header}>
          <FlatList
            data={profiles.filter((item, i) => i !== 0)}
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
                  id: profiles[0].id,
                  url: profiles[0].photoUrl,
                },
              })
            }>
            <SharedElement id={`item.${profiles[0].id}.photo`}>
              <Image source={profiles[0].photoUrl} style={styles.image} />
            </SharedElement>
          </TouchableWithoutFeedback>
        </Animated.View>
        <View style={styles.footer}>
          <Text style={styles.name}>Anna Borino</Text>
          <Text style={styles.bio}>This is my Bio!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginHorizontal: 16,
  },
  circleImage: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  body: {
    flex: 0.6,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 20,
  },
  bio: {
    color: '#fff',
    fontSize: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default BasicScreen;
