import React from 'react';
import './LoginP.css'
import { getHeaderData } from '../../container/headerC/HeaderC';

function LoginPresentation({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  message,
  isLoggedIn,
 
}) 

{
  return (
    <div >
                   <div   className='login'> 
      <form onSubmit={handleSubmit} >

        <h1 className='login-header'>Login to the Pizza World </h1>
        <div className='login-innerbox'>
         
          <label>MobileNo or Email</label>
          <input 
          className='login-email'
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder='Enter your email id or Mobile nubmer '
          />
      
        <div>
          <label>Password</label>
          <input
          className='login-password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder='Enter your password '
          />
        </div>
  </div>
    <button type='submit' className='login-submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
}

export default LoginPresentation;
