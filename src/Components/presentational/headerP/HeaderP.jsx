import React from 'react';
import './HeaderP.css'; // Assuming you use some CSS for styling
import { Link } from 'react-router-dom';

function HeaderP({ logo, location, account, deliveryOptions }) {
  const { label, actions } = account; // Destructure the account object

  return (
    <div className="header">
      {/* Logo */}
      <div className="logo">
        <img src="dominos-logo.png" alt={logo} /> {/* Use the correct image source */}
        <span>{logo}</span>
      </div>

      {/* Delivery Options */}
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

      {/* Location */}
      <div className="location">
        <span>{location}</span>
      </div>

      {/* Account */}
      <div className="account">
        <Link to={"/profile"}>My Account</Link>

        <Link to={actions.includes("logout") ? "/logout" : "/login"}>
          {actions.length > 0 ? actions[0] : "Login"}
        </Link>
        <Link to={actions.includes("Signup") ? "/signup" : "/signup"}>
          {actions[1]}
        </Link>
      </div>
    </div>
  );
}

export default React.memo(HeaderP);
