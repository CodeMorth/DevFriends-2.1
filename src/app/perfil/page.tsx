import { Inputs, Labels } from '@/components/atoms';
import Image from 'next/image';
import React from 'react';

function index() {
  return (
    <div className='perfil-box main-page'>
      <div className='logo'>
        <div className='imagen-logo-tw'>
          <Image
            src={'/logo/logo-tareas.png'}
            alt='logo'
            width={1000}
            height={1000}
            className='w-full h-full drop-shadow-[0px_1px_2px_#4C6E9E]'
          />
        </div>

        <div className='logo-name_two'>
          <h3>Dev</h3>
          <h2>Friend</h2>
        </div>
      </div>

      <div className='data-perfil'>
        <div className='imagen-avatar'>
          <Image
            src={'/avatar.png'}
            alt='logo'
            width={1000}
            height={1000}
            className='w-full h-full'
          />
        </div>
        
        <div className='box-inputs'>
         <div className='flex flex-col gap-[1rem]'>
          <Labels htmlFor='nombre'>Nombre</Labels>
         <Inputs id='nombre' placeholder='Nombre'/>
         </div>

         <div className='flex flex-col gap-[1rem]'>
          <Labels htmlFor='email'>Email</Labels>
         <Inputs id='email' placeholder='email@gmail.com'/>
         </div>

         <div className='flex flex-col gap-[1rem]'>
          <Labels htmlFor='password'>Password</Labels>
         <Inputs id='password' placeholder='******'/>
         </div>


         <div className='flex flex-col gap-[1rem]'>
          <Labels htmlFor='password'>Password</Labels>
         <Inputs id='password' placeholder='******'/>
         </div>

        </div>
      </div>
    </div>
  );
}

export default index;
