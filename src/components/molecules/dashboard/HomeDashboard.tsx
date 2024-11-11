'use client'
import {
  ModalDashboard,
  TablesWorkSpaces,
  WorkSpaces,
  MembersWorkSpaces,
  ConfigurationWorkSpaces
} from '@/components/molecules'
import { useState } from 'react'
import { AccordionHorizontal } from '@/components/design/AccordionHorizontal'
import useWorkSpaceAll from '@/hook/work_Space/useWorkSpaceAll'
import { ModalCodigoInvitation } from '../modals/dashboard/ModalCodigoInvitation'
import { useMultipleModal } from '@/hook/useMultipeModal'

export const HomeDashboard = () => {
  const { isModalOpen, openModals, closeModals } = useMultipleModal()
  const [idWork, setIdWork] = useState<string>('')
  const { WorkSpaceUser, getAllWorkSpaces } = useWorkSpaceAll()
  const [dataSelected, setdataSelected] = useState("")

  return (
    <>
      <div className="dashboard main-page">
        <main className="dashboard-container">
          <AccordionHorizontal
            title={'Espacio de trabajo'}
            titleColor="#f969aa"
          >
            <div className="dashboard-left">
              <WorkSpaces
                allWorkSpaces={getAllWorkSpaces}
                Work_Space_user={WorkSpaceUser}
                setIdWork={setIdWork}
                setdataSelected={setdataSelected}
              />
              <button
                onClick={() => openModals('spaceWork')}
                className="dashboard-left-content"
              >
                + Crear un espacio de trabajo
              </button>
              <p
                onClick={() => openModals('codigo')}
                className="mt-[1.5rem] bg-[#F183B6] p-2 text-center font-bold text-[#2B3146] rounded-md duration-300 ease-in-out hover:bg-primaryPink hover:cursor-pointer"
              >
                Código de Invitación
              </p>
            </div>
          </AccordionHorizontal>
          {dataSelected === "tablesWorks" && (
            <TablesWorkSpaces idWork={idWork} />
          )}
          {dataSelected === "membersWorks" && (
            <MembersWorkSpaces idWork={idWork}/>
          )}
          {dataSelected === "configurationWorks" && (
            <ConfigurationWorkSpaces idWork={idWork} getAllWorkSpaces={getAllWorkSpaces}/>
          )}
        </main>
        <ModalDashboard
          allWorkSpaces={getAllWorkSpaces}
          visible={isModalOpen('spaceWork')}
          closeModal={() => closeModals('spaceWork')}
        ></ModalDashboard>
        <ModalCodigoInvitation
          visible={isModalOpen('codigo')}
          closeModal={() => closeModals('codigo')}
          allWorkSpaces={getAllWorkSpaces}
        />
      </div>
    </>
  )
}
