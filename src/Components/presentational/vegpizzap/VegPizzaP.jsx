import React, { useState, useEffect, useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import './VegPizzaP.css';
import { CartContext } from '../../container/cartC/CartProvider';

function VegPizzaP({ pizzaData = [] }) {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pizzaData.length > 0) {
      setLoading(false); // Set loading to false once pizza data is available
    }
  }, [pizzaData]);

  const skeletonCards = new Array(6).fill(''); // Skeleton placeholders

  return (
    <div className="Container">
      {loading ? (
        skeletonCards.map((_, index) => (
          <div key={index} className="card skeleton">
            <div className="image-placeholder" />
            <span className="text-placeholder">Loading...</span>
            <p className="text-placeholder">Fetching details...</p>
          </div>
        ))
      ) : (
        pizzaData.length === 0 ? (
          <p>No vegetarian pizzas found</p>
        ) : (
          pizzaData
            .filter((data) => data?.category === 'veg')
            .map((element) => (
              <div className="card" key={element.id}>
                <img
                  src={element.image || 'default-placeholder.png'}
                  alt={element.name || 'Pizza'}
                />
                <span>{element.name}</span>
                <p>{element.description}</p>

                <select defaultValue={element.sizes?.[0]}>
                  {Array.isArray(element.sizes) &&
                    element.sizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size.trim()}
                      </option>
                    ))}
                </select>

                <select defaultValue={element.crusts?.[0]}>
                  {Array.isArray(element.crusts) &&
                    element.crusts.map((crust, index) => (
                      <option key={index} value={crust}>
                        {crust.trim()}
                      </option>
                    ))}
                </select>

                <button onClick={() => addToCart(element, { size: 'medium' })}>
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
