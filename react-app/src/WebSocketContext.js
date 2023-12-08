import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "./AuthContext";

const WebSocketContext = createContext();

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [userID, setUserID] = useState();
  const { role } = useAuth();

  useEffect(() => {
    const newSocket = io("ws://localhost:4001");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if(role){
      axios.get("http://localhost:4002/users/getUserID",{
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).
      then((res) => {
      setUserID(res.data.userID);
    });
    }
  }, [role]);

  useEffect(() => {
  if (userID && socket) {
    socket.emit("addUser", userID);
  }
}, [userID, socket]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
