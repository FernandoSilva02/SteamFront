import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import generalStyles from '../styles/generalStyles';
import gameInfoStyles from '../styles/gameInfoStyles';
import Header from '../components/header';

const GameInfo = ({ route }) => {
  const { game } = route.params;

  if (!game) {
    return <Text>Error: No game data available</Text>;
  }

  // Asegúrate de que los requisitos estén disponibles
  const requirements = game.id_requirements || {};

  return (
    <ScrollView style={generalStyles.container}>
      {/* Logo de Steam */}
      <Header />

      {/* Imagen principal del juego */}
      <Image
        source={{ uri: game.photos[0] }}
        style={gameInfoStyles.mainImage}
      />

      {/* Información del juego */}
      <View style={gameInfoStyles.gameInfoContainer}>
        <Text style={generalStyles.titleTextView}>{game.game_name}</Text>
        <Text style={generalStyles.descriptionGameText}>
          Desarrollador: {game.developer}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Lanzamiento: {new Date(game.release_date).toLocaleDateString('es-ES')}
        </Text>
        <Text style={generalStyles.descriptionGameText}>
          Categoría: {game.id_category.category_name}
        </Text>
      </View>

      {/* Descripción */}
      <Text style={generalStyles.descriptionGameText}>{game.description}</Text>

      {/* Carrusel de imágenes */}
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

      {/* Botón de compra */}
      <View style={gameInfoStyles.buySection}>
        <View style={gameInfoStyles.titleAndIcon}>
          <Text style={generalStyles.secundaryTitleText}>
            Comprar {game.game_name.toUpperCase()}
          </Text>
          <Image
            source={require('../assets/windows.png')}
            style={gameInfoStyles.osIcon}
          />
        </View>
        <View style={gameInfoStyles.priceAndCart}>
          <View style={gameInfoStyles.priceBox}>
            <Text style={generalStyles.priceText}>
              {`$${(game.price / 1000).toFixed(3)}`}
            </Text>
          </View>
          <TouchableOpacity style={generalStyles.smallButton}>
            <Text style={generalStyles.ButtonText}>Añadir al carro</Text>
          </TouchableOpacity>
        </View>
      </View>

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

export default GameInfo;
