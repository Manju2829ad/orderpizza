import React, { useState, useEffect, useCallback } from 'react';
import './RecommendedP.css';
import CartP from '../cartp/CartP';

function RecommendedP({ pizzaData = [], addToCart2 }) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCrusts, setSelectedCrusts] = useState({});
  const [currentPrices, setCurrentPrices] = useState({});

  // Update prices based on selected size for all pizzas
  useEffect(() => {
    const prices = {};
    pizzaData.forEach((pizza) => {
      const selectedSize = selectedSizes[pizza.id] || 'Regular';
      const priceObj = pizza.prices.find((price) => price.size === selectedSize);
      prices[pizza.id] = priceObj ? priceObj.price : 0;
    });
    setCurrentPrices(prices);
    localStorage.setItem('currentPrices', JSON.stringify(prices));
  }, [pizzaData, selectedSizes]);

  // Load prices from localStorage when the component mounts
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
    addToCart2(pizza, selectedSize);
  }, [addToCart2, selectedSizes, selectedCrusts]);

  return (
    <div className='recommended-page'>
      {/* Recommended Products */}
      <div className='recommended-products'>
        {pizzaData
          .filter((data) => data && data.category === 'recommended') // Filter for recommended pizzas
          .map((data) => (
            <MemoizedPizzaCard
              key={data.id}
              pizza={data}
              selectedSize={selectedSizes[data.id] || 'Regular'}
              selectedCrust={selectedCrusts[data.id] || 'Hand Tossed'}
              currentPrice={currentPrices[data.id] || 0}
              handleSizeChange={handleSizeChange}
              handleCrustChange={handleCrustChange}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>

      {/* CartP Rendering */}
      <div className='recommended-cart-container'>
        <CartP /> {/* This renders the CartP component */}
      </div>
    </div>
  );
}

// Memoize the pizza card component to prevent unnecessary re-renders
const PizzaCard = ({
  pizza,
  selectedSize,
  selectedCrust,
  currentPrice,
  handleSizeChange,
  handleCrustChange,
  handleAddToCart,
}) => {
  const sizesArray = typeof pizza.sizes === 'string' ? pizza.sizes.split(',') : pizza.sizes;
  const crustsArray = typeof pizza.crust === 'string' ? pizza.crust.split(',') : pizza.crust;

  return (
    <div className='recommended-card'>
      <div className="recommended-image">
        <img src={pizza.image || ''} alt={pizza.name || 'Pizza'} />
      </div>
      <h3 className='recommended-title'>{pizza.name}</h3>
      <p className='recommended-descp'>{pizza.description}</p>
      <span className='recommended-prices'>₹ {currentPrice}</span>

      {/* Add to cart button */}
      <div className="recommended-addtocart">
        <button className="recommended-text" onClick={() => handleAddToCart(pizza)}>
          <span >Add to Cart</span>
        </button>
      </div>

      {/* Size dropdown */}
      <select
        className="recommended-sizedropdown"
        value={selectedSize}
        onChange={(e) => handleSizeChange(pizza.id, e.target.value)}
      >
        {sizesArray.map((size, index) => (
          <option key={index} value={size}>
            {size} - ₹{pizza.prices.find((price) => price.size === size)?.price || 0}
          </option>
        ))}
      </select>

      {/* Crust dropdown */}
      <select
        className="recommended-crust-size"
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

const MemoizedPizzaCard = React.memo(PizzaCard);

export default RecommendedP;
