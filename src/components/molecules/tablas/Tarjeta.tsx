import React, { useEffect, useState } from 'react'
import { ModalTareas } from '@/components/molecules'
import { useOpenModal, useDragAndDrop } from '@/hook'
import useTask_x_table from '@/hook/task/useTask_x_table'
export const Tarjeta = ({ card, settables, index }: any) => {
  const { open, closeModal, openModal } = useOpenModal()

  const { onDrop, draginOver, startDrap } = useDragAndDrop({ index, settables })

  const { task, setTask, taskAllCard } = useTask_x_table()

  useEffect(() => {
    taskAllCard(card)
  }, [])

  return (
    <div
      className="card_main-box "
      // onDragOver={(e: any) => draginOver(e)}
      // onDrop={(e: any) => onDrop(e, index)}
    >
      <h1 className="title_cards-">{card?.title_card}</h1>

      {task !== null &&
        task?.map((tarea: any) => (
          <p
            onDragOver={(e: any) => draginOver(e)}
            onDrop={(e: any) => onDrop(e, index)}
            className="task_children_cards"
            key={tarea.id_task}
          >
            {tarea?.title_task}
          </p>
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
