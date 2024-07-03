import { userTypeLRU } from '@/interface/components'

export const InputToFormData = (event: React.FormEvent<HTMLFormElement>): userTypeLRU => {

  const convertedData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries()) as userTypeLRU

  return convertedData
}
