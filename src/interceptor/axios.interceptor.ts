import { userLocalStoras } from '@/hook'
import { CapitalizeString, urlValidator } from '@/utilities'
import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

export const axiosGlobal = axios.create({ baseURL: `${url}`, timeout: 1000 })

const { obtenerLocal } = userLocalStoras()

const updateHeader = (request: InternalAxiosRequestConfig ):InternalAxiosRequestConfig  => {

  const token:string = obtenerLocal('token')

  const newHeaders:object = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }

  request.headers = newHeaders as AxiosRequestHeaders

  return request
}

axiosGlobal.interceptors.request.use(

  (request) => {

    if (request.url?.includes('updateUser')) return updateHeader(request  as InternalAxiosRequestConfig)

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
