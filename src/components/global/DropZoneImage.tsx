'use client'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropZoneImageProps {
  setimageData: Dispatch<SetStateAction<File | undefined>>
  imageUrl: string // La imagen que recibimos del servidor
}

export const DropZoneImage = ({ setimageData, imageUrl }: DropZoneImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(imageUrl) // Inicializa con la imagen que venga del servidor

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      setimageData(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  })

  // Actualiza la imagen si se cambia externamente (cuando se recibe nueva data de la API)
  useEffect(() => {
    if (imageUrl) {
      setImageSrc(imageUrl)
    }
  }, [imageUrl])

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <Image
        src={imageSrc} // Si no hay imagen, mostramos un avatar por defecto
        alt="logo"
        width={1000}
        height={1000}
        className="w-full h-full"
      />
    </div>
  )
}
