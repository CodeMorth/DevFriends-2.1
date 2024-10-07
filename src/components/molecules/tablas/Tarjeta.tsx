import { useEffect, useRef } from 'react'
import { ModalTareas } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import useTaskXTable from '@/hook/task/useTaskXTable'
import { motion } from 'framer-motion'
import { TarjetaProps } from '@/interface/components/modals/Tarjeta.interface'
import { TaskInterface } from '@/interface/components/modals/Task.interface'

export const Tarjeta: React.FC<TarjetaProps> = ({
  card,
  index,
  constrainsTask,
  cardRefs,
  getCards
}) => {
  const { open, closeModal, openModal } = useOpenModal()
  const { task, getTaskTabH, updateTaskH } = useTaskXTable()
  const cardRef = useRef<HTMLDivElement>(null)

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
      {task?.map(({ id_task, title_task }: TaskInterface) => (
        <motion.div
          key={id_task}
          drag
          dragSnapToOrigin
          dragElastic={0.4}
          dragConstraints={constrainsTask}
          onDragEnd={(event, info) => updateTaskH(id_task, info,cardRefs,getCards)}
          className="task_children_cards"
        >
          {title_task}
        </motion.div>
      ))}
      {task && (
        <button onClick={openModal} className="btn_cards_add_task">
          Añadir tareas
        </button>
      )}
      <ModalTareas
        taskAllCard={getTaskTabH}
        table={card}
        visible={open}
        closeModal={closeModal}
      />
    </div>
  )
}
