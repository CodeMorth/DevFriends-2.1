import {Modal} from '@/components/global';
import {useFormss} from '@/hook';
import React from 'react';

interface ModalTarjetas {
  visible: boolean;
  closeModal: any;
  settables?:any
}

export const ModalTarjetas = ({ visible, closeModal , settables }: ModalTarjetas) => {

    const {capTure , datos} =useFormss()

   

    const handleModal = (e:any) => {

        e.preventDefault();
        settables( (preventTables:any) => [...preventTables,{datos,tareasTablas:[]}])
        closeModal();
    }
  return (
    <div>
      <Modal visible={visible} closeModal={closeModal} className='main_cards_conten_box rounded-[.3rem]'>
        <form  onSubmit={handleModal} className='moda-cards-box '>
          <input onChange={capTure} type="text"  placeholder='Añadir titulo' name='titleTarjeta'/>
          <button type='submit' >añadir</button>
        </form>
      </Modal>
    </div>
  );
};

