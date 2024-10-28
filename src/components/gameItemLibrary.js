import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import generalStyles from '../styles/generalStyles';
import mainMenuStyles from '../styles/mainMenuStyles';

const GameItemLibrary = ({ imageUri, name, game }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('LibraryInfo', { game });
  };

  return (
    <TouchableOpacity
      style={mainMenuStyles.gameItemContainer}
      onPress={handlePress}
    >
      <View style={mainMenuStyles.gameInfo}>
        <View style={mainMenuStyles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={mainMenuStyles.gameItemImage} />
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
        <View style={mainMenuStyles.gameItemTextContainer}>
          <Text style={generalStyles.secundaryTitleText}>{name}</Text>
          <Text style={generalStyles.descriptionGameText}>Windows</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc', // Color de fondo para el placeholder
    borderRadius: 10,
  },
});

export default GameItemLibrary;
