import { axiosGlobal } from '@/interceptor'

export const postCreateRol = (data: object) => {
  return axiosGlobal.post('rol', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
