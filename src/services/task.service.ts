import { axiosGlobal } from '@/interceptor'

//getTaskTable
export const getTaskTab = (id: string) => {
  return axiosGlobal.get(`getTaskTable/${id}`)
}

//create Task
export const createTasks = (data: any) => {
  return axiosGlobal.post(`createTask`, data)
}

//Update Task
export const updateTasks = (data: any) => {
  return axiosGlobal.put(`taskUpdateCard`, data)
}
