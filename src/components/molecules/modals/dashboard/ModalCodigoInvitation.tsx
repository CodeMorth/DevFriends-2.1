import { Inputs, Labels } from '@/components/atoms'
import { Modal } from '@/components/global'
import { useFormss } from '@/hook'
import { addGuestToTable, addGuestToWork } from '@/services/generateTokenInvitation.service'
import { toast } from 'sonner'

interface ModalCodigoInvitation {
  visible: boolean
  closeModal: () => void
  allWorkSpaces?: any
}

export const ModalCodigoInvitation = ({
  visible,
  closeModal,
  allWorkSpaces
}: ModalCodigoInvitation) => {
  const { capTure, datos } = useFormss()

  const createAddGuestToWork = () => {
 addGuestToWork(datos)
      .then(({ data }) => {
        if (data.message === 'Ya te has unido a este espacio de trabajo') {
          toast.success(data.message)
          closeModal()
        }
        if (
          data.message === 'Usuario agregado exitosamente al espacio de trabajo'
        ) {
          toast.success(data.message)
          closeModal()
          allWorkSpaces()
        }
      })
      .catch((err) => console.log(err))
  }

  const createAddGuestToTable = async () => {

   try {
    
    await addGuestToTable(datos)

   } catch (error) {
    
   }

  }

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        className="token_modal main-page"
        bg="#2B3146"
      >
        <main className="w-full flex justify-center">
          <div className="w-full flex flex-col items-center gap-[3rem]">
            <h1 className="container-left-tittle">
              Unirme a un espacio de trabajo
            </h1>

            <Labels htmlFor="token_invitado">Codigo de Invitacion</Labels>
            <Inputs
              onChange={capTure}
              name="token_invitado"
              type="text"
              required
              id="token_invitado"
            ></Inputs>

            <div className="flex w-full justify-between flex-nowrap ">
              <div className=" container-left-button">
                <button
                  className="btn_login_box_ingreso"
                  onClick={createAddGuestToWork}
                >
                  Espacio de Trabajo
                </button>
              </div>
              <div className="container-left-button">
                <button
                  className="btn_login_box_ingreso"
                  onClick={createAddGuestToTable}
                >
                  Tabla
                </button>
              </div>
            </div>
          </div>
        </main>
      </Modal>
    </div>
  )
}
