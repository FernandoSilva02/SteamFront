import { StyleSheet } from 'react-native';

const cartStyles = StyleSheet.create({
  removeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  gameContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#576674',
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    alignSelf: 'center',
  },
  totalAndPayment: {
    padding: 5,
    backgroundColor: '#576674',
    borderRadius: 5,
    marginVertical: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default cartStyles;
