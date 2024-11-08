import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar component
import './OrderForm.css';

const OrderForm = ({ setIsViewingOrders, handleLogout }) => {
  const [orderName, setOrderName] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropOffLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to place an order.');
      return;
    }

    const orderData = {
      orderName,
      pickupLocation,
      dropoffLocation,
      packageDetails,
      deliveryTime,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/order/creatorder', // Your API endpoint
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );

      // Handle success response
      if (response.status === 201) {
        setConfirmationMessage('Your order has been submitted successfully!');
        setTimeout(() => {
          setConfirmationMessage('');
          setIsViewingOrders(true); // Switch to "My Orders" page after submission
        }, 1000);
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg); // Show specific error message from server
      } else {
        setErrorMessage('Error submitting order. Please try again.');
      }
    }
  };

  return (
    <div className="order-page">
      {/* Display the Navbar at the top of the page */}
      <Navbar handleLogout={handleLogout} />

      <main className="main-content">
        <div className="form-container">
          <h2>Place an Order</h2>
          <form onSubmit={handleOrderSubmit}>
            <div className="form-group mb-3">
              <label>Order Name</label>
              <input
                type="text"
                className="form-control"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Pickup Location</label>
              <input
                type="text"
                className="form-control"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Drop-off Location</label>
              <input
                type="text"
                className="form-control"
                value={dropoffLocation}
                onChange={(e) => setDropOffLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Package Details</label>
              <textarea
                className="form-control"
                value={packageDetails}
                onChange={(e) => setPackageDetails(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Delivery Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit Order
            </button>
          </form>

          {/* Show confirmation or error message */}
          {confirmationMessage && (
            <p className="confirmation-message">{confirmationMessage}</p>
          )}
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>© 2024 Delivery Service. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrderForm;
