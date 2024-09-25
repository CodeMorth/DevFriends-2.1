import { axiosGlobal } from "@/interceptor"


//generateToken
export const generateTokenInvitations = (data:any) => {
    return axiosGlobal.post(`generateToken`, data, {
      headers: { 'Content-Type': 'application/json' }
    })
  }


  //addGuestToWorkspace
   export const addGuestToWork = (data:any) => {
    return axiosGlobal.post(`addGuestToWorkspace`, data, {
      headers: { 'Content-Type': 'application/json' }
    })
   }
