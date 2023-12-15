import React from "react";
import styles from "../Elements/Header.module.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
import alertIcon from "../Images/alert.png";
import searchIcon from "../Images/searchIcon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import axios from "axios";
import { useWebSocket } from "../WebSocketContext";
import { useAuth } from "../AuthContext";
import ToggleButton from "../Components/ToggleButton";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleAlert, setDropdownVisibleAlert] = useState(false);
  const [numOfNotifications, setnumOfNotifications] = useState(8);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownVisibleMessages, setDropdownVisibleMessages] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const socket = useWebSocket();
  const initialized = useRef(false);
  const { role } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:4002/messages/notifications", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const pharmacistMessages = res.data.messages.filter(
          (message) => message.senderRole === "pharmacist"
        );

        setMessages(pharmacistMessages);
        if (pharmacistMessages.length > 0) {
          setHasNewMessages(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      if (socket) {
        initialized.current = true;
        socket.on("getMessage", (data) => {
          axios
            .post(
              "http://localhost:4002/users/getUser",
              {
                userID: data.senderId,
              },
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              if (res.data.user.role === "pharmacist") {
                const message = {
                  senderId: data.senderId,
                  senderName: res.data.user.name,
                  senderRole: res.data.user.role,
                  receiverId: res.data.myID,
                };
                setMessages((prev) => [...prev, message]);
                setHasNewMessages(true);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    }
  }, [role]);

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
  const handleMessageItemClick = (message) => {
    const updatedMessages = messages.filter(
      (message) => message._id !== message._id
    );
    setMessages(updatedMessages);
    const senderId = message.senderId;
    navigate(`/messenger`, { state: { senderId } });
    setDropdownVisibleMessages(false);
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

  const handleEditAccount = () => {
    navigate("/patientEditAcc");
  };

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
        <h3 className={styles.options}> Pharmacy </h3>
        <ToggleButton style={{ marginLeft: "5px", marginRight: "5px" }} />
        <h3 className={styles.options}> Clinic </h3>

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
            href="#messages"
            className={styles.navbarLink}
            onClick={toggleDropdownforMessages}
          >
            {hasNewMessages && (
              <Badge dot>
                <MessageOutlined style={{ fontSize: "20px" }} />
              </Badge>
            )}
            {!hasNewMessages && (
              <MessageOutlined style={{ fontSize: "20px" }} />
            )}
          </a>
          {dropdownVisibleMessages && (
            <div className={styles.dropdownMenu}>
              {messages.map((message, index) => (
                <button
                  className={styles.dropdownItem}
                  key={index}
                  onClick={() => handleMessageItemClick(message)}
                >
                  {message.senderName}
                </button>
              ))}
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
              <button
                className={styles.dropdownItem}
                onClick={handleEditAccount}
              >
                Edit Account
              </button>
              <button
                className={styles.dropdownItem}
                onClick={handleUserProfile}
              >
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
