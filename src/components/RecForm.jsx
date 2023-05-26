import React, { useState, useEffect } from "react";
import axios from "../axiosConfig.js";
import "../stylesheets/SupForm.css";

function RecForm({ receiver, onCancel }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (receiver) {
      setName(receiver.name);
      setLocation(receiver.location);
      setPhoneNumber(receiver.phonenumber);
      setEmail(receiver.email);
    }
  }, [receiver]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name || !phoneNumber) {
      setShowErrors(true);
      return;
    }

    try {
      // Check if receiver already exists in the database
      console.log(name);
      const response = await axios.get(`/api/receivers/${name}`);
      const existingReceiver = response.data;
      if (existingReceiver > 0) {
        setErrorMessage("Receiver already exists in the database.");
        return;
      }

      // Submit receiver to the database
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
          className="shadow"
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
          className="shadow"
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
          className="shadow"
          type="number"
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
          className="shadow"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="button-container">
        <button type="submit" className="submitbtn">
          {onCancel ? "Update" : "Submit"}
        </button>
        {onCancel && (
          <button type="button" className="cancelbtn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default RecForm;
