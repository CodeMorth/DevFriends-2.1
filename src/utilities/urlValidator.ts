import { toast } from 'sonner'

export const urlValidator = (response: any) => {
  if (response.data.url === 'login') {
    toast.success('El ingreso se hizo correctamente')
    return response
  }
  if (response.data.url === 'register') {
    toast.success('El registro se hizo correctamente')
    return response
  }


}
