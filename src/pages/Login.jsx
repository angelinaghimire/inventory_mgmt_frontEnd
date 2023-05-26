import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../stylesheets/authpage.css";

import axios from "../axiosConfig.js";
import Cookies from "js-cookie";

const Login = ({ setIsLoggedIn, userId, setUserId }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send a request to the backend to authenticate the user
    try {
      // console.log(userId);
      const response = await axios.post("/api/login", { username, password });
      console.log(response);
      if (response.status === 200) {
        console.log("logged in");
        Cookies.set("userId", response.data.id);
        setIsLoggedIn(true);
        console.log("this is now set", Cookies.get("userId"));
        navigate("/");
        return;
      }
    } catch (err) {
      console.log(err);
      if (err.response.status == 404) {
        alert("User not found!");
        return;
      } else if (err.response.status == 401) {
        alert("Incorrect password!");
        return;
      } else if (err.response.status == 500) {
        alert("Server error!");
        return;
      } else {
        alert("Unknown error!");
        return;
      }
    }
  };
  return (
    <div>
      <Header />

      <div className="login-container">
        <h1 className="hd login-title">Login</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <p className="link-btn register-instead">
          <Link to="/register">Don't have an account? Register here.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
