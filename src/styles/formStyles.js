import { StyleSheet } from 'react-native';

const formStyles = StyleSheet.create({
  placeholderText: {
    placeholderTextColor: '#7B8D9D',
  },
  textHolder: {
    color: '#7B8D9D', // Color del texto
    fontSize: 16, // Tamaño de fuente
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7B8D9D',
    textAlign: 'center',
    paddingHorizontal: 20, // Para dar espacio lateral
  },

  logoTouchable: {
    activeOpacity: 1,
  },
  container: {
    //Contenedor del programa
    flex: 1,
    backgroundColor: '#1A2A3D',

    paddingHorizontal: 16,
    paddingTop: 0,
    // justifyContent: 'center',
  },
  //Alternative nav container with logo
  containerNav: {
    height: 'auto', // Altura ajustada según el tamaño del logo
    backgroundColor: '#181d24',
    justifyContent: 'center', // Centrar verticalmente el contenido
    alignItems: 'center', // Centrar horizontalmente el contenido
    width: '100%', // Ocupar todo el ancho de la pantalla
    borderTopWidth: '45%3', // Grosor del borde superior
    borderTopColor: '#1A2A3D', // Color blanco para el borde superior
    marginTop: 0, // Ajusta esto según lo necesites, prueba con valores pequeños o usa padding
    paddingVertical: 10, // Si quieres un poco de espacio interno, pero también puedes dejarlo en 0
  },

  titleTextView: {
    //Titulo de la vista || Requisitos del sistema
    fontWeight: '900',
    marginVertical: 10,
    fontSize: 22,
    color: '#FFF',
    marginBottom: '10%',
    fontWeight: '600',
    textAlign: 'center',
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
    padding: 5,
    fontSize: 16,
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
    marginLeft: 4,
    fontSize: 17,
    color: '#FFF',
    fontWeight: '300',
    paddingBottom: 10,
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
    marginTop: 10,
    backgroundColor: '#225999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9,
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
    padding: 15,
    borderRadius: 9,
    marginBottom: 15,
    fontSize: 16,
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

export default formStyles;

//Edición de prueba

//Nuevo comentario de prueba
