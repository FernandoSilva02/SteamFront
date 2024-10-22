import React from 'react';
import { CartProvider } from '../context/cartContext';
import PaymentScreen from './paymentScreen';

const ParentComponent = () => {
  return (
    <CartProvider>
      <PaymentScreen />
    </CartProvider>
  );
};

export default ParentComponent;
