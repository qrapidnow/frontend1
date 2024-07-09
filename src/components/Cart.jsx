import React, { useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = ({ cartItems, setShowCart, setShowPlaceOrderPage }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handlePlaceOrder = async () => {
    const orderDetails = {
      name,
      whatsapp,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: getTotalPrice(),
    };

    try {
      const restaurantId = localStorage.getItem('restaurantId');
      const token = localStorage.getItem('token');

      console.log('Restaurant ID:', restaurantId); // Log restaurant ID
      console.log('Token:', token); // Log token

      if (!restaurantId) {
        throw new Error('Restaurant ID is not set');
      }
      if (!token) {
        throw new Error('Token is not set');
      }

      const customerBackendApiUrl = import.meta.env.VITE_APP_BASE_CUSTOMER_BACKEND_API;
      
      // Log the constructed URL for debugging
      const endpoint = `${customerBackendApiUrl}/restaurants/${restaurantId}/orders`;
      console.log('POST endpoint:', endpoint);

      const response = await axios.post(
        endpoint,
        orderDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Cart</h2>
        <button onClick={handleCloseCart}>Close</button>
      </div>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item.name}</p>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ₹{getTotalPrice()}</h3>
      </div>
      <div className="cart-details">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="whatsapp">WhatsApp:</label>
        <input
          type="text"
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
        />
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
