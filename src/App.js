import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header.jsx";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AppRoutes from "./components/AppRoutes";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState();
  console.log("isLoggedIn:", isLoggedIn);
  console.log("setIsLoggedIn:", setIsLoggedIn);

  if (isLoggedIn) {
    console.log("header and sidebar are here");
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        {isLoggedIn && (
          <div className="sidebar">
            <Sidebar></Sidebar>
          </div>
        )}
        <div className="content">
          <AppRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUserId={setUserId}
            userId={userId}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
