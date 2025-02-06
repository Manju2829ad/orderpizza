import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CartProvider from './Components/container/cartC/CartProvider.jsx';


// Import Auth0Provider
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the entire app with Auth0Provider
    <Auth0Provider
      domain="https://dev-4c60r76ocjd6z7dk.us.auth0.com"
      clientId="gUNScI8YIJHqCIqJwPVJXvxGWwMBKqno"
      authorizationParams={{
        redirect_uri: window.location.origin, // The URL to return to after login
      }}
    > */}
      {/* Other context providers and your app */}
      <CartProvider>
          <App />
      </CartProvider>
    {/* </Auth0Provider> */}
  </StrictMode>,
);
