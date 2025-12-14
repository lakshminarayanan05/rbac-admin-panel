import { createContext, useEffect } from 'react';
import socket from '../socket/socket';
import { message } from 'antd';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on('USER_CREATED', (data) => {
      message.info(data.message);
    });

    socket.on('USER_DELETED', (data) => {
      message.warning(data.message);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
