import { axiosGlobal } from '@/interceptor'

export const postCreateWorkSpace = (data: object) => {
  return axiosGlobal.post('work_space', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const getWorkSpace = (id: string) => {
  return axiosGlobal.get(`workSpaceId/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}


//all_Work_spaces_user

export const allWorkSpacesUser = () => {
  return axiosGlobal.get(`all_Work_spaces_user`, {
    headers: { 'Content-Type': 'application/json' }
  })
}