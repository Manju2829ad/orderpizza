import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPresentation from '../../presentational/loginP/LoginP';
import { useNavigate } from 'react-router-dom';
import {setLoginStatus,getLoginStatus} from '../headerC/HeaderC';


function LoginC() {
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn,setIsLoggedIn]= useState(false)


  const handleUsernameChange = (e) => setMobileNo(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


 const navigate= useNavigate();


useEffect(()=>{

  const token =localStorage.getItem('jwtToken')
  if(token){

    setIsLoggedIn(true)
    console.log(isLoggedIn,":isLoggedIn")
  }

},[])

console.log(isLoggedIn,":isLoggedIn")


  const user = {
    mobileNo: mobileNo,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        user,
    
      });

      console.log(response)
      const details = response.data
      const token=details.token;
      const uid=details.userId;
      localStorage.setItem('jwtToken', token); // Store token in localStorage
      localStorage.setItem('userId', uid); // Store the user ID in localStorage

      console.log(token)
      if(token){ 
            setMessage('Login successful!');
             setTimeout(()=>{
                    navigate('/recommended')
             },2000) 

             setIsLoggedIn(true)
             setLoginStatus(true);
             
       } else{
        setMessage('login failed')
       }
 
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx range
        if (error.response.status === 400) {
          setMessage('Bad Request: Invalid input data');
        } else if (error.response.status === 401) {
          setMessage('Unauthorized: Invalid mobile number or password');
        } else if (error.response.status === 500) {
          setMessage('Internal Server Error: Please try again later');
        } else {
          setMessage(`Error: ${error.response.data.message || 'Something went wrong'}`);
        }
      } else if (error.request) {
        // Request was made, but no response was received
        setMessage('No response from server. Please check your internet connection or try again later.');
      } else {
        // Something went wrong in setting up the request
        setMessage(`Error: ${error.message}`);
      }
    }
  };



  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem('jwtToken');
  //   setIsLoggedIn(false);
  //   setMessage('Logout successful!');
  //   setTimeout(() => {
  //     setMessage(''); // Clear the message after 2 seconds
  //   }, 2000);
  //   navigate("/login");
  // };

  return (
    <LoginPresentation
      mobileNo={mobileNo}
      password={password}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      message={message}
      isLoggedIn={isLoggedIn}
    />
  );
}

export default LoginC;
