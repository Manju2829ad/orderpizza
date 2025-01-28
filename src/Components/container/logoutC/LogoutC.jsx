import React, { useEffect, useState } from 'react';
import LogoutP from '../../presentational/logoutP/LogoutP';
import { useNavigate } from 'react-router-dom';
import { setLoginStatus } from '../headerC/HeaderC';

function LogoutC() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

   const handleLogout = () => {
    console.log('Inside logout function');
    localStorage.removeItem('jwtToken'); // Remove the token
    setLoginStatus(false); // Update the login status
    setMessage('Logout successful!');
    
    // Redirect to the login page after a short delay to show the message
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div>
      <h1>{message}</h1>
      <LogoutP handleLogout={handleLogout} />
      {/* Call handleLogout on button click */}
      <h2>are you sure you want to logout?</h2>
      <button onClick={handleLogout}>yes</button>
    </div>
  );
}

export default LogoutC;
