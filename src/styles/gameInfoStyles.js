import { StyleSheet } from 'react-native';

const gameInfoStyles = StyleSheet.create({
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 20,
  },
  gameInfoContainer: {
    marginBottom: 20,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselImage: {
    width: 370,
    height: 210,
    borderRadius: 10,
    marginRight: 10,
  },
  buySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A2A3D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  priceAndCart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceBox: {
    backgroundColor: '#000',
    color: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '600',
    borderRadius: 5,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  systemRequirements: {
    backgroundColor: '#243447',
    padding: 16,
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default gameInfoStyles;
