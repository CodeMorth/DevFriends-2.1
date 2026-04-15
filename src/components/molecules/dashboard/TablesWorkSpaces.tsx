/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { ModalNewBoard } from '@/components/molecules'
import { Link } from 'react-router-dom'
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
                    to={`/dashboard/${encodeURIComponent(data?.titleTable ?? '')}?id=${data?.idTable}`}
                    key={data?.idTable}
                    className="tables-map"
                    style={{
                      backgroundImage: `url(${
                        data?.avatarTable ||
                        'https://img.freepik.com/vector-gratis/fondo-luces-neon-realista_52683-59889.jpg'
                      })`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <h2>{data?.titleTable}</h2>
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
