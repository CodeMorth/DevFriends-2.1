"use client"; 
import { AccordionHorizontal } from '@/components/design'
import { SlugTablas } from '@/components/organins'
import { userLocalStoras } from '@/hook';
import { generateTokenInvitations } from '@/services/generateTokenInvitation.service';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FaShareAltSquare } from 'react-icons/fa'
import { toast } from 'sonner';

export default function Page({ params }: { params: { slug: string } }) {

  const [idWork, setidWork] = useState<any>({ id_work_space : null});

  const [tokenIn , setTokenIn] = useState<string>('')

  const slug = params.slug; 
  const {obtenerLocal} = userLocalStoras()

  useEffect(() => {
    const id: any = obtenerLocal('work_space');
    if (id !== null) setidWork({ ...idWork, id_work_space: id });

    // Elimina el token después de 1 minuto
    if (tokenIn) {
      const timer = setTimeout(() => {
        setTokenIn('');
      }, 60000); 

     
      return () => clearTimeout(timer);
    }
  }, [tokenIn]);
  


  const generadorInvitation = () => {
    generateTokenInvitations(idWork).then((res: any) => setTokenIn(res.data)).catch( (err :any) => console.log(err))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenIn).then(() => {
      toast.success("Codigo de Invitacion copiado ");
    }).catch((err) => {
      console.error("Error al copiar el token: ", err);
    });
  };


  
  return (
    <>
      <div className="SlugDashboard">
        <div className="container-slug-dashboard">
          <div className="container-slug-left">
            <div className="menu-slug">
              <AccordionHorizontal title={'Dev Friend'} titleColor="#f969aa">
                <div className="container">
                  <div className="boards-container">
                    <div className="boards-image">
                      <Image
                        src={'/dashboard/tablero.png'}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-full"
                      ></Image>
                    </div>
                    <h1 className="boards-text">Tableros</h1>
                  </div>
                  <div className="members-container">
                    <div className="members-image">
                      <Image
                        src={'/dashboard/group_2990282.png'}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-full"
                      ></Image>
                    </div>
                    <div className="members-text">Miembros +</div>
                  </div>
                </div>
              </AccordionHorizontal>
            </div>
          </div>
          <div className="container-slug-rigth">
            <div className="header-rigth">
              <h1 className="title-table">{decodeURIComponent(slug!)}</h1>

              <div className='flex flex-col gap-[1rem]'>
              <button  onClick={generadorInvitation} className="button-share">
                <div>
                  <FaShareAltSquare />
                </div>
                <p>Generar Codigo Invitation</p>
              </button>
              {
                tokenIn !== '' &&  <div className='flex justify-between items-center w-full button-share'>
                <h3 className='!text-[1.3rem]'>
                {tokenIn.slice(0, 10)}...{tokenIn.slice(-10)}
                  </h3>
                  <span className=' p-[.5rem] bg-[#2B3146] !text-[1.3rem] rounded-md hover:cursor-pointer duration-300 ease-in-out hover:bg-[#4E5163]'  onClick={handleCopy} >Copiar</span>
                </div>
              }
            
           
              </div>
            
            </div>
            <SlugTablas />
          </div>
        </div>
      </div>
    </>
  )
}
