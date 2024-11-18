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
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [cardType, setCardType] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error al recuperar el token:', error);
      }
    };

    fetchToken();
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
    const isCardNumberValid = cardNumber.replace(/\s/g, '').length === 16;
    const isExpiryValid = expiry.length === 5 && expiry.includes('/');
    const isCvcValid = cvc.length === 3;

    if (!isCardNumberValid || !isExpiryValid || !isCvcValid) {
      Alert.alert(
        'Error',
        'Por favor, completa correctamente todos los campos de la tarjeta.'
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
        `https://prod.supersteam.pro/api/payment-cards/process`,
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

      Alert.alert('Éxito', 'Pago procesado correctamente.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Success'),
        },
      ]);

      const saveGameToLibraryResponse = await fetch(
        `https://prod.supersteam.pro/api/games/add-to-library`,
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
        setLoading(false);
        return;
      }
    } catch (err) {
      Alert.alert('Error', 'Hubo un problema al procesar el pago.');
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
        maxLength={19}
      />

      <View style={generalStyles.rowBox}>
        <View style={generalStyles.columnBox}>
          <Text style={generalStyles.formText}>Fecha de expiración</Text>
          <TextInput
            placeholder="MM/AA"
            value={expiry}
            onChangeText={handleExpiryChange}
            keyboardType="numeric"
            maxLength={5}
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
