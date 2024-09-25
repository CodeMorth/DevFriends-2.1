import { WorkSpaceUser } from '@/interface/page'
import { allWorkSpacesUser } from '@/services'
import React, { useState } from 'react'

const useWorkSpaceAll = () => {
    const [Work_Space_user, setWork_Space_user] = useState< WorkSpaceUser[] | null >(null)

  
  const allWorkSpaces = () => {
    allWorkSpacesUser()
    .then(({ data }) => setWork_Space_user(data.workAllUser))
    .catch((error) => console.log(error))
  }



  return { Work_Space_user, allWorkSpaces , setWork_Space_user}
}

export default useWorkSpaceAll