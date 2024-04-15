import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import FirstPage from './FirstPage';
import Game1 from './MummbleJummble';
import Game2 from './TicTacToe';
import Game3 from './Matchingpairs';
import Game4 from './DotGame';
import Game5 from './RockPaperScissor';
import GameWeb from './WebGame';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={FirstPage} />
      <Stack.Screen name="MummbleJummble" component={Game1} />
      <Stack.Screen name="TicTacToe" component={Game2} />
      <Stack.Screen name="Matchingpairs" component={Game3} />
      <Stack.Screen name="DotGame" component={Game4} />
      <Stack.Screen name="RockPaperScissor" component={Game5} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Explore More') {
              iconName = focused ? 'globe' : 'globe-outline';
            }
            // Can return any component here, such as an icon from Ionicons
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4751FF',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeStack} />
        <Tab.Screen name="Explore More" options={{ headerShown: false }} component={GameWeb} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
