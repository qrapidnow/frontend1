// Update the import statement for PlaceOrderPage
import React, { useState } from 'react';
import './CartItem.css';
import PlaceOrderPage from './PlaceOrderPage';
import AskForBillPage from './AskForBillPage';

const CartItem = ({ cartItems, setCart, removeItem, setShowCartItem, updateItemCount }) => {
  const [showPlaceOrderPage, setShowPlaceOrderPage] = useState(false);
  const [showAskForBillPage, setShowAskForBillPage] = useState(false);

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
          cartItems={cartItems}
          setShowPlaceOrderPage={setShowPlaceOrderPage}
        />
      </div>
    );
  }

  if (showAskForBillPage) {
    return (
      <AskForBillPage
        cartItems={cartItems}
        setShowAskForBillPage={setShowAskForBillPage}
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
