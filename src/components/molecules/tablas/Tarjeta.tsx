import { useEffect, useRef, useState } from 'react'
import { ModalTareas } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import useTaskXTable from '@/hook/task/useTaskXTable'
import { motion } from 'framer-motion'
import { TarjetaProps } from '@/interface/components/modals/Tarjeta.interface'
import { TaskInterface } from '@/interface/components/modals/Task.interface'
import { VscEdit } from 'react-icons/vsc'

export const Tarjeta: React.FC<TarjetaProps> = ({
  card,
  index,
  constrainsTask,
  cardRefs,
  getCards
}) => {
  const { open, closeModal, openModal } = useOpenModal()
  const { task, getTaskTabH, updateTaskH } = useTaskXTable()
  const [hoverIcon, sethoverIcon] = useState<boolean[]>([])
  const cardRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [create, setcreate] = useState(true)
  const [idTask, setidTask] = useState<string>('')

  const mouseOutDelay = (index: number) => {
    timeoutRef.current = setTimeout(() => {
      sethoverIcon((prev) => {
        const updatedHoverIcon = [...prev]
        updatedHoverIcon[index] = false
        return updatedHoverIcon
      })
    }, 1000)
  }

  const handleMouseEnter = (index: number) => {
    sethoverIcon((prev) => {
      const updatedHoverIcon = [...prev]
      updatedHoverIcon[index] = true
      return updatedHoverIcon
    })
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
    <div className="card_main-box" ref={cardRef}>
      <h1 className="title_cards-">{card?.title_card}</h1>
      {task?.map(
        ({ id_task, title_task, prioridad }: TaskInterface, index: number) => (
          <motion.div
            key={id_task}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => mouseOutDelay(index)}
            drag
            dragSnapToOrigin
            dragElastic={0.4}
            dragConstraints={constrainsTask}
            onDragEnd={(event, info) =>
              updateTaskH(id_task, info, cardRefs, getCards)
            }
            className={`task_children_cards ${
              prioridad === 'alta'
                ? 'text-[#ff3a3a]'
                : prioridad === 'normal'
                ? 'text-[#1b75ff]'
                : 'text-[#62ff46]'
            }`}
          >
            {title_task}
            <div
              onClick={() => {
                setcreate(false), setidTask(id_task), openModal()
              }}
              className={`icon-edit-container ${
                hoverIcon[index] ? 'hover-icon' : ''
              }`}
            >
              <VscEdit
                width={1000}
                height={1000}
                className={`edit-icon ${hoverIcon[index] ? 'hover-icon' : ''}`}
              />
            </div>
          </motion.div>
        )
      )}
      {task && (
        <button
          onClick={() => {
            setcreate(true), openModal()
          }}
          className="btn_cards_add_task"
        >
          Añadir tareas
        </button>
      )}
      <ModalTareas
        taskAllCard={getTaskTabH}
        table={card}
        visible={open}
        closeModal={closeModal}
        create={create}
        idTask={idTask}
      />
    </div>
  )
}
