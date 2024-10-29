import { getByToken, putUpdateS } from '@/services'
import { useEffect, useState } from 'react'

const useProfileService = () => {
  const [data, setdata] = useState<any>({})
  const [loading, setloading] = useState<any>({})

  const getByIdH = async () => {
    try {
      setloading((prev: any) => ({ ...prev, getByToken: true }))
      const response = await getByToken()
      setdata((prev: any) => ({ ...prev, getByToken: response.data }))
    } catch (error) {
    } finally {
      setloading((prev: any) => ({ ...prev, getByToken: false }))
    }
  }

  const putUpdateH = async (data: any) => {
    try {
      setloading((prev: any) => ({ ...prev, putUpdate: true }))
      const response = await putUpdateS(data)
      setdata((prev: any) => ({ ...prev, putUpdate: response.data.user }))
    } catch (error) {
    } finally {
      setloading((prev: any) => ({ ...prev, putUpdate: false }))
      getByIdH()
    }
  }
  useEffect(() => {
    getByIdH()
  }, [])

  return { data, loading, putUpdateH }
}

export default useProfileService
