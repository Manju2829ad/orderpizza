import React from 'react';
import './SignUp.css';

function SignUpP({
  password,
  firstName,
  lastName,
  mobileNo,
  email,
  addresses,
  handlePasswordChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleMobileNoChange,
  handleEmailChange,
  handleAddressChange,
  addAddressField,
  handleSubmit,
  message,
}) {
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={handleFirstNameChange} required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} required />
        </div>
        <div>
          <label>Mobile Number</label>
          <input type="text" value={mobileNo} onChange={handleMobileNoChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>

        <h3>Addresses</h3>
        {addresses.map((address, index) => (
          <div key={index}>
            <div>
              <label>Street</label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                required
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                required
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                required
              />
            </div>
            <div>
              <label>Zip Code</label>
              <input
                type="text"
                value={address.zipCode}
                onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addAddressField}>Add Address</button>

        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUpP;
