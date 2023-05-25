import React, { useState } from "react";
import axios from "../axiosConfig.js";
import "../stylesheets/SupForm.css";

function RecForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name || !phoneNumber) {
      setShowErrors(true);
      return;
    }

    try {
      // Check if supplier already exists in the database
      console.log(name);
      const response = await axios.get(`/api/receivers/${name}`);
      const receiver = response.data;
      if (receiver > 0) {
        setErrorMessage("receiver already exists in the database.");
        return;
      }

      // Submit supplier to the database
      await axios.post("/api/receivers", {
        name,
        address: location,
        phone: phoneNumber,
        email,
      });

      // Reset form fields
      setName("");
      setLocation("");
      setPhoneNumber("");
      setEmail("");

      // Show success message
      alert("Receiver successfully added to the database.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add receiver to the database.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Name<span className="required">*</span>
        </label>
        <input
          class="shadow"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      {showErrors && !name && (
        <p className="error-message">Please enter name before submitting</p>
      )}
      <div className="form-group">
        <label>Location</label>
        <input
          class="shadow"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>
          Phone Number<span className="required">*</span>
        </label>
        <input
          class="shadow"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
      </div>
      {showErrors && !phoneNumber && (
        <p className="error-message">
          Please enter phone number before submitting
        </p>
      )}
      <div className="form-group">
        <label>Email</label>
        <input
          class="shadow"
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

export default RecForm;
