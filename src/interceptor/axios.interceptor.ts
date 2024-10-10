import {
  CapitalizeString,
  urlValidator
} from '@/utilities'
import { ulrValidatorToken } from '@/utilities/urlValidatorToken'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

export const axiosGlobal = axios.create({
  baseURL: `${url}`,
  timeout: 1000 | 5000,
  withCredentials: true
})

axiosGlobal.interceptors.request.use(
  (request) => {
    ulrValidatorToken(request)
    return request
  },

  (error) => {
    toast.error('Error en la peticion', { duration: 3500 })
    return Promise.reject(error)
  }
)

axiosGlobal.interceptors.response.use(
  (response) => {
    urlValidator(response)
    return response
  },
  (error) => {

    console.log("error?.response?.data",error?.response?.data)

    typeof error?.response?.data?.message === 'string'
      ? toast.error(CapitalizeString(error?.response?.data?.message), {
          duration: 3500
        })
      : toast.error(
          CapitalizeString(error?.response?.data?.message.errors[0]),
          { duration: 3500 }
        )

    return Promise.reject(error)
  }
)
