import { axiosGlobal } from '@/interceptor'
import { userTypeLRU } from '@/interface/components'

export const postRegister = (data: userTypeLRU) => {
  return axiosGlobal.post('register', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const postLogin = (data: userTypeLRU) => {
  return axiosGlobal.post('loginUser', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const putUpdate = (id: string, data: FormData) => {
  return axiosGlobal.put(`updateUser/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const getByToken = (token: string) => {
  return axiosGlobal.get(`userData/${token}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const getByID = (id: string) => {
  return axiosGlobal.get(`userId/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const deleteById = (id: string) => {
  return axiosGlobal.get(`userDelete/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}
