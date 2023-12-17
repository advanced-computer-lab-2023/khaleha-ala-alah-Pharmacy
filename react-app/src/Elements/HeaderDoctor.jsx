import React from "react";
import styles from "../Elements/Header.module.css"; // Link to the CSS file for styles
import logopng from "../Images/logooo.png";
import settingsIcon from "../Images/settings.png";
import alertIcon from "../Images/alert.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useWebSocket } from '../WebSocketContext';
import { useAuth } from "../AuthContext";
import searchIcon from "../Images/searchIcon.png";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisibleAlert, setDropdownVisibleAlert] = useState(false);
  const [numOfNotifications, setnumOfNotifications] = useState(2);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownVisibleMessages, setDropdownVisibleMessages] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const socket=useWebSocket();
  const initialized = useRef(false)
  const { role } = useAuth();

  useEffect(() => {
      axios
      .get("http://localhost:4002/messages/notifications", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessages(res.data.messages);
        if (res.data.messages.length > 0) {
          setHasNewMessages(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!initialized.current){
      if(socket){
        initialized.current = true
        socket.on("getMessage", (data) => {
          axios.post("http://localhost:4002/users/getUser", {
            userID: data.senderId,
          }, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).then((res) => {
            const message = {
              senderId: data.senderId,
              senderName: res.data.user.name,
              senderRole: res.data.user.role,
              receiverId:res.data.myID
            }
            setMessages((prev) => [...prev, message]);
            setHasNewMessages(true);
          }).catch((err) => {
            console.log(err);
          });
        });
      }
    };
}, [role]);


  const toggleDropdownforSettings = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdownforNotification = () => {
    navigate("/notification");
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
    navigate(`/messenger`, { state: {senderId} });
    setDropdownVisibleMessages(false);

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
            href="#messages"
            className={styles.navbarLink}
            onClick={toggleDropdownforMessages}
          >
            {hasNewMessages && (
              <Badge dot>
                <MessageOutlined
                  style={{ fontSize: "20px" }}
                />
              </Badge>
            )}
            {!hasNewMessages && (
              <MessageOutlined
                style={{ fontSize: "20px" }}
              />
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
