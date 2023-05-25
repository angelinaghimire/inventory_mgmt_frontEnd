import React, { useState } from "react";
import axios from "../axiosConfig.js";
import "../stylesheets/UserForm.css";

function UserForm() {
  const [Username, setUserName] = useState("");
  const [Userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!Username || !password) {
      setShowErrors(true);
      return;
    }

    try {
      // Check if user already exists in the database
      const response = await axios.get(`/api/user?name=${Username}`);
      const user = response.data;
      if (user) {
        setErrorMessage("User already exists in the database.");
        return;
      }

      // Submit user to the database
      await axios.post("/api/user", {
        Username,
        Userid,
        password,
        email,
      });

      // Reset form fields
      setUserName("");
      setUserId("");
      setPassword("");
      setEmail("");

      // Show success message
      alert("User successfully added to the database.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add user to the database.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          User Name:<span className="required"></span>
        </label>
        <input
          type="text"
          value={Username}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
      </div>
      {showErrors && !Username && (
        <p className="error-message">Please enter name before submitting</p>
      )}
      <div className="form-group">
        <label>User Id:</label>
        <input
          type="text"
          value={Userid}
          onChange={(event) => setUserId(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>
          Password:<span className="required"></span>
        </label>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      {showErrors && !password && (
        <p className="error-message">Please enter password before submitting</p>
      )}
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <button type="submit" className="submitbtn">
        Submit
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default UserForm;
