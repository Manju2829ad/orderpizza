import React from 'react';

const OrderSummary = ({ orderItems, onCheckOut }) => {
    return (
        <div className='order-summary'>
            {orderItems.map((item) => (
                <div className="name" key={item.id}>
                    <p>{item.name} = {item.quantity}</p>
                </div>
            ))}
            <button onClick={onCheckOut}>Checkout</button>
        </div>
    );
}

export default OrderSummary;
