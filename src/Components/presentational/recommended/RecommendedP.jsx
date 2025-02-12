import React, { useState, useEffect, useCallback } from 'react';
import './RecommendedP.css';
import CartP from '../cartp/CartP';




function RecommendedP({ pizzaData = [], addToCart2={} }) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCrusts, setSelectedCrusts] = useState({});
  const [currentPrices, setCurrentPrices] = useState({});
  const [loading, setLoading] = useState(true);

  // Handle price updates based on selected size
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

  useEffect(() => {
    if (window.Worker) {
      const worker = new Worker(new URL("./dataWorker.js", import.meta.url));

      worker.postMessage(pizzaData);

      worker.onmessage = (event) => {
        const hasData = event.data;
        setLoading(!hasData);
        worker.terminate(); // Clean up the worker
      };
    } else {
      // Fallback for unsupported environments
      setLoading(pizzaData.length === 0);
    }
  }, [pizzaData]);

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

  const handleAddToCart = useCallback(
    (pizza) => {
      const selectedSize = selectedSizes[pizza.id] || 'Regular';
      addToCart2(pizza, selectedSize);
    },
    [addToCart2, selectedSizes]
  );

  const skeletonCards = Array.from({ length: 9 });

  return (
    <div className='recommended-page'>
      <div className='recommended-products'>
        {loading
          ? skeletonCards.map((_, index) => (
              <div key={index} className='recommended-card skeleton'>
                <p style={{color:"black",fontSize:'1rem'}}>loading...</p>
                <div className='recommended-skeleton-image' />
                <div className='recommended-skeleton-title' />
                <div className='recommended-skeleton-text' />
              </div>
            ))
          : pizzaData
              .filter((data) => data && data.category === 'recommended')
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
{/* 
      <div className='recommended-cart-container'>
        <CartP />
      </div> */}
    </div>
  );
}

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
      <div className='recommended-image'>
        <img src={`http://springpizzaapp.onrender.com${pizza.image}` || ''} alt={pizza.name || 'Pizza'} />
      </div>
      <h3 className='recommended-title'>{pizza.name}</h3>
      <p className='recommended-descp'>{pizza.description}</p>
      <span className='recommended-prices'>₹ {currentPrice}</span>

      <div className='recommended-addtocart'>
        <button onClick={() => handleAddToCart(pizza)}>Add to Cart</button>
      </div>

      <select
        className='recommended-sizedropdown'
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
        className='recommended-crust-size'
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

export default React.memo(RecommendedP);
