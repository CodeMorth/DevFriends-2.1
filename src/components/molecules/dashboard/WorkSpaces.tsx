/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { useEffect } from 'react'
import type { WorkSpace, WorkSpaceUser } from '@/interface/page'
import { userLocalStoras } from '@/hook'
import { BiCog } from 'react-icons/bi'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'

interface WorkSpacesProps {
  allWorkSpaces: () => void
  setIdWork: (id: string) => void
  Work_Space_user: WorkSpaceUser[] | null
  setdataSelected: (view: string) => void
}

const { agregarLocal } = userLocalStoras()

export const WorkSpaces = ({
  setIdWork,
  allWorkSpaces,
  Work_Space_user,
  setdataSelected
}: WorkSpacesProps) => {
  const enviarId = (id: string | number) => {
    const idStr = String(id)
    setIdWork(idStr)
    agregarLocal('work_space', idStr)
  }

  useEffect(() => {
    allWorkSpaces()
  }, [])

  const list =
    Work_Space_user?.[0]?.work_spaces ?? Work_Space_user?.[0]?.workSpaces ?? []

  return (
    <div className="WorkSpaces">
      <Accordion className="accordion-container" activeIndex={0}>
        {list.map((data: WorkSpace) => (
          <AccordionTab
            key={data?.id_work_space}
            className="dev-friends"
            header={data?.name_work_space}
          >
            <div className="container">
              <button
                type="button"
                onClick={() => {
                  enviarId(data?.id_work_space)
                  setdataSelected('tablesWorks')
                }}
                className="boards-container"
              >
                <div className="icon_container">
                  <MdOutlineDashboardCustomize className="w-full h-full" />
                </div>
                <h1 className="boards-text">Tableros</h1>
              </button>
              <button
                type="button"
                onClick={() => setdataSelected('membersWorks')}
                className="members-container"
              >
                <div className="icon_container">
                  <FaUsers className="w-full h-full" />
                </div>
                <div className="members-text">Miembros</div>
              </button>
              <button
                type="button"
                onClick={() => setdataSelected('configurationWorks')}
                className="members-container"
              >
                <div className="icon_container">
                  <BiCog className="w-full h-full" />
                </div>
                <div className="members-text">Configuración</div>
              </button>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  )
}
