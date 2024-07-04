import { userLocalStoras } from '@/hook'
import { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'

const { obtenerLocal } = userLocalStoras()

export const updateAuthorizationHeader = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token: string = obtenerLocal('token')

  const newHeaders: object = {
    ...request.headers,
    Authorization: `Bearer ${token}`
  }

  request.headers = newHeaders as AxiosRequestHeaders

  return request
}
