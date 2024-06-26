import React from 'react'

export const Container = ({children}:React.PropsWithChildren) => {
  return (
    <div className='container-prin bg-[#2B3146]'>
        {children}
    </div>
  )
}

