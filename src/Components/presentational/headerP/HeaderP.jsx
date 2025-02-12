// HeaderP.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderP.css';

function HeaderP({ cart,logo, location, account, deliveryOptions, cartCount }) {
  return (
    <div className="header">
      <div className="logo">
        <img src="https://www.dominos.com/assets/images/logo.svg" alt={logo} />
        <span>{logo}</span>
      </div>

      <div className="delivery-options">
        <label>
          <input type="radio" name="deliveryOption" />
          {deliveryOptions[0]}
        </label>
        <label>
          <input type="radio" name="deliveryOption" />
          {deliveryOptions[1]}
        </label>
      </div>

      <div className="location">
        <span>{location}</span>
      </div>

      <div className="account">
        <Link to="/profile">My Account</Link>
        <Link to={account.actions.includes('logout') ? '/logout' : '/login'}>
          {account.actions.length > 0 ? account.actions[0] : 'Login'}
        </Link>
        <Link to="/signup">{account.actions[1]}</Link>
      </div>

      <div className="cart">
        <Link to="/cart">
          <button className="cart-button">
            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(HeaderP);
