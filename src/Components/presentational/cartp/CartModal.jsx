import React from 'react';
import './CartModal.css'; // Create styles for your modal overlay

function CartModal({ cartItems, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Your Cart</h2>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span> - <span>{item.quantity}</span>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default CartModal;