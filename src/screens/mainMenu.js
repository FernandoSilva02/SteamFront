import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

// Componente para etiquetas
const Tag = ({ children, onPress, isSelected }) => (
  <View style={[styles.tag, isSelected && styles.tagSelected]} onTouchEnd={onPress}>
    <Text style={styles.tagText}>{children}</Text>
  </View>
);

// Componente de cada juego
const GameItem = ({ imageUri, name, price }) => (
  <View style={styles.gameItemContainer}>
    <View style={styles.gameInfo}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.gameItemImage} />
      </View>
      <View style={styles.gameItemTextContainer}>
        <Text style={styles.gameItemName}>{name}</Text>
        <Text style={styles.platformText}>Windows</Text>
      </View>
    </View>
    <Text style={styles.priceText}>{price}</Text>
  </View>
);

// Función para el menú principal
function MainMenu() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Token de autenticación
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjM5OGQ4N2QxMWUzN2ZiOTFlOTQ2NyIsImlhdCI6MTcyNzQxNTk5MiwiZXhwIjoxNzMwMDA3OTkyfQ.P3yWts0Tay9YaSfQlmeccQG-PTzP5F0qWGR5YXmPKbY";

  // useEffect para obtener los juegos filtrados por categoría
  useEffect(() => {
    const categoryQuery = selectedCategory ? `?category=${selectedCategory}` : '';
    fetch(`http://192.168.1.106:3000/api/games/${categoryQuery}`)
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, [selectedCategory]);

  // useEffect para obtener las categorías de la API
  useEffect(() => {
    fetch("http://192.168.1.106:3000/api/categories/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
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
        console.error("Error fetching categories:", error);
      });
  }, []);

  const toggleCategory = (categoryId) => {
    setSelectedCategory(prevSelected => (prevSelected === categoryId ? null : categoryId));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/steamLogo.png')}
        style={styles.headerImage}
      />
      <View style={styles.tagsContainer}>
        <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.tagList}>
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
        <View style={styles.gameList}>
          {games.map((game, index) => (
            <GameItem
              key={game._id}
              imageUri={game.photos[0]}
              name={game.game_name}
              price={`$${Number(game.price).toLocaleString('es-ES')}`}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2A3D',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerImage: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  scrollView: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  tagsContainer: {
    height: 150,
    paddingVertical: 0,
  },
  tagList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
  },
  tag: {
    alignItems: 'center',
    backgroundColor: '#303649',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 100,
  },
  tagSelected: {
    backgroundColor: '#31BCFC',
  },
  tagText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  gameList: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 0,
  },
  gameItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#243447',
    borderRadius: 10,
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 72,
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  gameItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gameItemTextContainer: {
    flexDirection: 'column',
  },
  gameItemName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  platformText: {
    color: '#7B8D9D',
    fontSize: 14,
  },
  priceText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
  },
});

export default MainMenu;
