/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from 'next/image'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { useEffect } from 'react'
import { WorkSpace, WorkSpaceUser } from '@/interface/page'
import { userLocalStoras } from '@/hook'
import { BiCog } from 'react-icons/bi'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'

interface WorkSpacesProps {
  allWorkSpaces: () => void
  setIdWork: (id: string) => void
  Work_Space_user: WorkSpaceUser[] | null
  setdataSelected: any
}

const { agregarLocal } = userLocalStoras()

export const WorkSpaces = ({
  setIdWork,
  allWorkSpaces,
  Work_Space_user,
  setdataSelected
}: WorkSpacesProps) => {
  const enviarId = (id: string) => {
    setIdWork(id)
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
              <button
                onClick={() => {
                  enviarId(data?.id_work_space), setdataSelected('tablesWorks')
                }}
                className="boards-container"
              >
                <div className="icon_container">
                  <MdOutlineDashboardCustomize className="w-full h-full" />
                </div>
                <h1 className="boards-text">Tableros</h1>
              </button>
              <button
                onClick={() => setdataSelected('membersWorks')}
                className="members-container"
              >
                <div className="icon_container">
                  <FaUsers className="w-full h-full" />
                </div>
                <div className="members-text">Miembros</div>
              </button>
              <button
                onClick={() => setdataSelected('configurationWorks')}
                className="members-container"
              >
                <div className="icon_container">
                  <BiCog className="w-full h-full" />
                </div>
                <button className="members-text">Configuración</button>
              </button>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  )
}
