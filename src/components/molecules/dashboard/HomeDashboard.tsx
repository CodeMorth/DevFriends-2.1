'use client'
import { ModalDashboard, TablesWorkSpaces, WorkSpaces } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import { useState } from 'react'
import { AccordionHorizontal } from '@/components/design/AccordionHorizontal'
import useWorkSpaceAll from '@/hook/work_Space/useWorkSpaceAll'
import { ModalCodigoInvitation } from '../modals/dashboard/ModalCodigoInvitation'

export const HomeDashboard = () => {
  const { open, closeModal, openModal } = useOpenModal()
  const [OpenModalCodigo, setOpenModalCodigo] = useState(false)

  const openModalToken =  () => {
    setOpenModalCodigo(true)
  }
  const closeModalCodigo = () => {
    setOpenModalCodigo(false)
  }
  const [idWork, setidWork] = useState<number | null>(null);

  const { WorkSpaceUser, getAllWorkSpaces } = useWorkSpaceAll()

  console.log("idWork",idWork)

  console.log("WorkSpaceUser",WorkSpaceUser)

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
              <button onClick={openModal} className="dashboard-left-content">
                + Crear un espacio de trabajo
              </button>
              <p onClick={openModalToken} className='mt-[1rem] bg-[#F183B6] text-center text-[#2B3146] rounded-md duration-300 ease-in-out hover:bg-[#E56AA3] hover:cursor-pointer'>Codigo de Invitacion</p>
            </div>
          </AccordionHorizontal>
          <TablesWorkSpaces
            idWork={idWork}
          />
        </main>
        <ModalDashboard
        allWorkSpaces={getAllWorkSpaces}
          visible={open}
          closeModal={closeModal}
        ></ModalDashboard>
        <ModalCodigoInvitation  visible={OpenModalCodigo}
          closeModal={closeModalCodigo}
          allWorkSpaces={getAllWorkSpaces}/>
      </div>
    </>
  )
}
