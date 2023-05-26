import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import "../stylesheets/TransForm.css";
import Cookies from "js-cookie";

function Transform() {
  const user_id = Cookies.get("userId");
  const [productNameOptions, setProductNameOptions] = useState([]);
  const [productId, setProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [supplieddate, setSuppliedDate] = useState("");
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/product/`)
      .then((response) => {
        setProductNameOptions(response.data);
        console.log("checking data from here ", productNameOptions);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/receivers/")
      .then((response) => {
        console.log(response.data);
        setReceiverOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!selectedProductName || !selectedReceiver) {
      setShowErrors(true);
      return;
    }

    try {
      // Submit transaction to the database
      await axios.post("/api/outtransaction", {
        user_id: user_id,
        receiver_id: receiverId,
        date: supplieddate,
        remark: remarks,
        quantity: quantity,
        product_id: productId,
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
            onChange={(event) => {
              setSelectedProductName(event.target.value);
              console.log(event.target.value.split(":")[0]);
              setProductId(event.target.value.split(":")[0]);
            }}
            required
          >
            <option value="">Select product</option>
            {productNameOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.id + ":" + option.name}
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
            onChange={(event) => {
              setSelectedReceiver(event.target.value);
              console.log(event.target.value.split(":")[0]);
              setReceiverId(event.target.value.split(":")[0]);
            }}
          >
            <option value="">Select a receiver</option>
            {receiverOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.id + ":" + option.name}
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
