import React from "react";
import "../Elements/NavBar.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handlePassword = () => {
    navigate('/changePassword');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logopng} alt="Logo" />
        </div>
        <div className="navbar-links">
          <a href="#home" className="navbar-link">
            Home
          </a>
          <a href="#notifications" className="navbar-link">
            Notifications
          </a>
        </div>
        <div className="navbar-right">
          <a href="#settings" className="navbar-link" onClick={toggleDropdown}>
            <img src={settingsIcon} alt="Settings" />
          </a>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button className="dropdown-item">My Account</button>
              <button className="dropdown-item" onClick={handlePassword}>Change Password</button>
              <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
