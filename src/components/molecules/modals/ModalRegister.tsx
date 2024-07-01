import { Modal } from '@/components/global'
import Image from 'next/image'
import { Buttonss } from '@/components/atoms'
import { Labels, Inputs } from '@/components/atoms'
import { postRegister } from '@/services/generalServices.service'
import { userType } from '@/interface/components'
import { useRouter } from 'next/navigation'

interface ModalRegister {
  visible: boolean
  closeModal: () => void
}

export const ModalRegister = ({ visible, closeModal }: ModalRegister) => {
  const router = useRouter()

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const dataRegister: userType = Object.fromEntries(
      new FormData(event.target as HTMLFormElement).entries()
    ) as userType

    postRegister(dataRegister).then(() => {router.push('/dashboard'), closeModal()}).catch((error) => error)}

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[60rem] "
        className="logi_box main-page"
      >
        <form onSubmit={handleRegister} className="login_modal">
          <div className="logo">
            <div className="imagen-logo-tw">
              <Image
                src={'/logo/logo-tareas.png'}
                alt="logo"
                width={1000}
                height={1000}
                priority
                className="w-full h-full drop-shadow-[0px_1px_2px_#4C6E9E]"
              />
            </div>
            <div className="logo-name_two">
              <h3>Dev</h3>
              <h2>Friend</h2>
            </div>
          </div>
          <div className="box_inputs">
            <div className="input_option">
              <Labels htmlFor="first_name">Nombre</Labels>
              <Inputs
                name="first_name"
                id="first_name"
                type="text"
                placeholder="Mario"
              />
            </div>
            <div className="input_option">
              <Labels htmlFor="last_name">Apellido</Labels>
              <Inputs
                name="last_name"
                id="last_name"
                type="text"
                placeholder="Ramirez"
              />
            </div>
            <div className="input_option">
              <Labels htmlFor="username">Nombre de usuario</Labels>
              <Inputs
                name="username"
                id="username"
                type="text"
                placeholder="CodeMorth"
              />
            </div>
            <div className="input_option">
              <Labels htmlFor="email">Email</Labels>
              <Inputs
                name="email"
                id="email"
                type="email"
                placeholder="devfriend@gmail.com"
              />
            </div>
            <div className="input_option">
              <Labels htmlFor="password">Password</Labels>
              <Inputs
                id="password"
                name="password"
                type="password"
                placeholder="*******"
              />
            </div>
          </div>
          <div>
            <Buttonss>Registrar</Buttonss>
          </div>
        </form>
      </Modal>
    </div>
  )
}
