import React from 'react';

const PizzaCustomizationForm = ({ customization, updateCustomization, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>Toppings</label>
      {/* Toppings selection UI */}
    </div>
    <div>
      <label>Size</label>
      {/* Size selection UI */}
    </div>
    <div>
      <label>Crust</label>
      {/* Crust selection UI */}
    </div>
    <button type="submit">Add to Order</button>
  </form>
);

export default PizzaCustomizationForm;
