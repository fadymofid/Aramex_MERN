import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the route parameters
  const navigate = useNavigate(); // Use navigate hook
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        
        // Retrieve token from local storage
        const token = localStorage.getItem('token'); 
        if (!token) {
          setError('User is not authenticated. Please log in.');
          setLoading(false);
          return;
        }
        console.log(token)

        // Fetch order details with authorization header
        const response = await axios.get(`http://localhost:8000/order/getorderbyid/${id}`, {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response to ensure it contains the expected data
        console.log('Order details response:', response.data);

        // Set the order details
        setOrderDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();

    // Reset order details when the component is unmounted
    return () => setOrderDetails(null);
  }, [id]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!orderDetails) return null;

  return (
    <div className="order-details">
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> {orderDetails.OrderId}</p>
      <p><strong>Pickup Location:</strong> {orderDetails.pickupLocation}</p>
      <p><strong>Drop-off Location:</strong> {orderDetails.dropoffLocation}</p>
      <p><strong>Package Details:</strong> {orderDetails.packageDetails}</p>
      <p><strong>Delivery Time:</strong> {orderDetails.deliveryTime}</p>
      <p><strong>Status:</strong> {orderDetails.status || 'Pending'}</p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
