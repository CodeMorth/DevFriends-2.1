import { tablasUserWorkSpace } from '@/services/table.service'
import { useState } from 'react'

const useTable_x_work_space = () => {
  const [tableWorkSpaces, settableWorkSpaces] = useState<any>(null)

  const getTableWorkSpaces = async (id: any) => {
    const response = await tablasUserWorkSpace(id)

    settableWorkSpaces(response.data.tablasTheWorkSpace)
  }

  return { tableWorkSpaces, getTableWorkSpaces }
}

export default useTable_x_work_space
