import { userLocalStoras } from '@/hook'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { obtenerLocal } = userLocalStoras()
  const token = obtenerLocal('token')
  if (!token) return <Navigate to="/" replace />
  return <Outlet />
}
