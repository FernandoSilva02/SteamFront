import React, { useState, useEffect } from 'react';
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
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const LoginScreen = () => {
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOpacity] = useState(new Animated.Value(0)); // Estado para la opacidad de la alerta
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const API_URL = 'https://prod.supersteam.pro'; // Define aquí la URL de tu API
    console.log('API URL:', API_URL);

    if (!validateEmail(email)) {
      setAlertMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      setAlertMessage(
        'La contraseña debe tener al menos 12 caracteres, una letra mayúscula, una letra minúscula, un número, y un carácter especial.'
      );
      return;
    }

    try {
      const userData = { email, password };
      const response = await fetch(
        `https://prod.supersteam.pro/api/users/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }
      );

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('No se pudo parsear la respuesta JSON:', jsonError);
        setAlertMessage('Error en el servidor. Intenta más tarde.');
        return;
      }

      setAlertMessage(result.msg);

      if (response.ok) {
        await AsyncStorage.setItem('token', result.token);

        try {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'MainMenu' }],
            })
          );
        } catch (navError) {
          console.error('Error en la navegación:', navError);
          setAlertMessage('Error al navegar a MainMenu');
        }
      } else {
        setAlertMessage(result.msg || 'Hubo un problema con el login');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setAlertMessage('Error de conexión, por favor intenta de nuevo');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/;
    return passwordRegex.test(password);
  };

  // Controlar la animación de la alerta
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
          <Text style={generalStyles.titleTextView}>¡Inicia sesión!</Text>

          <Text style={generalStyles.formText}>Email</Text>
          <TextInput
            style={generalStyles.inputBox}
            placeholder="Ingresa tu email"
            placeholderTextColor="#7B8D9D"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
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
            onPress={handleLogin}
          >
            <Text style={generalStyles.ButtonText}>Ingresar</Text>
          </TouchableOpacity>

          <View style={registerStyles.afterButtonInfoContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')} // Cambia a nombre de la pantalla
            >
              <Text style={registerStyles.underlineTextLogin}>
                ¿No tienes una cuenta? Crea una
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

export default LoginScreen;
