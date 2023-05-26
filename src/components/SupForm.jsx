import React, { useState, useEffect } from "react";
import axios from "../axiosConfig.js";
import "../stylesheets/SupForm.css";

function SupForm({ editData, handleClose }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setLocation(editData.location);
      setPhoneNumber(editData.phonenumber);
      setEmail(editData.email);
    }
  }, [editData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name || !phoneNumber) {
      setShowErrors(true);
      return;
    }

    try {
      if (editData) {
        // Update existing supplier in the database
        await axios.put(`/api/suppliers/${editData.id}`, {
          name,
          address: location,
          phone: phoneNumber,
          email,
        });
        alert("Supplier successfully updated in the database.");
      } else {
        // Check if supplier already exists in the database
        const response = await axios.get(`/api/suppliers/${name}`);
        const supplier = response.data;
        if (supplier.length > 0) {
          setErrorMessage("Supplier already exists in the database.");
          return;
        }

        // Submit new supplier to the database
        await axios.post("/api/suppliers", {
          name,
          address: location,
          phone: phoneNumber,
          email,
        });
        alert("Supplier successfully added to the database.");
      }

      // Reset form fields
      setName("");
      setLocation("");
      setPhoneNumber("");
      setEmail("");

      // Close the form
      handleClose();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add/update supplier in the database.");
    }
  };

  const handleCancel = () => {
    // Reset form fields
    setName("");
    setLocation("");
    setPhoneNumber("");
    setEmail("");

    // Close the form
    handleClose();
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
          className="shadow no-arrows no"
          type="number"
          max="9999999999"
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
      <div className="button-group">
        <button type="submit" className="submitbtn">
          {editData ? "Update" : "Submit"}
        </button>
        {editData && (
          <button type="button" className="cancelbtn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default SupForm;
