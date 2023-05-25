import React, { useState } from "react";
import "../stylesheets/EditSup.css";
// import "../stylesheets/editUser.css";
const EditSup = (props) => {
  const data = [
    { id: 1, name: "John", location: "Dhulikhel", phonenumber: 9811122234, email: "abcd@gmail.com" },
    { id: 2, name: "Jane", location: "Pokhara", phonenumber: 9811152234, email: "abcd@gmail.com" },
    { id: 3, name: "Bob", location: "Chitwan" , phonenumber: 9811132234, email: "abcd@gmail.com"},
    { id: 4, name: "Alice", location: "Butwal", phonenumber: 9811102234, email: "abcd@gmail.com" },
    
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = data.filter((item) =>
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
            {/* <th></th> */}
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

export default EditSup;
