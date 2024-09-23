import React from 'react';
import { ModalTareas } from "@/components/molecules";
import {useOpenModal,useDragAndDrop} from '@/hook';
export const  Tarjeta = ({ card, settables, index }: any) => {
  const { open, closeModal, openModal } = useOpenModal();

  const { onDrop, draginOver, startDrap } = useDragAndDrop({ index,settables,});

  return (
    <div
      className='card_main-box '
      onDragOver={(e: any) => draginOver(e)}
      onDrop={(e: any) => onDrop(e, index)}
    >
      <h1 className='title_cards-'>{card?.title_card}</h1>

      {card !== null &&
        card?.tareas?.map((tarea: any, index: any) => (
          <p key={index}>{tarea?.tarea}</p>
        ))}

      {card?.tareasTablas &&
        card?.tareasTablas?.map((title: any, index: number) => (
          <h3
            className='task_children_cards'
            draggable
            onDragStart={(e: any) => startDrap(e, title)}
            key={index}
          >
            {title?.tareasTables}
          </h3>
        ))}

      {card && (
        <button onClick={openModal} className='btn_cards_add_task '>
          Añadir tareas
        </button>
      )}
      <ModalTareas table={card} visible={open} closeModal={closeModal} />
    </div>
  );
};

