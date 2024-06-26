import React from 'react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextAreas = (props:Props) => {
  return (
    <textarea className='textArea-modal' {...props}></textarea>
  )
}

