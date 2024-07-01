import { CapitalizeString, urlValidator } from '@/utilities'
import axios from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

export const axiosGlobal = axios.create({ baseURL: `${url}`, timeout: 5000 })

axiosGlobal.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    toast.error('Error en la peticion')
    return Promise.reject(error)
  }
)

axiosGlobal.interceptors.response.use(
  (response) => {
    urlValidator(response)
    return response
  },
  (error) => {
    typeof error?.response?.data?.message === 'string'
      ? toast.error(CapitalizeString(error?.response?.data?.message))
      : toast.error(CapitalizeString(error?.response?.data?.message.errors[0]))

    return Promise.reject(error)
  }
)
