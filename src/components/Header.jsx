import React from 'react';
import './Header.css';

const Header = ({ restaurantName }) => {
  return (
    <header className="header">
      <h1 className="header-title">{restaurantName || "Kitchen Stories"}</h1>
      <p className="header-subtitle">MG Road, Bengaluru</p>
      <p className="header-status">Closed. Open at 6:00 am</p>
      <div className="header-buttons">

      </div>
    </header>
  );
};

export default Header;
