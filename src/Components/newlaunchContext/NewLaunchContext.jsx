import React, { createContext } from 'react';

export const newLaunchContext = createContext();

function NewLaunchContext({ children }) {
  // Fetch Pizza data by category
  const fetchNewLaunch = async (category) => {
    try {
      const response = await fetch(`https://springpizzaapp.onrender.com/api/pizza/get/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa('user:98480')
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <newLaunchContext.Provider value={{ fetchNewLaunch }}>
      {children}
    </newLaunchContext.Provider>
  );
}

export default NewLaunchContext;
