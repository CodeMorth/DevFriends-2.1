import { Inputs, Labels } from '@/components/atoms'
import { Modal } from '@/components/global'
import { DevFriendLogo } from '@/components/global/DevFriendLogo'
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

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const dataRegister: userTypeLRU = InputToFormData(event)

    await postLogin(dataRegister).then(() => {
      router.push('/dashboard'), closeModal()
    }).catch
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
          

            <div className="logo-name_two">
            <DevFriendLogo/>
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
