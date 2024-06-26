'use client'
import React from "react";
import {ModalRegister} from "@/components/molecules";
import Image from "next/image";
import { useOpenModal } from '@/hook';

export const HomeDev = () => {
  const { open, closeModal, openModal } = useOpenModal();

  return (
    <div className="conten-last main-page">
      <div className="conten-last-info">
        <div className="content-info-dev ">
          <h4>
            <span>Dev</span> <span>Friend</span> Unifica tus tareas, compañeros
            de equipo y herramientas
          </h4>
        </div>
        <p>Manten todo en el mismo lugar , aunque tu equipo no lo esté</p>
        <div className="container-button">
          <button onClick={openModal}>!Registrate , es gratis</button>
        </div>
      </div>

      <div className="conten-last-logo">
        <Image
          src={"/logo/logo-tareas.png"}
          alt="logo"
          width={1000}
          height={1000}
          priority
          className="w-full h-full"
        />
      </div>
      <ModalRegister visible={open} closeModal={closeModal} />
    </div>
  );
}

