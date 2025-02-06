import React, { useState, useEffect, useContext } from 'react';
import './VegPizzaP.css';
import { CartContext } from '../../container/cartC/CartProvider';

function VegPizzaP({ pizzaData = [] }) {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pizzaData.length > 0) {
      setLoading(false);
    }
  }, [pizzaData]);

  const skeletonCards = new Array(6).fill('');

  return (
    <div className="VegPizzaP__Container">
      {loading ? (
        skeletonCards.map((_, index) => (
          <div key={index} className="VegPizzaP__Card VegPizzaP__Skeleton">
            <div className="VegPizzaP__ImagePlaceholder" />
            <span className="VegPizzaP__TextPlaceholder">Loading...</span>
            <p className="VegPizzaP__TextPlaceholder">Fetching details...</p>
          </div>
        ))
      ) : (
        pizzaData.length === 0 ? (
          <p className="VegPizzaP__NoData">No vegetarian pizzas found</p>
        ) : (
          pizzaData
            .filter((data) => data?.category === 'veg')
            .map((element) => (
              <div className="VegPizzaP__Card" key={element.id}>
                <img 
                  className="VegPizzaP__Image" 
                  src={`http://springpizzaapp.onrender.com${element.image}` || 'default-placeholder.png'} 
                  alt={element.name || 'Pizza'} 
                />
                <span className="VegPizzaP__Name">{element.name}</span>
                <p className="VegPizzaP__Description">{element.description}</p>

                <select className="VegPizzaP__SelectSize" defaultValue={element.sizes?.[0]}>
                  {Array.isArray(element.sizes) &&
                    element.sizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size.trim()}
                      </option>
                    ))}
                </select>

                <select className="VegPizzaP__SelectCrust" defaultValue={element.crusts?.[0]}>
                  {Array.isArray(element.crusts) &&
                    element.crusts.map((crust, index) => (
                      <option key={index} value={crust}>
                        {crust.trim()}
                      </option>
                    ))}
                </select>

                <button 
                  className="VegPizzaP__AddToCartButton" 
                  onClick={() => addToCart(element, { size: 'medium' })}
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

export default VegPizzaP;
