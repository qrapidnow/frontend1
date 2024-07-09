import React, { useState } from 'react';
import './FoodItemCard.css';

const FoodItemCard = ({ item, addItem, updateItemCount }) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    addItem(item);
    updateItemCount(item, 1);
  };

  return (
    <div className="food-item-card">
      <img src={item.image} alt={item.name} className="food-item-image" />
      <div className="food-item-details">
        <h3 className="food-item-title">{item.name}</h3>
        <p className="food-item-price">{`₹${item.price}`}</p>
        <p className="food-item-description">{item.description}</p>
        <div className="food-item-add">
          <span className="food-item-weight">{`${item.weight} g`}</span>
          <button onClick={handleAdd} className="add-button">+</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
