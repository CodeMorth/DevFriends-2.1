import { axiosGlobal } from '@/interceptor'

//getTaskTable
export const getTaskTab = (id: string) => {
  return axiosGlobal.get(`getTaskTable/${id}`)
}

//create Task
export const createTasks = (data: any) => {
  return axiosGlobal.post(`createTask`, data)
}

//Update Task for card
export const taskUpdateCard = (data: any) => {
  return axiosGlobal.put(`taskUpdateCard`, data)
}

export const updateTask = (data: any) => {
  return axiosGlobal.put(`updateTask`, data)
}

export const deleteTaskS = (id_task: string) => {
  return axiosGlobal.delete(
    `deleteTask?id_task=${id_task}`
  )
}
