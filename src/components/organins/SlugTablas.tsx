'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ModalTarjetas } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import { Tarjeta } from '@/components/molecules'
import { cardsPerUser } from '@/services/card.service'
import { useSearchParams } from 'next/navigation'

export const SlugTablas = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { closeModal, open, openModal } = useOpenModal()
  const [titleCard, setTitleCard] = useState<any>(null)

  const getCards = () => cardsPerUser(id!).then((res) => {console.log(res.data),setTitleCard(res.data)}).catch((err) => {console.log(err)})

  useEffect(() => {
    getCards()
  }, [])

  const constrainTask = useRef(null)
  const cardRefs = useRef<any[]>([])

  return (
    <div ref={constrainTask} className="main-rigth ">
      <button className="buton_add_cards" onClick={openModal}>
        Añadir Tarjeta +
      </button>

      <div className="box-cards-content">
        {titleCard !== null &&
          titleCard?.map((card: any, index: number) => (
            <Tarjeta
              key={card.id_card}
              card={card}
              index={index}
              constrainsTask={constrainTask}
              cardRefs={cardRefs}
              getCards={getCards}
              titleCard={titleCard}
            />
          ))}
      </div>
      <ModalTarjetas render={getCards} visible={open} closeModal={closeModal} />
    </div>
  )
}
