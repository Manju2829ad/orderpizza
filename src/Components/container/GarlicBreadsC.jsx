import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from './cartC/CartProvider.jsx';
import GarlicBreadsP from "../presentational/GarlicBreadsP.jsx";

function GarlicBreadsC() {
  const { addToCart, incrementCart, decrementCart, fetchPizza } = useContext(CartContext);
  const [pizzaData, setPizzaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzaData = async () => {
      try {
        const data = await fetchPizza('Garlic Bread');
        console.log("Fetched Pizza Data:", data);
        setPizzaData(data || []);
      } catch (error) {
        console.error("Error fetching pizza data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzaData();
  }, [fetchPizza]);

  return (
    <div>
      <h1>GarlicBreadsC</h1>
      <GarlicBreadsP
        addToCart={addToCart}
        incrementCart={incrementCart}
        decrementCart={decrementCart}
        pizzaData={pizzaData}
        loading={loading}
      />
    </div>
  );
}

export default GarlicBreadsC;
