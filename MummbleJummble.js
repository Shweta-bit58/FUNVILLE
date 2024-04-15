import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

const wordsList = [
  { word: "addition", hint: "The process of adding numbers" },
  { word: "meeting", hint: "Event in which people come together" },{ word: "number", hint: "Math symbol used for counting" },
  { word: "exchange", hint: "The act of trading" },
  { word: "canvas", hint: "Piece of fabric for oil painting" },
  { word: "garden", hint: "Space for planting flowers and plants" },
  { word: "position", hint: "Location of someone or something" },
  { word: "feather", hint: "Hair-like outer covering of a bird" },
  { word: "comfort", hint: "A pleasant feeling of relaxation" },
  { word: "tongue", hint: "The muscular organ of the mouth" },
  { word: "expansion", hint: "The process of increase or growth" },
  { word: "country", hint: "A politically identified region" },
  { word: "group", hint: "A number of objects or persons" },
  { word: "taste", hint: "Ability of the tongue to detect flavor" },
  { word: "store", hint: "Large shop where goods are traded" },
  { word: "field", hint: "Area of land for farming activities" },
  { word: "friend", hint: "Person other than a family member" },
  { word: "pocket", hint: "A bag for carrying small items" },
  { word: "needle", hint: "A thin and sharp metal pin" },
  { word: "expert", hint: "Person with extensive knowledge" },
  { word: "statement", hint: "A declaration of something" },
  { word: "second", hint: "One-sixtieth of a minute" },
  { word: "library", hint: "Place containing a collection of books" },
];
  // Add other word objects...

const MummBleJummBle = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [shuffledWord, setShuffledWord] = useState('');
  const [currentHint, setCurrentHint] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [usedWords, setUsedWords] = useState([]);
  const totalQuestions = wordsList.length;

  const generateRandomWord = () => {
    if (usedWords.length === totalQuestions) {
      Alert.alert(
        'Game Over!',
        `Final Score: ${score}`,
        [{ text: 'Restart Game', onPress: handleGameRestart }],
        { cancelable: false }
      );
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * totalQuestions);
    } while (usedWords.includes(randomIndex));

    setUsedWords([...usedWords, randomIndex]);

    const wordObject = wordsList[randomIndex];
    setCurrentWord(wordObject.word);
    setCurrentHint(wordObject.hint);
    setShuffledWord(shuffleWord(wordObject.word));
    setUserInput('');
  };

  const shuffleWord = (word) => {
    const shuffledArray = word.split('').sort(() => Math.random() - 0.5);
    return shuffledArray.join('');
  };

  const handleGameRestart = () => {
    const currentWordLower = currentWord.toLowerCase();
    setUserInput(currentWordLower); // Set the correct answer
    Alert.alert(
      'Time Up!',
      `The correct answer is: ${currentWordLower}`,
      [{ text: 'START', onPress: generateRandomWord }]
    );
    setUsedWords([]);
    setScore(0);
    startTimer();
  };  

  const startTimer = () => {
    setTimer(30);
  };

  const handleShuffle = () => {
    generateRandomWord();
    startTimer();
  };

  const handleCheck = () => {
    const currentShuffledWord = shuffleWord(currentWord);
    const userInputLower = userInput.toLowerCase();
    const currentWordLower = currentWord.toLowerCase();

    if (currentShuffledWord === userInputLower || currentWordLower === userInputLower) {
      setScore(score + 10);
      Alert.alert('Correct!', 'You are right', [{ text: 'OK', onPress: handleShuffle }]);
    } else {
      setScore(Math.max(score - 3, 0));
      Alert.alert('Incorrect!', 'Try again', [{ text: 'OK' }]);
    }
  };

  useEffect(() => {
    Alert.alert(
      'Game Instructions',
      'Unscramble the letters to form the correct word. Type your answer in the input field and press "Check" to see if you are correct. You have 30 seconds for each question. Good luck!',
      [{ text: 'Start Game', onPress: generateRandomWord }]
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          handleGameRestart();
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <ImageBackground source={require('./assets/images/g1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.hintText}>{currentHint}</Text>
          <Text style={styles.word}>{shuffledWord}</Text>
          <View style={styles.details}>
            <Text style={styles.timeText}>Time left: {timer} seconds</Text>
            <Text style={styles.scoreText}>Score: {score}</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here"
              onChangeText={(text) => setUserInput(text)}
              value={userInput}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleShuffle}>
              <Text style={styles.buttonText}>Shuffle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCheck}>
              <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    width: '100',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    padding: 20,
    marginTop: 20,
  },
  word: {
    fontSize: 33,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 20,
    marginHorizontal: -20,
    textTransform: 'uppercase',
  },
  details: {
    marginTop: 25,
  },
  hintText: {
    fontSize: 18,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 18,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 60,
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#6C757D',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
});

export default MummBleJummBle;
