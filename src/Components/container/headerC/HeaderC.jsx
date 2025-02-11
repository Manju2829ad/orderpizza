import React, { useEffect, useState } from 'react';
import HeaderP from '../../presentational/headerP/HeaderP';

let loginStatus = {
  isLoggedIn: false,
};



export function setLoginStatus(isLoggedIn) {
  loginStatus.isLoggedIn = isLoggedIn;
}


console.log(loginStatus.isLoggedIn,":loginStatus")


export function getLoginStatus() {
  return loginStatus.isLoggedIn ? "logout" : "login";
}

export function getHeaderData() {
  const status = getLoginStatus();

  return {
    logo: "Domino's Pizza",
    location: 'Garudachar Palya, Mahadevapura, Bengaluru',
    account: {
      label: 'MY ACCOUNT',
      actions: [status, 'Signup'], // Corrected 'signup' to 'Signup' for consistency
    },
    deliveryOptions: ['Delivery', 'Pick Up/Dine-in'],
  };
}

function HeaderC() {
  const [headerData, setHeaderData] = useState(getHeaderData());

  useEffect(() => {
    setHeaderData(getHeaderData());
    console.log('useEffect executed')
  }, [loginStatus.isLoggedIn]); // Update whenever login status changes

  return (
    <HeaderP
      logo={headerData.logo}
      location={headerData.location}
      account={headerData.account}
      deliveryOptions={headerData.deliveryOptions}
    />
  );
}

export default React.memo(HeaderC);
