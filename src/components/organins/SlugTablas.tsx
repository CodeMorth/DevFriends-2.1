'use client'
import React, { useEffect, useState } from 'react'
import {ModalTarjetas} from '@/components/molecules';
import {useOpenModal} from '@/hook';
import {Tarjeta} from '@/components/molecules';
import { cardsPerUser } from '@/services/card.service';
import { useSearchParams } from 'next/navigation';

export const SlugTablas = () => {

  const searchParams = useSearchParams();
  const id= searchParams.get('id')

  
  const {closeModal, open , openModal} = useOpenModal();

  const [tables, settables] = useState<any>([]);
  const [titleCard, setTitleCard] = useState<any>(null)

  useEffect(() => {
    cardsPerUser(id!).then((res) => {
      setTitleCard(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

console.log("titleCard",titleCard)

  return (
    <div className="main-rigth ">
      <button className='buton_add_cards  ' onClick={openModal}>Añadir Tarjeta +</button>
     
      <div className='box-cards-content '>
      {
        titleCard !== null && titleCard?.map( (card:any ) => 
        
          <Tarjeta key={card.id_card} settables={settables} card={card}/>
        
        )
        
      }
      
</div>
<ModalTarjetas settables={settables} visible={open} closeModal={closeModal}/>
    </div>
  )
}

