import React, { useState, useEffect } from "react";
import { ClipLoader } from 'react-spinners';
import './VegPizzaP.css';
import CartP from '../cartp/CartP';

const PizzaCardSkeleton = React.memo(({ pizzaData, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className='veg-pizza-card'>
      <div className="veg-pizza-image">
        {!imageLoaded && <ClipLoader size={50} color="#0000ff" />}
        <img 
          src={pizzaData?.image || 'default-placeholder.png'} 
          alt={pizzaData?.name || 'Pizza'}
          style={{ 
            display: imageLoaded ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      </div>

      <h3 className="pizza-name">
        {pizzaData?.name}
      </h3>

      <p className="pizza-description">
        {pizzaData?.description}
      </p>

      <div className="pizza-price">
        ₹{pizzaData?.price || '0.00'}
      </div>

      <div className="pizza-controls">
        <select className="size-select" defaultValue={pizzaData?.sizes?.[0]}>
          {pizzaData?.sizes?.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <select className="crust-select" defaultValue={pizzaData?.crusts?.[0]}>
          {pizzaData?.crusts?.map(crust => (
            <option key={crust} value={crust}>{crust}</option>
          ))}
        </select>

        <button 
          onClick={() => onAddToCart(pizzaData)}
          className='add-to-cart-button'
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

const VegPizzaP = ({ pizzaData = [], loading, onAddToCart }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!loading && pizzaData !== undefined && pizzaData.length > 0) { 
      setDataLoaded(true); 
    }
  }, [ pizzaData,dataLoaded]); 


  return (
    <div className="veg-pizza-page">
      {!dataLoaded ? (
        <div className="main-loader">
          <ClipLoader size={100} color="#36d7b7" />
          <p>Loading Delicious Pizzas...</p>
        </div>
      ) : (
        pizzaData.length === 0 ? (
          <div className="no-pizzas-found">
            No vegetarian pizzas found.
          </div>
        ) : (
          <div className="veg-pizza-products">
            {pizzaData
              .filter(data => data?.category === 'veg')
              .map((data) => (
                <PizzaCardSkeleton 
                  key={data.id} 
                  pizzaData={data}
                  onAddToCart={onAddToCart}
                />
              ))}
          </div>
        )
      )}
      <div className="veg-pizza-cart">
        <CartP />
      </div>
    </div>
  );
};

export default VegPizzaP;