import React from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = React.createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = React.useContext(AuthContext);
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    setSocket(io('http://localhost:5000'));
  }, []);

  React.useEffect(() => {
    currentUser && socket?.emit('newUser', currentUser.id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Prop types validation
SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
