import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/header';
import generalStyles from '../styles/generalStyles';
import cartStyles from '../styles/cartStyles';

const formatCardNumber = (number) => {
  // Eliminar espacios previos y caracteres no numéricos
  const cleaned = number.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

  // Formatear con espacios cada 4 dígitos
  const formatted = cleaned.match(/.{1,4}/g);

  // Unir en una cadena con espacios
  return formatted ? formatted.join(' ') : number;
};

const PaymentScreen = () => {
  // Estados para almacenar los datos del formulario
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [securityCode, setSecurityCode] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [nameHolder, setNameHolder] = useState(''); 

  const handleCardNumberChange = (input) => {
    const formatted = formatCardNumber(input);
    setCardNumber(formatted);
  };

  const handleNameChange = (input) => {
    setNameHolder(input.replace(/\s+/g, ' '));
  };

  const handleSecurityCodeChange = (input) => {
    setSecurityCode(input.trim());
  };

  const handleIdNumberChange = (input) => {
    setIdNumber(input.trim());
  };

  // Manejar cambio de fecha
  const handleDateChange = (event, date) => {
    setShowDatePicker(false); // Ocultar el DateTimePicker
    if (date) {
      // Formatear la fecha a MM/YY
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con 2 dígitos
      const year = date.getFullYear().toString().slice(2); // Últimos dos dígitos del año
      setExpiryDate(`${month}/${year}`);
      setSelectedDate(date);
    }
  };

  const handlePayment = () => {
    const cleanedCardNumber = cardNumber.replace(/\s+/g, '');

    if (cleanedCardNumber.length < 16) {
      Alert.alert(
        'Error',
        'El número de la tarjeta debe tener al menos 16 dígitos.'
      );
      return;
    }

    if (nameHolder === '') {
      Alert.alert('Error', 'El nombre del titular no puede estar vacío.');
      return;
    }

    if (expiryDate.length < 4) {
      Alert.alert('Error', 'La fecha de expiración debe tener 4 dígitos.');
      return;
    }

    if (securityCode.length < 3) {
      Alert.alert('Error', 'El código de seguridad debe tener 3 dígitos.');
      return;
    }

    if (idNumber.length < 7) {
      Alert.alert(
        'Error',
        'La cédula de ciudadanía debe tener de 7 a 10 dígitos.'
      );
      return;
    }

    // Procesa el pago
    Alert.alert('Éxito', 'Pago procesado correctamente.');
  };

  return (
    <ScrollView style={generalStyles.container}>
      <Header />
      <Text style={generalStyles.titleTextView}>Métodos de pago</Text>

      {/* Nombre en la tarjeta */}
      <Text style={generalStyles.formText}>Nombre en la tarjeta</Text>
      <TextInput
        style={generalStyles.inputBox}
        value={nameHolder}
        onChangeText={handleNameChange}
        autoCapitalize="characters"
      />

      {/* Número de la tarjeta */}
      <Text style={generalStyles.formText}>Número de la tarjeta</Text>
      <TextInput
        style={generalStyles.inputBox}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={19}
      />

      {/* Fecha de expiración */}
      <View style={generalStyles.rowBox}>
        <View style={generalStyles.columnBox}>
          <Text style={generalStyles.formText}>Fecha de expiración</Text>

          {/* Botón para abrir el selector de fecha */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={generalStyles.inputBox}
              value={expiryDate}
              editable={false} // No editable, solo abre el DatePicker
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              minimumDate={new Date()} // No permitir fechas pasadas
              maximumDate={new Date(new Date().getFullYear() + 10, 11, 31)} // Máximo 10 años en el futuro
            />
          )}
        </View>

        {/* Código de seguridad */}
        <View style={generalStyles.columnBox}>
          <Text style={generalStyles.formText}>Código de seguridad</Text>
          <TextInput
            style={generalStyles.inputBox}
            keyboardType="numeric"
            value={securityCode}
            onChangeText={handleSecurityCodeChange}
            maxLength={3}
          />
        </View>
      </View>

      {/* Cédula de ciudadanía */}
      <Text style={generalStyles.formText}>Cédula de ciudadanía</Text>
      <TextInput
        style={generalStyles.inputBox}
        keyboardType="numeric"
        value={idNumber}
        onChangeText={handleIdNumberChange}
        maxLength={10}
      />

      {/* Botón para procesar el pago */}
      <View style={cartStyles.paymentRow}>
        <TouchableOpacity
          style={generalStyles.blueButton}
          onPress={handlePayment}
        >
          <Text style={generalStyles.ButtonText}>Continuar al pago</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
