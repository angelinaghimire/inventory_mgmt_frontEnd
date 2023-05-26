import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig.js";
import Header from "../components/Header";

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

      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </div>
  );
};

export default Register;
