import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebGame = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.gamepix.com/t/mobile-games' }} 
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default WebGame;
