import React from 'react'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Buttonss = ({ children, ...props }: Props) => {
  return (
    <button className={` btn_login_box_ingreso`} {...props}>
      {children}
    </button>
  )
}
