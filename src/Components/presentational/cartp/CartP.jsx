import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { CartContext } from '../../container/cartC/CartContext';
import './CartP.css';

function CartP() {
  const { cart, removeItem, incrementCart, decrementCart, currentPrices } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  if (!cart) {
    console.error('CartContext is not provided');
    return null;
  }

  // Calculate the subTotal by multiplying the price by the quantity for each item
  const subTotal = cart.reduce((acc, item) => {
    // Get the price of the current item from the context (by id and size)
    const itemPrice = currentPrices[item.id] || 0; // Assuming the price is based on the id
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <div className='cart-container'>
      <h2 className='cart-title'>Your Cart</h2>
      {cart.length === 0 ? (
        <p className='empty-cart-message'>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => {
            const itemPrice = currentPrices[item.id] || 0;

            return (
              <div key={item.id} className='cart-item-card'>
                <h3 className='cart-item-title'>{item.name}</h3>
                <img src={item.image} alt={item.name} className='cart-item-image' />
                <p className='cart-item-descp'>{item.description}</p>
                <p className='cart-item-price'>Price: ₹{itemPrice}</p>

                <div className='cart-item-quantity-controls'>
                  <button className='cart-item-minus' onClick={() => decrementCart(item.id)}>-</button>
                  <span className='cart-item-quantity'>{item.quantity}</span>
                  <button className='cart-item-plus' onClick={() => incrementCart(item.id)}>+</button>
                </div>

                <button className='cart-item-remove' onClick={() => removeItem(item.id)}>Remove from Cart</button>
              </div>
            );
          })}
          <div className='cart-checkout-section'>
            <h3 className='cart-subtotal'>Sub Total: ₹{subTotal.toFixed(2)}</h3>
            <button className='cart-checkout-btn' onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>  
  );
}

export default CartP;
