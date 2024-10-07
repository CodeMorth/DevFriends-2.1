import { WorkSpaceUser } from '@/interface/page'
import { sAllWorkSpacesUser } from '@/services'
import { useState } from 'react'

const useWorkSpaceAll = () => {
  const [WorkSpaceUser, setWorkSpaceUser] = useState<WorkSpaceUser[] | null>(null)

  const getAllWorkSpaces = () => {
    sAllWorkSpacesUser().then(({ data }) => setWorkSpaceUser(data.workAllUser)).catch((error) => console.log(error))
  }

  return { WorkSpaceUser, getAllWorkSpaces, setWorkSpaceUser }
}

export default useWorkSpaceAll
