import React, { useState, useEffect } from 'react';

// Custom hook for handling cart logic and user authentication
const UseCartLogic = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [currentPrices, setCurrentPrices] = useState(() => {
    const savedPrices =localStorage.getItem('currentPrices');
    return savedPrices ? JSON.parse(savedPrices) : {};
  });

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('currentPrices', JSON.stringify(currentPrices));
  }, [currentPrices]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setAuth(true);
    }
  }, []);

  const addToCart = (item, card) => {
    if (item) {
      const existingItem = cart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === card.size
      );

      if (!existingItem) {
        const priceObject = item.prices.find((price) => price.size === card.size);
        const cartItem = {
          id: item.id,
          name: item.name,
          image: item.image,
          size: card.size,
          crust: 'Hand Tossed',
          price: priceObject ? priceObject.price : 0,
          quantity: 1,
        };
        setCart((prevItems) => [...prevItems, cartItem]);

        setCurrentPrices((prevPrices) => ({
          ...prevPrices,
          [item.id]: priceObject ? priceObject.price : 0,
        }));
      } else {
        incrementCart(existingItem.id);
      }
    }
  };

  const addToCart2 = (pizza, size) => {
    const existingItem = cart.find((item) => item.id === pizza.id && item.size === size);

    if (existingItem) {
      incrementCart(pizza.id);
    } else {
      const priceObj = pizza.prices.find((price) => price.size === size);
      const cartItem = {
        id: pizza.id,
        name: pizza.name,
        image: pizza.image,
        size,
        crust: 'Hand Tossed',
        price: priceObj ? priceObj.price : 0,
        quantity: 1,
      };

      setCart((prevItems) => [...prevItems, cartItem]);
      setCurrentPrices((prevPrices) => ({
        ...prevPrices,
        [`${pizza.id}-${size}`]: priceObj ? priceObj.price : 0,
      }));
    }
  };

  const incrementCart = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrementCart = (id) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
    setCurrentPrices((prevPrices) => {
      const updatedPrices = { ...prevPrices };
      delete updatedPrices[id];
      return updatedPrices;
    });
  };

  const handleLogin = async (username, password) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('https://springpizzaapp.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setAuth(true);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchPizza = async (category) => {

    console.log(category+" >>:");

    try {
      const response = await fetch(`https://springpizzaapp.onrender.com/api/pizza/get/${category}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
        console.log("responseeeeeeeee:", response);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      console.log("beverages?:", JSON.stringify(data, null, 2));

      if(data)
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const fetchPriceByPizzaId = async (pizzaId) => {
    try {
      const response = await fetch(`https://springpizzaapp.onrender.com/api/price/get/${pizzaId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      setCurrentPrices((prevPrices) => ({
        ...prevPrices,
        [pizzaId]: data.price,
      }));
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return {
    cart,
    currentPrices,
    auth,
    user,
    addToCart,
    addToCart2,
    incrementCart,
    decrementCart,
    removeItem,
    handleLogin,
    fetchPizza,
    fetchPriceByPizzaId,
    setCurrentPrices,
  };
};

export default UseCartLogic;
