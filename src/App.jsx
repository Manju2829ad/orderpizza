import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomizePizzaContainer from './Components/container/customizepizzacontainer/CustomizePizzaContainer';
import OrderHistoryContainer from './Components/container/orderhistory/OrderHistoryContainer';
import OrderSummaryContainer from './Components/container/ordersummary/OrderSummaryContainer';
import { getNavObject } from './Components/container/navbarcontainer/NavBarC';
import Layout from './Components/layout/Layout';
import LoginContainer from './Components/container/loginC/LoginC';
import SignupContainer from './Components/container/signup/SignUpC';
import ProfileC from './Components/container/profileC/ProfileC';
import CartP from './Components/presentational/cartp/CartP';
import PrivateRoute from './PrivateRoute';
import Checkout from './Components/presentational/checkoutP/CheckOut';
import LogoutC from './Components/container/logoutC/LogoutC';

function App() {
  // Get the array of route objects from NavBarC
  const navItems = getNavObject();

  return (
    <BrowserRouter>
      <div className="App">
        {/* Apply Layout to wrap all routes */}
        <Routes>
          {/* Layout will always show the NavBar */}
          <Route path="/" element={<Layout />}>
            {/* Nested Routes under Layout */}
            {navItems.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}

        
            {/* Other Routes */}
            <Route path="/profile" element={<ProfileC />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/logout" element={<LogoutC />} />

            {/* Private Route for Cart and Checkout */}
            <Route
              path="/cart"
              element={<PrivateRoute element={CartP} />}
            />
            <Route path="/checkout" element={<Checkout />} />

            {/* Other routes */}
            <Route path="/signup" element={<SignupContainer />} />
            <Route path="/customize" element={<CustomizePizzaContainer />} />
            <Route path="/order-summary" element={<OrderSummaryContainer />} />
            <Route path="/order-history" element={<OrderHistoryContainer />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
