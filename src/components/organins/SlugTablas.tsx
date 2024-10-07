'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ModalTarjetas } from '@/components/molecules'
import { useOpenModal } from '@/hook'
import { Tarjeta } from '@/components/molecules'
import { cardsPerUser } from '@/services/card.service'
import { useSearchParams } from 'next/navigation'
import { tittleCardInterface } from '@/interface/components/modals/SlugTablas.interface'

export const SlugTablas = () => {
  const searchParams = useSearchParams()
  const idTable = searchParams.get('id')

  const { closeModal, open, openModal } = useOpenModal()
  const [titleCard, setTitleCard] = useState<tittleCardInterface[]>([])

  const getCards = async () =>
    await cardsPerUser(idTable!).then((res) => setTitleCard(res.data)).catch

  useEffect(() => {
    getCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const constrainTask = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  return (
    <div ref={constrainTask} className="main-rigth ">
      <button className="buton_add_cards" onClick={openModal}>
        Añadir Tarjeta +
      </button>
      <div className="box-cards-content">
        {titleCard?.map((card: tittleCardInterface, index: number) => (
          <Tarjeta
            key={card.id_card}
            card={card}
            index={index}
            constrainsTask={constrainTask}
            cardRefs={cardRefs}
            getCards={getCards}
          />
        ))}
      </div>
      <ModalTarjetas render={getCards} visible={open} closeModal={closeModal} />
    </div>
  )
}
