import { Modal } from '@/components/global'
import React from 'react'
interface TaskModal {
    visible: boolean
    closeModal: () => void
    select : any
  }
const AgregarTiempo = ({ visible, closeModal , select }:TaskModal) => {

    console.log("task", select)
  return (
    <div>
    <Modal
      visible={visible}
      closeModal={closeModal}
      widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[50rem] "
      className=" main-page"
    >

      <section className="Container_modal_mienbros">

        <h2>Agregar Tiempo</h2>

        <article className="container_map_invitado ">

         

<div className='modal_tiempo_desarrollo'>
<input type="time" />
</div>
        

<div>
    <button onClick={closeModal}>Agregar</button>
</div>

        </article>
      </section>

    </Modal>
  </div>
  )
}

export default AgregarTiempo