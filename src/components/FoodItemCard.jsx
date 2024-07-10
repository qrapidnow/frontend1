import React, { useState } from 'react';
import './FoodItemCard.css';

const FoodItemCard = ({ item, addItem, updateItemCount }) => {
  const [count, setCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = () => {
    setCount(count + 1);
    addItem(item);
    updateItemCount(item, 1);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`food-item-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="food-item-summary" onClick={toggleExpand}>
        <span className="food-item-title">{item.name}</span>
        <span className="food-item-price">{`₹${item.price}`}</span>
      </div>
      {isExpanded && (
        <div className="food-item-details">
          <p className="food-item-description">{item.description}</p>
          <span className="food-item-weight">{`${item.weight} g`}</span>
          <button onClick={handleAdd} className="add-button">+</button>
        </div>
      )}
    </div>
  );
};

export default FoodItemCard;
