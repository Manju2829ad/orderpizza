import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import { CartContext } from './Components/container/cartC/CartContext';
const PrivateRoute = ({ element: Component, ...rest }) => {
  const { auth } = useContext(CartContext); // Access authentication state


  return (
    <Route
      {...rest}
      element={auth ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
