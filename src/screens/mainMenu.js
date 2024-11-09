import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import generalStyles from '../styles/generalStyles';
import mainMenuStyles from '../styles/mainMenuStyles';
import tagStyles from '../styles/components/tagStyles';
import Header from '../components/header';
import Tag from '../components/tags';
import GameItem from '../components/gameItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainMenu = () => {
  const [token, setToken] = useState(null);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


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
    if (!token) return; // Evita hacer fetch si no hay token

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://prod.supersteam.pro/api/categories/`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert(
          'Error',
          'No se pudo cargar las categorías. Intenta de nuevo.'
        );
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Si no hay categoría seleccionada, cargar todos los juegos
        const categoryQuery = selectedCategory
          ? `?category=${selectedCategory}`
          : '';
        const response = await fetch(
          `https://prod.supersteam.pro/api/games/${categoryQuery}`
        );
        const data = await response.json();
        console.log('Games fetched:', data); // Para depurar
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, [selectedCategory]);

  const toggleCategory = (categoryId) => {
    setSelectedCategory((prevSelected) =>
      prevSelected === categoryId ? null : categoryId
    );
  };

  if (!token) {
    return <Text>Cargando...</Text>; // O un componente de carga
  }

  return (
    <View style={generalStyles.container}>
      <Header />
      <View style={tagStyles.tagsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
  );
};

export default MainMenu;
