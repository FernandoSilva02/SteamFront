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
  deleteText: {
    //Texto para eliminar un juego
    fontSize: 14,
    color: '#D9D9D9',
    fontWeight: '300',
    textDecorationLine: 'underline',
  },
  smallButton: {
    //Botón para añadir al carro y guardar usuario
    backgroundColor: '#77B322',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonGroup: {
    //Alinear los botones grandes
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 210,
  },
  grayButton: {
    //Botón gris
    backgroundColor: '#616E78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  blueButton: {
    //Botón azul
    backgroundColor: '#225999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  redButton: {
    //Botón rojo
    backgroundColor: '#CF352B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  inputBox: {
    //Caja de texto
    backgroundColor: '#1A1E29',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  rowBox: {
    //Alinear cajas de texto si son más de 1 por fila
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnBox: {
    //Alinear cajas de texto en la columna
    flex: 0.48,
  },
});

export default generalStyles;
