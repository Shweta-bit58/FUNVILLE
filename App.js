// App.js
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'; // Adjust the import path as needed
import { name as Funville } from './app.json';

const App = () => (
      <AppNavigator />
)

AppRegistry.registerComponent(Funville, () => App);

export default App;
