import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import headerStyles from '../styles/components/headerStyles'

const Header = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
      <Image
        source={require('../assets/steamLogo.png')}
        style={headerStyles.steamLogo}
      />
    </TouchableOpacity>
  );
};

export default Header;
