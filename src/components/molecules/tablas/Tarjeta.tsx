import React, { useEffect, useState, useRef } from 'react'
import { ModalTareas } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import useTask_x_table from '@/hook/task/useTask_x_table'
import { motion } from 'framer-motion'
import { updateTasks } from '@/services/task.service'

export const Tarjeta = ({
  card,
  index,
  constrainsTask,
  cardRefs,
  getCards,
  titleCard
}: any) => {
  const { open, closeModal, openModal } = useOpenModal()
  const { task, taskAllCard } = useTask_x_table()
  const [cardLocal, setcardLocal] = useState()

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    taskAllCard(card)
    // Guardar el DOM y los datos de la tarjeta en cardRefs
    if (cardRef.current) {
      cardRefs.current[index] = {
        ref: cardRef.current, // Referencia al elemento del DOM
        data: card // Datos de la tarjeta
      }
    }
  }, [cardRefs, index,titleCard])

  const handleDrag = (info: any) => {
    const taskX = info.point.x
    const taskY = info.point.y

    // Verificar si la tarea está sobre alguna tarjeta del array
    cardRefs.current.forEach((cardElement: any) => {
      const cardRect = cardElement.ref.getBoundingClientRect() // Obtener el DOM de la tarjeta
      if (
        taskX >= cardRect.left &&
        taskX <= cardRect.right &&
        taskY >= cardRect.top &&
        taskY <= cardRect.bottom
      ) {
        setcardLocal(cardElement.data.id_card)
      }
    })
  }

  const updateTask = async (taskLocal: any) => {
    try {
      await updateTasks({ id_task: taskLocal, id_card: cardLocal })
      getCards()
    } catch (error) {}
  }

  return (
    <div className={`card_main-box`} ref={cardRef}>
      <h1 className="title_cards-">{card?.title_card}</h1>

      {task !== null &&
        task?.map((tarea: any) => (
          <motion.div
            drag
            dragElastic={0.4}
            dragConstraints={constrainsTask}
            onDrag={(event, info) => handleDrag(info)}
            onDragEnd={() => updateTask(tarea.id_task)}
            className="task_children_cards"
            key={tarea.id_task}
          >
            {tarea?.title_task}
          </motion.div>
        ))}

      {task && (
        <button onClick={openModal} className="btn_cards_add_task ">
          Añadir tareas
        </button>
      )}
      <ModalTareas
        taskAllCard={taskAllCard}
        table={card}
        visible={open}
        closeModal={closeModal}
      />
    </div>
  )
}
