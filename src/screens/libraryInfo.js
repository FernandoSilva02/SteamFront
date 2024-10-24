import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/header';
import generalStyles from '../styles/generalStyles';
import gameInfoStyles from '../styles/gameInfoStyles';

const LibraryInfo = ({ route }) => {
  const { game } = route.params; // Obtener la información del juego desde los parámetros de la ruta

  return (
    <ScrollView style={generalStyles.container}>
      <Header />
      <View style={gameInfoStyles.gameInfoContainer}>
        <Text style={generalStyles.titleTextView}>{game.game_name}</Text>

        {/* Mostrar la primera foto del juego */}
        {game.photos && game.photos.length > 0 && (
          <Image
            source={{ uri: game.photos[0] }} // Mostrar la primera foto del juego
            style={gameInfoStyles.mainImage} // Usar el estilo de la imagen principal
          />
        )}

        <Text style={generalStyles.titleTextView}>
          {game.title}
        </Text>

        <Text style={generalStyles.descriptionGameText}>
          {game.description}
        </Text>
      </View>

      {/* Carrusel de imágenes */}
      <ScrollView
        horizontal
        pagingEnabled
        style={gameInfoStyles.carouselContainer}
      >
        {game.photos.slice(1).map(
          (
            photo,
            index // Excluir la primera foto
          ) => (
            <Image
              key={index}
              source={{ uri: photo }} // Mostrar cada foto del juego
              style={gameInfoStyles.carouselImage} // Usar el estilo del carrusel
            />
          )
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Puedes agregar estilos específicos aquí si es necesario
});

export default LibraryInfo;
