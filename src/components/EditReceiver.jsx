import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import RecForm from "./RecForm";
import "../stylesheets/EditSup.css";

const EditReceiver = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([
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
  ]);

  const [selectedReceiver, setSelectedReceiver] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = searchResults.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleEdit = (id) => {
    const receiver = searchResults.find((item) => item.id === id);
    setSelectedReceiver(receiver);
  };

  const handleDelete = (id) => {
    const updatedResults = searchResults.filter((item) => item.id !== id);
    setSearchResults(updatedResults);
  };

  const handleCancel = () => {
    setSelectedReceiver(null);
  };

  return (
    <div className="edit-receiver-container">
      {selectedReceiver ? (
        <RecForm receiver={selectedReceiver} onCancel={handleCancel} />
      ) : (
        <div className="table-wrapper">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="receiver-list">
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
                    <td>{item.location}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.email}</td>
                    <td>
                      <FontAwesomeIcon
                        className="edit"
                        icon={faEdit}
                        onClick={() => handleEdit(item.id)}
                      />
                      <FontAwesomeIcon
                        className="trash"
                        icon={faTrash}
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditReceiver;
