import React, { useState } from 'react';
import './AskForBillPage.css';

const AskForBillPage = ({ cartItems, setShowAskForBillPage }) => {
  const [foodRating, setFoodRating] = useState(0);
  const [menuRating, setMenuRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleBack = () => {
    setShowAskForBillPage(false); // Go back to the cart page
  };

  const handleStarClick = (setter, rating) => {
    setter(rating);
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="ask-for-bill-container">
      <div className="ask-for-bill">
        <div className="ask-for-bill-header">
          <button className="back-button" onClick={handleBack}>
            ➜
          </button>
          <h2>Ask For Bill</h2>
        </div>
        <div className="rating-section">
          <label>Rate the food</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={foodRating >= star ? 'star filled' : 'star'}
                onClick={() => handleStarClick(setFoodRating, star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="rating-section">
          <label>Rate the digital menu</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={menuRating >= star ? 'star filled' : 'star'}
                onClick={() => handleStarClick(setMenuRating, star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="feedback-section">
          <label>Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How was your journey experience?"
          />
        </div>
        <div className="order-details">
          <h3>Order Details</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <p>{item.name} x {item.quantity} - ₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="order-total">
            <h3>Grand Total: ₹{totalAmount}</h3>
          </div>
        </div>
        <div className="ask-for-bill-actions">
          <button className="action-button">Ask For Bill</button>
        </div>
      </div>
    </div>
  );
};

export default AskForBillPage;
