import React from 'react';
import './CategoryButtons.css';

const CategoryButtons = ({ handleCartItemToggle }) => {
  return (
    <div className="category-buttons">
      <div className="toggle-buttons">
        <button className="toggle-button" onClick={handleCartItemToggle}>
          Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default CategoryButtons;
