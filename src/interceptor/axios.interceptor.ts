import {
  CapitalizeString,
  urlValidator
} from '@/utilities'
import { ulrValidatorToken } from '@/utilities/urlValidatorToken'
import axios from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

export const axiosGlobal = axios.create({
  baseURL: `${url}`,
  timeout: 1000 | 5000,
  withCredentials: true
})

// cuando suceda algun tipo de error quitarle el acceso y tiene que logearse nuevamente... jorge .I.
axiosGlobal.interceptors.request.use(
  (request) => {
    ulrValidatorToken(request)
    return request
  },

  (error) => {
    toast.error('Error en la peticion', { duration: 1500 })
    return Promise.reject(error)
  }
)

axiosGlobal.interceptors.response.use(
  (response) => {
    urlValidator(response)
    return response
  },
  //eliminar el toas  y quitar el acceso al usuario , si ocurre algun error en la peticiones o autorizaciones...  jorge .I.
  (error) => {
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
