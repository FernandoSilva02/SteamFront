import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import generalStyles from '../styles/generalStyles';
import addToCartPopUpStyles from '../styles/components/addToCartPopUpStyles';

const AddToCartPopup = ({ visible, onClose, game }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={addToCartPopUpStyles.modalContainer}>
        <View style={addToCartPopUpStyles.modalView}>
          <Text style={generalStyles.titleTextView}>¡Añadido a tu carro!</Text>

          {/* Imagen del juego */}
          {game.photos && game.photos.length > 0 && (
            <Image
              source={{ uri: game.photos[0] }}
              style={addToCartPopUpStyles.gameImage}
            />
          )}

          {/* Nombre del juego */}
          <Text style={generalStyles.secundaryTitleText}>{game.game_name}</Text>

          {/* Precio */}
          <Text style={generalStyles.formText}>{`$${(game.price / 1000).toFixed(
            3
          )}`}</Text>

          {/* Botones */}
          <View style={generalStyles.buttonGroup}>
            <TouchableOpacity
              style={generalStyles.grayButton}
              onPress={onClose}
            >
              <Text style={generalStyles.ButtonText}>Seguir comprando</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={generalStyles.blueButton}
              onPress={() => alert('Ir al carro')}
            >
              <Text style={generalStyles.ButtonText}>Ver mi carro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddToCartPopup;
