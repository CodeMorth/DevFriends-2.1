import { Inputs, Labels } from '@/components/atoms'
import { Modal } from '@/components/global'
import { DevFriendLogo } from '@/components/global/DevFriendLogo'
import { userTypeLRU } from '@/interface/components'
import { onUsuariosConectado, socket } from '@/lib/socket'
import { postLogin } from '@/services/userServices.service'
import { InputToFormData } from '@/utilities'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
interface ModalLogin {
  visible: boolean
  closeModal: () => void
}

export const LoginModal = ({ visible, closeModal }: ModalLogin) => {
  const router = useRouter()

  useEffect(() => {
    //funcion para que escuche el evento
    const handleUsuarioConectado = (data: { username: string }) => {
      toast.success(`Usuario conectado: ${data.username}`, { duration: 1500 })
    }

    // Escuchar el evento 'usuariosConectado' desde el servidor
    onUsuariosConectado(handleUsuarioConectado)

    // Limpiar el evento para evitar múltiples escuchas
    return () => {
      socket.off('usuariosConectado')
    }
  }, [])

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const dataRegister: userTypeLRU = InputToFormData(event)

    await postLogin(dataRegister).then((res) => {
      if (res.data.username) {
        // Emitir el evento de inicio de sesión al servidor
        socket.emit('joinWorkspace', res.data.id_work_space)
      }
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
              <DevFriendLogo />
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
