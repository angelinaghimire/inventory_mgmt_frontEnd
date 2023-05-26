import React, { useState, useEffect } from "react";
import "../stylesheets/History.css";
import axios from "../axiosConfig.js";

const Historyin = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      await axios
        .get("/api/intransaction")
        .then((response) => {
          const datas = response.data.intransactions[0];
          setData(datas);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchdata();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = data.filter((item) =>
      item.productname.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleDelete = (id) => {
    const updatedResults = searchResults.filter((item) => item.id !== id);
    setSearchResults(updatedResults);
  };

  return (
    <div className="table-wrapper">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Received Date</th>
            <th>Supplier ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.total_price}</td>
              <td>{item.date}</td>
              <td>{item.supplier_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historyin;
