'use client'
import Image from 'next/image'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { useEffect, useState } from 'react'
import { allWorkSpacesUser } from '@/services'


interface WorkSpace {
  id_work_space: number
  name_work_space: string
}

interface WorkSpaceUser {
  id_user: number
  work_spaces: WorkSpace[]
}

export const WorkSpaces = ({
  setidWork
}: {
  setidWork: (id: number) => void
}) => {
  const [Work_Space_user, setWork_Space_user] = useState<
    WorkSpaceUser[] | null
  >(null)

  const enviarId = (id: any) => {
    setidWork(id)
  }

  useEffect(() => {
    //trae los work_space_user
    allWorkSpacesUser()
      .then(({ data }) => setWork_Space_user(data.workAllUser))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="WorkSpaces">
      <Accordion className="accordion-container" activeIndex={0}>
        {Work_Space_user?.[0]?.work_spaces?.map((data: WorkSpace) => (
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
                  onClick={() => enviarId(data?.id_work_space)}
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
