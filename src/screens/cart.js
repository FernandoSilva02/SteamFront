import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../components/header';
import generalStyles from '../styles/formStyles';
import addToCartPopUpStyles from '../styles/components/addToCartPopUpStyles';
import cartStyles from '../styles/cartStyles';
import { useCart } from '../context/cartContext'; // Importa el contexto

const Cart = ({ navigation }) => {
  const { cartItems, removeFromCart } = useCart(); // Obtén el estado del carrito y la función para eliminar

  // Calcular el total
  const totalPrice = cartItems.reduce((sum, game) => sum + game.price, 0);

  const handleContinueShopping = () => {
    navigation.navigate('MainMenu');
  };

  // Función para manejar la navegación a la pantalla de pago
  const handlePayment = () => {
    navigation.navigate('PaymentScreen', { totalPrice }); // Navega a la pantalla de pago y pasa el monto total
  };

  return (
    <>
      <Header />
      <ScrollView style={generalStyles.container}>
        <Text style={generalStyles.titleTextView}>Tu Carrito</Text>

        {cartItems.length === 0 ? (
          <Text style={generalStyles.descriptionGameText}>
            Tu carrito está vacío.
          </Text>
        ) : (
          <>
            {cartItems.map((game, index) => (
              <View key={index} style={cartStyles.gameContainer}>
                {/* Imagen del juego */}
                {game.photos && game.photos.length > 0 && (
                  <Image
                    source={{ uri: game.photos[0] }}
                    style={addToCartPopUpStyles.gameImage}
                  />
                )}

                {/* Nombre del juego */}
                <Text style={generalStyles.secundaryTitleText}>
                  {game.game_name}
                </Text>

                {/* Precio */}
                <Text style={generalStyles.formText}>
                  {`$${(game.price / 1000).toFixed(3)}`}
                </Text>

                {/* Botón para eliminar */}
                <View style={cartStyles.removeButtonContainer}>
                  <TouchableOpacity onPress={() => removeFromCart(index)}>
                    <Text style={generalStyles.deleteText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Total y botón azul */}
        {cartItems.length > 0 && (
          <View style={cartStyles.totalAndPayment}>
            <View style={cartStyles.totalRow}>
              <Text style={generalStyles.secundaryTitleText}>
                Total estimado: {`$${(totalPrice / 1000).toFixed(3)}`}
              </Text>
            </View>

            <View style={cartStyles.paymentRow}>
              <TouchableOpacity
                style={generalStyles.blueButton}
                onPress={handlePayment} // Llama a la función de navegación al pago
              >
                <Text style={generalStyles.ButtonText}>Continuar al pago</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Botón gris siempre visible */}
        <View style={cartStyles.buttonContainer}>
          <TouchableOpacity
            style={generalStyles.grayButton}
            onPress={handleContinueShopping}
          >
            <Text style={generalStyles.ButtonText}>Seguir comprando</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Cart;
