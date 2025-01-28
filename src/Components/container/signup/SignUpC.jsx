import React, { useState } from 'react';
import axios from 'axios';
import SignupPresentation from '../../presentational/signupP/SignUpP';

function SignupContainer() {
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [addresses, setAddresses] = useState([{ street: '', city: '', state: '', zipCode: '' }]);
  const [message, setMessage] = useState('');

  // Handlers for input changes
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleMobileNoChange = (e) => setMobileNo(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = addresses.map((address, i) => 
      i === index ? { ...address, [field]: value } : address
    );
    setAddresses(updatedAddresses);
  };

  const addAddressField = () => {
    setAddresses([...addresses, { street: '', city: '', state: '', zipCode: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Send a request to your backend API without the token
        await axios.post('http://localhost:8080/api/users/create', {
            password,
            firstName,
            lastName,
            mobileNo,
            email,
            addresses,
        }, {
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            }
        });
        setMessage('Signup successful!');
    } catch (error) {
      // Handle errors as before
      if (error.response) {
        console.error('Error response:', error.response);
        console.error('Status code:', error.response.status);
        setMessage(`Signup failed. Status code: ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setMessage('Signup failed. No response from server.');
      } else {
        console.error('Error:', error.message);
        setMessage(`Signup failed: ${error.message}`);
      }
    }
  };

  return (
    <SignupPresentation
      password={password}
      firstName={firstName}
      lastName={lastName}
      mobileNo={mobileNo}
      email={email}
      addresses={addresses}
      handlePasswordChange={handlePasswordChange}
      handleFirstNameChange={handleFirstNameChange}
      handleLastNameChange={handleLastNameChange}
      handleMobileNoChange={handleMobileNoChange}
      handleEmailChange={handleEmailChange}
      handleAddressChange={handleAddressChange}
      addAddressField={addAddressField}
      handleSubmit={handleSubmit}
      message={message}
    />
  );
}

export default SignupContainer;
