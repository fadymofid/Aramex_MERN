// src/App.js

import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  // State to toggle between login and registration forms
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle between forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      {/* Conditionally render Login or Registration Form */}
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      
      {/* Button to toggle between forms */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLogin ? (
          <p style={{fontSize:'20px'}}>
            Don't have an account?{' '}
            <button onClick={toggleForm} className="toggle-btn btn">
              Register
            </button>
          </p>
        ) : (
          <p style={{fontSize:'20px'}}>
            Already have an account?{' '}
            <button onClick={toggleForm} className="toggle-btn btn">
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
