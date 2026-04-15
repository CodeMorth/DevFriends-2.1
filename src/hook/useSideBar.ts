import { useNavigate } from 'react-router-dom'
import { userLocalStoras } from '@/hook'
import { logoutService } from '@/services'

interface SidebarLink {
  info: string
  ruta: string
}

interface SidebarHook {
  navigateRuta: (ruta: string) => void
  url: SidebarLink[]
}

export function useSidebar(setclose: () => void): SidebarHook {
  const navigate = useNavigate()
  const { eliminarLocal } = userLocalStoras()

  const url: SidebarLink[] = [
    {
      info: 'Perfil',
      ruta: '/perfil'
    },
    {
      info: 'Inicio',
      ruta: '/dashboard'
    },
    {
      info: 'Salir',
      ruta: '/'
    }
  ]

  const navigateRuta = (ruta: string) => {
    if (ruta === '/') {
      navigate(ruta)
      eliminarLocal('token')
      eliminarLocal('work_space')
      logoutService()
      setclose()
    } else {
      navigate(ruta)
      setclose()
    }
  }

  return {
    navigateRuta,
    url
  }
}
