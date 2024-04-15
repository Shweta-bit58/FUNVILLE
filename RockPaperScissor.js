import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';

// Import your background image
import backgroundImage from './assets/images/g5.jpg';

const images = {
  rock: require('./assets/images/rock.png'),
  paper: require('./assets/images/paper.png'),
  scissors: require('./assets/images/scissors.png'),
};

const choices = ['rock', 'paper', 'scissors'];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) return 'It\'s a tie!';
  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You win!';
  }
  return 'Computer wins!';
};

const RockPaperScissorsGame = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    Alert.alert(
      'Game Instructions',
      'Choose either Rock, Paper, or Scissors. The computer will randomly select its choice. Win by beating the computer!',
      [{ text: 'START GAME' }]
    );
  }, []);

  const makeChoice = (choice) => {
    const computer = getRandomChoice();
    setUserChoice(choice);
    setComputerChoice(computer);
    const winner = determineWinner(choice, computer);
    setResult(winner);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        {userChoice && computerChoice && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
            <View style={styles.choicesContainer}>
              <View style={styles.choice}>
                <Text>User's choice:</Text>
                <Image source={images[userChoice]} style={styles.choiceImage} />
              </View>
              <View style={styles.choice}>
                <Text>Computer's choice:</Text>
                <Image source={images[computerChoice]} style={styles.choiceImage} />
              </View>
            </View>
          </View>
        )}
        <View style={styles.choicesContainer}>
          {choices.map((choice) => (
            <TouchableOpacity
              key={choice}
              style={styles.choiceButton}
              onPress={() => makeChoice(choice)}
              disabled={userChoice !== null}
            >
              <Image source={images[choice]} style={styles.choiceImage} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  choiceButton: {
    padding: 20,
    borderRadius: 100,
  },
  choiceImage: {
    width: 100,
    height: 130,
  },
  resetButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  resultText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  choice: {
    alignItems: 'center',
  },
});

export default RockPaperScissorsGame;
