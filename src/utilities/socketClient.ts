import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:8000', {
      transports: ['websocket'],
      withCredentials: true, // Si usas cookies para autenticación
    });
    
    // Manejo de eventos globales, por ejemplo cuando se conecta o desconecta el socket
    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const loginUser = (userData: any) => {
  const socket = getSocket();
  if (socket) {
    socket.emit('loginUser', userData);  // Emitir evento de login
    console.log('Usuario logueado:', userData);
  }
};

export const changeMusic = (newMusicLink: string) => {
  const socket = getSocket();
  if (socket) {
    socket.emit('changeMusic', newMusicLink);  // Emitir evento de cambio de música
    console.log('Música cambiada a:', newMusicLink);
  }
};
