'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '@/components/global'
import { LoginModal } from '@/components/molecules'
import { userLocalStoras } from '@/hook'
import { Buttonss } from '@/components/atoms/Buttonss'
import { SideBar } from '@/components/ui'
import { usePathname } from 'next/navigation'
import { useMultipleModal } from '@/hook/useMultipeModal'
import { DevFriendLogo } from '@/components/global/DevFriendLogo'

export const Navbar = () => {
  const [visible, setvisible] = useState<boolean>(false)
  const [users, setusers] = useState<string | null>(null)
  const path = usePathname()
  const { isModalOpen, closeModals, openModals } = useMultipleModal()
  const { obtenerLocal } = userLocalStoras()

  useEffect(() => {
    const token = obtenerLocal('token')
    setusers(token)
  }, [path, obtenerLocal])

  return (
    <Container>
      <div className="navbar main-page">
        <div className="logo ">
          <div className="logo-name">
            <DevFriendLogo/>
          </div>
        </div>

        {users ? (
          <Buttonss onClick={() => setvisible(true)}>Perfil</Buttonss>
        ) : (
          <Buttonss onClick={() => openModals('login')}>
            Iniciar Sesión
          </Buttonss>
        )}
      </div>
      <LoginModal
        visible={isModalOpen('login')}
        closeModal={() => closeModals('login')}
      />
      <SideBar
        closeSideb={() => setvisible(false)}
        setvisible={setvisible}
        visible={visible}
      />
    </Container>
  )
}
