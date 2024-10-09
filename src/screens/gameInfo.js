import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GameInfo = ({ route }) => {
  const { game } = route.params;

  if (!game) {
    return <Text>Error: No game data available</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Logo de Steam */}
      <Image source={require('../assets/steamLogo.png')} style={styles.steamLogo} />

      {/* Imagen principal del juego */}
      <Image source={{ uri: game.photos[0] }} style={styles.mainImage} />

      {/* Información del juego */}
      <View style={styles.gameInfoContainer}>
        <Text style={styles.primaryText}>{game.game_name}</Text>
        <Text style={styles.secundaryText}>Desarrollador: {game.developer}</Text>
        <Text style={styles.secundaryText}>Lanzamiento: {new Date(game.release_date).toLocaleDateString('es-ES')}</Text>
        <Text style={styles.secundaryText}>Categoría: {game.id_category}</Text>
      </View>

      {/* Descripción */}
      <Text style={styles.secundaryText}>{game.description}</Text>

      {/* Carrusel de imágenes */}
      <ScrollView horizontal pagingEnabled style={styles.carouselContainer}>
        {game.photos.slice(1).map((photo, index) => (
        <Image key={index} source={{ uri: photo }} style={styles.carouselImage} />
        ))}
      </ScrollView>


      {/* Botón de compra */}
      <View style={styles.buySection}>
        <Text style={styles.thirdText}>${(game.price / 1000).toFixed(3)}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.thirdText}>Añadir al carro</Text>
        </TouchableOpacity>
      </View>

      {/* Requisitos del sistema */}
      <View style={styles.systemRequirements}>
        <Text style={styles.primaryText}>REQUISITOS DEL SISTEMA</Text>
        <Text style={styles.secundaryText}>SO: 64-bit Windows 10</Text>
        <Text style={styles.secundaryText}>Procesador: 1 GHz</Text>
        <Text style={styles.secundaryText}>Memoria: 1 GB de RAM</Text>
        <Text style={styles.secundaryText}>Gráficos: 500 MB</Text>
        <Text style={styles.secundaryText}>Almacenamiento: 40 MB de espacio disponible</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2A3D',
    paddingHorizontal: 16,
  },
  primaryText: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: '600',
  },
  secundaryText: {
    fontSize: 14,
    color: '#7B8D9D',
    marginBottom: 4,
    fontWeight: '300',
  },
  thirdText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '300',
  },
  steamLogo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 20,
  },
  gameInfoContainer: {
    marginBottom: 20,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselImage: {
    width: 370,
    height: 210,
    borderRadius: 10,
    marginRight: 10,
  },
  buySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#31BCFC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  systemRequirements: {
    backgroundColor: '#243447',
    padding: 16,
    borderRadius: 10,
  },
});

export default GameInfo;
