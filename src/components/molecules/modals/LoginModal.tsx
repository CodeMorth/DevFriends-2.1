import { Inputs, Labels } from '@/components/atoms'
import { Modal } from '@/components/global'
import { userLocalStoras } from '@/hook'
import { userTypeLRU } from '@/interface/components'
import { postLogin } from '@/services/userServices.service'
import { InputToFormData } from '@/utilities'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface ModalLogin {
  visible: boolean
  closeModal: () => void

}

export const LoginModal = ({ visible, closeModal }: ModalLogin) => {

  const router = useRouter()

  const { agregarLocal } = userLocalStoras()

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const dataRegister: userTypeLRU = InputToFormData(event)

    postLogin(dataRegister)
      .then((response) => {
        agregarLocal('token', response.data.user.token),
          router.push('/dashboard'),
         
          closeModal()
      })
      .catch((error) => error)
  }

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[50rem] "
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
                name="password"
                id="password"
                type="password"
                placeholder="*******"
              />
            </div>
          </div>

          <div>
            <button className="btn_login_box_ingreso">Ingresar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
