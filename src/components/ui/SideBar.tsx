'use client'
import { useSidebar } from '@/hook'
import { Sidebar } from 'primereact/sidebar'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { HiHome } from 'react-icons/hi'
import { RxExit } from 'react-icons/rx'

interface SideBarProps {
  setvisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  closeSideb: () => void
}

export const SideBar = ({ setvisible, visible, closeSideb }: SideBarProps) => {
  const { navigateRuta, url } = useSidebar(closeSideb)

  const icons = [
    <CgProfile className="w-full h-full" key={0} />,
    <HiHome className="w-full h-full" key={1} />,
    <RxExit className="w-full h-full" key={2} />
  ]

  return (
    <Sidebar
      position="right"
      className="sidebar-perfil main-page"
      visible={visible}
      onHide={() => setvisible(false)}
    >
      <div className="info-sidebar">
        {url?.map(
          (directions: { info: string; ruta: string }, index: number) => (
            <div key={index} onClick={() => navigateRuta(directions?.ruta)}>
              <div className="direction_container">
                <div className="icon_container">{icons[index]}</div>
                <h4>{directions?.info}</h4>
              </div>
            </div>
          )
        )}
      </div>
    </Sidebar>
  )
}
