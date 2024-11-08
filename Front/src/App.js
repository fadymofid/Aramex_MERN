import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import CourierNavbar from './components/CourierNavbar';
import OrderForm from './components/OrderForm';
import MyOrders from './components/MyOrders';
import OrderDetails from './components/OrderDetails';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminAssignedOrders from './components/AdminAssignedOrders';
import AssignedOrders from './components/AssignedOrders';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isViewingOrders, setIsViewingOrders] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.href = '/login';
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        {isLogin ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegistrationForm />
        )}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {isLogin ? (
            <p style={{ fontSize: '20px' }}>
              Don't have an account?{' '}
              <button onClick={toggleForm} className="toggle-btn btn">
                Register
              </button>
            </p>
          ) : (
            <p style={{ fontSize: '20px' }}>
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

  return (
    <Router>
      {userRole === 'customer' && <Navbar handleLogout={handleLogout} />}
      {userRole === 'admin' && <AdminNavbar handleLogout={handleLogout} />}
      {userRole === 'courier' && <CourierNavbar handleLogout={handleLogout} />}
      <Routes>
        {userRole === 'admin' && (
          <>
            <Route path="/admin-assigned-orders" element={<AdminAssignedOrders />} />
            <Route path="*" element={<Navigate to="/admin-assigned-orders" />} />
          </>
        )}
        {userRole === 'courier' && (
          <>
            <Route path="/assigned-orders" element={<AssignedOrders />} />
            <Route path="/order-form" element={<OrderForm handleLogout={handleLogout} setIsViewingOrders={setIsViewingOrders} />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="*" element={<Navigate to="/assigned-orders" />} />
          </>
        )}
        {userRole === 'customer' && (
          <>
            <Route path="/order-form" element={<OrderForm handleLogout={handleLogout} setIsViewingOrders={setIsViewingOrders} />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="*" element={<Navigate to="/my-orders" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
