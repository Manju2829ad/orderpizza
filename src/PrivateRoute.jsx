import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import CartProvider from './Components/container/cartC/CartProvider';




const PrivateRoute = ({ element: Component, ...rest }) => {
  const { auth } = useContext(CartProvider); // Access authentication state


  return (
    <Route
      {...rest}
      element={auth ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default React.memo(PrivateRoute);
