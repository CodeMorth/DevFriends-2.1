'use client'
import { deleteWorkSpaceS, getWorkSpace, updateWorkSpace } from '@/services'
import { generateTokenInvitations } from '@/services/generateTokenInvitation.service'
import { updateTable } from '@/services/table.service'
import { InputToFormData } from '@/utilities'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiSave } from 'react-icons/fi'
import { IoIosAlert, IoMdTrash } from 'react-icons/io'
import { TbWorld } from 'react-icons/tb'
import { toast } from 'sonner'

interface ConfigurationWorkSpacesProps {
  idWork: string
  getAllWorkSpaces?: any
  idTable?: string
}

export const ConfigurationWorkSpaces = ({
  idWork,
  getAllWorkSpaces,
  idTable = ""
}: ConfigurationWorkSpacesProps) => {
  const [workSpaceName, setWorkSpaceName] = useState<string>('')
  const [inputValue, setinputValue] = useState('')
  const [tokenIn, setTokenIn] = useState<string>(
    'Invita a tus amigos a unirse a tu espacio de trabajo compartiéndoles tu código de invitación'
  )

  const path = usePathname()

  const isTable = path.slice(10).startsWith("/")

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: any = InputToFormData(event)



    try {
      if (isTable) {
        await updateTable({ title_table: data.title_table, id_table: idTable })
      } else {
        await updateWorkSpace(idWork, data)

        const form = document.getElementById('myForm') as HTMLFormElement

        form?.reset()
      }
    } catch (error) {
    } finally {
      if (isTable) {
      } else {
        getAllWorkSpaces()
        getWorkSpaceName()
      }
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

  const generadorInvitation = async () => {
    await generateTokenInvitations({ id_work_space: idWork, id_table: idTable }).then((res: any) =>
      setTokenIn(res.data)
    ).catch

    // Elimina el token después de 1 minuto
    setTimeout(() => {
      setTokenIn(
        'Invita a tus amigos a unirse a tu espacio de trabajo compartiéndoles tu código de invitación'
      )
    }, 1500000000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenIn).then(() => {
      toast.success('Codigo de Invitacion copiado ')
    })
  }

  const tokenActivate = tokenIn.length > 100

  return (
    <div className="flex justify-center w-full">
      <form
        onSubmit={handleSave}
        id="myForm"
        className="flex flex-col justify-center laptop:justify-start gap-6 w-full max-w-7xl laptop:gap-10"
      >
        <header className="flex flex-col gap-3 laptop:gap-5 ">
          <h1 className="text-white text-3xl font-bold laptop:text-6xl">
            {isTable
              ? 'Configuración de la Tabla'
              : 'Configuración del Espacio'}
          </h1>
          <h3 className="text-primaryPink text-xl font-semibold laptop:text-3xl">
            {isTable
              ? 'Personaliza tu tabla'
              : 'Personaliza tu espacio de trabajo'}
          </h3>
        </header>
        <div className="flex flex-col gap-6 bg-[#2A2A4A] rounded-lg p-6 laptop:gap-10 laptop:p-10">
          <div className="flex gap-3 justify-start items-center">
            <TbWorld className="text-3xl text-primaryPink laptop:text-5xl" />
            <div>
              <h3 className="text-2xl font-bold laptop:text-3xl">
                {workSpaceName}
              </h3>
              <h4 className="text-primaryLead text-lg mt-1 laptop:mt-3 laptop:text-xl">
                {isTable
                  ? 'Nombre de la tabla'
                  : 'El nombre de tu espacio de trabajo'}
              </h4>
            </div>
          </div>
          <input
            className="bg-[#1A1B2E] text-xl w-auto p-3 rounded-md laptop:text-2xl laptop:p-4"
            type="text"
            placeholder="Espacio De Pruebas"
            name={isTable ? 'title_table' : 'name_work_space'}
            id="name_work_space"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center bg-[#2A2A4A] w-full h-auto rounded-lg p-6 shadow-md">
          <h3
            onClick={tokenActivate ? handleCopy : undefined}
            className={`text-white text-xl font-bold laptop:text-2xl space tracking-wider ${
              tokenActivate ? 'cursor-pointer ' : ''
            }`}
          >
            {tokenActivate
              ? `${tokenIn.slice(0, 20)}.......${tokenIn.slice(-20)}`
              : tokenIn}
          </h3>
          <button
            onClick={generadorInvitation}
            className="btn_login_box_ingreso p-2 px-4 text-white rounded-lg text-xl font-bold laptop:text-2xl text-nowrap"
          >
            Generar Código
          </button>
        </div>

        <div className="bg-[#3A2941] flex flex-col tablet:flex-row tablet:justify-between items-center gap-5 p-6 py-8 rounded-lg tablet:gap-10">
          <div className="w-full flex justify-between items-center gap-4 tablet:w-fit">
            <IoIosAlert className="text-red-500 text-2xl laptop:text-5xl" />
            <div className="mr-auto ml-2 w-fit">
              <h3 className="text-xl font-bold laptop:text-3xl">
                Zona de Peligro
              </h3>
              <h4 className="text-primaryLead text-lg mt-1 laptop:mt-2 laptop:text-xl">
                {isTable
                  ? 'Acciones irreversibles para tu tabla'
                  : 'Acciones irreversibles para tu espacio de trabajo'}
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
              {isTable ? 'Eliminar Tabla' : 'Eliminar Espacio'}
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
