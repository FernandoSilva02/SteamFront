import { StyleSheet } from 'react-native';

const addToCartPopUpStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 350,
    backgroundColor: '#576674',
    borderRadius: 10,
    padding: 20,
  },
  gameImage: {
    width: '100%',
    height: 170,
    resizeMode: 'contain',
  },
});

export default addToCartPopUpStyles;
