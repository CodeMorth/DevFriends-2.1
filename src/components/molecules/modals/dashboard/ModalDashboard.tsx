import { Inputs, Labels, TextAreas } from '@/components/atoms'
import { Modal } from '@/components/global'
import { DevFriendLogo } from '@/components/global/DevFriendLogo'
import { postCreateWorkSpace } from '@/services'
import { InputToFormData } from '@/utilities'
import Image from 'next/image'

interface ModalDashboard {
  visible: boolean
  closeModal: () => void
  allWorkSpaces: () => void
}

export const ModalDashboard = ({
  visible,
  closeModal,
  allWorkSpaces
}: ModalDashboard) => {
  const formCreateWorkSpace = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const data = InputToFormData(event)

    postCreateWorkSpace(data)
      .then((res) => {
        if (res.data) {
          closeModal()
          allWorkSpaces()
        }
      })
      .catch((error) => error)
  }

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        className="modalDashboard main-page"
        // bg="#2B3146"
      >
        <main className="modalDashboard-container">
          <div className="container-right">
            <h2 className="DevFriend_Logo_Modal">
              <span className="opening_tag">{'<'}</span>Dev-Friend
              <span className="close_tag">{'/>'}</span>
            </h2>
          </div>
          <form onSubmit={formCreateWorkSpace} className="container-left">
            <h1 className="container-left-tittle">
              Vamos a crear un Espacio de trabajo
            </h1>
            <h2 className="container-left-description">
              Impulse su productividad facilitándoles a todos el acceso a los
              tableros en una única ubicación.
            </h2>
            <Labels id="name_work_space" htmlFor="name_work_space">
              Nombre del Espacio de trabajo
            </Labels>
            <Inputs
              name="name_work_space"
              type="text"
              required
              id="name_work_space"
            ></Inputs>
            <Labels
              id="description_work_space"
              htmlFor="description_work_space"
            >
              Descripción del Espacio de trabajo
            </Labels>
            <TextAreas
              name="description_work_space"
              typeof="text"
              required
              id="description_work_space"
            ></TextAreas>
            <div className="container-left-button">
              <button>Crear</button>
            </div>
          </form>
        </main>
      </Modal>
    </div>
  )
}
