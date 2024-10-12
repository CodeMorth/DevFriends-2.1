'use client'
import { Buttonss, Inputs, Labels } from '@/components/atoms'
import { DropZoneImage } from '@/components/global'
import { useFormss } from '@/hook'
import { getByToken, putUpdate } from '@/services/userServices.service'
import React, { useEffect, useState } from 'react'

export default function PagePerfil() {
  const { capTure, datos, setdatos } = useFormss()
  const [imageData, setimageData] = useState<File | undefined>(undefined)

  useEffect(() => {
    getByToken()
      .then(({ data }) => {
        setdatos(data) // Guardas todos los datos del usuario, incluyendo el avatar
      })
      .catch((error) => console.error(error))
  }, [])

  const updatePerfil = async () => {
    const formData = new FormData();
    
    // Agregar los datos de texto
    formData.append('username', datos?.username);
    formData.append('first_name', datos?.first_name);
    formData.append('last_name', datos?.last_name);
    formData.append('email', datos?.email);
  
    // Agregar la imagen si existe
    if (imageData) {
      formData.append('avatar', imageData);
    }
  
    try {
      const response = await putUpdate(formData);
    } catch (error) {
      console.log("Error al actualizar:", error);
    }
  }
  


  return (
    <div className="perfil-box main-page">
      <div className="data-perfil">
        <div className="imagen-avatar">
          {/* Pasamos el avatar actual como prop */}
          <DropZoneImage setimageData={setimageData} imageUrl={datos?.avatar} />
        </div>
        <div className="box-inputs">
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="username">Nombre de usuario</Labels>
            <Inputs
              onChange={capTure}
              value={datos?.username}
              name="username"
              id="nombre"
              placeholder="Nombre"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="first_name">Nombre</Labels>
            <Inputs
              onChange={capTure}
              value={datos?.first_name}
              name="first_name"
              id="first_name"
              placeholder="Kevin"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="last_name">Apellido</Labels>
            <Inputs
              onChange={capTure}
              value={datos?.last_name}
              name="last_name"
              id="last_name"
              placeholder="Ramirez"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Labels htmlFor="email">Email</Labels>
            <Inputs
              onChange={capTure}
              value={datos?.email}
              name="email"
              id="email"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <Buttonss onClick={updatePerfil}>Actualizar</Buttonss>
          </div>
        </div>
      </div>
    </div>
  )
}
