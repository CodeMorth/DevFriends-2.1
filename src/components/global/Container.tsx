import React from 'react'

export const Container = ({children}:React.PropsWithChildren) => {
  return (
    <div className='container-prin bg-primaryBlack'>
        {children}
    </div>
  )
}

