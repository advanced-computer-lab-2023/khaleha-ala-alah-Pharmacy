import React, { useEffect, useRef, useState } from "react";
import ChatInterface from "../Elements/chat";
import "./messenger.css";
import UserList from "../Elements/allUsers";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useWebSocket } from "../WebSocketContext";
import { useLocation } from "react-router-dom";
import Separator from "./separator";
import { useNavigate } from "react-router-dom";
import homeIcon from "../Images/home.png";
import NavBar from "../Elements/NavBar";
import Header from "../Elements/Header";
import NavBar2 from "../Elements/NavBarPharmacist";
import Header2 from "../Elements/HeaderDoctor";
import { useAuth } from "../AuthContext";

function Messenger() {
  const [conversations, setConversations] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState();
  const socket = useWebSocket();
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useAuth();


  useEffect(() => {
    console.log(role);
    console.log("&^^^^^");
    getUsers();
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        fileData: data.file,
        fileType: data.fileType,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (location.state) {
      handleSelectUser(location.state.senderId);
    }
  }, [users]);

  useEffect(() => {
    arrivalMessage &&
      conversations?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);

    if (conversations?.members.includes(arrivalMessage.sender)) {
      setTimeout(() => {
        axios
          .post(
            `http://localhost:4002/conversations/deleteMessagesNotification`,
            { senderId: arrivalMessage.sender, receiverId: userID }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);
    }
  }, [arrivalMessage, conversations]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4002/users/getUsers", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserID(res.data.userID);
      const allUsers = res.data.users;
      const filteredUsers = allUsers.filter((user) => user.userID !== userID);
      setUsers(filteredUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectUser = async (userId) => {
    try {
      setLoading(true);
      setSelectedUser(users.find((user) => user.userID === userId));
      const res = await axios.post(`http://localhost:4002/conversations`, {
        senderId: userID,
        receiverId: userId,
      });
      setConversations(res.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/messages/${conversations._id}`
        );
        const messages = res.data.messages;
        messages.forEach((message) => {
          message.sender =
            message.sender === userID ? "You" : selectedUser.name;
        });
        setLoading(false);
        setMessages(messages);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [conversations]);

  const handleSendMessage = (message) => {
    const formData = new FormData();
    formData.append("conversationId", conversations._id);
    formData.append("senderId", userID);
    formData.append("text", message.text);
    formData.append("file", message.file);
    if (message.voiceNote) {
      formData.append("file", message.voiceNote.blob, "voiceNote.wav");
    }

    socket.emit("sendMessage", {
      senderId: userID,
      receiverId: selectedUser.userID,
      text: message.text,
      file: message.file,
      voiceNote: message.voiceNote,
      fileType: message.fileType,
    });

    try {
      const res = axios.post(`http://localhost:4002/messages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessages([...messages, res.data.message]);
    } catch (error) {}
  };

  return (
    <div className="messenger-container">
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}

<div>
      {role === "pharmacist" ? (
        <>
          <Header2 />
          <NavBar2 />
        </>
      ) : (
        <>
          <Header />
          <NavBar />
        </>
      )}
    </div>

      <UserList
        users={users}
        onSelectUser={handleSelectUser}
        selectedUser={userID}
      />
      {selectedUser && (
        <ChatInterface
          name={selectedUser.name}
          messages={messages}
          onSendMessage={handleSendMessage}
          setMessages={setMessages}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Messenger;
