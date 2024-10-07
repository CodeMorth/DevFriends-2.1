export interface Card {
  id_card: string
  title_card: string
}

export interface CardRef {
  ref: HTMLDivElement
  data: Card
}

export interface TaskInterface {
  id_task: string
  title_task: string
  fecha_de_entrega: string
  prioridad: string
  user_working: string
}

export interface InfoDrag {
  point: { x: number; y: number }
}
