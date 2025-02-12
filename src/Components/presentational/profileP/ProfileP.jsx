  import React, { useState, useEffect } from 'react';
  import './ProfileP.css';
  import LogoutC from '../../container/logoutC/LogoutC';

  function ProfileP({ data = {}, message, fetchProfileDetails, updateUser }) {
    const [userDetails, setUserDetails] = useState({
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
    });

    

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingMobile, setIsEditingMobile] = useState(false);
    const [userId, setUserId] = useState('');
    const [isEdited, setIsEdited] = useState(false);


    useEffect(() => {
      if (data) {
        setUserDetails({
          firstname: data.firstName || '',
          lastname: data.lastName || '',
          email: data.email || '',
          mobile: data.mobileNo || '',
        });
      }
    }, [data]);

    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        fetchProfileDetails(storedUserId);
      }
    }, [fetchProfileDetails]);

    const handleEditToggle = (field) => {
      setIsEdited(true);
      if (field === 'name') setIsEditingName(!isEditingName);
      if (field === 'email') setIsEditingEmail(!isEditingEmail);
      if(field==='mobileno') setIsEditingMobile(!isEditingMobile)
    };

    const handleUpdate = () => {
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEdited(false);

      const updatedData = {
        uid: userId,
        firstName: userDetails.firstname,
        lastName: userDetails.lastname,
        email: userDetails.email,
      };

      updateUser(updatedData);
    };

    return (
      <div>
        <div className='userdetails'>
          {/* Full Name Editing Section */}
          <div className='name-section'>
            <div className='name-fields'>
              <input
                type='text'
                className='name-input'
                placeholder='First Name'
                value={userDetails.firstname}
                disabled={!isEditingName}
                onChange={(e) => setUserDetails({ ...userDetails, firstname: e.target.value })}
              />
              <input
                type='text'
                className='name-input'
                placeholder='Last Name'
                value={userDetails.lastname}
                disabled={!isEditingName}
                onChange={(e) => setUserDetails({ ...userDetails, lastname: e.target.value })}
              />
            </div>
            <button id='editname' onClick={() => handleEditToggle('name')}>
              {isEditingName ? 'Cancel' : 'Edit'}
            </button>

          </div>



    <input type='text' placeholder='Mobile Number' value={userDetails.mobile} disabled={!isEditingMobile} onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}/>
    <div>
      <button className='editmobileno' onClick={() => handleEditToggle('mobileno')}>{isEditingMobile ? 'Cancel' : 'Edit'}</button>
      {/* <button className='update-button' onClick={handleUpdate}>Update</button> */}
      </div>

          

          {/* Email Editing Section */}
          <div className='email-section'>
            <input
              type='text'
              className='email-input'
              placeholder='Email'
              value={userDetails.email}
              disabled={!isEditingEmail}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
            <button id='editemail' onClick={() => handleEditToggle('email')}>
              {isEditingEmail ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* My Orders Link */}
          <div className='orders'>
            <a href='/my-orders'>My Orders</a>
          </div>

          {/* Logout Component */}
          {/* <div className='logout'>
            <LogoutC />
          </div> */}
        </div>

        {message && <div className='error-message'>{message}</div>}

        {/* Single Update Button */}
        {isEdited && (
          <button className='update-button' onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    );
  }

  export default React.memo(ProfileP);
