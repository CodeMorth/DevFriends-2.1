'use client'
import { deleteWorkSpaceS, getWorkSpace, updateWorkSpace } from '@/services'
import { InputToFormData } from '@/utilities'
import { useEffect, useState } from 'react'
import { FiSave } from 'react-icons/fi'
import { IoIosAlert, IoMdTrash } from 'react-icons/io'
import { TbWorld } from 'react-icons/tb'

interface ConfigurationWorkSpacesProps {
  idWork: string
  getAllWorkSpaces: any
}

export const ConfigurationWorkSpaces = ({
  idWork,
  getAllWorkSpaces
}: ConfigurationWorkSpacesProps) => {
  const [workSpaceName, setWorkSpaceName] = useState<string>('')
  const [inputValue, setinputValue] = useState('')

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: any = InputToFormData(event)

    try {
      await updateWorkSpace(idWork, data)

      const form = document.getElementById('myForm') as HTMLFormElement

      form?.reset()
    } catch (error) {
    } finally {
      getAllWorkSpaces()
      getWorkSpaceName()
    }
  }

  const getWorkSpaceName = async () => {
    const response = await getWorkSpace(idWork)

    setWorkSpaceName(response?.data?.name_work_space)
    setinputValue(response?.data?.name_work_space)
  }

  useEffect(() => {
    getWorkSpaceName()
  }, [idWork])

  const deleteWorkSpace = async () => {
    try {
      await deleteWorkSpaceS(idWork)
    } catch (error) {
    } finally {
      getAllWorkSpaces()
    }
  }

  return (
    <div className="flex justify-center w-full">
      <form
        onSubmit={handleSave}
        id="myForm"
        className="flex flex-col justify-center laptop:justify-start gap-6 w-full max-w-7xl laptop:gap-10"
      >
        <header className="flex flex-col gap-3 laptop:gap-5 ">
          <h1 className="text-white text-3xl font-bold laptop:text-6xl">
            Configuración del Espacio
          </h1>
          <h3 className="text-primaryPink text-xl font-semibold laptop:text-3xl">
            Personaliza tu espacio de trabajo
          </h3>
        </header>
        {/* <div className="w-fit flex flex-wrap gap-3 text-xl font-semibold">
          <div className="p-3 bg-[#2A2A4A] rounded-lg px-5 laptop:text-2xl">
            General
          </div>
          <div className="p-3 bg-[#2A2A4A] rounded-lg px-5 laptop:text-2xl">
            Notificaciones
          </div>
          <div className="p-3 bg-[#2A2A4A] rounded-lg px-5 laptop:text-2xl">
            Seguridad
          </div>
          <div className="p-3 bg-[#2A2A4A] rounded-lg px-5 laptop:text-2xl">
            Apariencia
          </div>
        </div> */}
        <div className="flex flex-col gap-6 bg-[#2A2A4A] rounded-lg p-6 laptop:gap-10 laptop:p-10">
          <div className="flex gap-3 justify-start items-center">
            <TbWorld className="text-3xl text-primaryPink laptop:text-5xl" />
            <div>
              <h3 className="text-2xl font-bold laptop:text-3xl">
                {workSpaceName}
              </h3>
              <h4 className="text-primaryLead text-lg mt-1 laptop:mt-3 laptop:text-xl">
                El nombre de tu espacio de trabajo
              </h4>
            </div>
          </div>
          <input
            className="bg-[#1A1B2E] text-xl w-auto p-3 rounded-md laptop:text-2xl laptop:p-4"
            type="text"
            placeholder="Espacio De Pruebas"
            name="name_work_space"
            id="name_work_space"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          />
          {/* <div className="flex gap-3 justify-start items-center">
            <TbWorld className="text-3xl text-primaryPink laptop:text-5xl" />
            <div>
              <h3 className="text-2xl font-bold laptop:text-3xl">
                Visibilidad
              </h3>
              <h4 className="text-primaryLead text-lg mt-1 laptop:mt-3 laptop:text-xl">
                Controla quién puede ver tu espacio
              </h4>
            </div>
          </div> */}
        </div>
        <div className="bg-[#3A2941] flex flex-col tablet:flex-row tablet:justify-between items-center gap-5 p-6 py-8 rounded-lg tablet:gap-10">
          <div className="w-full flex justify-between items-center gap-4 tablet:w-fit">
            <IoIosAlert className="text-red-500 text-2xl laptop:text-5xl" />
            <div className="mr-auto ml-2 w-fit">
              <h3 className="text-xl font-bold laptop:text-3xl">
                Zona de Peligro
              </h3>
              <h4 className="text-primaryLead text-lg mt-1 laptop:mt-2 laptop:text-xl">
                Acciones irreversibles para tu espacio de trabajo
              </h4>
            </div>
          </div>
          <button
            type="button"
            className="flex gap-2 justify-center items-center bg-red-500 rounded-md p-2 px-3"
            onClick={deleteWorkSpace}
          >
            <IoMdTrash className="text-2xl laptop:text-4xl" />
            <span className="text-xl font-bold laptop:text-2xl">
              Eliminar Espacio
            </span>
          </button>
        </div>
        <div className="w-full flex justify-end gap-4">
          <button
            type="button"
            className="bg-white p-2 px-3 text-primaryBlue rounded-lg text-xl font-bold laptop:text-2xl "
            onClick={() => setinputValue(workSpaceName)}
          >
            Cancelar
          </button>
          <button className="flex gap-2 justify-center items-center bg-primaryPink rounded-lg p-2 px-3">
            <FiSave className="text-2xl laptop:text-4xl " />
            <span className="text-xl font-bold laptop:text-2xl ">
              Guardar Cambios
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
