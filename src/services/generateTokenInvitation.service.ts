import { axiosGlobal } from '@/interceptor'

//generateToken
export const generateTokenInvitations = (data: any) => {
  
  console.log("data del generateTokenInvitations",data)

  return axiosGlobal.post(`generateToken`, data)
}

//addGuestToWorkspace
export const addGuestToWork = (data: any) => {
  return axiosGlobal.post(`addGuestToWorkspace`, data)
}
