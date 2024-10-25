
import { userTypeLRU } from '@/interface/components'
import { compositeServices } from '@/utilities/compositeServices'

export const postRegister = (data: userTypeLRU) => {
  return compositeServices({
    url: 'register',
    method: 'POST',
    data
  })
}

export const postLogin = (data: userTypeLRU) => {
  return compositeServices({
    url: 'loginUser',
    method: 'POST',
    data
  })
}

export const putUpdateS = (data: any) => {
  return compositeServices({
    url: 'updateUser',
    method: 'PUT',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getByToken = () => {
  return compositeServices({
    url: 'userData',
    method: 'GET'
  })
}

export const getByIdS = (id: string) => {
  return compositeServices({
    url: `userId/${id}`,
    method: 'GET'
  })
}

export const deleteById = (id: string) => {
  return compositeServices({
    url: `userDelete/${id}`,
    method: 'DELETE'
  })
}

export const logoutService = () => {
  compositeServices({
    url: 'logout',
    method: 'POST'
  })
}

export const allUserTableService = () => {
  return compositeServices({
    url: 'tablaAllUser',
    method: 'GET'
  })
}
