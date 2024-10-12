import { useEffect, useRef, useState } from 'react'
import { ModalTareas } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import useTaskXTable from '@/hook/task/useTaskXTable'
import { motion } from 'framer-motion'
import { TarjetaProps } from '@/interface/components/modals/Tarjeta.interface'
import { TaskInterface } from '@/interface/components/modals/Task.interface'
import { formatFecha } from '@/utilities/formatFecha'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { PanelMenu } from 'primereact/panelmenu'
import AgregarTiempo from '../modals/tasks/AgregarTiempo'
import { useMultipleModal } from '@/hook/useMultipeModal'



export const Tarjeta: React.FC<TarjetaProps> = ({
  card,
  index,
  constrainsTask,
  cardRefs,
  getCards
}) => {


  const { closeModals, isModalOpen, openModals } = useMultipleModal();
  const { task, getTaskTabH, updateTaskH } = useTaskXTable()
  const [menuTaskOpen, setMenuTaskOpen] = useState<{ [id_task: string]: boolean }>({})
  const cardRef = useRef<HTMLDivElement>(null)
  const [create, setcreate] = useState(true)
  const [idTask, setidTask] = useState<string>('')
  const [select, setSelect] = useState<any>('')



  const toggleMenu = (id_task: string) => {
    setMenuTaskOpen((prevState) => ({
      ...prevState,
      [id_task]: !prevState[id_task],
    }))
  }

  useEffect(() => {
    getTaskTabH(card)
    if (cardRef.current) {
      cardRefs.current[index] = {
        ref: cardRef.current,
        data: card
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, cardRefs, index])

  return (
    <div className="card_main-box " ref={cardRef}>
      <h1 className="title_cards- ">{card?.title_card}</h1>
      {task?.map(
        (task: TaskInterface,) => (

          <motion.div
            key={task?.id_task}

            drag
            dragSnapToOrigin
            dragElastic={0.4}
            dragConstraints={constrainsTask}
            onDragEnd={(event, info) =>
              updateTaskH(task?.id_task, info, cardRefs, getCards)
            }
            className={`task_children_cards    ${task?.prioridad === 'alta'
              ? 'text-[#ff3a3a]'
              : task?.prioridad === 'normal'
                ? 'text-[#1b75ff]'
                : 'text-[#62ff46]'
              }`}
          >
            {task?.title_task}



            <BsThreeDots onClick={() => toggleMenu(task?.id_task)} className='hover:cursor-pointer absolute top-3 right-3     z-[99] text-[2.5rem] ' />

            {
              <div
                className={`rounded-lg duration-500 ease-in-out absolute right-0 w-auto bg-[#202433] p-[1rem] h-auto flex flex-col gap-[1rem] transform z-[0] ${menuTaskOpen[task?.id_task] ? "translate-y-[-1rem] opacity-100" : "-translate-y-[-10rem] opacity-0"
                  }`}
              >
                <h5 className='ease-in-out duration-300 hover:bg-[#2b3144] p-[.3rem] cursor-pointer'>Iniciar Tarea</h5>
                <h5 onClick={() => {
                  openModals('agregaTiempo'),
                    setSelect(task)
                  toggleMenu(task?.id_task)
                }} className='ease-in-out duration-300 hover:bg-[#2b3144] p-[.3rem] cursor-pointer'>Agregar Tiempo</h5>
              </div>
            }




            {
              task?.user_working && <section className='container_avatar_task '>
                <img className=' ' src={"https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"} alt="avatar" />
                <h4 className=' '>{task?.user_working || ""}</h4>
              </section>
            }
            <section className='container_fecha_task '>
              <article className='modal_fecha_entrega '>
                <FaRegCalendarAlt />
                <p className='text-[1.5rem]'>{formatFecha(task?.fecha_de_entrega)}</p>
              </article>
              <article className='modal_tiempo_desarrollo'>
                <input type="time" name="time" id="time" />
              </article>
            </section>
          </motion.div>


        )
      )}

      {task && (
        <button
          onClick={() => {
            setcreate(true), openModals('tareasModal')
          }}
          className="btn_cards_add_task"
        >
          Añadir tareas
        </button>
      )}
      <ModalTareas
        taskAllCard={getTaskTabH}
        table={card}
        visible={isModalOpen('tareasModal')}
        closeModal={() => closeModals('tareasModal')}
        create={create}
        idTask={idTask}
      />
      <AgregarTiempo select={select} visible={isModalOpen('agregaTiempo')}
        closeModal={() => closeModals('agregaTiempo')} />
    </div>
  )
}
