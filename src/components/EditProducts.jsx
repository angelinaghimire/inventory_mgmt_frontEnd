import React, { useState, useEffect } from "react";
import axios from "../axiosConfig.js";
import AddProductForm from "./Addform";
import "../stylesheets/EditProducts.css";

function EditProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from the database
        const response = await axios.get("/api/products");
        const products = response.data;
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        // Delete product from the database
        await axios.delete(`/api/products/${product.id}`);
        // Remove product from the list of products
        setProducts(products.filter((p) => p.id !== product.id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      // Update product in the database
      await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct);
      // Update product in the list of products
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Threshold</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} onClick={() => handleEdit(product)}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.threshold}</td>
              <td>
                <button
                  className="button"
                  onClick={() => handleDelete(product.id)}
                >
                  Edit
                </button>
                <button
                  className="button"
                  id="reject"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditForm && (
        <div className="edit-form">
          <button onClick={() => setShowEditForm(false)}>❌</button>
          <AddProductForm
            product={selectedProduct}
            onSubmit={handleUpdate}
            onCancel={() => setShowEditForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default EditProducts;
