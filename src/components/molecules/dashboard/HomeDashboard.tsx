'use client'
import {
  ModalDashboard,
  TablesWorkSpaces,
  WorkSpaces
} from '@/components/molecules'
import { useState } from 'react'
import { AccordionHorizontal } from '@/components/design/AccordionHorizontal'
import useWorkSpaceAll from '@/hook/work_Space/useWorkSpaceAll'
import { ModalCodigoInvitation } from '../modals/dashboard/ModalCodigoInvitation'
import { useMultipleModal } from '@/hook/useMultipeModal'

export const HomeDashboard = () => {
  const { isModalOpen, openModals, closeModals } = useMultipleModal();
  const [idWork, setidWork] = useState<string>("");
  const { WorkSpaceUser, getAllWorkSpaces } = useWorkSpaceAll();

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
                setidWork={setidWork}
              />
              <button onClick={() => openModals('spaceWork')} className="dashboard-left-content">
                + Crear un espacio de trabajo
              </button>
              <p
                onClick={() => openModals('codigo')}
                className="mt-[1rem] bg-[#F183B6] text-center font-bold text-[#2B3146] rounded-md duration-300 ease-in-out hover:bg-primaryPink hover:cursor-pointer"
              >
                Codigo de Invitacion
              </p>
            </div>
          </AccordionHorizontal>
          <TablesWorkSpaces idWork={idWork} />
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
