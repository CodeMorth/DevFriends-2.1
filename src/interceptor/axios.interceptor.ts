import { CapitalizeString, updateAuthorizationHeader, urlValidator } from '@/utilities'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

export const axiosGlobal = axios.create({ baseURL: `${url}`, timeout: 1000 })

axiosGlobal.interceptors.request.use(
  (request) => {

    const url = request?.url

    if (url?.includes('updateUser') || url?.includes('work_space') || url?.includes('all_Work_spaces_user') || url?.includes('tablas_x_work_space') || url?.includes('CreateTable') )
      return updateAuthorizationHeader(request as InternalAxiosRequestConfig)

    return request
  },

  (error) => {

    toast.error('Error en la peticion',{duration:3500})

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
      ? toast.error(CapitalizeString(error?.response?.data?.message),{duration:3500})
      : toast.error(CapitalizeString(error?.response?.data?.message.errors[0]),{duration:3500})

    return Promise.reject(error)
  }
)
