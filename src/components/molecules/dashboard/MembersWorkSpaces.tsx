import { useEffect, useState } from 'react'
import { MembersDataCard } from './MembersDataCard'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { getWorkSpaceMembers } from '@/services'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { MdBroadcastOnPersonal } from 'react-icons/md'
import { RiAdminFill } from 'react-icons/ri'
import { UserDataCard } from './UserDataCard'

interface MembersWorkSpacesProps {
  idWork: string
}

export const MembersWorkSpaces = ({ idWork }: MembersWorkSpacesProps) => {
  const [usersData, setUsersData] = useState<any>(null)
  const [inputData, setInputData] = useState('')
  const [displayedData, setDisplayedData] = useState<any>(null)

  const fetchData = async () => {
    try {
      const { data } = await getWorkSpaceMembers(idWork)
      setUsersData(data.response)
      setDisplayedData(filterData(data.response.generalUsers, inputData))
    } catch (error) {
      console.error(error)
    }
  }

  const filterData = (data: any[], filter: string) =>
    data?.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(filter.toLowerCase())
      )
    )

  useEffect(() => {
    fetchData()
  }, [idWork])

  useEffect(() => {
    if (usersData) {
      setDisplayedData(filterData(usersData.generalUsers, inputData))
    }
  }, [inputData, usersData])

  const adminIds = usersData?.adminUsers?.map((user: any) => user.id_user)
  const adminUsers = usersData?.generalUsers?.filter((user: any) =>
    adminIds.includes(user.id_user)
  )

  const activeUsers = usersData?.generalUsers?.filter(
    (user: any) => user?.status === 'connected'
  )

  return (
    <div className="flex flex-col gap-6 w-full">
      <header>
        <h1 className="text-4xl tablet:text-6xl font-extrabold">
          Miembros del Equipo
        </h1>
        <h3 className="text-primaryPink text-lg tablet:text-2xl mt-4">
          Gestiona los miembros de tu espacio de trabajo
        </h3>
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(19rem,100%),1fr))] gap-6 w-full">
        <MembersDataCard
          onClick={fetchData}
          title="Total miembros"
          value={usersData?.generalUsers?.length ?? 0}
          icon={<HiMiniUserGroup className="w-full h-full text-primaryBlue" />}
        />
        <MembersDataCard
          onClick={() => setDisplayedData(activeUsers)}
          title="Miembros Activos"
          value={activeUsers?.length ?? 0}
          icon={
            <MdBroadcastOnPersonal className="w-full h-full text-primaryPink" />
          }
        />
        <MembersDataCard
          onClick={() => setDisplayedData(adminUsers)}
          title="Total moderadores"
          value={usersData?.adminUsers?.length ?? 0}
          icon={<RiAdminFill className="w-full h-full text-purple-600" />}
        />
      </div>

      <div>
        <IconField className="w-full" iconPosition="left">
          <InputIcon className="pi pi-search text-white" />
          <InputText
            value={inputData}
            className="bg-[#2A2A4A] text-start w-full p-2 tablet:p-3 tablet:pl-9 tablet:text-xl border border-primaryBlue rounded-md tablet:w-1/2 laptop:w-auto"
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Buscar miembro"
          />
        </IconField>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(24rem,100%),1fr))] gap-10">
        {displayedData?.map((user: any) => (
          <UserDataCard
            key={user?.id_user}
            urlImage={
              user?.avatar ||
              'https://img.freepik.com/vector-gratis/fondo-luces-neon-realista_52683-59889.jpg'
            }
            name={user?.username}
            role={user?.rols?.[0]?.type_rol}
            status={user?.status}
            email={user?.email}
          />
        ))}
      </div>
    </div>
  )
}
