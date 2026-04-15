import { HomeDashboard } from '@/components/molecules/dashboard/HomeDashboard'
import { ProtectedRoute } from '@/components/routing/ProtectedRoute'
import { HomeDev } from '@/components/organins'
import { Navbar } from '@/components/ui'
import BoardSlugPage from '@/pages/BoardSlugPage'
import NotFoundPage from '@/pages/NotFoundPage'
import PerfilPage from '@/pages/PerfilPage'
import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import 'primereact/resources/themes/lara-dark-purple/theme.css'
import 'primeicons/primeicons.css'

export default function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeDev />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<HomeDashboard />} />
            <Route path="/dashboard/:slug" element={<BoardSlugPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
          </Route>
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'p-toast-message-content'
          }}
        />
      </BrowserRouter>
    </PrimeReactProvider>
  )
}
