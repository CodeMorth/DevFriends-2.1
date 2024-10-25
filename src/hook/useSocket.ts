import { initSocket , getSocket} from '@/utilities/socketClient';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = initSocket();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect(); // Limpiar al desmontar
    };
  }, []);

  return socket;
};
