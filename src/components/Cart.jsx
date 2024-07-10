import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, setShowCart }) => {
  const handleCloseCart = () => {
    setShowCart(false);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseInt(item.price), 0);
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
    </div>
  );
};

export default Cart;
