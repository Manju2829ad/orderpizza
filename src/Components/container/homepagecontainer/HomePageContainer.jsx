import React from "react";
import CartProvider from "../cartprovider/CartProvider"; // Assuming CartProvider is a context provider
import RecommendedC from "../recommended/RecommendedC";
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

export default HomePageContainer;
