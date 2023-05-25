import React, { useState } from "react";
import "../stylesheets/History.css";

const Historyout = (props) => {
  const data = [
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pencil",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
    },
    {
      id: 1,
      productname: "Pen",
      quantity: 45,
      date: "05 / 06 / 2022",
      receiver: "DAO",
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
            <th>Supplied Date</th>
            <th>Receiver</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productname}</td>
              <td>{item.quantity}</td>
              <td>{item.date}</td>
              <td>{item.receiver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historyout;
