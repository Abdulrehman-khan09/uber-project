import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const Socket = io(`${import.meta.env.VITE_BASE_URL}`);
const SocketProvider = ({ children }) => {

  useEffect(() => {

    Socket.on('connect', () => {
      console.log('Connected to socket server:',);
    });

    Socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }, []);

  return (
    <SocketContext.Provider value={{ Socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;