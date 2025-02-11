import React from "react";
import { CartProvider } from "../cartC/CartProvider";
import RecommendedC from "../recommended/RecommendedC";
import CheckOutC from "../checkout/CheckOutC";
import NonVegPizzaC from "../nonvegpizza/NonVegPizzaC";
import VegPizzaC from "../vegpizza/VegPizzaC";


function HomePageContainer() {
  return (
    <CartProvider>
      <div>
      <RecommendedC></RecommendedC>
      <CheckOutC></CheckOutC>
        <NonVegPizzaC />
        <VegPizzaC />
      </div>
    </CartProvider>
  );
}

export default React.memo(HomePageContainer);
