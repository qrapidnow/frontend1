import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search in menu" className="search-bar-input" />
    </div>
  );
};

export default SearchBar;
