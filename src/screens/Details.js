import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const Details = props => {
  const {item} = props.route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SharedElement
          id={`item.${item.id}.photo`}
          style={StyleSheet.absoluteFill}>
          <Image source={item.url} style={styles.image} />
        </SharedElement>
      </View>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.name}>Amanda, 25</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>About</Text>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Interests</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13151A',
    paddingVertical: 50,
  },
  header: {
    flex: 0.5,
    margin: 10,
  },
  body: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  info: {
    flex: 0.3,
    justifyContent: 'center',
    padding: 20,
    color: '#fff',
  },
  name: {
    fontSize: 30,
    color: '#fff',
  },
  text: {
    color: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Details;
