import React, { useState } from "react";
import "../stylesheets/History.css";

const Historyin = (props) => {
  const data = [
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
    {
      id: 1,
      productname: "Eraser",
      quantity: 45,
      price: 200,
      date: "05 / 06 / 2022",
      supplier: "Saraswati Traders",
    },
  ];

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
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Received Date</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productname}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.date}</td>
              <td>{item.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historyin;
