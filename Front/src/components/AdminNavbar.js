import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const AdminNavbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    
    // Optionally, clear any other user-related data
    // localStorage.removeItem('user'); 

    // Redirect to login page after logout
    window.location.href = '/login';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100">
      <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-light" onClick={logout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
