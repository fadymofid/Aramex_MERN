import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setLocalOrders] = useState([]); // Local state to store orders
  const [loading, setLoading] = useState(true); // Loading state to manage UI
  const [error, setError] = useState(null); // Error state to manage API errors
  const navigate = useNavigate(); // Use navigate hook

  const handleOrderClick = (orderId) => {
    console.log('handleOrderClick', orderId);
    navigate(`/order-details/${orderId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/order/getuserorder', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming JWT is in localStorage
          }
        });
        setLocalOrders(response.data.data); // Set fetched orders
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
        setError('Failed to fetch orders. Please try again.');
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to run once on mount

  const cancelOrder = async (orderId) => {
    try {
      // API call to cancel the order using POST
      const response = await axios.post(
        'http://localhost:8000/order/cancelorder',  // Correct endpoint
        { id: orderId },  // Pass the order ID
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT for authorization
          }
        }
      );
      
      // If canceling is successful, remove the order from the list
      if (response.data.msg === 'Order canceled successfully') {
        setLocalOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      setError('Failed to cancel order. Please try again.');
    }
  };

  return (
    <div className="my-orders container">
      <h2>My Orders</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : orders.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter(order => order.status !== 'canceled')
              .map((order) => (
                <tr key={order._id}>
                  <td>{order.OrderId}</td>
                  <td>{order.status || 'Pending'}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleOrderClick(order._id)}>
                      View Order Details
                    </button>
                    {order.status === 'pending' && (
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
