import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AssignedOrders.css'; // Import the custom CSS file

const AssignedOrders = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch assigned orders
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('User is not authenticated. Please log in.');
      return;
    }

    const fetchAssignedOrders = async () => {
      try {
        console.log("Fetching assigned orders...");
        const response = await axios.get('http://localhost:8000/courier/assignedorders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response);
        setAssignedOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching assigned orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedOrders();
  }, []);

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User is not authenticated. Please log in.');
      return;
    }
    
    try {
      console.log("Updating order status...");
      console.log("Data sent:", { OrderId: orderId, status: newStatus }); // Log the data being sent
      setLoading(true);
      await axios.post('http://localhost:8000/courier/updateorderstatus', 
        { OrderId: orderId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order ID and status updated:", orderId, newStatus);
  
      setAssignedOrders((orders) =>
        orders.map((order) =>
          order.OrderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      console.log("Error details:", error.response?.data); // Log detailed error info
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="assigned-orders container mt-5">
      <h2 className="text-center mb-4">Assigned Orders</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : assignedOrders.length > 0 ? (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Package Details</th>
              <th>Delivery Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedOrders.map((order) => (
              <tr key={order.OrderId}>
                <td>{order.OrderId}</td>
                <td>{order.pickupLocation}</td>
                <td>{order.dropoffLocation}</td>
                <td>{order.packageDetails}</td>
                <td>{new Date(order.deliveryTime).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  {['pending', 'accepted','in_transit'].includes(order.status) ? (
                    <select
                      className="form-control"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.OrderId, e.target.value)}
                    >
                      {order.status === 'pending' && (
                        <>
                          <option value="pending">Select Status</option>
                          <option value="accepted">Accept</option>
                          <option value="canceled">Decline</option>
                        </>
                      )}
                      {order.status === 'accepted' && (
                        <>
                          <option value="accepted">Accepted</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                        </>
                      )}
                       {order.status === 'in_transit' && (
                        <>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                        </>
                      )}
                    </select>
                  ) : (
                    <span>{order.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No assigned orders found.</p>
      )}
    </div>
  );
};

export default AssignedOrders;
