import React, { createContext } from 'react';
import UseCartLogic from '../../UseCartLogic';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const cartLogic = UseCartLogic();

  return <CartContext.Provider value={cartLogic}>{children}</CartContext.Provider>;
};

export default React.memo(CartProvider);