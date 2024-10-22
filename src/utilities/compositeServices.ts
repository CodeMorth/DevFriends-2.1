import { axiosGlobal } from '@/interceptor'
import { AxiosRequestConfig } from 'axios'

export const compositeServices = (config: AxiosRequestConfig) => {
  return axiosGlobal(config)
}
