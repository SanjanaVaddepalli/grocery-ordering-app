// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import { CartProvider } from "./context/CartContext"; // ✅ Needed
import AdminDashboard from "./Pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Keep login state synced with localStorage
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, []);

  const handleLogin = () => {
    localStorage.setItem("user", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      {/* ✅ Navbar only visible after login */}
      {isLoggedIn && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/products"
          element={isLoggedIn ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
