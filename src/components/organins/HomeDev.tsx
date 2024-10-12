'use client'
import React from 'react'
import { ModalRegister } from '@/components/molecules'
import Image from 'next/image'
import { useOpenModal } from '@/hook'
import { useMultipleModal } from '@/hook/useMultipeModal'

export const HomeDev = () => {

  const { isModalOpen , closeModals , openModals } = useMultipleModal();

  return (
    <div className="conten-last main-page">
      <div className="conten-last-info">
        <div className="content-info-dev ">
          <h4>
            <span>Dev</span> <span>Friend</span> tu compañero digital que une proyectos, conecta equipos y potencia herramientas
          </h4>
        </div>
        <p>Colabora sin fronteras y haz que cada idea brille.</p>
        <div className="container-button">
          <button onClick={() => openModals('register')}>!Registrate , es gratis</button>
        </div>
      </div>

      <div className="conten-last-logo">
        <Image
          src={'/logo/logo-tareas.png'}
          alt="logo"
          width={1000}
          height={1000}
          priority
          className="w-full h-full"
        />
      </div>
      <ModalRegister visible={isModalOpen('register')} closeModal={() => closeModals('register')} />
    </div>
  )
}
