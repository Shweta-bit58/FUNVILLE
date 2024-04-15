import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const words = [
  'apple', 'banana', 'orange', 'grape', 'kiwi', 'mango', 'pear', 'pineapple', 'strawberry', 'python',
  'guitar', 'aim', 'venus', 'gold', 'ebay', 'golang', 'coding', 'matrix', 'bugs', 'avatar',
  'gif', 'mental', 'map', 'island', 'hockey', 'chess', 'viber', 'github', 'png', 'silver',
  'mobile', 'cpu', 'java', 'google', 'venice', 'excel', 'mysql', 'nepal', 'flute', 'crypto',
  'tesla', 'mars', 'proxy', 'email', 'html', 'air', 'idea', 'server', 'svg', 'jpeg', 'search',
  'key', 'egypt', 'joker', 'dubai', 'photo', 'nile', 'rain',
];

const ScrambleWordGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      revealCorrectWord();
    }
  }, [timer]);

  const startGame = () => {
    chooseRandomWord();
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const chooseRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];
    setCurrentWord(newWord);
    setUserInput('');
    setFeedback('');
    setTimer(10);
  };

  const scrambleWord = (word) => {
    const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    return shuffledWord;
  };

  const checkGuess = () => {
    if (userInput.toLowerCase() === currentWord) {
      setFeedback('Correct! Well done!');
      setTimeout(() => {
        chooseRandomWord();
      }, 1000);
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  const revealCorrectWord = () => {
    setFeedback(`Time's up! The correct word was: ${currentWord}`);
    setTimeout(() => {
      chooseRandomWord();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Scramble Puzzle</Text>
      <Text style={styles.word}>{scrambleWord(currentWord)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your guess"
        onChangeText={(text) => setUserInput(text)}
        value={userInput}
      />
      <TouchableOpacity style={styles.button} onPress={checkGuess}>
        <Text style={styles.buttonText}>Check Guess</Text>
      </TouchableOpacity>
      <Text style={styles.timer}>Time left: {timer}</Text>
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  word: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 200,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedback: {
    marginTop: 10,
    fontSize: 18,
    color: 'red',
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});

export default ScrambleWordGame;
