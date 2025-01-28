import React, { useContext } from 'react';
import { CartContext } from '../../container/cartC/CartContext';
import './Checkout.css';

function Checkout() {
  const { cart } = useContext(CartContext);

  // Calculate subtotal directly using item.price in cart
  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Tax calculation (9%)
  const tax = subTotal * 0.09;
  const grandTotal = subTotal + tax;

  return (
    <div className='checkout-container'>
      <h2>Checkout</h2>
      <div className='checkout-items'>
        {cart.map((item) => (
          <div key={item.id} className='checkout-item'>
            <img src={item.image} alt={item.name} className='checkout-item-image' />
            <div className='checkout-item-details'>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ₹{item.price} x {item.quantity}</p>
              <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='checkout-summary'>
        <h3>Price Details</h3>
        <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
        <p>Taxes and Charges: ₹{tax.toFixed(2)}</p>
        <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
        <button className='place-order-btn'>Place Order</button>
      </div>
    </div>
  );
}

export default Checkout;
