import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mainMenuStyles from '../styles/mainMenuStyles';
import generalStyles from '../styles/generalStyles';

const GameItem = ({ imageUri, name, price, game }) => {
  const navigation = useNavigation();

  return (
    <View
      style={mainMenuStyles.gameItemContainer}
      onTouchEnd={() => navigation.navigate('GameInfo', { game })}
    >
      <View style={mainMenuStyles.gameInfo}>
        <View style={mainMenuStyles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={mainMenuStyles.gameItemImage}
          />
        </View>
        <View style={mainMenuStyles.gameItemTextContainer}>
          <Text style={generalStyles.secundaryTitleText}>{name}</Text>
          <Text style={generalStyles.descriptionGameText}>Windows</Text>
        </View>
      </View>
      <Text style={generalStyles.priceText}>{price}</Text>
    </View>
  );
};

export default GameItem;
