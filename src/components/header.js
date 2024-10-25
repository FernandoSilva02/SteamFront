import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import headerStyles from '../styles/components/headerStyles';
import generalStyles from '../styles/formStyles';

const Header = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MainMenu')}
      activeOpacity={1} // Esto elimina el efecto de destello
    >
      <View style={generalStyles.containerNav}>
        <Image
          source={require('../assets/steamLogo.png')}
          style={headerStyles.steamLogo}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Header;
