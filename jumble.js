import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';

const words = ['REACT', 'JAVASCRIPT', 'GITHUB', 'NATIVE', 'DEVELOPER', 'MOBILE', 'COMPONENT','addition','meeting',
               'number','exchange','canvas','garden','position','feather','comfort','tongue','expansion','country',
               'group','taste','store','field','friend','pocket','needle','expert','statement','second','library',];


const ScrambleJumbleGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getNextWord();
  }, []);

  const getNextWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];
    setCurrentWord(newWord);
    setScrambledWord(scrambleWord(newWord));
    setUserGuess('');
    setFeedback('');
  };

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const checkAnswer = () => {
    if (userGuess.toUpperCase() === currentWord) {
      setFeedback('Correct! Well done!');
      getNextWord();
    } else {
      setFeedback(`Wrong! The correct answer is: ${currentWord}`);
    }
  };

  const resetGame = () => {
    getNextWord();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MummBle JummBle</Text>
      <Text style={styles.scrambledWord}>{scrambledWord}</Text>
      <View style={styles.inputContainer}>
        <Text>Your Guess:</Text>
        <Text style={styles.feedback}>{feedback}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserGuess(text)}
          value={userGuess}
          placeholder="Type your guess..."
        />
      </View>
      <TouchableOpacity style={styles.guessButton} onPress={checkAnswer}>
        <Text style={styles.buttonText}>Guess</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 150,
    // backgroundColor: '#9f87d9',
    // padding: 40,
    // alignItems: 'center',
  },
  scrambledWord: {
    fontSize: 30,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  feedback: {
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  guessButton: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScrambleJumbleGame;
