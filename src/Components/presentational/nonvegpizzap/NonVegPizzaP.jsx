import React, { useState, useEffect, useCallback } from 'react';

import "./NonVegPizzaP.css"; // New CSS file for non-veg pizzas
import CartP from '../cartp/CartP';

function NonVegPizzaP({ pizzaData = [], addToCart, handleIncrement, handleDecrement }) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCrusts, setSelectedCrusts] = useState({});
  const [currentPrices, setCurrentPrices] = useState({});

  const updatePrices = useCallback(() => {
    const prices = {};
    pizzaData.forEach((pizza) => {
      const selectedSize = selectedSizes[pizza.id] || 'Regular';
      const priceObj = pizza.prices?.find((price) => price.size === selectedSize);
      prices[pizza.id] = priceObj ? priceObj.price : 0;
    });
    setCurrentPrices(prices);
    localStorage.setItem('currentPrices', JSON.stringify(prices));
  }, [pizzaData, selectedSizes]);

  useEffect(() => {
    updatePrices();
  }, [updatePrices]);

  useEffect(() => {
    const savedPrices = localStorage.getItem('currentPrices');
    if (savedPrices) {
      setCurrentPrices(JSON.parse(savedPrices));
    }
  }, []);

  const handleSizeChange = useCallback((id, newSize) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [id]: newSize,
    }));
  }, []);

  const handleCrustChange = useCallback((id, newCrust) => {
    setSelectedCrusts((prevCrusts) => ({
      ...prevCrusts,
      [id]: newCrust,
    }));
  }, []);

  const handleAddToCart = useCallback((pizza) => {
    const selectedSize = selectedSizes[pizza.id] || 'Regular';
    const selectedCrust = selectedCrusts[pizza.id] || 'Hand Tossed';
    addToCart(pizza, selectedSize, selectedCrust);
  }, [addToCart, selectedSizes, selectedCrusts]);

  return (
    <div className='non-veg-pizza-page'>
      <div className='non-veg-pizza-products'>
        {pizzaData
          .filter((data) => data && data.category === 'nonVeg') // Filter for non-vegetarian pizzas
          .map((data) => (
            <MemoizedNonVegPizzaCard
              key={data.id}
              pizza={data}
              selectedSize={selectedSizes[data.id] || 'Regular'}
              selectedCrust={selectedCrusts[data.id] || 'Hand Tossed'}
              currentPrice={currentPrices[data.id] || 0}
              handleSizeChange={handleSizeChange}
              handleCrustChange={handleCrustChange}
              handleAddToCart={handleAddToCart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          ))}
      </div>

      <div className='cart-container'>
        <MemoizedCartP prices={currentPrices} />
      </div>
    </div>
  );
}

// Memoized non-vegetarian pizza card
const NonVegPizzaCard = ({
  pizza,
  selectedSize,
  selectedCrust,
  currentPrice,
  handleSizeChange,
  handleCrustChange,
  handleAddToCart,
  handleIncrement,
  handleDecrement,
}) => {
  const sizesArray = typeof pizza.sizes === 'string' ? pizza.sizes.split(',') : pizza.sizes;
  const crustsArray = typeof pizza.crust === 'string' ? pizza.crust.split(',') : pizza.crust;

  return (
    <div className='nonvegcard'>
      <div className="nonvegimage">
        <img src={pizza.image || ''} alt={pizza.name || 'Pizza'} />
      </div>
      <h3 className='nonvegtitle'>{pizza.name}</h3>
      <p className='nonvegdescp'>{pizza.description}</p>
      <span className='nonvegprices'>₹ {currentPrice}</span>

      {pizza.inCart ? (
        <div className="nonvegbuttons">
          <button className="nonvegincrease" onClick={() => handleIncrement(pizza.id)}>
            <span className="nonvegplus">+</span>
          </button>
          <span className="nonvegquantity">{pizza.quantity}</span>
          <button className="nonvegdecrease" onClick={() => handleDecrement(pizza.id)}>
            <span className="nonvegminus">-</span>
          </button>
        </div>
      ) : (
        <div className="nonvegaddtocart">
          <button onClick={() => handleAddToCart(pizza)}>
            <span className="nonvegtext">Add to Cart</span>
          </button>
        </div>
      )}

      <select
        className="nonvegsizedropdown"
        value={selectedSize}
        onChange={(e) => handleSizeChange(pizza.id, e.target.value)}
      >
        {sizesArray.map((size, index) => (
          <option key={index} value={size}>
            {size} - ₹{pizza.prices.find((price) => price.size === size)?.price || 0}
          </option>
        ))}
      </select>

      <select
        className="nonvegcrust-size"
        value={selectedCrust}
        onChange={(e) => handleCrustChange(pizza.id, e.target.value)}
      >
        {crustsArray.map((crust, index) => (
          <option key={index} value={crust}>
            {crust}
          </option>
        ))}
      </select>
    </div>
  );
};

const MemoizedNonVegPizzaCard = React.memo(NonVegPizzaCard);
const MemoizedCartP = React.memo(CartP);

export default NonVegPizzaP;
