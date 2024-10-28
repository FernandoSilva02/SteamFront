import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import generalStyles from '../styles/formStyles';
import mainMenuStyles from '../styles/mainMenuStyles';
import tagStyles from '../styles/components/tagStyles';
import Header from '../components/header';
import Tag from '../components/tags';
import GameItem from '../components/gameItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para el menú principal
function MainMenu() {
  const [token, setToken] = useState(null);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  console.log('API URL:', apiUrl); // Log para verificar la URL

  // useEffect para obtener el token desde AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        console.log('Token: ', storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  // useEffect para obtener los juegos filtrados por categoría
  useEffect(() => {
    const categoryQuery = selectedCategory
      ? `?category=${selectedCategory}`
      : '';
    fetch(`${apiUrl}/api/games/${categoryQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Games fetched:', data);
        setGames(data);
      })
      .catch((error) => console.error('Error fetching games:', error));
  }, [selectedCategory]);

  // useEffect para obtener las categorías de la API
  useEffect(() => {
    if (token) {
      fetch(`${apiUrl}/api/categories/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [token]);

  const toggleCategory = (categoryId) => {
    setSelectedCategory((prevSelected) =>
      prevSelected === categoryId ? null : categoryId
    );
  };

  return (
    <>
      <Header />
      <View style={generalStyles.container}>
        <View style={tagStyles.tagsContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={tagStyles.tagList}>
              {categories.map((category, index) => (
                <Tag
                  key={index}
                  onPress={() => toggleCategory(category._id)}
                  isSelected={selectedCategory === category._id}
                >
                  {category.category_name}
                </Tag>
              ))}
            </View>
          </ScrollView>
          <View style={mainMenuStyles.gameList}>
            {games.map((game) => (
              <GameItem
                key={game._id}
                imageUri={game.photos[0]}
                name={game.game_name}
                price={`$${Number(game.price).toLocaleString('es-ES')}`}
                game={game}
              />
            ))}
          </View>
        </View>
      </View>
    </>
  );
}

export default MainMenu;
