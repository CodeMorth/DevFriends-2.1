import Image from 'next/image'
import React from 'react'
import { IoMailOutline } from 'react-icons/io5'

export const UserDataCard = ({ urlImage = "", name = "", role = "", status = "", email = "" }: any) => {
  return (
    <div className="bg-[#2A2A4A] flex flex-col w-auto p-6 gap-3 tablet:gap-6 rounded-xl">
      <div className="flex gap-4 items-center">
        <div className="flex justify-center items-center w-12 tablet:w-20 h-12 tablet:h-20 rounded-full border-primaryPink border overflow-hidden">
          <Image src={urlImage} alt="avatar" width={120} height={120} />
        </div>
        <div className='flex flex-col items-start gap-1 tablet:gap-2'>
          <div className="text-white text-2xl tablet:text-3xl font-bold">{name}</div>
          <div className="text-primaryPink text-lg tablet:text-xl">{role === "admin" ? "Administrador" : "Miembro"}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-lg tablet:text-xl font-bold">
        <div>
          <IoMailOutline className="text-primaryBlue" />
        </div>
        <div className="text-primaryBlue">{email}</div>
      </div>
      <div className="flex w-full justify-between items-center text-lg tablet:text-xl font-bold">
        <div className="w-fit bg-primaryBlue text-white rounded-2xl p-1 tablet:px-5 px-4 capitalize">
          {status === "connected" ? "Activo" : "Inactivo"}
        </div>
        <div className="text-primaryPink">Ver perfil</div>
      </div>
    </div>
  )
}
