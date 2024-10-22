import { tittleCardInterface } from '@/interface/components/modals/SlugTablas.interface'
import { CardRef, InfoDrag, TaskInterface } from '@/interface/components/modals/Task.interface'
import { getTaskTab, taskUpdateCard } from '@/services/task.service'
import { useState } from 'react'
import { toast } from 'sonner'

const useTaskXTable = () => {
  const [task, setTask] = useState<TaskInterface[]>([])

  const getTaskTabH = async (card: tittleCardInterface) => {
    await getTaskTab(card.id_card)
      .then(({ data }) => setTask(data))
      .catch((err) => console.log(err))
  }

  const updateTaskH = async (taskLocal: string, info: InfoDrag,cardRefs:any,getCards:any) => {
    const { x: taskX, y: taskY } = info.point

    const cardLocal = cardRefs.current.find((cardElement: CardRef) => {
      const cardRect = cardElement.ref.getBoundingClientRect();
      
      return (
        taskX >= cardRect.left &&
        taskX <= cardRect.right &&
        taskY >= cardRect.top &&
        taskY <= cardRect.bottom
      )
    })?.data.id_card
    
    //variable para ver si la card es mayor
    const cardUpdate = cardRefs.current[0].data.id_card;
    if (cardLocal > cardUpdate) {
        await taskUpdateCard({ id_task: taskLocal, id_card: cardLocal }).then(()=>getCards()).catch
    }else{
      toast('solo un admin puede regresar una tarea')
    }
  }

  return { task, setTask, getTaskTabH,updateTaskH }
}

export default useTaskXTable
