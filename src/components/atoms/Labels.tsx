import React from 'react';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Labels = ({children, ...props}: Props) => {
  
  return <label className='font-bold sm:px-[1rem] text-[1.8rem] lg:text-[2rem] text-primaryPink' {...props}>{children}</label>; 
}

