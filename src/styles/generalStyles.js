import { StyleSheet } from 'react-native';

const generalStyles = StyleSheet.create({
  container: {
    //Contenedor del programa
    flex: 1,
    backgroundColor: '#1A2A3D',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  titleTextView: {
    //Titulo de la vista || Requisitos del sistema
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: '600',
  },
  secundaryTitleText: {
    //Titulo juego(Vista MainMenu) || Comprar juego-Nombre del juego en un modal-Total estimado(Usado para modales) || Información del usuario (vista Mi Perfil)
    fontSize: 16,
    color: '#FFF',
    marginBottom: 4,
    fontWeight: '600',
  },
  ButtonText: {
    //Botones || Tags para filtrar
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  priceText: {
    //Precio del juego (vista main Menu)
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
  },
  descriptionGameText: {
    //Descripción e información para los juegos, así como su plataforma y requisitos
    fontSize: 14,
    color: '#7B8D9D',
    marginBottom: 4,
    fontWeight: '300',
  },
  formText: {
    //Titulos y campos de texto para formularios
    fontSize: 14,
    color: '#FFF',
    fontWeight: '300',
  },
});

export default generalStyles;