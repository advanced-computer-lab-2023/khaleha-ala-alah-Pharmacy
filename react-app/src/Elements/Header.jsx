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
import WalletImage from "../Images/wallet.png";

const Header = (patient = null) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleAlert, setDropdownVisibleAlert] = useState(false);
  const [numOfNotifications, setnumOfNotifications] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownVisibleMessages, setDropdownVisibleMessages] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const socket = useWebSocket();
  const initialized = useRef(false);
  const { role } = useAuth();
  console.log(patient);
  const [currentPatient, setCurrentPatient] = useState(patient);

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
    const fetchCurrentPatient = async () => {
      try {
        const response = await fetch(`http://localhost:4002/patients/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log("Current patient fetched successfully:");
          console.log(data.data.patients[0]);
          return data;
        } else {
          console.error("Failed to fetch current patient:");
          console.error(data);
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch current patient:");
        console.error(error);
        return null;
      }
    };
    fetchCurrentPatient().then((data) => {
      setCurrentPatient(data.data.patients[0]);
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

  const fetchCurrentPatient = async () => {
    try {
      const response = await fetch(`http://localhost:4002/patients/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Current patient fetched successfully:");
        console.log(data.data.patients[0]);
        return data;
      } else {
        console.error("Failed to fetch current patient:");
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch current patient:");
      console.error(error);
      return null;
    }
  };

  const toggleDropdownforSettings = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdownforNotification = () => {
    navigate("/notification")
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
        <ToggleButton />
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
          <div className={styles.walletContainer}>
            <img src={WalletImage} alt="Wallet" style={{ width: "35px" }} />
            <p className={styles.walletValue}>
              EGP {currentPatient.walletValue}
            </p>
          </div>
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
            href=""
            className={styles.navbarLink}
            onClick={toggleDropdownforNotification}
          >
            <span className={styles.notificationBadge}>
              {numOfNotifications}
            </span>
            <img src={alertIcon} alt="Alerts" />
          </a>
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
