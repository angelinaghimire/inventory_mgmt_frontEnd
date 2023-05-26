import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig.js";
import Header from "../components/Header";
import "../stylesheets/authpage.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Send a request to the backend to register the user
    const response = await axios.post("/api/users", { username, password });
    console.log(response);
    if (response.status === 201) {
      alert("User successfully registered!");
      // Redirect to login page
      window.location.href = "/login";
    }
  };

  return (
    <div>
      <Header />

      <div className="login-container">
        <h1 className="hd login-title">Register</h1>
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
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit">Register</button>
        </form>
        <p className="link-btn register-instead">
          <Link to="/login">Already have an account? Login here.</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
