import { axiosGlobal } from '@/interceptor'
import { userType } from '@/interface/components'

export const postRegister = (data: userType) => {
  return axiosGlobal.post('register', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const postLogin = (data: userType) => {
  return axiosGlobal.post('loginUser', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
