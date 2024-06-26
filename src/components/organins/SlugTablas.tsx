'use client'
import React, { useState } from 'react'
import {ModalTarjetas} from '@/components/molecules';
import {useOpenModal} from '@/hook';
import {Tarjeta} from '@/components/molecules';

export const SlugTablas = () => {

  const {closeModal, open , openModal} = useOpenModal();

  const [tables, settables] = useState<any>([]);

  console.log("slugtables tablas",tables)

  return (
    <div className="main-rigth ">
      <button className='buton_add_cards  ' onClick={openModal}>Añadir Tarjeta +</button>
     
      <div className='box-cards-content '>
      {
        tables !== null && tables?.map( (tables:any , index:any) => 
        
          <Tarjeta key={index} settables={settables} index={index} tables={tables}/>
        
        )
        
      }
      
</div>
<ModalTarjetas settables={settables} visible={open} closeModal={closeModal}/>
    </div>
  )
}

