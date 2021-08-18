import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Profile = props => {
  return (
    <View style={styles.container}>
      <Text>My profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Profile;
