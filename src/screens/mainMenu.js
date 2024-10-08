import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

// Componente para etiquetas
const Tag = ({ children }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{children}</Text>
  </View>
);

// Componente de cada juego
const GameItem = ({ imageUri, name, price }) => (
  <View style={styles.gameItemContainer}>
    <View style={styles.gameInfo}>
      <Image source={{ uri: imageUri }} style={styles.gameItemImage} />
      <View style={styles.gameItemTextContainer}>
        <Text style={styles.gameItemName}>{name}</Text>
      </View>
    </View>
    <Text style={styles.priceText}>{price}</Text>
  </View>
);

// Función para el menú principal
function MainMenu() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  // Token de autenticación (reemplaza con tu token real)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjM5OGQ4N2QxMWUzN2ZiOTFlOTQ2NyIsImlhdCI6MTcyNzQxNTk5MiwiZXhwIjoxNzMwMDA3OTkyfQ.P3yWts0Tay9YaSfQlmeccQG-PTzP5F0qWGR5YXmPKbY";

  // useEffect para obtener los datos de la API de juegos
  useEffect(() => {
    fetch("http://192.168.1.106:3000/api/games/")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

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

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/97d4b2a2fccc7a2ba7ff9e2f273076e13ad902a0be7044ac0e627ee6a44691f5?placeholderIfAbsent=true&apiKey=79fcc6ae448041eb9992e7b04c216d13",
        }}
        style={styles.headerImage}
      />
      <View style={styles.tagsContainer}>
        <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.tagList}>
            {categories.map((category, index) => (
              <Tag key={index}>{category.category_name}</Tag>
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
  gameItemImage: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginRight: 16,
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
  priceText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
  },
  platformContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  platformIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default MainMenu;
