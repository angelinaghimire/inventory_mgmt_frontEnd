import React, { useState } from "react";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import "../stylesheets/TransForm.css";

function Translist() {
  const [productname, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchasedate, setPurchaseDate] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const productOptions = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
    // Add more product options as needed
  ];

  const supplierOptions = [
    { value: "supplier1", label: "Supplier 1" },
    { value: "supplier2", label: "Supplier 2" },
    { value: "supplier3", label: "Supplier 3" },
    // Add more supplier options as needed
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!productname || !supplier) {
      setShowErrors(true);
      return;
    }

    try {
      // Check if supplier already exists in the database
      const response = await axios.get(
        `/api/intransactions?productid=${productname}`
      );
      const supplier = response.data;
      if (supplier) {
        setErrorMessage("Supplier already exists in the database.");
        return;
      }

      // Submit supplier to the database
      await axios.post("/api/transactions", {
        productname,
        quantity,
        price,
        purchasedate,
        expirydate,
        supplier,
        remarks,
      });

      // Reset form fields
      setProductName("");
      setQuantity("");
      setPrice("");
      setPurchaseDate("");
      setExpiryDate("");
      setSupplier("");
      setRemarks("");

      // Show success message
      alert(" successfully added to the database.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add supplier to the database.");
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
            value={productname}
            onChange={(event) => setProductName(event.target.value)}
            required
          >
            <option value="">Select Product</option>
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {showErrors && !productname && (
          <p className="error-message">Please select a product</p>
        )}
        <div className="form-group">
          <label>
            Price<span className="required">*</span>
          </label>
          <CurrencyInput
            className="shadow"
            decimalsLimit={2}
            maxLength={8}
            prefix="Rs. "
            allowNegativeValue={false}
            onChange={(value) => setPrice(value)}
            required
          />
        </div>
        {showErrors && !price && (
          <p className="error-message">Please enter price before submitting</p>
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
          <label>Purchase Date</label>
          <input
            className="shadow"
            type="date"
            value={purchasedate}
            onChange={(event) => setPurchaseDate(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            className="shadow"
            type="date"
            value={expirydate}
            onChange={(event) => setExpiryDate(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Supplier</label>
          <select
            className="shadow"
            value={supplier}
            onChange={(event) => setSupplier(event.target.value)}
          >
            <option value="">Select Supplier</option>
            {supplierOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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

export default Translist;
