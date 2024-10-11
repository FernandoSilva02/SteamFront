import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import generalStyles from '../styles/generalStyles';
import mainMenuStyles from '../styles/mainMenuStyles';
import tagStyles from '../styles/components/tagStyles';
import Header from '../components/header';
import Tag from '../components/tags';
import GameItem from '../components/gameItem';

// Función para el menú principal
function MainMenu() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Token de autenticación
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjM5OGQ4N2QxMWUzN2ZiOTFlOTQ2NyIsImlhdCI6MTcyNzQxNTk5MiwiZXhwIjoxNzMwMDA3OTkyfQ.P3yWts0Tay9YaSfQlmeccQG-PTzP5F0qWGR5YXmPKbY';

  // useEffect para obtener los juegos filtrados por categoría
  useEffect(() => {
    const categoryQuery = selectedCategory
      ? `?category=${selectedCategory}`
      : '';
    fetch(`http://192.168.1.106:3000/api/games/${categoryQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Games fetched:', data);
        setGames(data);
      })
      .catch((error) => console.error('Error fetching games:', error));
  }, [selectedCategory]);

  // useEffect para obtener las categorías de la API
  useEffect(() => {
    fetch('http://192.168.1.106:3000/api/categories/', {
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
  }, []);

  const toggleCategory = (categoryId) => {
    setSelectedCategory((prevSelected) =>
      prevSelected === categoryId ? null : categoryId
    );
  };

  return (
    <View style={generalStyles.container}>
      <Header />
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
          {games.map((game, index) => (
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
}

export default MainMenu;
