import React, { useState } from 'react';
import './CartItem.css';
import PlaceOrderPage from './PlaceOrderPage';
import AskForBillPage from './AskForBillPage';

const CartItem = ({ cartItems, setCart, removeItem, setShowCartItem, updateItemCount }) => {
  const [showPlaceOrderPage, setShowPlaceOrderPage] = useState(false);
  const [showAskForBillPage, setShowAskForBillPage] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [nameEntered, setNameEntered] = useState(false);
  const [whatsappEntered, setWhatsappEntered] = useState(false);

  const handleDelete = (item) => {
    removeItem(item);
    updateItemCount(item.id, -item.quantity);
  };

  const handleQuantityChange = (item, increment) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem === item
        ? {
            ...cartItem,
            quantity: Math.max(1, cartItem.quantity + increment),
          }
        : cartItem
    );
    setCart(updatedCart);
  };

  const handleBackToCart = () => {
    setShowCartItem(false);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleAddItems = () => {
    setShowCartItem(false);
  };

  const handlePlaceOrderPage = () => {
    setShowPlaceOrderPage(true);
  };

  const handlePlaceOrder = () => {
    if (name.trim() !== '' && whatsapp.trim() !== '') {
      setNameEntered(true);
      setWhatsappEntered(true);
      setShowPlaceOrderPage(false);
    } else {
      alert('Please enter your name and WhatsApp number before placing the order.');
    }
  };

  const handleAskForBill = () => {
    if (nameEntered && whatsappEntered) {
      setShowAskForBillPage(true);
    } else {
      alert('Please enter your name and WhatsApp number before asking for the bill.');
    }
  };

  if (showPlaceOrderPage) {
    return (
      <div className="cart-item-container">
        <PlaceOrderPage
          setShowPlaceOrderPage={setShowPlaceOrderPage}
          name={name}
          setName={setName}
          whatsapp={whatsapp}
          setWhatsapp={setWhatsapp}
          handlePlaceOrder={handlePlaceOrder}
        />
      </div>
    );
  }

  if (showAskForBillPage) {
    return (
      <AskForBillPage
        cartItems={cartItems}
        setShowAskForBillPage={setShowAskForBillPage}
        nameEntered={nameEntered}
        whatsappEntered={whatsappEntered}
      />
    );
  }

  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <div className="cart-item-header">
          <h2>CART</h2>
          <button className="back-button" onClick={handleBackToCart}>
            ➜
          </button>
        </div>
        {totalItems === 0 ? (
          <div className="empty-cart-message">
            <p>No items added yet. Add items to your cart!</p>
          </div>
        ) : (
          <div className="cart-item-scrollable">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-row">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}/-</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(item, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="quantity-button" onClick={() => handleQuantityChange(item, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button className="delete-button" onClick={() => handleDelete(item)}>
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="cart-item-actions">
          <button className="action-button" onClick={handleAddItems}>
            Add Items
          </button>
          <button className="action-button" onClick={handlePlaceOrderPage}>
            Place Order
          </button>
          <button className="action-button ask-for-bill-button" onClick={handleAskForBill}>
            Ask For Bill
          </button>
        </div>
        {totalItems > 0 && (
          <div className="totals-container">
            <div className="totals-column">
              <h3>Total Quantity:</h3>
              <p>{totalItems}</p>
            </div>
            <div className="totals-column">
              <h3>Total Amount:</h3>
              <p>₹{totalAmount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
