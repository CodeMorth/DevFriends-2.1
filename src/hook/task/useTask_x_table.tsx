import { getTaskTab } from '@/services/task.service'
import React, { useState } from 'react'

const useTask_x_table = () => {


    const [task, setTask] = useState<any>(null)

    const taskAllCard = (card:any) => {
        getTaskTab(card.id_card).then(({data}) => setTask(data)).catch( err => console.log(err))
    }

  return { task , setTask , taskAllCard }
}

export default useTask_x_table