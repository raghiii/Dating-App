import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const Details = props => {
  const {item} = props.route.params;

  return (
    <View style={styles.container}>
      <SharedElement
        id={`item.${item.id}.photo`}
        style={StyleSheet.absoluteFill}>
        <Image source={item.url} style={styles.image} />
      </SharedElement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Details;
