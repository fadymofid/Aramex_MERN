import React, { useState, useRef } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const passwordInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      
      // Get the role and token from the server response
      const { user, token } = response.data;

      // Store the token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.userId);  // Store userId if needed
      localStorage.setItem('role', user.role);      // Store the role if needed

      // Display success message and call onLoginSuccess with the user's role
      setMessageType("success");
      setMessage("Login successful!");
      
      // Clear the form after successful login
      setEmail('');
      setPassword('');
      
      // Trigger login success callback with the role
      onLoginSuccess(user.role); // Trigger login success callback with the user's role

    } catch (error) {
      // Handle specific errors based on the response from the server
      if (error.response && error.response.data && error.response.data.msg) {
        setMessageType("error");
        setMessage(error.response.data.msg); // Show specific error message from server
      } else {
        setMessageType("error");
        setMessage("Login failed! Please check your credentials.");
      }
      passwordInputRef.current.focus(); // Focus on the password input field after failure
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              ref={passwordInputRef}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>
        <button type="submit" className="submit-btn">Login</button>
        {message && (
          <div className={`popup-message ${messageType === 'success' ? 'popup-success' : 'popup-error'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
