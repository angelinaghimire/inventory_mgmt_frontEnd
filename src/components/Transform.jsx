import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import "../stylesheets/TransForm.css";

function Transform() {
  const [productNameOptions, setProductNameOptions] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplieddate, setSuppliedDate] = useState("");
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    fetchProductNameOptions();
    fetchReceiverOptions();
  }, []);

  const fetchProductNameOptions = async () => {
    try {
      const response = await axios.get("/api/productNames");
      setProductNameOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReceiverOptions = async () => {
    try {
      const response = await axios.get("/api/receivers");
      setReceiverOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!selectedProductName || !selectedReceiver) {
      setShowErrors(true);
      return;
    }

    try {
      // Check if receiver already exists in the database
      const response = await axios.get(
        `/api/intransactions?receiver=${selectedReceiver}`
      );
      const existingReceiver = response.data;
      if (existingReceiver) {
        setErrorMessage("Receiver already exists in the database.");
        return;
      }

      // Submit transaction to the database
      await axios.post("/api/outtransactions", {
        productName: selectedProductName,
        quantity,
        supplieddate,
        receiver: selectedReceiver,
        remarks,
      });

      // Reset form fields
      setSelectedProductName("");
      setQuantity("");
      setSuppliedDate("");
      setSelectedReceiver("");
      setRemarks("");

      // Show success message
      alert("Transaction successfully added to the database.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add transaction to the database.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} id="line">
        <div className="form-group">
          <label>
            Product Name<span className="required">*</span>
          </label>
          <select
            className="shadow"
            value={selectedProductName}
            onChange={(event) => setSelectedProductName(event.target.value)}
            required
          >
            <option value="">Select a product</option>
            {productNameOptions.map((productName) => (
              <option key={productName} value={productName}>
                {productName}
              </option>
            ))}
          </select>
        </div>
        {showErrors && !selectedProductName && (
          <p className="error-message">Please select a product</p>
        )}
        <div className="form-group">
          <label>
            Quantity<span className="required">*</span>
          </label>
          <input
            className="shadow"
            type="number"
            value={quantity}
            required
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Supplied Date</label>
          <input
            className="shadow"
            type="date"
            value={supplieddate}
            onChange={(event) => setSuppliedDate(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Receiver</label>
          <select
            className="shadow"
            value={selectedReceiver}
            onChange={(event) => setSelectedReceiver(event.target.value)}
          >
            <option value="">Select a receiver</option>
            {receiverOptions.map((receiver) => (
              <option key={receiver} value={receiver}>
                {receiver}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Remarks</label>
          <textarea
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
          />
        </div>
        <button type="submit" className="submitbtn">
          Submit
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Transform;
