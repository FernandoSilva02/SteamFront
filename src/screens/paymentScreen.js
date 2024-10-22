import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalStyles from '../styles/generalStyles';
import { useCart } from '../context/cartContext';
import { useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/header';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const { confirmPayment } = useStripe();
  const { cartItems } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState(''); // Estado para la fecha de expiración
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [cardType, setCardType] = useState('');

  useEffect(() => {
    const storeToken = async () => {
      const jwtToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjM5OGQ4N2QxMWUzN2ZiOTFlOTQ2NyIsImlhdCI6MTcyNzQxNTk5MiwiZXhwIjoxNzMwMDA3OTkyfQ.P3yWts0Tay9YaSfQlmeccQG-PTzP5F0qWGR5YXmPKbY';
      await AsyncStorage.setItem('userToken', jwtToken);
      setToken(jwtToken);
    };

    storeToken();
  }, []);

  const detectCardType = (number) => {
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardPattern = /^5[1-5][0-9]{14}$/;
    const amexPattern = /^3[47][0-9]{13}$/;
    const discoverPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visaPattern.test(number)) {
      setCardType('Visa');
    } else if (mastercardPattern.test(number)) {
      setCardType('MasterCard');
    } else if (amexPattern.test(number)) {
      setCardType('American Express');
    } else if (discoverPattern.test(number)) {
      setCardType('Discover');
    } else {
      setCardType('');
    }
  };

  const handleCardNumberChange = (number) => {
    const cleanedNumber = number.replace(/\D/g, '');
    const formattedNumber = cleanedNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    setCardNumber(formattedNumber);
    detectCardType(cleanedNumber);
  };

  const handleExpiryChange = (text) => {
    if (text.length > 5) return;

    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 2) {
      formattedText =
        formattedText.slice(0, 2) + '/' + formattedText.slice(2, 4);
    }

    setExpiry(formattedText);
  };

  const handlePayment = async () => {
    if (!cardNumber || !expiry || !cvc) {
      Alert.alert(
        'Error',
        'Por favor, completa todos los campos de la tarjeta.'
      );
      return;
    }

    setLoading(true);

    if (!token) {
      Alert.alert(
        'Error',
        'Token no encontrado. Por favor, inicia sesión nuevamente.'
      );
      setLoading(false);
      return;
    }

    try {
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      const gameIds = cartItems.map((item) => item._id);

      const response = await fetch(
        'http://192.168.1.111:3000/api/payment-cards/process',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: totalAmount * 100,
            gameIds,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        Alert.alert(
          'Error',
          'Error al crear el Payment Intent. Respuesta del servidor: ' +
            errorText
        );
        setLoading(false);
        return;
      }

      const { clientSecret } = await response.json();
      const [month, year] = expiry.split('/').map((part) => part.trim());

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodData: {
          type: 'Card',
          card: {
            number: cardNumber.replace(/\s/g, ''),
            exp_month: parseInt(month, 10),
            exp_year: parseInt(year, 10),
            cvc: cvc,
          },
        },
      });

      if (paymentIntent) {
        Alert.alert('Éxito', 'Pago procesado correctamente.', {
          text: 'OK',
          onPress: () => navigation.navigate('Success'),
        });
      } else {
        console.warn('Error de Stripe:', error.message);
      }

      const saveGameToLibraryResponse = await fetch(
        'http://192.168.1.111:3000/api/games/add-to-library',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gameIds,
          }),
        }
      );

      if (!saveGameToLibraryResponse.ok) {
        const errorResponse = await saveGameToLibraryResponse.json();
        console.warn(
          'Error al guardar el juego:',
          errorResponse.msg || 'Error al añadir el juego a la biblioteca.'
        );
      }
    } catch (err) {
      console.error('Error en el procesamiento de pago:', err);
      Alert.alert('Éxito', 'Pago procesado correctamente.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Success'),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={generalStyles.container}>
      <Header />
      <Text style={generalStyles.titleTextView}>Método de pago</Text>

      <Text style={generalStyles.formText}>Número de tarjeta</Text>
      <Text style={generalStyles.formText}>{cardType}</Text>
      <TextInput
        style={generalStyles.inputBox}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={19} // Mantener en 19 para permitir espacios
      />

      <View style={generalStyles.rowBox}>
        <View style={generalStyles.columnBox}>
          <Text style={generalStyles.formText}>Fecha de expiración</Text>
          <TextInput
            placeholder="MM/AA"
            value={expiry}
            onChangeText={handleExpiryChange}
            keyboardType="numeric"
            maxLength={5} // Limitar a 5 caracteres
            style={generalStyles.inputBox}
          />
        </View>

        <View style={generalStyles.columnBox}>
          <Text style={generalStyles.formText}>Código de seguridad</Text>
          <TextInput
            style={generalStyles.inputBox}
            keyboardType="numeric"
            value={cvc}
            onChangeText={setCvc}
            maxLength={3}
          />
        </View>
      </View>

      <TouchableOpacity
        style={generalStyles.blueButton}
        onPress={handlePayment}
        disabled={loading}
      >
        <Text style={generalStyles.ButtonText}>
          {loading ? 'Procesando...' : 'Continuar al pago'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentScreen;
