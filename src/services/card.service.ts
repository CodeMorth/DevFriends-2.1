import { axiosGlobal } from "@/interceptor"

export const cardsPerUser = (id:string) => {
  return axiosGlobal.get(`cardsPerUser/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}


//createCard
export const createCard = (data:any) => {
  return axiosGlobal.post(`createCard`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
}