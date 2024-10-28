import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  textInputDate: {
    color: '#FFF',
    fontSize: 16,
  },
  afterButtonInfoContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  underlineTextLogin: {
    textDecorationLine: 'underline',
    fontSize: 15,
    textAlign: 'center',
    color: '#7B8D9D',
  },
  containerAfterButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  descriptionTextLogin: {
    fontSize: 14,
    color: '#7B8D9D',

    textAlign: 'center',
    paddingHorizontal: 25, // Para dar espacio lateral
    marginTop: -5,
    marginBottom: 25,
  },
  alertText: {
    fontSize: 14,
    color: '#e7363d',
    textAlign: 'center',
    paddingHorizontal: 2, // Para dar espacio lateral
    marginTop: 0,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#1A2A3D', // Fondo oscuro similar a Steam
    padding: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Centra verticalmente si es necesario
    alignItems: 'center', // Centra horizontalmente
  },
  scrollView: {
    flexGrow: 1,
  },
  titleTextView: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  labelText: {
    fontSize: 14,
    color: '#CCC', // Color de texto gris claro
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444', // Borde oscuro
    borderRadius: 4,
    color: '#FFF', // Texto blanco
    backgroundColor: '#2A3E4C', // Fondo de input similar al de Steam
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#007BFF', // Color del botón similar a Steam
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  helpText: {
    color: '#BBB', // Color de texto gris claro para el enlace de ayuda
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  helpTextNoUnder: {
    color: '#BBB', // Color de texto gris claro para el enlace de ayuda
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
});

export default loginStyles;
