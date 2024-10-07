import { toast } from 'sonner'
import { setLocalStorage } from '@/utilities'

export const urlValidator = (response: any) => {
  if (response.data.url === 'login') {
    setLocalStorage('token', response.data.token)
    toast.success('El ingreso se hizo correctamente')
    return response
  }
  if (response.data.url === 'register') {
    toast.success('El registro se hizo correctamente')
    return response
  }
  if (response.data.url === 'updateUser') {
    toast.success('El usuario se modifico correctamente')
    return response
  }
}
