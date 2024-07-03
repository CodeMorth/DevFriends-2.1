import { userTypeLRU } from '@/interface/components'

export const ObjectToFormData = (obj: userTypeLRU): FormData => {
  const formData = new FormData()

  for (let key in obj) {
    formData.append(key, obj[key])
  }

  return formData
}
