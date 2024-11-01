import { io } from 'socket.io-client';

// Crear una instancia de socket y conectarla
export const socket = io(process.env.NEXT_PUBLIC_BASIC_URL || 'http://localhost:8000', {
  withCredentials: true,
  reconnection: true, 
});



//coneccion del usuario por espacio de trabajo
export const onUsuariosConectado = (callback: (data: any) => void) => {
  socket.on('usuariosConectado', callback);
};


