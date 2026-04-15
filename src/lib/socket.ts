import { io } from 'socket.io-client'

const apiBase = import.meta.env.VITE_API_BASE_URL ?? ''
const useSameOrigin =
  typeof apiBase === 'string' &&
  (apiBase.startsWith('/') || apiBase === '')

// Con VITE_API_BASE_URL=/api/ el socket va al mismo origen (Vite proxy → /socket.io).
const socketUrl = useSameOrigin
  ? window.location.origin
  : (apiBase.replace(/\/$/, '') || 'http://localhost:8000')

export const socket = io(socketUrl, {
  withCredentials: true,
  reconnection: true
})



//coneccion del usuario por espacio de trabajo
export const onUsuariosConectado = (callback: (data: any) => void) => {
  socket.on('usuariosConectado', callback);
};


