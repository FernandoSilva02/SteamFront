import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import generalStyles from '../styles/formStyles';
import registerStyles from '../styles/registerStyles';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LoginScreen from './login';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOpacity] = useState(new Animated.Value(0)); // Estado para la opacidad de la alerta
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShow(false);
    setBirthDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleRegister = async () => {
    if (userName.length < 4) {
      setAlertMessage('Por favor ingresa un nombre de usuario válido');
      return;
    }

    if (!validateEmail(email)) {
      setAlertMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!validateBirthDate(birthDate)) {
      setAlertMessage('Debes tener al menos 5 años para registrarte.');
      return;
    }

    if (!validatePassword(password)) {
      setAlertMessage(
        'La contraseña debe tener al menos 12 caracteres, una letra mayúscula, una letra minúscula, un número, y un caracter especial.'
      );
      return;
    }

    try {
      const userData = {
        user_name: userName,
        email,
        birthday: birthDate.toISOString().split('T')[0],
        password,
      };

      const response = await fetch(`https://prod.supersteam.pro/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      setAlertMessage(result.msg);

      console.log('Console: ', result);
      console.log('Data sent:', userData);
      if (response.ok) {
        // Alert.alert('Éxito', 'Registro completado con éxito');
        navigation.navigate('LoginScreen');
      } else {
        setAlertMessage(result.msg || 'Hubo un problema con el registro');
      }
    } catch (error) {
      setAlertMessage('Error de conexión, por favor intenta de nuevo');
      console.error('Error en el registro:', error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateBirthDate = (date) => {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5); //Menores a 5 años no se puede
    return date <= fiveYearsAgo;
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/;
    return passwordRegex.test(password);
  };

  // Controlar la animación de la alertea
  useEffect(() => {
    if (alertMessage) {
      // Mostrar la alerta con opacidad 1
      Animated.timing(alertOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Esperar 2 segundos y luego desvanecer la alerta
        setTimeout(() => {
          Animated.timing(alertOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setAlertMessage(''));
        }, 2000);
      });
    }
  }, [alertMessage]);

  useFocusEffect(
    useCallback(() => {
      // Limpiar los campos cuando la pantalla está enfocada
      setUserName('');
      setBirthDate(new Date());
      setAlertMessage('');
      setEmail('');
      setPassword('');
    }, [])
  );

  return (
    <View style={generalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A2A3D" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={registerStyles.scrollView}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <Text style={generalStyles.titleTextView}>¡Crea una cuenta!</Text>
          <Text style={generalStyles.formText}>Nombre de Usuario</Text>
          <TextInput
            style={generalStyles.inputBox}
            placeholder="Ingresa tu nombre de usuario"
            placeholderTextColor="#7B8D9D"
            value={userName}
            onChangeText={setUserName}
          />
          <Text style={generalStyles.formText}>Email</Text>
          <TextInput
            style={generalStyles.inputBox}
            placeholder="Ingresa tu email"
            placeholderTextColor="#7B8D9D"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={generalStyles.formText}>Fecha de Nacimiento</Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={generalStyles.inputBox}
          >
            <Text style={registerStyles.textInputDate}>
              {birthDate.toLocaleDateString('es-ES')}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={birthDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Text style={generalStyles.formText}>Contraseña</Text>
          <TextInput
            style={generalStyles.inputBox}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#7B8D9D"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {alertMessage && (
            <Animated.View style={{ opacity: alertOpacity }}>
              <Text style={registerStyles.alertText}>{alertMessage}</Text>
            </Animated.View>
          )}
          <TouchableOpacity
            style={generalStyles.blueButton}
            onPress={handleRegister}
          >
            <Text style={generalStyles.ButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <View style={registerStyles.afterButtonInfoContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(LoginScreen)}>
              <Text style={registerStyles.underlineTextLogin}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
            <View style={registerStyles.containerAfterButton}>
              <Text style={registerStyles.descriptionTextLogin}>
                Es rápido y fácil. Descubre miles de juegos de PC para jugar con
                millones de nuevos amigos.
              </Text>
              <TouchableOpacity>
                <Text style={registerStyles.underlineTextLogin}>
                  Aprende más de Steam
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
