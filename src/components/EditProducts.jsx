import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/EditSup.css";
import AddProductForm from "./Addform";

const EditProducts = (props) => {
  const data = [
    {
      id: 1,
      category: "Device",
      name: "Printer",
      threshold: "1",
    },
    {
      id: 2,
      category: "Device",
      name: "Printer",
      threshold: "1",
    },
    {
      id: 3,
      category: "Device",
      name: "ass",
      threshold: "1",
    },
    // ... rest of the data objects
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);
  const [editingItemId, setEditingItemId] = useState(null);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    setSearchResults(filteredResults);
  };

  const handleEdit = (id) => {
    setEditingItemId(id);
  };

  const handleDelete = (id) => {
    const updatedResults = searchResults.filter((item) => item.id !== id);
    setSearchResults(updatedResults);
  };

  const handleCancel = () => {
    setEditingItemId(null);
  };

  return (
    <div className="table-wrapper">
      {!editingItemId && (
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      )}

      {editingItemId !== null ? (
        <AddProductForm
          initialData={searchResults.find((item) => item.id === editingItemId)}
          onCancel={handleCancel}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name</th>
              <th>Threshold</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.threshold}</td>
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
      )}
    </div>
  );
};

export default EditProducts;
