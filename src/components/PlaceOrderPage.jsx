import React from 'react';
import './PlaceOrderPage.css';

const PlaceOrderPage = () => {
  return (
    <div className="place-order-container">
      <h2 className="place-order-title">Place Your Order</h2>
      <form className="place-order">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" name="phone" required />

        <label htmlFor="order">Order:</label>
        <select id="order" name="order" required>
          <option value="breakfast">Breakfast</option>
          <option value="appetizers">Appetizers</option>
          <option value="mains">Mains</option>
          <option value="desserts">Desserts</option>
        </select>

        <button type="submit" className="place-order-button">Submit Order</button>
      </form>
    </div>
  );
};

export default PlaceOrderPage;
