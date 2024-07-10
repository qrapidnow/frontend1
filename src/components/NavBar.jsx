import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NavBar.css';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      const restaurantId = localStorage.getItem('restaurantId');
      if (!token || !restaurantId) {
        console.error('Token or restaurant ID not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_BACKEND_API}/categories/${restaurantId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="navbar">
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <button
              className={`category-button ${activeCategory === category._id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category._id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
