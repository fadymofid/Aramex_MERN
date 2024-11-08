// CourierNavbar.js
import React from 'react';

const CourierNavbar = ({ handleLogout }) => {
  return (
    <nav className="navbar fixed-top">
     <div className="navbar-nav">

  <button className="nav-link" onClick={handleLogout}>Logout</button>
</div>
    </nav>
  );
};

export default CourierNavbar;
