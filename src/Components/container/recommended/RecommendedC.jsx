import React, { useContext, useEffect, useState } from 'react';
import RecommendedP from '../../presentational/recommended/RecommendedP';
import { CartContext } from '../cartC/CartProvider';



function RecommendedC() {
  const { addToCart,addToCart2, incrementCart, decrementCart, fetchPizza } = useContext(CartContext); // Destructure context values

  // State to hold pizza data
  const [pizzaData, setPizzaData] = useState([]);

  // Load pizza data when component mounts
  useEffect(() => {
    const loadPizzaData = async () => {
      try {
        const data = await fetchPizza("recommended"); // Pass category "recommended"
        // console.log(data, 'Pizza data fetched');
        setPizzaData(data); // Update state with fetched data
      } catch (error) {
        console.error('Failed to fetch pizza data:', error);
      }
    };

    loadPizzaData(); // Call the function to load pizza data
  }, [fetchPizza]); // Dependency array to run this effect when fetchPizza changes

  // Error handling for missing context functions
  if (!addToCart || !incrementCart || !decrementCart) {
    console.error("Cart context is not properly set.");
  }



  return (
    <div>
      <RecommendedP
               decrementCart={decrementCart}
        incrementCart={incrementCart}
      //  prices={prices} // Ensure prices is defined in your context or imported correctly
        pizzaData={pizzaData||[]} // Pass the pizza data state instead of the fetch method
        addToCart={addToCart}
        addToCart2={addToCart2}
      />
    </div>
  );
}

export default React.memo(RecommendedC);
