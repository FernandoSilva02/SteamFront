import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import generalStyles from '../styles/generalStyles';
import cartStyles from '../styles/cartStyles';

const Success = ({ navigation }) => {
  return (
    <View style={generalStyles.container}>
      <Header />
      <Text style={generalStyles.titleTextView}>¡Gracias por tu compra!</Text>
      <Text style={generalStyles.formText}>
        Tu pago se ha procesado correctamente. Encontrarás tu nuevo contenido en tu biblioteca
      </Text>
      <View style={{ marginTop: 30 }}>
      <View style={generalStyles.buttonGroup}>
        <TouchableOpacity
          style={generalStyles.grayButton}
          onPress={() => navigation.navigate('Library')}
        >
          <Text style={generalStyles.ButtonText}>Ver la biblioteca</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default Success;
