import {Modal} from '@/components/global';
import {useFormss} from '@/hook/';
import { createTasks } from '@/services/task.service';
import React, { useState } from 'react';

interface ModalTareas {
  visible: boolean;
  closeModal: any;
  settables?: any;
  table?: any;
  taskAllCard:any;
}

export const ModalTareas = ({
  visible,
  closeModal,
  table,
  taskAllCard
}: ModalTareas) => {
  const { capTure, datos } = useFormss();

  
  const handleModal = (e: any) => {
    e.preventDefault();
    datos.id_card=table.id_card

    createTasks(datos).then( ({data}) => {
      if(data?.message === "tarea creada exitosamente") closeModal(), taskAllCard(table)
    }).catch(err => console.log(err))
  };

  return (
    <div>
      <Modal visible={visible} closeModal={closeModal} className='shadow-[1px_1px_4px_1px_#121625] rounded-[.5rem]'>
        <form
          onSubmit={handleModal}
          className='moda-cards-box-tasks-'
        >
          <input
            onChange={capTure}
            type='text'
            placeholder='Añadir tareas'
            name='title_task'
          />
          <button type='submit' >
            Añadir
          </button>
        </form>
      </Modal>
    </div>
  );
};

