import React, { useState } from 'react';
import './FoodItemCard.css';

const FoodItemCard = ({ item, addItem, updateItemCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
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
        <div className="food-item-info">
          <h3 className="food-item-title">{item.name}</h3>
          <p className="food-item-price">₹{item.price}</p>
        </div>
      </div>
      {isExpanded && (
        <div className="food-item-expanded-content">
          <p className="food-item-description">{item.description}</p>
          <span className="food-item-weight">{item.weight} g</span>
          <button onClick={handleAdd} className="add-button">Add</button>
        </div>
      )}
    </div>
  );
};

export default FoodItemCard;
