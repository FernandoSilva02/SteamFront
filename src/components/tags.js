import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import generalStyles from '../styles/generalStyles';
import tagStyles from '../styles/components/tagStyles';

const Tag = ({ children, onPress, isSelected }) => (
  <TouchableOpacity
    style={[tagStyles.tag, isSelected && tagStyles.tagSelected]}
    onPress={onPress} // Cambié onTouchEnd a onPress
  >
    <Text style={generalStyles.ButtonText}>{children}</Text>
  </TouchableOpacity>
);

export default Tag;
