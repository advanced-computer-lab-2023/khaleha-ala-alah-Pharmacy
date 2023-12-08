import React from "react";
import styles from "../Elements/Header.module.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
import alertIcon from "../Images/alert.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleAlert, setDropdownVisibleAlert] = useState(false);
  const [numOfNotifications, setnumOfNotifications] = useState(8);
  const [dropdownVisibleMessages, setDropdownVisibleMessages] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(true);

  const toggleDropdownforSettings = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdownforNotification = () => {
    setDropdownVisibleAlert(!dropdownVisibleAlert);
  };

  const toggleDropdownforMessages = () => {
    setDropdownVisibleMessages(!dropdownVisibleMessages);
    setHasNewMessages(false);
  };

  const handleMessagesClick = () => {
    console.log("Messages icon clicked");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handlePassword = () => {
    navigate("/changePassword");
  };
  
  const handleUserProfile = () => {
    navigate("/pharmUserProfile");
  };

  const handleEditAccount = () =>{
    navigate("/pharmEditAcc");
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <img src={logopng} alt="Logo" />
        </div>
        <div className={styles.navbarRight}>
        <a
            href="#messages"
            className={styles.navbarLink}
            onClick={toggleDropdownforMessages}
          >
            {hasNewMessages && <Badge dot><MessageOutlined style={{ fontSize: "20px" }} onClick={handleMessagesClick} /></Badge>}
            {!hasNewMessages && <MessageOutlined style={{ fontSize: "20px" }} onClick={handleMessagesClick} />}
          </a>
          {dropdownVisibleMessages && (
            <div className={styles.dropdownMenu}>
              {/* Placeholder for messages dropdown content */}
              <button className={styles.dropdownItem}>Message 1</button>
              <button className={styles.dropdownItem}>Message 2</button>
              <button className={styles.dropdownItem}>Message 3</button>
            </div>
          )}
          <a
            href="#notifications"
            className={styles.navbarLink}
            onClick={toggleDropdownforNotification}
          >
            <span className={styles.notificationBadge}>
              {numOfNotifications}
            </span>
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
            <button className={styles.dropdownItem} onClick={handleEditAccount}>
              Edit Account
            </button>
            <button className={styles.dropdownItem} onClick={handleUserProfile}>
              User Profile
            </button>
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
