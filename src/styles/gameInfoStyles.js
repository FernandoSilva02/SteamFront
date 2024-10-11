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
    backgroundColor: '#576674',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  titleAndIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // Espacio entre el título y la segunda fila
  },
  priceAndCart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Alinear el contenido a la derecha
  },
  priceBox: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  osIcon: {
    width: 20, // Ajusta el tamaño según sea necesario
    height: 20,
    marginLeft: 10, // Espacio entre el texto y el icono
  },
  systemRequirements: {
    backgroundColor: '#243447',
    padding: 16,
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default gameInfoStyles;
