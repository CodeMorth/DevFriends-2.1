import {Modal} from '@/components/global';
import {useFormss} from '@/hook/';
import React, { useState } from 'react';

interface ModalTareas {
  visible: boolean;
  closeModal: any;
  settables?: any;
  table?: any;
}

export const ModalTareas = ({
  visible,
  closeModal,
  table,
}: ModalTareas) => {
  const { capTure, datos } = useFormss();

  const updateTarea = table?.datos?.titleTarjeta;

  const handleModal = (e: any) => {
    e.preventDefault();

    if (updateTarea === table?.datos?.titleTarjeta) {
      table?.tareasTablas.push(datos);
      closeModal();
    }
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
            name='tareasTables'
          />
          <button type='submit' >
            Añadir
          </button>
        </form>
      </Modal>
    </div>
  );
};

