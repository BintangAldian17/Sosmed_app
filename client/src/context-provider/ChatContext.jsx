import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContextProvider";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [currentUser] = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [lastMessage, setLastMessage] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser]);

  // get online user
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", currentUser?.id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{ socket, setSocket, onlineUsers, setNewMessage, newMessage, notification, setNotification }}>
      {children}
    </ChatContext.Provider>
  );
};
