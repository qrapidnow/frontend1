import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ cartItems, setShowCart, setShowPlaceOrderPage }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const handlePlaceOrder = async () => {
    const orderDetails = {
      name,
      whatsapp,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
      }))
    };

    try {
      const token = localStorage.getItem('token');
      const customerBackendApiUrl = 'https://customerbackend.vercel.app';  // Updated for clarity
      const response = await axios.post(`${customerBackendApiUrl}/orders`, orderDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrderStatus('Your order has been placed!');
      setShowPlaceOrderPage(true);  // Navigate to the order placed page on success
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus('Failed to place order.');
    }
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Cart</h2>
        <button onClick={() => setShowCart(false)}>Close</button>
      </div>
      <div className="cart-details">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <label htmlFor="whatsapp">WhatsApp:</label>
        <input type="text" id="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required />
        <button onClick={handlePlaceOrder}>Place Order</button>
        {orderStatus && <p>{orderStatus}</p>}  // Display order status message
      </div>
    </div>
  );
};

export default Cart;
