// src/pages/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Welcome = () => {
  return (
    <div className="container">
      <img src={logo} alt="Grocery Logo" className="logo" />
      <h1>Welcome to Grocery Store</h1>
      <p>Your daily groceries delivered at your door!</p>
      <div className="btn-group">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
};

export default Welcome;
