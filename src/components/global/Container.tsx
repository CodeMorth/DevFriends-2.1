import React from 'react'

export const Container = ({children}:React.PropsWithChildren) => {
  return (
    <div className='container-prin bg-[#1F2937]'>
        {children}
    </div>
  )
}

