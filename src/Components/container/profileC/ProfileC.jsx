import React, { useEffect, useState, useCallback } from 'react';
import ProfileP from '../../presentational/profileP/ProfileP';

function ProfileC() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState({}); // Change to object since we're fetching user data

  const fetchProfileDetails = useCallback(async (id) => {
    console.log("inside the fetchProfileDetails");
    try {    
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`https://springpizzaapp.onrender.com/api/users/getuser/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setMessage('Error fetching the User Details');
        return; // Stop further execution
      }

      const data = await response.json();
      setData(data);
      console.log(data, "Fetched user data");
    } catch (error) {
      if (error.response) {
        // Handle server error response
        if (error.response.status === 400) {
          setMessage('Bad Request: Invalid input data');
        } else if (error.response.status === 401) {
          setMessage('Unauthorized: Invalid mobile number or password');
        } else if (error.response.status === 500) {
          setMessage('Internal Server Error: Please try again later');
        } else {
          setMessage(`Error: ${error.response.data.message || 'Something went wrong'}`);
        }
      } else if (!error.request) {
        // Handle no response from server
        setMessage('No response from server. Please check your internet connection or try again later.');
      } else {
        // Handle request setup errors
        setMessage(`Error: ${error.message}`);
      }
    }
  }, []); // Empty array ensures this function is only created once

  const updateUser = useCallback(async (updatedData) => {
    console.log("inside updateUser");
  
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch("https://springpizzaapp.onrender.com/api/users/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        setMessage('Error updating the User Details');
        return; // Stop further execution
      }
  
      const result = await response.json();
      setMessage(result.message || "User details updated successfully");
      console.log(result, "Update response");
  
      // Optionally re-fetch the user profile details to get updated data
      // if (updatedData.uid) {
      //   await fetchProfileDetails(updatedData.uid);
      //   console.log("if")
      // }
    } catch (error) {
      setMessage("Error: Could not update the user details.");
      console.error("Update error:", error);
      console.log('else')
    }

    
  }, [fetchProfileDetails]
); // Dependency on fetchProfileDetails to allow re-fetching updated data
  











  return (
    <div>
      Profile
      <ProfileP 
        message={message}
        data={data} // Pass the fetched data to ProfileP
        fetchProfileDetails={fetchProfileDetails} // Pass the fetch function
        updateUser={updateUser}
      />
    </div>
  );
}

export default ProfileC;
