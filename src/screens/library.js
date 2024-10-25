import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import generalStyles from '../styles/generalStyles';
import gameInfoStyles from '../styles/gameInfoStyles';
import mainMenuStyles from '../styles/mainMenuStyles';
import Header from '../components/header';
import GameItemLibrary from '../components/gameItemLibrary';
import { useNavigation } from '@react-navigation/native';

function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjM5OGQ4N2QxMWUzN2ZiOTFlOTQ2NyIsImlhdCI6MTcyNzQxNTk5MiwiZXhwIjoxNzMwMDA3OTkyfQ.P3yWts0Tay9YaSfQlmeccQG-PTzP5F0qWGR5YXmPKbY'; // Reemplaza con tu token

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch('http://192.168.1.111:3000/api/library/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Library fetched:', data);
        setGames(data.games);
      } catch (error) {
        console.error('Error fetching library:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const fetchGameDetails = async (gameId) => {
    try {
      const response = await fetch(
        `http://192.168.1.111:3000/api/games/${gameId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const game = await response.json();
      console.log('Game details fetched:', game);
      return game;
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  const handleGamePress = async (gameId) => {
    const gameDetails = await fetchGameDetails(gameId);
    console.log('Fetched game details:', gameDetails);
    if (gameDetails) {
      navigation.navigate('LibraryGameInfo', { game: gameDetails });
    }
  };

  return (
    <View style={generalStyles.container}>
      <Header />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={gameInfoStyles.scrollView}>
            <Text style={generalStyles.titleTextView}>Biblioteca</Text>
          <View style={mainMenuStyles.gameList}>
            {games.length > 0 ? (
              games
                .filter(game => game.photos && game.photos.length > 0 && game.title) // Filtra juegos válidos
                .map((game) => (
                  <GameItemLibrary
                    key={game._id}
                    imageUri={game.photos[0]} // Se asume que al menos hay una foto
                    name={game.title}
                    game={game}
                    onPress={() => handleGamePress(game.gameId)}
                  />
                ))
            ) : (
              <Text>No games found in the library.</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default Library;
