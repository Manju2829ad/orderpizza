import React, { useContext, useState, useEffect } from "react";
import VegPizzaP from "../../presentational/vegpizzap/VegPizzaP";
import { CartContext } from "../cartC/CartProvider";

function VegPizzaC() {
  const {
    addToCart,
    incrementCart,
    decrementCart,
    fetchPizza,
    fetchPriceByPizzaId,
  } = useContext(CartContext);

  const [pizzaData, setPizzaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadPizzaData = async () => {
      setLoading(false);
      setError(null);

      try {
        const data = await fetchPizza("veg");
        if (!mounted) return;

        const enhancedData = await Promise.all(
          data.map(async (pizza) => {
            try {
              const prices = await fetchPriceByPizzaId(pizza.id);
              return { ...pizza, prices };
            } catch (err) {
              console.error(`Failed to fetch prices for pizza ${pizza.id}:`, err);
              return { ...pizza, prices: [] };
            }
          })
        );
        setPizzaData(enhancedData);
      } catch (err) {
        if (mounted) {
          setError("Failed to load pizzas. Please try again later.");
          console.error("Failed to fetch pizza data:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPizzaData();

    return () => {
      mounted = false;
    };
  }, [fetchPizza, fetchPriceByPizzaId]);

  const updatePizzaState = (pizzaId, changes) => {
    setPizzaData((prevData) =>
      prevData.map((pizza) => (pizza.id === pizzaId ? { ...pizza, ...changes } : pizza))
    );
  };

  // const handleAddToCart = async (pizza) => {
  //   try {
  //     await addToCart(pizza);
  //     updatePizzaState(pizza.id, { inCart: true, quantity: (pizza.quantity || 0) + 1 });
  //   } catch (err) {
  //     console.error("Failed to add to cart:", err);
  //   }
  // };

  // const handleIncrement = async (pizzaId) => {
  //   try {
  //     await incrementCart(pizzaId);
  //     updatePizzaState(pizzaId, { quantity: (pizzaData.find(p => p.id === pizzaId)?.quantity || 0) + 1 });
  //   } catch (err) {
  //     console.error("Failed to increment quantity:", err);
  //   }
  // };

  // const handleDecrement = async (pizzaId) => {
  //   try {
  //     await decrementCart(pizzaId);
  //     updatePizzaState(pizzaId, {
  //       quantity: Math.max((pizzaData.find(p => p.id === pizzaId)?.quantity || 0) - 1, 0),
  //     });
  //   } catch (err) {
  //     console.error("Failed to decrement quantity:", err);
  //   }
  // };

//   return (
//     <div className="veg-pizza-container">
//       <h2 className="veg-pizza-title">Veg Pizzas</h2>

//       {error ? (
//         <div className="error-message">
//           {error}
//           <button onClick={() => window.location.reload()}>Try Again</button>
//         </div>
//       ) : (
//         <VegPizzaP
//           pizzaData={pizzaData}
//            loading={loading}
//           onAddToCart={handleAddToCart}
//           handleIncrement={handleIncrement}
//           handleDecrement={handleDecrement}
//         />
//       )}
//     </div>
//   );
// }


  // Load pizza data when component mounts
  useEffect(() => {
    const loadPizzaData = async () => {
      try {
        const data = await fetchPizza("veg"); // Pass category "recommended"
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
      <VegPizzaP 
       // prices={prices} // Ensure prices is defined in your context or import
        pizzaData={pizzaData} // Pass the pizza data state instead of the fetch method
        addToCart={addToCart} 
        incrementCart={incrementCart} 
        decrementCart={decrementCart} 
      />
    </div>
  );
}

export default VegPizzaC;
