import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    console.log('Submitting form...');  // Check if this logs correctly

    try {
      console.log(email + password);
      const response = await axios.post('//localhost:8000/login', { email, password });
      console.log('Login Success:', response.data);
      // Handle successful login response, such as saving a token or redirecting
    } catch (error) {
      console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form">
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

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="button" className="submit-btn" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
