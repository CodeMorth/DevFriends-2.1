
import React from 'react'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonsTwo = ({children, ...props}: Props) => {

  
  

  return <button className={` content-top-boards`}
   {...props}>
    {children}
  </button>
}

