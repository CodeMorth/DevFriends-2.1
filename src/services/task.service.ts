import { axiosGlobal } from "@/interceptor"


//getTaskTable
export const getTaskTab = (id:string) => {
    return axiosGlobal.get(`getTaskTable/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  //create TAsk
  export const createTasks = (data:any) => {
    return axiosGlobal.post(`createTask`, data, {
      headers: { 'Content-Type': 'application/json' }
    })
  }