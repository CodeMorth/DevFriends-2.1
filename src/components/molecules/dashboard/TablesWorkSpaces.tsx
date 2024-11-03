/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React, { useEffect } from 'react'
import { ModalNewBoard } from '@/components/molecules'
import { ButtonsTwo } from '@/components/atoms'
import Link from 'next/link'
import useTableXWorkSpace from '@/hook/table/useTableXWorkSpace'
import InvitadosModal from '../modals/tablero-modal/InvitadosModal'
import { useMultipleModal } from '@/hook/useMultipeModal'

export const TablesWorkSpaces = ({ idWork }: any) => {
  const { isModalOpen, openModals, closeModals } = useMultipleModal()
  const { tableWorkSpaces, getTableWorkSpaces } = useTableXWorkSpace()

  useEffect(() => {
    if (idWork) {
      getTableWorkSpaces(idWork)
    }
  }, [idWork])

  return (
    <div className="TablesWorkSpaces">
      <div className="tables-title">Tus espacios de trabajo</div>
      {tableWorkSpaces && (
        <>
          <div className="tables-content">
            <div className="container-tables">
              <button
                onClick={() => openModals('tablero')}
                className="content-main"
              >
                Crear tablero nuevo
              </button>
              {tableWorkSpaces.map((data: any) => {
                return (
                  <Link
                    href={`/dashboard/${data?.title_table}?id=${data?.id_table}`}
                    key={data?.id_table}
                    className="tables-map"
                    style={{
                      backgroundImage: `url(${
                        data?.avatar_table ||
                        'https://img.freepik.com/vector-gratis/fondo-luces-neon-realista_52683-59889.jpg'
                      })`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <h2>{data?.title_table}</h2>
                  </Link>
                )
              })}
            </div>
          </div>
          <ModalNewBoard
            getTableWorkSpaces={getTableWorkSpaces}
            idWork={idWork}
            visible={isModalOpen('tablero')}
            closeModal={() => closeModals('tablero')}
          />
          <InvitadosModal
            visible={isModalOpen('invitados')}
            closeModal={() => closeModals('invitados')}
          />
        </>
      )}
    </div>
  )
}
