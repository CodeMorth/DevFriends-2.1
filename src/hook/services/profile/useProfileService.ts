import { getByIdS, putUpdateS } from '@/services'
import { useEffect, useState } from 'react'

const useProfileService = (id: string) => {
  const [data, setdata] = useState<any>({})
  const [loading, setloading] = useState<any>({})

  const getByIdH = async () => {
    try {
      setloading((prev: any) => ({ ...prev, getById: true }))
      const response = await getByIdS(id)
      setdata((prev: any) => ({ ...prev, getById: response.data.user }))
    } catch (error) {
    } finally {
      setloading((prev: any) => ({ ...prev, getById: false }))
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
    }
  }
  useEffect(() => {
    getByIdH()
  }, [])

  return { data, loading, putUpdateH }
}

export default useProfileService
