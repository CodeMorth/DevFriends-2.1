import { axiosGlobal } from '@/interceptor'

export const postCreateWorkSpace = (data: object) => {
  return axiosGlobal.post('work_space', data)
}

export const getWorkSpace = (id: string) => {
  return axiosGlobal.get(`workSpaceId/${id}`)
}

//all_Work_spaces_user

export const sAllWorkSpacesUser = () => {
  return axiosGlobal.get(`all_Work_spaces_user`)
}

export const updateWorkSpace = (id: string, data: object) => {
  return axiosGlobal.put(`updateWork_space/${id}`, data)
}

export const deleteWorkSpaceS = (id: string) => {
  return axiosGlobal.delete(`deleteWork_space/${id}`)
}
