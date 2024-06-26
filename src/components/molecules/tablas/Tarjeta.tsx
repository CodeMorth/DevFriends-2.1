import React from 'react';
import { ModalTareas } from "@/components/molecules";
import {useOpenModal,useDragAndDrop} from '@/hook';
export const  Tarjeta = ({ tables, settables, index }: any) => {
  const { open, closeModal, openModal } = useOpenModal();

  const { onDrop, draginOver, startDrap } = useDragAndDrop({ index,settables,});

  return (
    <div
      className='card_main-box '
      onDragOver={(e: any) => draginOver(e)}
      onDrop={(e: any) => onDrop(e, index)}
    >
      <h1 className='title_cards-'>{tables?.datos?.titleTarjeta}</h1>

      {tables !== null &&
        tables?.tareas?.map((tarea: any, index: any) => (
          <p key={index}>{tarea?.tarea}</p>
        ))}

      {tables?.tareasTablas &&
        tables?.tareasTablas?.map((title: any, index: number) => (
          <h3
            className='task_children_cards'
            draggable
            onDragStart={(e: any) => startDrap(e, title)}
            key={index}
          >
            {title?.tareasTables}
          </h3>
        ))}

      {tables && (
        <button onClick={openModal} className='btn_cards_add_task '>
          Añadir tareas
        </button>
      )}
      <ModalTareas table={tables} visible={open} closeModal={closeModal} />
    </div>
  );
};

