import { axiosGlobal } from "@/interceptor"

export const cardsPerUser = (id:string) => {
  return axiosGlobal.get(`cardsPerUser/${id}`)
}


//createCard
export const createCard = (data:any) => {
  return axiosGlobal.post(`createCard`, data)
}