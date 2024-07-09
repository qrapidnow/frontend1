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
    if (name.trim() === '' || whatsapp.trim() === '') {
      alert('Please enter your name and WhatsApp number.');
      return;
    }

    const orderData = {
      name,
      whatsapp,
      cartItems: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    };

    try {
      const backendUrl = import.meta.env.VITE_APP_BASE_CUSTOMER_BACKEND_API;
      const response = await axios.post(`${backendUrl}/orders`, orderData);
      console.log('Order saved:', response.data);
      alert('Order saved successfully!');
      handleCloseCart();
      setShowPlaceOrderPage(true);
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Error saving order');
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
