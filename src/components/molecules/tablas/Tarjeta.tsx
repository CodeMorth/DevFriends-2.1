/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { ModalTareas } from '@/components/molecules'
import useTaskXTable from '@/hook/task/useTaskXTable'
import { motion } from 'framer-motion'
import { TarjetaProps } from '@/interface/components/modals/Tarjeta.interface'
import { TaskInterface } from '@/interface/components/modals/Task.interface'
import { formatFecha } from '@/utilities/formatFecha'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegCalendarAlt } from 'react-icons/fa'

import { useMultipleModal } from '@/hook/useMultipeModal'
import { taskUpdateCard, taskUpdateServicio } from '@/services/task.service'
import { toast } from 'sonner'
import { Cronometro } from './Cronometro'
import useTimeTaskValidate from '@/hook/task/useTimeTaskValidate'

export const Tarjeta: React.FC<TarjetaProps> = ({
  card,
  index,
  constrainsTask,
  cardRefs,
  getCards
}) => {
  const timeInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const [menuTaskOpen, setMenuTaskOpen] = useState<{
    [id_task: string]: boolean
  }>({});
  const { closeModals, isModalOpen, openModals } = useMultipleModal();
  const { task, getTaskTabH, updateTaskH } = useTaskXTable();
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [create, setcreate] = useState(true);
  const [idTask, setidTask] = useState<string>('');

  const [timeValues, setTimeValues] = useState<{ [id_task: string]: string }>(
    {}
  );

  const toggleMenu = (id_task: string) => {
    setMenuTaskOpen((prevState) => ({
      ...prevState,
      [id_task]: !prevState[id_task]
    }))
  }

  const handleTimeChange = (taskId: any, value: string) => {
    
    const {title_task ,id_task } = taskId;
    setTimeValues((prevState) => ({
      ...prevState,
      [taskId]: value
    }))

    const inputElement = timeInputRefs.current[id_task]

    // Validar el valor del tiempo
    if (value === '' || value === '00:00' || value < '01:00') {
      if (inputElement) {
        inputElement.classList.add('!border-red-500', 'border-2') // Agregar borde rojo
      }
      toast(`Tiempo inválido añadido a "${title_task}" Revisa el valor e ingresa un tiempo válido.`)
    } else {
      if (inputElement) {
        inputElement.classList.remove('!border-red-500', 'border-2') // Quitar borde rojo
        taskUpdateServicio({ id_task: id_task, homework_time: value }).then(
          (res) => {
            if (res.data) {
              getTaskTabH(card)
              toast(`Has añadido el tiempo a "${title_task}" con éxito.`)
            }
          }
        )
      }
    }
  }

  useEffect(() => {
    if (cardRef.current) {
      cardRefs.current[index] = {
        ref: cardRef.current,
        data: card
      }
    }
    getTaskTabH(card)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, cardRefs, index])

  const initialTask = async (datos: any) => {
    const { task, card } = datos

    // Asigna el valor del tiempo, asegurándote de que nunca sea null
    const timeValue = task?.homework_time || '' // Cambia a "" en caso de ser null
    setTimeValues((prevState) => ({
      ...prevState,
      [task?.id_task]: timeValue
    }))

    // Verifica el input de tiempo
    const inputElement = timeInputRefs.current[task?.id_task]
    if (timeValue === '' || timeValue === '00:00:00' || timeValue < '01:00') {
      if (inputElement) {
        inputElement.classList.add('!border-red-500', 'border-2')
        toast('Añade un Tiempo válido')
      }
      toggleMenu(task?.id_task)
    } else {
      if (inputElement) {
        inputElement.classList.remove('!border-none', 'border-2')
      }
      await taskUpdateCard({
        id_task: task?.id_task,
        id_card: card?.id_card + 1
      })
      await getTaskTabH(card)
      toggleMenu(task?.id_task)
    }
  }

  useEffect(() => {
    if (timeInputRefs.current) {
      getTaskTabH(card)
    }

    
  }, [])

  useEffect(() => {


    if (timeInputRefs.current) {
      getTaskTabH(card);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="card_main-box " ref={cardRef}>
      <h1 className="title_cards- ">{card?.title_card}</h1>

      {task?.map((task: TaskInterface) => (
        <motion.div
          key={task?.id_task}
          drag
          dragSnapToOrigin
          dragElastic={0.4}
          dragConstraints={constrainsTask}
          onDragEnd={(event, info) =>{
            const inputElement = timeInputRefs.current[task?.id_task];
            const timeValue = timeValues[task?.id_task] || task?.homework_time || '';
        
            // Validar si el tiempo es válido
            if (timeValue === '' || timeValue === '00:00' || timeValue < '01:00') {
              if (inputElement) {
                inputElement.classList.add('!border-red-500', 'border-2'); // Agregar borde rojo
              }
              toast('Añade un Tiempo válido antes de mover la tarea'); // Mostrar mensaje de error
            } else {
              // Si el tiempo es válido, permitir que se mueva la tarea
              if (inputElement) {
                inputElement.classList.remove('!border-red-500', 'border-2'); // Quitar borde rojo
              }
              updateTaskH(task?.id_task, info, cardRefs, getCards); // Actualizar la tarea
            }
          }
            
          }
          className={`task_children_cards  ${
            task?.prioridad === 'alta'
              ? 'text-[#ff3a3a] border-2 !border-[#ff3a3a]'
              : task?.prioridad === 'normal'
              ? 'text-[#1b75ff]  border-2 !border-[#1b75ff]'
              : 'text-[#62ff46]  border-2 !border-[#62ff46]'
          }`}
        >
          {task?.title_task}

          {task?.user_working && (
            <Cronometro
              time={task.homework_time}
              validate={task?.user_working}
            />
          )}

          <BsThreeDots
            onClick={() => toggleMenu(task?.id_task)}
            className="hover:cursor-pointer absolute top-3 right-3     z-[99] text-[2.5rem] "
          />

          {
            <div
              className={`rounded-lg duration-500 ease-in-out absolute right-0 w-auto bg-[#202433] p-[1rem] h-auto flex flex-col gap-[1rem] transform z-[0] ${
                menuTaskOpen[task?.id_task]
                  ? 'translate-y-[-1rem] opacity-100'
                  : '-translate-y-[-10rem] opacity-0'
              }`}
            >
              <h5
                onClick={() => initialTask({ task, card })}
                className="ease-in-out duration-300 hover:bg-[#2b3144] p-[.3rem] cursor-pointer"
              >
                Iniciar Tarea
              </h5>
              <h5 className="ease-in-out duration-300 hover:bg-[#2b3144] p-[.3rem] cursor-pointer">
                Editar Tarea
              </h5>
            </div>
          }

          {task?.user_working && (
            <section className="container_avatar_task ">
              <img className=" " src={task?.user_avatar_working} alt="avatar" />
              <h4 className=" ">{task?.user_working || ''}</h4>
            </section>
          )}
          <section className="container_fecha_task ">
            <article className="modal_fecha_entrega ">
              <FaRegCalendarAlt />
              <p className="text-[1.5rem]">
                {formatFecha(task?.fecha_de_entrega)}
              </p>
            </article>
            <article className="modal_tiempo_desarrollo">
              <input
                ref={(el) => {
                  timeInputRefs.current[task?.id_task] = el
                }}
                onChange={(e) =>
                  
                  handleTimeChange(task, e.target.value)
                }
                value={timeValues[task?.id_task] || task?.homework_time || ''}
                type="time"
                name="time"
              />
            </article>
          </section>
        </motion.div>
      ))}

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
    </div>
  )
}
