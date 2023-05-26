import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import CurrencyInput from "react-currency-input-field";
import "../stylesheets/TransForm.css";
import Cookies from "js-cookie";

function Translist() {
  const user_id = Cookies.get("userId");
  const [productname, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchasedate, setPurchaseDate] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [supplier, setSupplier] = useState("");
  const [supplier_id, setSupplierId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/product/`)
      .then((response) => {
        // console.log(response.data);
        setProductOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/suppliers/")
      .then((response) => {
        // console.log(response.data);
        setSupplierOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!productname || !supplier) {
      setShowErrors(true);
      return;
    }

    try {
      // Submit transaction to the database
      const total_price = quantity * price;
      const transaction = await axios.post("/api/intransaction", {
        user_id: user_id,
        supplier_id,
        date: purchasedate,
        remark: remarks,
        quantity: quantity,
        product_id: productId,
        unit_price: price,
        total_price: total_price,
        expiry_date: expirydate,
      });
      alert("Transaction Added Successfully");
      // Reset form fields
      setProductName("");
      setQuantity("");
      setPrice("");
      setPurchaseDate("");
      setExpiryDate("");
      setSupplier("");
      setRemarks("");
    } catch (error) {
      console.error(error);
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
            onChange={(event) => {
              setProductName(event.target.value);
              console.log(event.target.value.split(":")[0]);
              setProductId(event.target.value.split(":")[0]);
            }}
            required
          >
            <option value="">Select Product</option>
            {productOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.id + ":" + option.name}
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
            onChange={(event) => {
              const temprice = event.target.value.replace(/,/g, "");
              // console.log(temprice.split(" ")[1]);
              setPrice(temprice.split(" ")[1]);
            }}
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
            onChange={(event) => {
              setSupplier(event.target.value);
              setSupplierId(event.target.value.split(":")[0]);
            }}
          >
            <option value="">Select Supplier</option>
            {supplierOptions.map((option) => (
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

export default Translist;
