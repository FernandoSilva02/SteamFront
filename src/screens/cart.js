import React from 'react';
import { View, Text, FlatList } from 'react-native';
import generalStyles from '../styles/generalStyles';

const Cart = ({ route }) => {
  const { cartItems } = route.params || [];

  return (
    <View style={generalStyles.container}>
      <Text style={generalStyles.titleTextView}>Tu Carrito</Text>

      {/* Lista de juegos en el carrito */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={generalStyles.cartItem}>
            <Text style={generalStyles.secundaryTitleText}>{item.game_name}</Text>
            <Text style={generalStyles.formText}>${(item.price / 1000).toFixed(3)}</Text>
          </View>
        )}
      />

      {cartItems.length === 0 && (
        <Text style={generalStyles.formText}>Tu carrito está vacío.</Text>
      )}
    </View>
  );
};

export default Cart;
