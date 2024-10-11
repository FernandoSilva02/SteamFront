import React from 'react';
import { View, Text } from 'react-native';
import generalStyles from '../styles/generalStyles';
import tagStyles from '../styles/components/tagStyles';

const Tag = ({ children, onPress, isSelected }) => (
  <View
    style={[tagStyles.tag, isSelected && tagStyles.tagSelected]}
    onTouchEnd={onPress}
  >
    <Text style={generalStyles.ButtonText}>{children}</Text>
  </View>
);

export default Tag;
