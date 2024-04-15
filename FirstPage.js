import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstPage = () => {
  const navigation = useNavigation();

  const categories = [
    {
      id: 1,
      name: 'Mumble Jumble',
      image: require('./assets/scrambler.png'),
    },
    {
      id: 2,
      name: 'Tic-Tac-Toe',
      image: require('./assets/xo.png'),
    },
    {
      id: 3,
      name: 'Matching Pairs',
      image: require('./assets/card.png'),
    },
    {
      id: 4,
      name: 'Dots',
      image: require('./assets/squares.png'),
    },
    {
      id: 5,
      name: 'Rock Paper Scissor',
      image: require('./assets/rps.png'),
    },
  
  ];

  const handleCategoryPress = (category) => {
    let screenName = '';

    switch (category.id) {
      case 1:
        screenName = 'MummbleJummble';
        break;
      case 2:
        screenName = 'TicTacToe';
        break;
      case 3:
        screenName = 'Matchingpairs';
        break;
      case 4:
        screenName = 'DotGame';
        break;
      case 5:
        screenName = 'RockPaperScissor';
        break;
    }

    if (screenName) {
      navigation.navigate(screenName, { gameId: category.id });
    }
  };

  return (
    <ImageBackground source={require('./assets/images/home1.jpg')} style={styles.background}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Funville</Text>
          <Text style={styles.tagline}>Explore Awesome Games!</Text>
        </View>
    
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category)}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  },
  header: {
    marginTop: 50,
    paddingVertical: 40,
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    textDecorationStyle:'double',
    fontWeight: 'bold',
    color: '#333',
  },
  tagline: {
    fontSize: 18,
    color: '#4751FF',
    marginTop: 10,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 20,
    paddingHorizontal: 25,
  
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#C7CAFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    elevation: 3,
  },
  categoryImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FirstPage;
