// SplashScreen.js

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/icon.png')} style={styles.icon} />
      <Text style={styles.text}>Welcome to FUNVILLE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SplashScreen;
