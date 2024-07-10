import React, { useState } from 'react';
import './FoodItemCard.css';

const FoodItemCard = ({ item, addItem, updateItemCount }) => {
  const [count, setCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    setCount(count + 1);
    addItem(item);
    updateItemCount(item, 1);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`food-item-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="food-item-summary">
        {item.image && (
          <div className="food-item-image">
            <img src={item.image} alt={item.name} />
          </div>
        )}
        <div>
          <h3 className="food-item-title">{item.name}</h3>
          <p className="food-item-price">₹{item.price}</p>
        </div>
      </div>
      {isExpanded && (
        <div className="food-item-details">
          <p className="food-item-description">{item.description}</p>
          <div className="food-item-add">
            <span className="food-item-weight">{item.weight} g</span>
            <button onClick={handleAdd} className="add-button">+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemCard;
