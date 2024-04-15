import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet,
  TouchableOpacity, Animated, Easing, Image, Alert, ImageBackground
} from 'react-native';

const randomArrFunction = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const gameCardsFunction = () => {
  const images = [
    require('./assets/images/img-1.png'),
    require('./assets/images/img-2.png'),
    require('./assets/images/img-3.png'),
    require('./assets/images/img-4.png'),
    require('./assets/images/img-5.png'),
    require('./assets/images/img-6.png'),
    require('./assets/images/img-7.png'),
    require('./assets/images/img-8.png'),
    require('./assets/images/img-1.png'),
    require('./assets/images/img-2.png'),
    require('./assets/images/img-3.png'),
    require('./assets/images/img-4.png'),
    require('./assets/images/img-5.png'),
    require('./assets/images/img-6.png'),
    require('./assets/images/img-7.png'),
    require('./assets/images/img-8.png'),
   
  ];

  const randomImages = randomArrFunction(images);

  return randomImages.map(
    (image, index) => ({
      id: index,
      image,
      isFlipped: false,
    })
  );
};

const Matchingpairs = () => {
  const [cards, setCards] = useState(gameCardsFunction());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [winMessage, setWinMessage] = useState(new Animated.Value(0));
  const [gameWon, setGameWon] = useState(false);

  const cardClickFunction = (card) => {
    if (!gameWon && selectedCards.length < 2 && !card.isFlipped) {
      const updatedSelectedCards = [...selectedCards, card];
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );

      setSelectedCards(updatedSelectedCards);
      setCards(updatedCards);

      if (updatedSelectedCards.length === 2) {
        if (updatedSelectedCards[0].image === updatedSelectedCards[1].image) {
          setMatches(matches + 1);
          setSelectedCards([]);

          if (matches + 1 === cards.length / 2) {
            YouWinGameFunction();
            setGameWon(true);
          }
        } else {
          setTimeout(() => {
            const flippedCards = updatedCards.map((c) =>
              updatedSelectedCards.some((s) => s.id === c.id)
                ? { ...c, isFlipped: false }
                : c
            );

            setSelectedCards([]);
            setCards(flippedCards);
          }, 1000);
        }
      }
    }
  };

  const YouWinGameFunction = () => {
    Animated.timing(winMessage, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (matches === cards.length / 2) {
      YouWinGameFunction();
      setGameWon(true);
    }
  }, [matches]);

  const msg = `Matches: ${matches} / ${cards.length / 2}`;

  useEffect(() => {
    Alert.alert(
      'Game Instructions',
      'Tap on the cards to flip them and find matching pairs. Try to match all pairs to win the game!',
      [{ text: 'START' }]
    );
  }, []);

  return (
    <ImageBackground source={require('./assets/images/mpbg.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header1}>Matching Pairs</Text>
        <Text style={styles.header2}></Text>
        <Text style={styles.matchText}>{msg}</Text>

        {gameWon ? (
          <View style={styles.winMessage}>
            <View style={styles.winMessageContent}>
              <Text style={styles.winText}>Congratulations !</Text>
              <Text style={styles.winText}>You Won!</Text>
            </View>
            <Button
              title="Restart"
              onPress={() => {
                setCards(gameCardsFunction());
                setSelectedCards([]);
                setMatches(0);
                setWinMessage(new Animated.Value(0));
                setGameWon(false);
              }}
            />
          </View>
        ) : (
          <View style={styles.grid}>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={[styles.card, card.isFlipped && styles.cardFlipped]}
                onPress={() => cardClickFunction(card)}
              >
                {card.isFlipped ? (
                  <Image source={card.image} style={styles.cardImage} />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  header1: {
    fontSize: 36,
    marginTop: 10,
    color: 'green',
  },
  header2: {
    fontSize: 24,
    marginBottom: 10,
    color: 'green',
  },
  matchText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 65,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  cardFlipped: {
    backgroundColor: 'white',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  winMessage: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  winMessageContent: {
    backgroundColor: 'rgba(255, 215, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  winText: {
    fontSize: 36,
    color: 'white',
  },
});

export default Matchingpairs
