
import { axiosGlobal } from "@/interceptor"



//tablas_x_work_space
export const tablasUserWorkSpace = (id:any) => {
    return axiosGlobal.get(`tablas_x_work_space/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  //CreateTable

  export const createTable = (data: any) => {
    return axiosGlobal.post('CreateTable', data, {
      headers: { 'Content-Type': 'application/json' }
    })
  }