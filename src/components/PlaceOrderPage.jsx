import React, { useState } from 'react';
import axios from 'axios';
import './PlaceOrderPage.css';

const PlaceOrderPage = ({ cartItems, setShowPlaceOrderPage }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    const orderData = {
      name,
      whatsapp,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
      })),
    };

    console.log('Environment Variable:', import.meta.env.VITE_APP_BASE_CUSTOMER_BACKEND_API); // Log the environment variable

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_CUSTOMER_BACKEND_API}orders`,
        orderData
      );
      console.log('Order saved:', response.data);
      alert('Order placed successfully!');
      setShowPlaceOrderPage(false); // Close the order page
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="place-order-container">
      <h2 className="place-order-title">Place Your Order</h2>
      <form className="place-order" onSubmit={handleSubmitOrder}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="whatsapp">WhatsApp Number:</label>
        <input type="text" id="whatsapp" name="whatsapp" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />

        <button type="submit" className="place-order-button">Submit Order</button>
      </form>
    </div>
  );
};

export default PlaceOrderPage;
