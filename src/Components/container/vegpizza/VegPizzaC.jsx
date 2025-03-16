import React, { useContext, useEffect, useState } from "react";
import VegPizzaP from "../../presentational/vegpizzap/VegPizzaP";
import { CartContext } from "../cartC/CartProvider";

function VegPizzaC() {
  const { addToCart, incrementCart, decrementCart, fetchPizza } = useContext(CartContext); // Destructure context values

  // State to hold pizza data
  const [pizzaData, setPizzaData] = useState([]);

  // Load pizza data when component mounts
  useEffect(() => {
    const loadPizzaData = async () => {
      try {
        const data = await fetchPizza("veg"); // Pass category "veg"
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
      <VegPizzaP
        pizzaData={pizzaData || []} // Pass the pizza data state, default to empty array
        addToCart={addToCart}
        incrementCart={incrementCart}
        decrementCart={decrementCart}
      />
    </div>
  );
}

export default React.memo(VegPizzaC);