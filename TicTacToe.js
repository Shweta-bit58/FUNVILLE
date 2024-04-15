import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || checkWinner()) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => (
    <TouchableOpacity style={styles.square} onPress={() => handleClick(index)}>
    <Text style={[styles.squareText, { color: board[index] === 'X' ? '#FF0000' : '#FFFF00' }]}>
    {board[index]}
  </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      Alert.alert(`${winner} wins!`, 'Game Over', [{ text: 'OK', onPress: resetGame }]);
    } else if (board.every((square) => square)) {
      Alert.alert('Draw!', 'Game Over', [{ text: 'OK', onPress: resetGame }]);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  useEffect(() => {
    Alert.alert(
      'Game Instructions',
      'Tap on a square to place your X or O. The first player to get three of their marks in a row, column, or diagonal wins the game!',
      [{ text: 'START' }]
    );
  }, []);

  return (
    <ImageBackground source={require('./assets/images/tttbg.jpg')} style={styles.background}>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
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
  board: {
    alignItems: 'center',
    marginTop: 70,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 110,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  squareText: {
    fontSize: 32,  
  },
});

export default TicTacToe;
