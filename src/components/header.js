import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import headerStyles from '../styles/components/headerStyles';
import generalStyles from '../styles/generalStyles';

const Header = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MainMenu')}
      activeOpacity={1} // Esto elimina el efecto de destello
    >
        <Image
          source={require('../assets/steamLogo.png')}
          style={headerStyles.steamLogo}
        />
    </TouchableOpacity>
  );
};

export default Header;
