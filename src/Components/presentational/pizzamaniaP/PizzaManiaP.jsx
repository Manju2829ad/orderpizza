import React, { useEffect, useState } from 'react';
import "./PizzaManiaP.css";
import CartP from '../cartp/CartP';

function PizzaManiaP({ pizzaData = [], addToCart, incrementCart, decrementCart }) {
  const [cards, setCards] = useState([]);
  
  // Use useEffect to update cards state when pizzaData is loaded or changes
  useEffect(() => {
    if (pizzaData.length > 0) {
      setCards(
        pizzaData.map((data) => ({
          id: data.id,
          size: 'Regular', // Set default size to 'Regular'
          crust: '', // Default empty crust
        }))
      );
    }
  }, [pizzaData]);

  console.log(cards);

// Make sure size and crust are selected from card
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

  // Prepare price data to be passed to CartP
  const priceData = {};
  cards.forEach((card) => {
    const pizza = pizzaData.find((data) => data.id === card.id);
    if (pizza) {
      const priceObj = pizza.prices.find((price) => price.size === card.size);
      if (priceObj) {
        priceData[card.id] = priceObj.price; // Map pizza id to its price
      }
    }
  });







  return (
    <div>
      {pizzaData.length > 0 ? (
        <div className="pizza-mania-container">
          {pizzaData.map((data) => {
            const card = cards.find((card) => card.id === data.id); // Find the corresponding card for each pizza
            console.log(card,":card")
            return (
              <div key={data.id} className="pizza-card">
                <img src={data.image} alt={data.name || 'Pizza'} />
                <span className='text'>
                  {data.prices.find(
                    (priceObj) => priceObj.size === card?.size
                  )?.price || 'N/A'}
                </span>
                <p>{data.description}</p>
                <button
                  type="button"
                  onClick={(e) => addToCart(data, card)}
                > 
                  Add To Cart
                </button>

                {/* Size selection dropdown */}
                <select
                  className="selectsize"
                  onChange={(e) => handleSizeChange(data.id, e.target.value)}
                >
                  {data.sizes.split(',').map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <br />

                {/* Crust selection dropdown */}
                <select
                  className="selectcrust"
                  onChange={(e) => handleCrustChange(data.id, e.target.value)}
                >
                  {data.crust.split(',').map((crust, index) => (
                    <option key={index} value={crust}>
                      {crust}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>Error while displaying the data</h1>
        </div>
      )}

      {/* Pass price data to CartP */}
      <CartP  />
    </div>
  );
}

export default PizzaManiaP;
