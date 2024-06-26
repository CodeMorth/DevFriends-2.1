import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Inputs = ( props:Props) => {
  return (
    <input className='input-modal ' {...props} />
  )
}

