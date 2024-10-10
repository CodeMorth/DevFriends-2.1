import {Modal} from '@/components/global';
import {useFormss} from '@/hook/';
import { createTasks } from '@/services/task.service';
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
        

interface ModalUpdateTask {
  visible: boolean;
  closeModal: any;
  settables?: any;
  table?: any;
  taskAllCard:any;
}

export const ModalUpdateTask = ({
  visible,
  closeModal,
  table,
  taskAllCard
}: ModalUpdateTask) => {
  const { capTure, datos ,setdatos} = useFormss();

  
  const handleModal = (e: any) => {
    e.preventDefault();
    datos.id_card=table.id_card

    createTasks(datos).then( ({data}) => {
      if(data?.message === "tarea creada exitosamente") closeModal(), taskAllCard(table)
    }).catch(err => console.log(err))
  };
  return (
    <div>
      <Modal visible={visible} closeModal={closeModal} className='shadow-[1px_1px_4px_1px_#121625] '>
        <form
          onSubmit={handleModal}
          className='moda-cards-box-tasks- '
        >
          <input
            onChange={capTure}
            type='text'
            placeholder='Añadir tareas'
            name='title_task'
          />
          <div className='flex flex-col gap-[1rem] items-center w-[80%]'>
          <label htmlFor="" className="visibility-label">
          Prioridad
        </label>
          <select
          name="prioridad"
          onChange={capTure}
          className="visibility-select-2 text-center"
        >
          <option value="Publico-Privado" className="visibility-option">
            Elige la Prioridad
          </option>
          <option value='normal' className="visibility-option">
            Normal
          </option>
          <option value='intermedio' className="visibility-option">
          Intermedio
          </option>
          <option value='alta' className="visibility-option">
            Alta
          </option>
        </select>
          </div>
          <div className='flex flex-col w-[100%] items-center gap-[1rem]'>
          <label htmlFor="" className="visibility-label">
          Fecha de Entrega
        </label>
        {/* <input onChange={(e) => setdatos(e.target.value)} type="datetime-local" id='fecha_de_entrega' name="fecha_de_entrega" /> */}
        <Calendar 
         value={datos?.fecha_de_entrega || null}
         name='fecha_de_entrega'
         onChange={(e) => capTure(e, 'fecha_de_entrega')}
         className='calendar-task'
        />
          </div>
          <button type='submit' >
            Añadir
          </button>
        </form>
      </Modal>
    </div>
  );
};

