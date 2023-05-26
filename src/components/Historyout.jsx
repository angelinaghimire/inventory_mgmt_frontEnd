import React, { useState, useEffect } from "react";
import "../stylesheets/History.css";
import axios from "../axiosConfig.js";

const Historyout = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      await axios
        .get("/api/outtransaction")
        .then((response) => {
          const datas = response.data.outtransactions[0];
          setData(datas);
          console.log("this is from above ", datas);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchdata();
  }, []);

  const nodata = [
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
            <th>User ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Supplied Date</th>
            <th>Receiver ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.date}</td>
              <td>{item.receiver_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historyout;
