import React, { useState, useEffect, useContext } from 'react';
import './NewLaunchesP.css';
import { CartContext } from '../../container/cartC/CartProvider';

function NewLaunchesP({ pizza = [] }) {
  const { addToCart2 } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pizza.length > 0) {
      setLoading(false);
      console.log("pizza", pizza);
    }
  }, [pizza]);

  const skeletonCards = new Array(6).fill('');

  return (
    <div className="NewLaunchesP__Container">
      {loading ? (
        skeletonCards.map((_, index) => (
          <div key={index} className="NewLaunchesP__Card NewLaunchesP__Skeleton">
            <div className="NewLaunchesP__ImagePlaceholder" />
            <span className="NewLaunchesP__TextPlaceholder">Loading...</span>
            <p className="NewLaunchesP__TextPlaceholder">Fetching details...</p>
          </div>
        ))
      ) : (
        pizza.length === 0 ? (
          <p>No Data found</p>
        ) : (
          pizza.map((element) => (
            <div className="NewLaunchesP__Card" key={element.id}>
              <img src={`http://springpizzaapp.onrender.com${element.image}`} alt={element.name} className="NewLaunchesP__Image" />
              <span className="NewLaunchesP__Name">{element.name}</span>
              <p className="NewLaunchesP__Description">{element.description}</p>
              <select className="NewLaunchesP__SelectSize">
                {element.sizes.split(',').map((size, index) => (
                  <option key={index}>{size.trim()}</option>
                ))}
              </select>
              <button 
                className="NewLaunchesP__AddToCartButton" 
                onClick={() => addToCart2(element, { size: 'medium' })}
              >
                Add to Cart
              </button>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default React.memo(NewLaunchesP);
