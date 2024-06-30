import { getValidationError } from '@/utilities/getValidationError'
import axios from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

export const axiosGlobal = axios.create({baseURL:`${url}`})

axiosGlobal.interceptors.request.use(
  (request) => {
    console.log('Soy el interceptor request ', request)
    toast.success('Request correcto')
    return request
  },
  (error) => {
    console.log('Soy el error del interceptor del request ', error)
    toast.error('Error en la peticion request')
    return Promise.reject(error)
  }
)

axiosGlobal.interceptors.response.use(
  (response) => {
    console.log('Soy el interceptor de response ', response)
    toast.success('Response correcta')
    return response
  },
  (error) => {
    console.log('Soy el error del interceptor del response ', error)

    const errorMessage =  getValidationError(error.code)

    toast.error(`${errorMessage}`)

    return Promise.reject(error)
  }
)
