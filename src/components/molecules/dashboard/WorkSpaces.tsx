'use client'
import Image from 'next/image'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { SpaceWork } from '@/interface/page'
import { userLocalStoras } from '@/hook'
import { useEffect, useState } from 'react'
import { getByID, getByToken, getWorkSpace } from '@/services'
import { UserByID, WorkSpace } from '@/interface/UserType'

interface WorkSpacesProps {
  settableSelect: (number: number) => void
}

export const WorkSpaces = ({ settableSelect }: WorkSpacesProps) => {
  const [controller, setcontroller] = useState<boolean>(true)
  const [userData, setuserData] = useState<UserByID>()

  const { obtenerLocal } = userLocalStoras()

  ;(async () => {
    if (controller) {
      const token = await obtenerLocal('token')

      getByToken(token)
        .then((response) => {
          getByID(response.data.id_user)
            .then((response) => setuserData(response.data.user))
            .catch((error) => error)
        })
        .catch((error) => error)

      setcontroller(false)
    }
  })()

  console.log('userData', userData)

  return (
    <div className="WorkSpaces">
      <Accordion className="accordion-container" activeIndex={0}>
        {userData?.work_spaces?.map((data: WorkSpace) => (
          <AccordionTab
            key={data?.id_work_space}
            className="dev-friends"
            header={data?.name_work_space}
          >
            <div className="container">
              <div className="boards-container">
                <div className="boards-image">
                  <Image
                    src={'/dashboard/tablero.png'}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full"
                  ></Image>
                </div>
                <h1
                  className="boards-text"
                  onClick={() => settableSelect(data.id_work_space)}
                >
                  Tableros
                </h1>
              </div>
              <div className="members-container">
                <div className="members-image">
                  <Image
                    src={'/dashboard/group_2990282.png'}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full"
                  ></Image>
                </div>
                <div className="members-text">Miembros +</div>
              </div>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  )
}
