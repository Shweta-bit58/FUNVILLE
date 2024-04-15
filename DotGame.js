import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DotGame = () => {
  const [score, setScore] = useState(0);
  const [dots, setDots] = useState([]);
  const [timer, setTimer] = useState(10);

  // Function to generate a random dot
  const generateRandomDot = () => {
    const dot = {
      id: Math.random().toString(),
      top: Math.floor(Math.random() * 300),
      left: Math.floor(Math.random() * 300),
    };
    setDots((prevDots) => [...prevDots, dot]);
  };

  // Function to handle dot press
  const handleDotPress = (dotId) => {
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== dotId));
    setScore((prevScore) => prevScore + 1);
  };

  // Function to start the game timer
  const startTimer = () => {
    setTimer(10);
  };

  // Function to handle game over
  const handleGameOver = () => {
    Alert.alert('Game Over!', `Final Score: ${score}`, [{ text: 'OK', onPress: handleGameRestart }]);
  };

  // Function to handle game restart
const handleGameRestart = () => {
  setScore(0);
  setDots([]);
  startTimer();
  generateRandomDot(); // Generate the first dot
};


  // Effect hook to display game instructions when the component mounts
useEffect(() => {
  Alert.alert(
    'Game Instructions',
    'Tap the dots swiftly to rack up points within 10 seconds.Best of luck!',
    [{ text: 'Start Game', onPress: handleGameRestart }]
  );
}, []);

  // Effect hook to handle game timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          handleGameOver();
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Effect hook to generate random dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      generateRandomDot();
    }, 1000);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.timeText}>Time left: {timer} seconds</Text>
      <View style={styles.dotsContainer}>
        {dots.map((dot) => (
          <TouchableOpacity
            key={dot.id}
            style={[styles.dot, { top: dot.top, left: dot.left }]}
            onPress={() => handleDotPress(dot.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5372F0',
  },
  scoreText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  dotsContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    backgroundColor: '#fff',
  },
  dot: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#6C757D',
    borderRadius: 15,
  },
});

export default DotGame;
