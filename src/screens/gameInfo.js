import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import generalStyles from '../styles/formStyles';
import gameInfoStyles from '../styles/gameInfoStyles';
import Header from '../components/header';
import AddToCartPopup from '../components/addToCartPopUp';
import { useCart } from '../context/cartContext';

const GameInfo = ({ route }) => {
  const { game } = route.params;
  const { addToCart } = useCart();

  const [isModalVisible, setModalVisible] = useState(false);

  if (!game) {
    return <Text>Error: No game data available</Text>;
  }

  const requirements = game.id_requirements || {};

  const handleAddToCart = () => {
    addToCart(game); // Usa addToCart del contexto
    setModalVisible(true); // Muestra el pop-up
  };

  return (
    <>
      <Header />

      <ScrollView style={generalStyles.container}>
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
            Lanzamiento:{' '}
            {new Date(game.release_date).toLocaleDateString('es-ES')}
          </Text>
          <Text style={generalStyles.descriptionGameText}>
            Categoría: {game.id_category.category_name}
          </Text>
        </View>
        <Text style={generalStyles.descriptionGameText}>
          {game.description}
        </Text>

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

        <View style={gameInfoStyles.buySection}>
          <View style={gameInfoStyles.titleAndIcon}>
            <Text style={generalStyles.secundaryTitleText}>
              Comprar {game.game_name.toUpperCase()}
            </Text>
          </View>
          <View style={gameInfoStyles.priceAndCart}>
            <View style={gameInfoStyles.priceBox}>
              <Text style={generalStyles.priceText}>
                {`$${(game.price / 1000).toFixed(3)}`}
              </Text>
            </View>
            <TouchableOpacity
              style={generalStyles.smallButton}
              onPress={handleAddToCart}
            >
              <Text style={generalStyles.ButtonText}>Añadir al carro</Text>
            </TouchableOpacity>
            <AddToCartPopup
              visible={isModalVisible}
              onClose={() => setModalVisible(false)}
              game={game}
            />
          </View>
        </View>

        {/* Requisitos del sistema */}
        <View style={gameInfoStyles.systemRequirements}>
          <Text style={generalStyles.titleTextView}>
            REQUISITOS DEL SISTEMA
          </Text>
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
    </>
  );
};

export default GameInfo;
