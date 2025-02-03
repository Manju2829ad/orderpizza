import React, { useState, createContext, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

function CartC({ children }) {
  // Get cart and prices from localStorage initially
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : []; // Initialize cart from localStorage
  });

  const [currentPrices, setCurrentPrices] = useState(() => {

  //  
    const savedPrices = localStorage.getItem('currentPrices');
console.log(savedPrices,"savedprices")
    return savedPrices ? JSON.parse(savedPrices) : {}; // Initialize prices from localStorage
  });

 // currentPrices.map((data)=>console.log(data,":currentPrices"))


//console.log(currentPrices,":current prices from usestate hook")

  const [auth, setAuth] = useState(false); // Authentication state
  const [user, setUser] = useState(null); // To hold user details

  // Check localStorage for user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Restore user info
      setAuth(true);
    }
  }, []);

  // Sync cart and prices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Sync cart to localStorage
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('currentPrices', JSON.stringify(currentPrices)); // Sync prices to localStorage
  }, [currentPrices]);

  

  useEffect(() => {
    console.log(cart, ": cart after the setting");
  }, [cart]);  // This will log the cart whenever it changes
  

  useEffect(() => {
    console.log(currentPrices, ": current prices after the setting");
  }, [currentPrices]);  // This will log the cart whenever it changes
  

  // Add item to cart with selected size
  const addToCart = (item, card) => {

    console.log(card,":selected Size")
    console.log(item,":item")


    if (item) {
      const existingItem = cart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === card.size
      );
  

      
      if (!existingItem) {
        const priceObject = item.prices.find((price) => price.size === card.size);

           console.log(priceObject,":priceObject")
        console.log(card.size,":size?")

        const cartItem = {
          id: item.id,
          name: item.name,
          image: item.image,
          size: card.size,
          crust: 'Hand Tossed',
          price: priceObject ? priceObject.price : 0,
          quantity: 1,
        };
        //console.log(cart,":cart?before the setting ")
        setCart((prevItems) => [...prevItems, cartItem]);

  setCurrentPrices((prevPrices) => ({
      ...prevPrices,
      [item.id]: priceObject ? priceObject.price : 0,
      
    }

  )

);

       // console.log(cart,":cart?after the setting ")
      } else {
        incrementCart(existingItem.id);
      }
    }
  


  };

const addToCart2=(pizza,size)=>{

console.log(pizza)
  console.log(typeof pizza,"type of")

  console.log(typeof size,":type of")

   console.log(typeof cart,":cart")

   console.log(cart)

   const  existingItem= cart.find((item)=>item.id===pizza.id&&item.size===size) 
      if(existingItem){  
             console.log("else")
                   incrementCart(pizza.id)
        
          }

      else{
   console.log(existingItem,":existingItem")
    const priceObj= pizza.prices.find((price)=>price.size===size)
    console.log(priceObj)
 const cartItem = {
          id: pizza.id,
          name: pizza.name,
          image: pizza.image,
          size: size,
          crust: 'Hand Tossed',
          price: priceObj ? priceObj.price : 0,
          quantity: 1,
        };

console.log(cartItem);
 

 setCart((cartItems)=>([...cartItems,cartItem]))

 setCurrentPrices((prevPrices) => ({
  ...prevPrices,
  [`${pizza.id}-${size}`]: priceObj ? priceObj.price : 0,
}));



   }

}






  // Increment item quantity in the cart
  const incrementCart = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  };

  // Decrement item quantity in the cart
  const decrementCart = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  };

// Remove item from cart and update currentPrices
const removeItem = (id) => {
  setCart((prevItems) => prevItems.filter((item) => item.id !== id));

  // Also remove the price of the item from currentPrices
  setCurrentPrices((prevPrices) => {
    const updatedPrices = { ...prevPrices };
    delete updatedPrices[id]; // Remove the price for the removed item
    return updatedPrices;
  });
};


  const token = localStorage.getItem('jwtToken');

  // Handle user login
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('https://springpizzaapp.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data)); // Save user info in localStorage
        setUser(data); // Set user state
        setAuth(true); // Set user authenticated state
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch pizza data based on category
  const fetchPizza = async (category) => {
    try {
      const response = await fetch(`https://springpizzaapp.onrender.com/api/pizza/get/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  // Fetch price by pizza ID
  const fetchPriceByPizzaId = async (pizzaId) => {
    try {
      const response = await fetch(`https://springpizzaapp.onrender.com/api/price/get/${pizzaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      // Update prices in the context and localStorage
      setCurrentPrices((prevPrices) => ({
        ...prevPrices,
        [pizzaId]: data.price,
      }));
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCart2,
        incrementCart,
        decrementCart,
        removeItem,
        fetchPizza,
        fetchPriceByPizzaId,
        currentPrices, // Expose currentPrices
        setCurrentPrices, // Allow updating prices
        auth, // Expose auth state
        user, // Expose user state
        handleLogin, // Expose login function
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartC;
