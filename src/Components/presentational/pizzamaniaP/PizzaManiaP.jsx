import React, { useState, useEffect, useContext } from 'react';
import './PizzaManiaP.css';
import { CartContext } from '../../container/cartC/CartProvider';

function PizzaManiaP({ pizzaData = [] }) {
  const { addToCart } = useContext(CartContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pizzaData.length > 0) {
      console.log("prices")
         console.log(pizzaData)
      setCards(
        pizzaData.map((data) => ({
          id: data.id,
          size: 'Regular',  // Default size
          crust: '',    
          prices:data.prices    // Default crust
        }))
      );
      setLoading(false); // Data is now available, stop showing skeletons.
    }
  }, [pizzaData]);

  const handleSizeChange = (id, size) => {
    setCards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, size: size } : card))
    );
  };

  const handleCrustChange = (id, crust) => {
    setCards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, crust: crust } : card
      )
    );
  };

  // Skeleton Loading Placeholder
  const skeletonCards = new Array(6).fill('');  // Placeholder for skeleton cards

  return (
    <div>
      <div className="pizza-mania-container">
        {/* Render skeletons until pizza data is ready */}
        {loading ? (
          skeletonCards.map((_, index) => (
            <div key={index} className="pizza-card skeleton">
              <div className="image-placeholder" />
              <span className="text-placeholder">Loading...</span>
              <p className="text-placeholder">Fetching details...</p>
            </div>
          ))
        ) : (
          // Once loading is done, map over the pizza data
          pizzaData.length === 0 ? (
            <p>No Data found</p>  // Handle no pizza data scenario
          ) : (
            pizzaData.map((data) => {
              const card = cards.find((card) => card.id === data.id); // Find the corresponding card
              return (
                <div key={data.id} className="pizza-card">
                  <img src={`http://springpizzaapp.onrender.com${data.image}`} alt={data.name || 'Pizza'} />
                  <span className="text">

                    <span>{data.prices}</span>
                  { 
  data.prices.find(
    (priceObj) => priceObj.size.toLowerCase() === (card?.size || '').toLowerCase()
  )?.price || 'N/A'
}
                  </span>
                  <p>{data.description}</p>

                  {/* Size selection dropdown */}
                  <select
                    className="selectsize"
                    onChange={(e) => handleSizeChange(data.id, e.target.value)}
                  >
                    {data.sizes.split(',').map((size, index) => (
                      <option key={index} value={size.trim()}>
                        {size.trim()}
                      </option>
                    ))}
                  </select>

                  {/* Crust selection dropdown */}
                  <select
                    className="selectcrust"
                    onChange={(e) => handleCrustChange(data.id, e.target.value)}
                  >
                    {data.crust.split(',').map((crust, index) => (
                      <option key={index} value={crust.trim()}>
                        {crust.trim()}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => addToCart(data, card)}  // Add pizza to the cart
                  >
                    Add To Cart
                  </button>
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
}

export default PizzaManiaP;
