import { axiosGlobal } from '@/interceptor'

export const postRegister = (data: object) => {
  return axiosGlobal.post("/registrer", data,{
    headers: { 'Content-Type': 'application/json', 'Authorization': "11111111", }
  })
}
