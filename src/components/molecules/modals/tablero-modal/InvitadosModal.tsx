import { Modal } from "@/components/global"
import { allUserTableService } from "@/services"
import { useEffect, useState } from "react"
import { FaUserClock } from "react-icons/fa"
import { GrUserAdmin } from "react-icons/gr"
import { MdOutlineSignalWifiStatusbar4Bar, MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md"



interface ModalInvitados {
  visible: any
  closeModal: any
}

const InvitadosModal = ({ visible, closeModal }: ModalInvitados) => {
  const [estado, setEstado] = useState<any>()


  useEffect(() => {

   if(visible !== false){

     allUserTableService().then(res => setEstado(res.data)).catch(error => console.log(error))
   }
    
  }, [visible])


  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[50rem] "
        className=" main-page"
      >

        <section className="Container_modal_mienbros">

          <h2>Invitados del Espacio de Trabajo</h2>

          <article className="container_map_invitado ">

            {
              estado && estado.map((user: any) =>
                <div key={user.id_user} className=" container_modal_infor">
                  {
                   user?.rols && user.rols[0]?.type_rol === "admin" ? <GrUserAdmin className="Icon_mienbros" /> : <FaUserClock  className="Icon_mienbros"/>
                  }
                  
                  <div className="modal_mienbros_informacion">

                    <h3 >{user?.username}</h3>


                    <div className="modal_miebros_status">
                      <p className=" ">{user?.rols && user.rols[0]?.type_rol}</p>
                      <div className="modal_status_info ">
                        {
                          user?.status ? <MdOutlineSignalWifiStatusbar4Bar className={`Icon_status ${user?.status &&  "text-[green]"}`} /> : <MdSignalWifiStatusbarConnectedNoInternet className={`Icon_status ${user?.status && "text-[red]" }`} />
                        }
                        <h4 className={`status_info_modal ${!user?.status ? "text-[red]" : "text-[green]"}`}>{user?.status}</h4>
                      </div>
                      {/* <i class="fa-regular fa-circle-user"></i> */}
                    </div>
                  </div>
                </div>
              )
            }


          </article>
        </section>

      </Modal>
    </div>
  )
}

export default InvitadosModal