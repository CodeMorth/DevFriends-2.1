'use client'
import { ModalDashboard, TablesWorkSpaces, WorkSpaces } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import { useState } from 'react'
import { AccordionHorizontal } from '@/components/design/AccordionHorizontal'
import { SpaceWork } from '@/interface/page'

export const HomeDashboard = () => {
  const { open, closeModal, openModal } = useOpenModal()
  const [spaceWorks, setspaceWorks] = useState<SpaceWork[]>([])
  const [tableSelect, settableSelect] = useState<number>(0)
  const [idWork, setidWork] = useState<number | null>(null);



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
              setidWork={setidWork}
              />
              <button onClick={openModal} className="dashboard-left-content">
                + Crear un espacio de trabajo
              </button>
            </div>
          </AccordionHorizontal>
          <TablesWorkSpaces
            spaceWorks={spaceWorks}
            tableSelect={tableSelect}
            setspaceWorks={setspaceWorks}
            idWork={idWork}
          />
        </main>
        <ModalDashboard
          visible={open}
          closeModal={closeModal}
        ></ModalDashboard>
      </div>
    </>
  )
}
