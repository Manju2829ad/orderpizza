import React, { useState, useEffect, useContext } from 'react';
import './NewLaunchesP.css';
import { CartContext } from '../../container/cartC/CartProvider';


function NewLaunchesP({ pizza = [] }) {
  const { addToCart2 } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  // Effect for simulating a delay or fetching data (just for simulation here)
  useEffect(() => {
    if (pizza.length > 0) {
      setLoading(false);  // Set loading to false once pizza data is available
      console.log("pizza");
      console.log(pizza)
    }
  }, [pizza]);

  // Skeleton Loading Placeholder
  const skeletonCards = new Array(6).fill(''); // Placeholder for skeleton cards

  return (
    <div className="Container">
      {/* Render Skeletons until data is ready */}
      {loading ? (
        skeletonCards.map((_, index) => (
          <div key={index} className="card skeleton">
            <div className="image-placeholder" />
            <span className="text-placeholder">Loading...</span>
            <p className="text-placeholder">Fetching details...</p>
          </div>
        ))
      ) : (
        // Once loading is done, map over the pizza data
        pizza.length === 0 ? (
          <p>No Data found</p>  // Handle no pizza data scenario
        ) : (
          pizza.map((element) => (
            <div className="card" key={element.id}>   
              <img src={element.image} alt={element.name} />
              <span>{element.name}</span>
              <p>{element.description}</p>
              
            


            <select >
              {element.sizes.split(',').map((size, index) => (
                <option key={index} >
                  {size.trim()} 
                </option>
              ))}
            </select>
              <button onClick={() => addToCart2(element, { size: 'medium' })}>
                Add to Cart
              </button>
              
            </div>
          ))
        )
      )}
    </div>
  );
}

export default NewLaunchesP;
