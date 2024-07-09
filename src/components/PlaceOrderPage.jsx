import React from 'react';
import './PlaceOrderPage.css';

const PlaceOrderPage = ({ cartItems }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="place-order-container">
      <h2 className="place-order-title">Order Summary</h2>
      <div className="place-order-items">
        {cartItems.map((item, index) => (
          <div key={index} className="place-order-item">
            <p>{item.name}</p>
            <p>₹{item.price} x {item.quantity}</p>
          </div>
        ))}
      </div>
      <div className="place-order-total">
        <h3>Total: ₹{getTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
