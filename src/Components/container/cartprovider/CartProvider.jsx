// import React, { useState } from 'react';
// import CheckOutC from '../cartC/CartC';
// import pizzaItems from '../recommended/pizzadata';
// import RecommendedC from '../recommended/RecommendedC';

// function CartProvider() {
//   const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     const updatedPizzadata = pizzaItems.map((pizza) =>
//       pizza.id === item.id ? { ...pizza, inCart: true, quantity: 1 } : pizza
//     );
//     // Update pizzaItems state if needed

//     const itemExists = cart.find((cartItem) => cartItem.id === item.id);

//     if (itemExists) {
//       setCart((prevCart) =>
//         prevCart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCart([...cart, { ...item, quantity: 1, inCart: true }]);
//     }
//   };

//   const handleIncrement = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((cartItem) =>
//         cartItem.id === id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       )
//     );
//   };

//   const handleDecrement = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((cartItem) =>
//         cartItem.id === id && cartItem.quantity > 1
//           ? { ...cartItem, quantity: cartItem.quantity - 1 }
//           : cartItem
//       )
//     );
//   };

//   return (
//     <div>
//       <h1>Pizza Order App</h1>
//       <RecommendedC 
//         cart={cart} 
//         addToCart={addToCart} 
//         handleIncrement={handleIncrement} 
//         handleDecrement={handleDecrement}
//       />
//       <CheckOutC
//         cart={cart}
//         handleIncrement={handleIncrement}
//         handleDecrement={handleDecrement}
//       />
//     </div>
//   );
// }

// export default CartProvider;
