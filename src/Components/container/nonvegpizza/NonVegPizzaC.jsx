import { useContext,useState,useEffect } from 'react';

import NonVegPizzaP from '../../presentational/nonvegpizzap/NonVegPizzaP'
import { CartContext } from '../cartC/CartContext.jsx';


function NonVegPizzaC() {

  const { addToCart, incrementCart, decrementCart, fetchPizza } = useContext(CartContext);
    
  
  // State to hold pizza data
  const [pizzaData, setPizzaData] = useState([]);

  // Load pizza data when component mounts
  useEffect(() => {
    const loadPizzaData = async () => {
      try {
        const data = await fetchPizza("nonVeg"); // Pass category "recommended"
        console.log(data, 'Pizza data fetched');
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
      <h2>Recommended Pizzas</h2>
      <NonVegPizzaP 
       // prices={prices} // Ensure prices is defined in your context or import
        pizzaData={pizzaData} // Pass the pizza data state instead of the fetch method
        addToCart={addToCart} 
        incrementCart={incrementCart} 
        decrementCart={decrementCart} 
      />
    </div>
  );
}
export default NonVegPizzaC
