'use client'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropZoneImageProps {
  setimageData: Dispatch<SetStateAction<File | undefined >>
}

export const DropZoneImage = ({ setimageData }: DropZoneImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
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

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <Image
        src={imageSrc || '/avatar.png'}
        alt="logo"
        width={1000}
        height={1000}
        className="w-full h-full"
      />
    </div>
  )
}
