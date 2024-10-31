import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalStyles from '../styles/generalStyles';
import gameInfoStyles from '../styles/gameInfoStyles';
import mainMenuStyles from '../styles/mainMenuStyles';
import Header from '../components/header';
import GameItemLibrary from '../components/gameItemLibrary';
import { useNavigation } from '@react-navigation/native';

function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error al recuperar el token:', error);
      }
    };

    fetchToken();
  }, []);
  

  useEffect(() => {
    if (!token) return;

    const fetchLibrary = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/library/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(`Network response was not ok: ${errorMsg}`);
        }

        const data = await response.json();
        console.log('Library fetched:', data);
        setGames(data.games || []); // Asegura que games esté definido como array
      } catch (error) {
        console.error('Error fetching library:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [token]);

  const fetchGameDetails = async (gameId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/games/${gameId}`,
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
                .filter(
                  (game) => game.photos && game.photos.length > 0 && game.title
                )
                .map((game) => (
                  <GameItemLibrary
                    key={game._id}
                    imageUri={game.photos[0]}
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
