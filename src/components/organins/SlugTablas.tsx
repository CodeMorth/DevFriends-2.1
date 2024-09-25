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

  const [titleCard, setTitleCard] = useState<any>(null)

  const getCards = () => cardsPerUser(id!).then((res) => {
    setTitleCard(res.data)
  }).catch((err) => {
    console.log(err)
  })

  useEffect(() => {
    getCards();
  }, [])


  return (
    <div className="main-rigth ">
      <button className='buton_add_cards  ' onClick={openModal}>Añadir Tarjeta +</button>
     
      <div className='box-cards-content '>
      {
        titleCard !== null && titleCard?.map( (card:any ) => 
        
          <Tarjeta key={card.id_card}  card={card}/>
        
        )
        
      }
      
</div>
<ModalTarjetas render={getCards}  visible={open} closeModal={closeModal}/>
    </div>
  )
}

