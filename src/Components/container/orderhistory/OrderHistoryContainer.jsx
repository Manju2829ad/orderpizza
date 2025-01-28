// src/components/containers/OrderHistoryContainer.js
import React, { useState, useEffect } from 'react';
import OrderHistoryItem from '../../presentational/orderhistory/OrderHistoryItem';

const OrderHistoryContainer = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching order history from an API
    const fetchedOrderHistory = [
      { id: 1, date: '2024-08-28', items: [{ id: 1, name: 'Margherita', quantity: 1 }] },
      { id: 2, date: '2024-08-29', items: [{ id: 2, name: 'Pepperoni', quantity: 2 }] },
      // Add more history here
    ];
    setOrderHistory(fetchedOrderHistory);
  }, []);

  return (
    <div className="order-history">
      {orderHistory.map(order => (
        <OrderHistoryItem key={order.id} date={order.date} items={order.items} />
      ))}
    </div>
  );
};

export default OrderHistoryContainer;
