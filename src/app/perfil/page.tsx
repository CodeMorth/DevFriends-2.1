'use client'
import { Buttonss, Inputs, Labels } from '@/components/atoms'
import { DropZoneImage } from '@/components/global'
import { useFormss, userLocalStoras } from '@/hook'
import { GetDataUser, userTypeLRU } from '@/interface/components'
import { getByToken, putUpdate } from '@/services/userServices.service'
import {
  InputToFormData,
  ObjectToFormData,
  filterNonEmptyValues
} from '@/utilities'
import React, { useState } from 'react'

export default function PagePerfil() {
  const [imageData, setimageData] = useState<File | undefined>(undefined)
  const [userData, setuserData] = useState<GetDataUser>()
  const [controllerGetData, setcontrollerGetData] = useState<boolean>(true)

  const { capTure, datos, setdatos } = useFormss()

  const { obtenerLocal } = userLocalStoras()

  ;(async () => {
    if (controllerGetData) {
      const token = await obtenerLocal('token')

      getByToken(token)
        .then((response) => {
          setuserData(response.data), setdatos(response.data)
        })
        .catch((error) => error)

      setcontrollerGetData(false)
    }
  })()

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const dataRegister: FormData = ObjectToFormData(filterNonEmptyValues(InputToFormData(event)))

    if (imageData) dataRegister.append('avatar', imageData)

    putUpdate(userData?.id_user ?? '', dataRegister).catch((error) => error)
  }


  return (
    <div className="perfil-box main-page">
      <form onSubmit={handleRegister} className="data-perfil">
        <div className="imagen-avatar">
          <DropZoneImage setimageData={setimageData} />
        </div>
        <div className="box-inputs">
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="username">Nombre de usuario</Labels>
            <Inputs
              onChange={capTure}
              value={datos.username}
              name="username"
              id="nombre"
              placeholder="Nombre"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="first_name">Nombre</Labels>
            <Inputs
              onChange={capTure}
              value={datos.first_name}
              name="first_name"
              id="first_name"
              placeholder="Kevin"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="last_name">Apellido</Labels>
            <Inputs
              onChange={capTure}
              value={datos.last_name}
              name="last_name"
              id="last_name"
              placeholder="Ramirez"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="email">Email</Labels>
            <Inputs
              onChange={capTure}
              value={datos.email}
              name="email"
              id="email"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="password">Password</Labels>
            <Inputs name="password" id="password" placeholder="******" />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Buttonss>Actualizar</Buttonss>
          </div>
        </div>
      </form>
    </div>
  )
}
