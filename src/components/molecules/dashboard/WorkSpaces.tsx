'use client'
import Image from 'next/image'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { useEffect } from 'react'
import { WorkSpace, WorkSpaceUser } from '@/interface/page'
import { userLocalStoras } from '@/hook'

interface WorkSpacesProps {
  allWorkSpaces: () => void
  setidWork: (id: string) => void
  Work_Space_user: WorkSpaceUser[] | null
}

const { agregarLocal } = userLocalStoras()

export const WorkSpaces = ({ setidWork, allWorkSpaces, Work_Space_user }: WorkSpacesProps) => {
  const enviarId = (id: string) => {
    setidWork(id)
    agregarLocal('work_space', id)
  }

  useEffect(() => {
    //trae los work_space_user
    allWorkSpaces()
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
