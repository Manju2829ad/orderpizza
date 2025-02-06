import React, { useEffect, useState } from 'react';
import "./GarlicBreadP.css";

function GarlicBreadsP({ addToCart, pizzaData }) {
  const [loading, setLoading] = useState(true); // Skeleton loading state

  useEffect(() => {
    if (Array.isArray(pizzaData) && pizzaData.length > 0) {
      setLoading(false); // Stop loading when data is available
      console.log("Garlic Bread Data:", pizzaData);
    }
  }, [pizzaData]);

  const skeletonCards = new Array(6).fill(''); // Placeholder for skeletons

  return (
    <div className="Garlicbread-container container text-red-400 mx-auto">
      <h1>Garlic Breads and More...</h1>
      <div className="Garlic-image-container">
        {loading ? (
          skeletonCards.map((_, index) => (
            <div key={index} className="Garlic-image-card skeleton">
              <div className="skeleton-box skeleton-image" />
              <span className="skeleton-text">Loading...</span>
              <p className="skeleton-text">Fetching details...</p>
            </div>
          ))
        ) : (
          pizzaData.map((pizza, index) => (
            <div key={index} className="Garlic-image-card">
              <div className="Garlic-image">
                <img src={pizza.image || ""} alt={pizza.name || "Garlic Bread"} />
              </div>
              <h3 className="garlic-title">{pizza.name || "Loading..."}</h3>
              <p className="garlic-desc">{pizza.description || "Delicious garlic bread waiting"}</p>
              <span className="garlic-price">₹ {pizza.price || "0.00"}</span>
              <button className="add-to-cart-btn" onClick={() => addToCart(pizza)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GarlicBreadsP;
