'use client'
import React from 'react'
import { ModalRegister } from '@/components/molecules'
import Image from 'next/image'
import { useOpenModal } from '@/hook'
import { useMultipleModal } from '@/hook/useMultipeModal'
import { MdElectricBolt } from 'react-icons/md'
import { LuShield } from 'react-icons/lu'
import { AiOutlineSmile } from 'react-icons/ai'
import Link from 'next/link'

export const HomeDev = () => {
  const { isModalOpen, closeModals, openModals } = useMultipleModal()

  return (
    // <div className="conten-last main-page">
    //   <div className="conten-last-info">
    //     <div className="content-info-dev ">
    //       <h4>
    //         <span>Dev</span> <span>Friend</span> tu compañero digital que une proyectos, conecta equipos y potencia herramientas
    //       </h4>
    //     </div>
    //     <p>Colabora sin fronteras y haz que cada idea brille.</p>
    //     <div className="container-button">
    //       <button onClick={() => openModals('register')}>!Registrate , es gratis</button>
    //     </div>
    //   </div>

    //   <div className="conten-last-logo">
    //     <Image
    //       src={'/logo/logo-tareas.png'}
    //       alt="logo"
    //       width={1000}
    //       height={1000}
    //       priority
    //       className="w-full h-full"
    //     />
    //   </div>
    //   <ModalRegister visible={isModalOpen('register')} closeModal={() => closeModals('register')} />
    // </div>
    <>
      <div className="home_dev_page main-page">
        <h1 className="title_home">
          Revoluciona tu <br /> <span>desarrollo</span>
        </h1>
        <h3>
          Dev-Friend tu compañero digital que une proyectos, conecta equipos y
          potencia herramientas
        </h3>
        <div className="buttons_container ">
          <button onClick={() => openModals('register')} className="animate-bounce bg-primaryPink cursor-pointer">Comienza gratis</button>
          <Link href="https://github.com/CodeMorth/DevFriends-2.1" target='_blank'  className=" bg-white text-primaryBlack"> Codigo</Link>
        </div>
        <div className="data_container">
          <div className="box_container">
            <div className="svg_container">
              <MdElectricBolt className="w-full h-full" />
            </div>
            <h2>Rápido</h2>
            <p>Optimiza tu flujo de trabajo</p>
          </div>
          <div className="box_container">
            <div className="svg_container">
              <LuShield className="w-full h-full" />
            </div>
            <h2>Seguro</h2>
            <p>Protege tus proyectos</p>
          </div>
          <div className="box_container">
            <div className="svg_container">
              <AiOutlineSmile className="w-full h-full" />
            </div>
            <h2>Amigable</h2>
            <p>Interfaz intuitiva</p>
          </div>
        </div>
      </div>
      <ModalRegister
        visible={isModalOpen('register')}
        closeModal={() => closeModals('register')}
      />
    </>
  )
}
