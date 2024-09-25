import { tablasUserWorkSpace } from '@/services/table.service'
import React, { useState } from 'react'

const useTable_x_work_space = ( ) => {

    const [tableWorkSpaces, settableWorkSpaces] = useState<any>(null)

    const getTableWorkSpaces = (id:any) => {
        tablasUserWorkSpace(id).then(res => settableWorkSpaces(res.data.tablasTheWorkSpace)).catch(err => console.log(err))
    }


  return { tableWorkSpaces, getTableWorkSpaces }
}

export default useTable_x_work_space