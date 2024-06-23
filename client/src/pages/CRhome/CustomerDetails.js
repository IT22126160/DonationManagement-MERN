import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerDetails = () => {
  const { nic } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/customers/${nic}`);
        setCustomer(response.data);
        setError(null); // Reset the error if the fetch is successful
      } catch (error) {
        setError("Failed to fetch customer data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [nic]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!customer) {
    return <p>Customer not found</p>;
  }

  return (
    <div className="container">
      <h1 className="heading">Customer Details</h1>
      <hr className="hr" />
      <div className="detailsContainer">
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>ID Number:</strong> {customer.nic}</p>
        <p><strong>Request Type:</strong> {customer.requestType}</p>
        <p><strong>Customer Request:</strong> {customer.request}</p>
      </div>
      <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
    </div>
  );
};

export default CustomerDetails;

// You might need to implement the deleteCustomer function
const deleteCustomer = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/delete/${id}`);
    // Handle what happens after successful deletion
    alert("Customer deleted successfully!");
  } catch (error) {
    alert("Failed to delete customer: " + error.message);
  }
};
