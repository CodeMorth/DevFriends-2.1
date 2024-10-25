import { Control, Controller } from 'react-hook-form'
import { InputHTMLAttributes, useRef, useState } from 'react'
import Image from 'next/image'

interface InputFileFormProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<any>
  errors: any
  labelText?: string | null
  type?: string
}

export const InputFileForm = ({
  name,
  errors,
  control,
  labelText = null,
  ...rest
}: InputFileFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null) // Para mostrar la previsualización de la imagen

  const clickInput = () => {
    if (inputRef.current) inputRef.current.click()
  }

  return (
    <div className="w-full h-auto">
      {labelText && (
        <label
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
          htmlFor={name}
        >
          {labelText}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div
              onClick={clickInput}
              className="page-perfil text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary cursor-pointer  w-52 h-52 overflow-hidden rounded-full flex justify-center items-center"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="imagen"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover rounded-[0.5rem]"
                />
              ) : field.value ? (
                <Image
                  src={field.value}
                  alt="imagen"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover rounded-[0.5rem] "
                />
              ) : null}
            </div>
            <input
              ref={inputRef}
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  field.onChange(file) // Actualiza con el archivo en lugar de la URL
                  setPreview(URL.createObjectURL(file)) // Previsualización
                }
              }}
              {...rest}
            />
            {errors?.[name] && <p>{errors[name]?.message}</p>}
          </>
        )}
      />
    </div>
  )
}
