import React, { useEffect, useState } from 'react'
import { MembersDataCard } from './MembersDataCard'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { UserDataCard } from './UserDataCard'
import { allUserTableService } from '@/services'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { MdBroadcastOnPersonal } from 'react-icons/md'
import { RiAdminFill } from 'react-icons/ri'

export const MembersWorkSpaces = () => {
  const [usersData, setUsersData] = useState<null | []>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await allUserTableService()
        setUsersData(response.data)
      } catch (error) {}
    })()
  }, [])

  console.log("usersData",usersData)

  const amountActive = usersData?.filter((user: any) => user?.status === 'connected').length
  const amountAdmin = usersData?.filter((user: any) => user?.rols?.[0]?.type_rol === 'admin').length

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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(19rem,100%),1fr))] gap-6 w-full ">
        <MembersDataCard
          tittle="Total miembros"
          value={usersData?.length}
          icon={<HiMiniUserGroup className="w-full h-full text-primaryBlue" />}
        />
        <MembersDataCard
          tittle="Miembros Activos"
          value={amountActive}
          icon={
            <MdBroadcastOnPersonal className="w-full h-full text-primaryPink" />
          }
        />
        <MembersDataCard
          tittle="Total moderadores"
          value={amountAdmin}
          icon={<RiAdminFill className="w-full h-full text-purple-600" />}
        />
      </div>
      <div>
        <IconField className="w-full" iconPosition="left">
          <InputIcon className="pi pi-search text-white " />
          <InputText
            // value={searchData}
            className=" bg-[#2A2A4A] text-start w-full p-2 tablet:p-3 tablet:pl-9 tablet:text-xl border border-primaryBlue rounded-md tablet:w-1/2 laptop:w-auto "
            // onChange={(e) => setsearchData(e.target.value)}
            placeholder="Buscar miembro"
          />
        </IconField>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(24rem,100%),1fr))]  gap-10">
        {usersData &&
          usersData?.map((user: any) => (
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
