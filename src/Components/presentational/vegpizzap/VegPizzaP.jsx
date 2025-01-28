import React, { useState, useEffect, useCallback } from 'react';
import './VegPizzaP.css';
import CartP from '../cartp/CartP';

function VegPizzaP({ pizzaData = [], addToCart, handleIncrement, handleDecrement }) {
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
    <div className='veg-pizza-page'>
      <div className='veg-pizza-products'>
        {pizzaData
          .filter((data) => data && data.category === 'veg') // Filter for vegetarian pizzas
          .map((data) => (
            <MemoizedVegPizzaCard
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

      <div className='veg-pizza-cart-container'>
        <MemoizedCartP prices={currentPrices} />
      </div>
    </div>
  );
}

// Memoized vegetarian pizza card
const VegPizzaCard = ({
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
    <div className='veg-pizza-card'>
      <div className="veg-pizza-image">
        <img src={pizza.image || ''} alt={pizza.name || 'Pizza'} />
      </div>
      <h3 className='veg-pizza-title'>{pizza.name}</h3>
      <p className='veg-pizza-descp'>{pizza.description}</p>
      <span className='veg-pizza-prices'>₹ {currentPrice}</span>

      {pizza.inCart ? (
        <div className="veg-pizza-buttons">
          <button className="veg-pizza-increase" onClick={() => handleIncrement(pizza.id)}>
            <span className="veg-pizza-plus">+</span>
          </button>
          <span className="veg-pizza-quantity">{pizza.quantity}</span>
          <button className="veg-pizza-decrease" onClick={() => handleDecrement(pizza.id)}>
            <span className="veg-pizza-minus">-</span>
          </button>
        </div>
      ) : (
        <div className="veg-pizza-addtocart">
          <button className="veg-pizza-text" onClick={() => handleAddToCart(pizza)}>
            <span >Add to Cart</span>
          </button>
        </div>
      )}

      <select
        className="veg-pizza-sizedropdown"
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
        className="veg-pizza-crust-size"
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

const MemoizedVegPizzaCard = React.memo(VegPizzaCard);
const MemoizedCartP = React.memo(CartP);

export default VegPizzaP;
