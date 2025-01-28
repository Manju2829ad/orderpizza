import React, { useState, useEffect } from 'react';
import PizzaItem from '../../presentational/pizzaitem/pizzaitem';


function MenuContainer() {
  const [menu, setMenu] = useState([]);

  useEffect(() =>
    {
    // Fetch menu data
    setMenu([
      { id: 1, name: 'Margherita', description: 'Classic delight with 100% real mozzarella cheese', price: '$10' },
      { id: 2, name: 'Pepperoni', description: 'Loaded with pepperoni & mozzarella cheese', price: '$12' }
    ]);
  }, []);

  const handleOrderClick = (pizzaId) => {
    console.log(`Ordered pizza with id: ${pizzaId}`);
  };

  return (
    <div className='menu'>
      {menu.map(pizza => (
        <PizzaItem
          key={pizza.id}
          name={pizza.name}
          description={pizza.description}
          price={pizza.price}
          onOrderClick={() => handleOrderClick(pizza.id)}
        />
      ))}
    </div>
  );
}

export default MenuContainer;
