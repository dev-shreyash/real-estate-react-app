import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  // Initialize the socket connection
  useEffect(() => {
    const newSocket = io("http://127.0.0.1:4000", {
      withCredentials: true, // Ensure CORS compatibility if required
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up connection on component unmount
    };
  }, []);

  // Handle new user event when currentUser changes
  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.data?.user?.id);
    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
