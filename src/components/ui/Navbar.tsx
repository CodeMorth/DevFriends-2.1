'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '@/components/global'
import Image from 'next/image'
import { LoginModal } from '@/components/molecules'
import { useOpenModal, userLocalStoras } from '@/hook'
import { Buttonss } from '@/components/atoms/Buttonss'
import { SideBar } from '@/components/ui'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const [visible, setvisible] = useState<boolean>(false)
  const [users, setusers] = useState<string | null>(null)
  const path = usePathname()
  const { open, closeModal, openModal } = useOpenModal()
  const { obtenerLocal } = userLocalStoras()

  useEffect(() => {
    const token = obtenerLocal('token')
    setusers(token)
  }, [path, obtenerLocal])

  return (
    <Container>
      <div className="navbar main-page">
        <div className="logo ">
          <div className="imagen-logo">
            <Image
              src={'/logo/logo-tareas.png'}
              alt="logo"
              width={1000}
              height={1000}
              priority
              className="w-full h-full"
            />
          </div>

          <div className="logo-name">
            <h3>Dev</h3>
            <h2>Friend</h2>
          </div>
        </div>

        {users ? (
          <Buttonss onClick={() => setvisible(true)}>Perfil</Buttonss>
        ) : (
          <Buttonss onClick={openModal}>Login</Buttonss>
        )}
      </div>
      <LoginModal visible={open} closeModal={closeModal} />
      <SideBar
        closeSideb={() => setvisible(false)}
        setvisible={setvisible}
        visible={visible}
      />
    </Container>
  )
}
