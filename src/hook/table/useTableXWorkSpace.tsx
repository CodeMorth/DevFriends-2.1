import { getTablesWorkSpaceS } from '@/services/table.service'
import { useState } from 'react'

const useTableXWorkSpace = () => {
  const [tableWorkSpaces, settableWorkSpaces] = useState<any>(null)

  const getTableWorkSpaces = async (id: string) => {
    const response = await getTablesWorkSpaceS(id)

    settableWorkSpaces(response.data.tablasTheWorkSpace)
  }

  return { tableWorkSpaces, getTableWorkSpaces }
}

export default useTableXWorkSpace
