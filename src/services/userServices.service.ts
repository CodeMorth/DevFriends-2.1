import { axiosGlobal } from '@/interceptor'
import { userTypeLRU } from '@/interface/components'

export const postRegister = (data: userTypeLRU) => {
  return axiosGlobal.post('register', data)
}

export const postLogin = (data: userTypeLRU) => {
  return axiosGlobal.post('loginUser', data)
}

export const putUpdate = (id: string, data: FormData) => {
  return axiosGlobal.put(`updateUser/${id}`, data)
}

export const getByToken = () => {
  return axiosGlobal.get(`userData`)
}

export const getByID = (id: string) => {
  return axiosGlobal.get(`userId/${id}`)
}

export const deleteById = (id: string) => {
  return axiosGlobal.get(`userDelete/${id}`)
}
