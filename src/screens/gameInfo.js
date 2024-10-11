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
          Categoría: {game.id_category}
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
        <Text style={gameInfoStyles.priceBox}>
          {`$${(game.price / 1000).toFixed(3)}`}
        </Text>
        <TouchableOpacity style={gameInfoStyles.addToCartButton}>
          <Text style={gameInfoStyles.addToCartText}>Añadir al carro</Text>
        </TouchableOpacity>
      </View>

      {/* Requisitos del sistema */}
      <View style={gameInfoStyles.systemRequirements}>
        <Text style={generalStyles.titleTextView}>REQUISITOS DEL SISTEMA</Text>
        <Text style={generalStyles.descriptionGameText}>
          SO: 64-bit Windows 10
        </Text>
        <Text style={generalStyles.descriptionGameText}>Procesador: 1 GHz</Text>
        <Text style={generalStyles.descriptionGameText}>
          Memoria: 1 GB de RAM
        </Text>
        <Text style={generalStyles.descriptionGameText}>Gráficos: 500 MB</Text>
        <Text style={generalStyles.descriptionGameText}>
          Almacenamiento: 40 MB de espacio disponible
        </Text>
      </View>
    </ScrollView>
  );
};

export default GameInfo;
