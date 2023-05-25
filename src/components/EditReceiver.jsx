///// THis file has some error. It is not working. Reported by Diwash.
import React, { useState, useEffect } from "react";
import "../stylesheets/EditSup.css";
import axios from "../axiosConfig.js";
// import "../stylesheets/editUser.css";
const EditReceiver = (props) => {
  const [receivers, setReceivers] = useState([]);
  useEffect(() => {
    const fetchReceivers = async () => {
      try {
        const response = await axios.get("/api/receivers");
        const receivers = response.data;
        setReceivers(receivers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReceivers();
    console.log("from useEffect", receivers);
  });

  const data = [
    {
      id: 1,
      name: "John",
      location: "Dhulikhel",
      phonenumber: 9842222222,
      email: "abcd@gmail.com",
    },
    {
      id: 2,
      name: "Jane",
      location: "Dhulikhel",
      phonenumber: 9842222222,
      email: "abcd@gmail.com",
    },
    {
      id: 3,
      name: "Bob",
      location: "Dhulikhel",
      phonenumber: 9842222222,
      email: "abcd@gmail.com",
    },
    {
      id: 4,
      name: "Alice",
      location: "Dhulikhel",
      phonenumber: 9842222222,
      email: "abcd@gmail.com",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(receivers);
  console.log("from edit receiver", receivers);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = receivers.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
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
            <th>Name</th>
            <th>Location</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.adderss}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className="button"
                  onClick={() => handleDelete(item.id)}
                >
                  Edit
                </button>
                <button
                  className="button"
                  id="reject"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditReceiver;
