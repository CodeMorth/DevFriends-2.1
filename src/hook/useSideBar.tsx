
import { useRouter } from 'next/navigation';
import {userLocalStoras} from '@/hook';

interface SidebarLink {
  info: string;
  ruta: string;
}

interface SidebarHook {
  navigateRuta: (ruta: string) => void;
  url: SidebarLink[];
}

export function  useSidebar (setclose: () => void): SidebarHook  {
  const router = useRouter();
  const { eliminarLocal } = userLocalStoras();

  const url: SidebarLink[] = [
    {
      info: 'Perfil',
      ruta: '/perfil',
    },
    {
      info: 'Inicio',
      ruta: '/dashboard',
    },
    {
      info: 'Salir',
      ruta: '/',
    },
  ];

  const navigateRuta = (ruta: string) => {
    if (ruta === '/') {
      router.push(ruta);
      eliminarLocal('token');
      setclose();
    } else {
      router.push(ruta);
      setclose();
    }
  };

  return {
    navigateRuta,
    url,
  };
}