import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalStyles from '../styles/generalStyles';
import { useCart } from '../context/cartContext'; // Importa el contexto del carrito

const PaymentScreen = () => {
  const { confirmPayment } = useStripe();
  const { cartItems } = useCart(); // Obtén los elementos del carrito
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storeToken = async () => {
      const jwtToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjM5OGQ4N2QxMWUzN2ZiOTFlOTQ2NyIsImlhdCI6MTcyNzQxNTk5MiwiZXhwIjoxNzMwMDA3OTkyfQ.P3yWts0Tay9YaSfQlmeccQG-PTzP5F0qWGR5YXmPKbY';
      await AsyncStorage.setItem('userToken', jwtToken);
      setToken(jwtToken);
    };

    storeToken();
  }, []);

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Por favor, ingresa los detalles de la tarjeta.');
      return;
    }
  
    setLoading(true);
    console.log('Detalles de la tarjeta:', cardDetails);
    console.log('gameIds:', cartItems);
  
    if (!token) {
      Alert.alert(
        'Error',
        'Token no encontrado. Por favor, inicia sesión nuevamente.'
      );
      setLoading(false);
      return;
    }
  
    try {
      const totalAmount = cartItems.reduce((total, item) => total + item.price, 0); // Monto total
      const gameIds = cartItems.map((item) => item._id); // IDs de los juegos
  
      const response = await fetch(
        'http://192.168.1.111:3000/api/payment-cards/process',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: totalAmount * 100, // Convertir a centavos
            gameIds,
          }),
        }
      );
  
      if (!response.ok) {
        const errorResponse = await response.json();
        Alert.alert(
          'Error',
          errorResponse.msg || 'Error al crear el Payment Intent.'
        );
        setLoading(false);
        return;
      }
  
      const { clientSecret } = await response.json();
      console.log('Client Secret:', clientSecret);
  
      // Asegúrate de que `confirmPayment` tenga el tipo de método de pago
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card', // Especifica el tipo de método de pago
        billingDetails: {
          // Aquí puedes añadir detalles de facturación opcionales
        },
      });
  
      if (error) {
        Alert.alert('Error', error.message);
      } else if (paymentIntent) {
        Alert.alert('Éxito', 'Pago procesado correctamente.');
        // Aquí puedes manejar la lógica para actualizar la interfaz de usuario
      }
    } catch (err) {
      console.error('Error en el procesamiento de pago:', err);
      Alert.alert('Error', 'Hubo un problema al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={generalStyles.container}>
      <Text style={generalStyles.titleTextView}>Método de pago</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          borderColor: '#000000',
          borderWidth: 1,
          borderRadius: 8,
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <TouchableOpacity
        style={generalStyles.blueButton}
        onPress={handlePayment}
        disabled={loading}
      >
        <Text style={generalStyles.ButtonText}>
          {loading ? 'Procesando...' : 'Continuar al pago'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
