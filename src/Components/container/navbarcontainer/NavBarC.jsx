import React from 'react';
import RecommendedC from '../recommended/RecommendedC';
import NavBarP from '../../presentational/navbar/NavbarP';
import NonVegPizzaC from '../nonvegpizza/NonVegPizzaC';
import VegPizzaC from '../vegpizza/VegPizzaC';
import NewLaunchesC from '../newlaunchesC/NewLaunchesC';
import PizzaManiaC from '../pizzamaniaC/PizzaManiaC';

import BeveragesC from '../beveragesC/BeveragesC';
import GarlicBreadsC from '../GarlicBreadsC';

export const getNavObject = () => {
  const navItems = [
    // { id: 0, name: 'Everyday Value', path: '/everyday-value', element: '' },
    { id: 1, name: 'Recommended', path: '/recommended', element: <RecommendedC /> },
    { id: 2, name: 'New Launches', path: '/new-launches',element:<NewLaunchesC></NewLaunchesC> },
    // { id: 3, name: 'Cheese Volcano', path: '/cheese-volcano' },
    { id: 4, name: 'Veg Pizza', path: '/veg-pizza', element: <VegPizzaC /> },
    // { id: 5, name: 'Gourmet Pizza', path: '/gourmet-pizza' },
    { id: 6, name: 'Non-Veg Pizza', path: '/non-veg-pizza', element: <NonVegPizzaC /> },
    { id: 7, name: 'Beverages', path: '/beverages' ,element:<BeveragesC/>},
    { id: 8, name: 'Garlic Breads & More', path: '/garlic-breads-more',element:<GarlicBreadsC/>},
    { id: 9, name: 'Pizza Mania', path: '/pizza-mania',element:<PizzaManiaC/> },
    
    // { id: 10, name: 'Value Combos', path: '/value-combos' },
    // { id: 11, name: 'Desserts', path: '/desserts' },
  ];
  return navItems;
};


function NavBarC() {
  const navItems = getNavObject();

  return (
    <>
      <NavBarP navItems={navItems} />
    </>
  );
}

export default React.memo(NavBarC);
