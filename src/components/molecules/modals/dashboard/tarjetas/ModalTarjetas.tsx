import {Modal} from '@/components/global';
import {useFormss} from '@/hook';
import { createCard } from '@/services/card.service';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface ModalTarjetas {
  visible: boolean;
  closeModal: any;
  settables?:any
}

export const ModalTarjetas = ({ visible, closeModal , settables }: ModalTarjetas) => {

  const searchParams = useSearchParams();
  const id= searchParams.get('id')


    const {capTure , datos} =useFormss()

   

    const handleModal = (e:any) => {
        e.preventDefault();
        datos.id_table = id!
        createCard(datos).then(({data}:any) => {
          if(data.message){
            closeModal();
          }
        }).catch((err) => {
          console.log(err)
        })
  
    }
  return (
    <div>
      <Modal visible={visible} closeModal={closeModal} className='main_cards_conten_box rounded-[.3rem]'>
        <form  onSubmit={handleModal} className='moda-cards-box '>
          <input onChange={capTure} type="text"  placeholder='Añadir titulo' name='title_card'/>
          <button type='submit' >añadir</button>
        </form>
      </Modal>
    </div>
  );
};

