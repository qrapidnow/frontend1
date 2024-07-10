import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Navbar from './components/NavBar';
import Menu from './components/Menu';
import CartItem from './components/CartItem';
import PlaceOrderPage from './components/PlaceOrderPage';
import axios from 'axios';

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCartItem, setShowCartItem] = useState(false);
  const [showPlaceOrderPage, setShowPlaceOrderPage] = useState(false);
  const [foodItemCounts, setFoodItemCounts] = useState({});
  const [restaurantName, setRestaurantName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const backendApiUrl = import.meta.env.VITE_APP_BASE_BACKEND_API;

    const fetchUsersAndToken = async () => {
      try {
        const usersResponse = await axios.get(`${backendApiUrl}/users`);
        console.log('Users response:', usersResponse.data); // Log user response
        const users = usersResponse.data;
        if (users && users.length > 0) {
          const firstUserId = users[0]._id;
          const tokenResponse = await axios.get(`${backendApiUrl}/token/${firstUserId}`);
          console.log('Token response:', tokenResponse.data); // Log token response
          const token = tokenResponse.data.token;
          if (token) {
            localStorage.setItem('token', token);
            const restaurantResponse = await fetchRestaurant(token);
            console.log('Restaurant response:', restaurantResponse); // Log restaurant response
            if (restaurantResponse && restaurantResponse._id) {
              localStorage.setItem('restaurantId', restaurantResponse._id);
              console.log('Set restaurantId in localStorage:', restaurantResponse._id); // Log setting of restaurantId
            }
          }
        } else {
          console.error('No users found');
        }
      } catch (error) {
        console.error('Error fetching users or token:', error);
      }
    };

    fetchUsersAndToken();
  }, []);

  const fetchRestaurant = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_BACKEND_API}/restaurants`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched restaurant data:', response.data); // Log fetched restaurant data
      setRestaurantName(response.data.name);
      setIsLoggedIn(true);
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  const addItem = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    updateItemCount(item.id, 1);
  };

  const getTotalItems = () => cart.length;

  const handleViewOrderClick = () => {
    setShowCartItem(true);
    setShowPlaceOrderPage(false);
  };

  const handleCartClick = () => {
    setShowCartItem(true);
    setShowPlaceOrderPage(false);
  };

  const removeItem = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item !== itemToRemove));
    updateItemCount(itemToRemove.id, -itemToRemove.quantity);
  };

  const updateItemCount = (itemId, countChange) => {
    setFoodItemCounts((prevCounts) => {
      const currentCount = prevCounts[itemId] || 0;
      return { ...prevCounts, [itemId]: Math.max(0, currentCount + countChange) };
    });
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Header restaurantName={restaurantName} />
      <div className="search-cart-container">
        <SearchBar />
        <button className="cart-button" onClick={handleCartClick}>🛒</button>
      </div>
      <Navbar />
      <div className="content-container">
        <Menu addItem={addItem} updateItemCount={updateItemCount} />
      </div>
      {getTotalItems() > 0 && (
        <div className="view-order-bar" onClick={handleViewOrderClick}>
          <span>View Order</span>
          <span className="order-count">{getTotalItems()}</span>
        </div>
      )}
      {showCartItem && (
        <CartItem
          cartItems={cart}
          setCart={setCart}
          removeItem={removeItem}
          setShowCartItem={setShowCartItem}
          updateItemCount={updateItemCount}
        />
      )}
      {showPlaceOrderPage && (
        <PlaceOrderPage cartItems={cart} />
      )}
    </div>
  );
};

export default App;
