import React, { useState, useEffect, useContext } from 'react';
import './VegPizzaP.css';
import { CartContext } from '../../container/cartC/CartProvider';

function VegPizzaP({ pizzaData = [], addToCart, incrementCart, decrementCart }) {
  const { addToCart: contextAddToCart } = useContext(CartContext);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    // Initialize selections when pizzaData changes
    const initialSelections = pizzaData.reduce((acc, element) => {
      acc[element.id] = {
        size: element.sizes?.[0] || 'medium',
        crust: element.crusts?.[0] || 'thin',
      };
      return acc;
    }, {});
    setSelections(initialSelections);
  }, [pizzaData]);

  const handleSelectionChange = (pizzaId, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [pizzaId]: { ...prev[pizzaId], [field]: value },
    }));
  };

  if (!pizzaData.length) {
    return <p className="VegPizzaP__NoData">No vegetarian pizzas found</p>;
  }

  return (
    <div className="VegPizzaP__Container">
      {pizzaData.map((element) => (
        <div className="VegPizzaP__Card" key={element.id}>
          <h1>{element.name}</h1>
          <img
            className="VegPizzaP__Image"
            src={`https://springpizzaapp.onrender.com${element.image}` || 'default-placeholder.png'}
            alt={element.name || 'Pizza'}
          />
          <span className="VegPizzaP__Name">{element.name}</span>
          <p className="VegPizzaP__Description">{element.description}</p>

          <select
            className="VegPizzaP__SelectSize"
            value={selections[element.id]?.size || element.sizes?.[0] || 'medium'}
            onChange={(e) => handleSelectionChange(element.id, 'size', e.target.value)}
          >
            {Array.isArray(element.sizes) && element.sizes.length ? (
              element.sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size.trim()}
                </option>
              ))
            ) : (
              <option value="medium">Medium</option>
            )}
          </select>
          <select
            className="VegPizzaP__SelectCrust"
            value={selections[element.id]?.crust || element.crusts?.[0] || 'thin'}
            onChange={(e) => handleSelectionChange(element.id, 'crust', e.target.value)}
          >
            {Array.isArray(element.crusts) && element.crusts.length ? (
              element.crusts.map((crust, index) => (
                <option key={index} value={crust}>
                  {crust.trim()}
                </option>
              ))
            ) : (
              <option value="thin">Thin</option>
            )}
          </select>

          <button
            className="VegPizzaP__AddToCartButton"
            onClick={() =>
              (addToCart || contextAddToCart)(element, {
                size: selections[element.id]?.size || 'medium',
                crust: selections[element.id]?.crust || 'thin',
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default React.memo(VegPizzaP);