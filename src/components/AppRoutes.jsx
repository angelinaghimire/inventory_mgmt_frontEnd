import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report.jsx";
import Receivers from "../pages/Receivers.jsx";
import Suppliers from "../pages/Suppliers.jsx";
import Products from "../pages/Products.jsx";
import Transactions from "../pages/Transactions.jsx";
import UserControl from "../pages/UserControl.jsx";
import Settings from "../pages/Settings.jsx";

// Import the Login and Register components
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn, userId, setUserId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !isLoggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {isLoggedIn && (
        <>
          <Route path="/report" element={<Report />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/receivers" element={<Receivers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/usercontrol" element={<UserControl />} />
          <Route path="/settings" element={<Settings />} />
        </>
      )}
      {/* Add routes for the Login and Register components */}
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
