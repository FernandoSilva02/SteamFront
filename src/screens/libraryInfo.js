import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import generalStyles from '../styles/generalStyles';
import gameInfoStyles from '../styles/gameInfoStyles';
import Header from '../components/header';

const LibraryInfo = ({ route }) => {
  const { game } = route.params; // Obtén el juego desde las props

  if (!game) {
    return <Text>Error: No hay datos disponibles del juego</Text>;
  }

  const requirements = game.id_requirements || {};

  return (
    <ScrollView style={generalStyles.container}>
      <Header />
      <Image
        source={{ uri: game.photos[0] }}
        style={gameInfoStyles.mainImage}
      />
      <View style={gameInfoStyles.gameInfoContainer}>
        <Text style={generalStyles.titleTextView}>{game.game_name}</Text>
        <Text style={generalStyles.descriptionGameText}>
          Desarrollador: {game.developer}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Lanzamiento: {new Date(game.release_date).toLocaleDateString('es-ES')}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Categoría: {game.id_category?.category_name || 'N/A'}
        </Text>
      </View>
      <Text style={generalStyles.descriptionGameText}>{game.description}</Text>

      <ScrollView
        horizontal
        pagingEnabled
        style={gameInfoStyles.carouselContainer}
      >
        {game.photos.slice(1).map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={gameInfoStyles.carouselImage}
          />
        ))}
      </ScrollView>

      {/* Requisitos del sistema */}
      <View style={gameInfoStyles.systemRequirements}>
        <Text style={generalStyles.titleTextView}>REQUISITOS DEL SISTEMA</Text>
        <Text style={generalStyles.descriptionGameText}>
          SO: {requirements.platform || 'N/A'}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Procesador: {requirements.processor || 'N/A'}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Memoria: {requirements.memory || 'N/A'}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Gráficos: {requirements.graphics || 'N/A'}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Almacenamiento: {requirements.storage || 'N/A'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default LibraryInfo;
