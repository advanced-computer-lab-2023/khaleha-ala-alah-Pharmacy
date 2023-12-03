import React from "react";
import styles from "../Elements/Header.module.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
import alertIcon from "../Images/alert.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownVisibleAlert, setDropdownVisibleAlert] = useState(false);
    const [numOfNotifications , setnumOfNotifications] = useState(8);
    
  const toggleDropdownforSettings = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdownforNotification = () => {
    setDropdownVisibleAlert(!dropdownVisibleAlert);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handlePassword = () => {
    navigate("/changePassword");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <img src={logopng} alt="Logo" />
        </div>
        <div className={styles.navbarRight}>
        <a  
            href="#notifications"
            className={styles.navbarLink}
            onClick={toggleDropdownforNotification}
          >
            <span className={styles.notificationBadge}>{numOfNotifications}</span>
            <img src={alertIcon} alt="Alerts" />
          </a>
          {dropdownVisibleAlert && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>Notification 1</button>
              <button className={styles.dropdownItem}>Notification 2</button>
              <button className={styles.dropdownItem}>Notification 3</button>
            </div>
          )}
          <a
            href="#settings"
            className={styles.navbarLink}
            onClick={toggleDropdownforSettings}
          >
            <img src={settingsIcon} alt="Settings" />
          </a>
          {dropdownVisible && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem}>My Account</button>
              <button className={styles.dropdownItem} onClick={handlePassword}>
                Change Password
              </button>
              <button className={styles.dropdownItem} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
