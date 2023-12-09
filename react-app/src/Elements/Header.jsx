import React from "react";
import styles from "../Elements/Header.module.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
import alertIcon from "../Images/alert.png";
import searchIcon from "../Images/searchIcon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleAlert, setDropdownVisibleAlert] = useState(false);
  const [numOfNotifications, setnumOfNotifications] = useState(8);
  const [searchValue, setSearchValue] = useState("");

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
    navigate("/changePasswordPatient");
  };

  const handleUserProfile = () => {
    navigate("/patientUserprofile");
  };

  const handleEditAccount = () =>{
    navigate("/patientEditAcc");
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchResults?query=${searchValue}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <img src={logopng} alt="Logo" />
        </div>

        <div className={styles.navbarSearch}>
          <div
            className={styles.searchInputWrapper}
            style={{ width: "35%", marginLeft: "-40px" }}
          >
            <input
              type="text"
              placeholder="Search for Medicine ...."
              value={searchValue}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <div className={styles.searchIcon} onClick={handleSearchSubmit}>
              {/* Place your search icon here */}
              <img src={searchIcon} alt="Search" />
            </div>
          </div>
        </div>

        <div className={styles.navbarRight}>
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
