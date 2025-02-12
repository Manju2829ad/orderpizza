// HeaderC.js
import React, { useEffect, useState ,useContext} from 'react';
import HeaderP from '../../presentational/headerP/HeaderP';
import { CartContext } from '../cartC/CartProvider';

let loginStatus = {
  isLoggedIn: false,
};

export function setLoginStatus(isLoggedIn) {
  loginStatus.isLoggedIn = isLoggedIn;
}

export function getLoginStatus() {
  return loginStatus.isLoggedIn ? 'logout' : 'login';
}

export function getHeaderData() {
  const status = getLoginStatus();
  return {
    logo: "Domino's Pizza",
    location: 'Garudachar Palya, Mahadevapura, Bengaluru',
    account: {
      label: 'MY ACCOUNT',
      actions: [status, 'Signup'],
    },
    deliveryOptions: ['Delivery', 'Pick Up/Dine-in'],
  };
}

function HeaderC() {
  const { cart } = useContext(CartContext);
  const [headerData, setHeaderData] = useState(getHeaderData());

  useEffect(() => {
    setHeaderData(getHeaderData());
  }, [loginStatus.isLoggedIn]);

  return (
    <HeaderP
      logo={headerData.logo}
      location={headerData.location}
      account={headerData.account}
      deliveryOptions={headerData.deliveryOptions}
      cartCount={cart.length}
      cart={cart}
    />
  );
}

export default React.memo(HeaderC);