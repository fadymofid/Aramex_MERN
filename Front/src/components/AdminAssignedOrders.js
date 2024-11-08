import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminAssignedOrders.css';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component

const AdminAssignedOrders = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const fetchAssignedOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/getAllOrders');
      setAssignedOrders(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch assigned orders');
      setLoading(false);
    }
  };

  const assignOrder = async (orderId) => {
    const courieruserId = prompt("Enter the Courier ID to assign this order:");
    if (!courieruserId) {
      alert("Courier ID is required to assign an order.");
      return;
    }

    try {
      await axios.post('http://localhost:8000/admin/assignedorders', { OrderId: orderId, courieruserId });
      fetchAssignedOrders(); // Refresh order list after assigning
    } catch (err) {
      setError('Failed to assign order');
    }
  };

  const updateOrder = async (orderId) => {
    // Display a menu of fields to update
    const choice = prompt(
      "Select the field you want to update:\n" +
      "1. Status\n" +
      "2. Delivery Time\n" +
      "3. Pickup Location\n" +
      "4. Dropoff Location\n" +
      "5. Assigned Courier"
    );
  
    // Define mapping of choice to actual field names in the order schema
    const fieldMapping = {
      1: "status",
      2: "deliveryTime",
      3: "pickupLocation",
      4: "dropoffLocation",
      5: "courieruserId",
    };
  
    const fieldToUpdate = fieldMapping[choice];
  
    if (!fieldToUpdate) {
      alert("Invalid choice. Please try again.");
      return;
    }
  
    // Prompt for the new value of the chosen field
    const newValue = prompt(`Enter the new value for ${fieldToUpdate}:`);
    if (!newValue) {
      alert("A new value is required to update the order.");
      return;
    }
  
    try {
      await axios.put('http://localhost:8000/admin/updateorderstatus', { orderId, updateData: { [fieldToUpdate]: newValue } });
      fetchAssignedOrders(); // Refresh the order list after updating
    } catch (err) {
      setError('Failed to update order');
    }
  };
  
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await axios.delete('http://localhost:8000/admin/deleteorder', { data: { OrderId: orderId } });
      fetchAssignedOrders(); // Refresh order list after deleting
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  const handleLogout = () => {
    // Perform any cleanup here
    window.location.href = '/login';
  };

  return (
    <div className="admin-assigned-orders">
      <AdminNavbar handleLogout={handleLogout} /> {/* Use AdminNavbar */}
      <div className="container mt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="header mb-4">
          <h2>Assigned Orders</h2>
        </div>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : assignedOrders.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Package Details</th>
                  <th>Delivery Time</th>
                  <th>Pickup Location</th>
                  <th>Dropoff Location</th>
                  <th>Status</th>
                  <th>Assigned Courier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignedOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.OrderId}</td>
                    <td>{order.userId}</td>
                    <td>{order.packageDetails}</td>
                    <td>{new Date(order.deliveryTime).toLocaleString()}</td>
                    <td>{order.pickupLocation}</td>
                    <td>{order.dropoffLocation}</td>
                    <td>{order.status}</td>
                    <td>{order.courieruserId || 'Not Assigned'}</td>
                    <td>
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => assignOrder(order._id)}>Assign Courier</button>
                      <button className="btn btn-warning btn-sm mr-2" onClick={() => updateOrder(order._id)}>Update Order</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteOrder(order._id)}>Delete Order</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No assigned orders available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAssignedOrders;
