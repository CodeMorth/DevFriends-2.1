'use client'
import { AccordionHorizontal } from '@/components/design'
import { AudioPlayer } from '@/components/musica/AudioPlayer'
import { SlugTablas } from '@/components/organins'
import { userLocalStoras } from '@/hook'
import { generateTokenInvitations } from '@/services/generateTokenInvitation.service'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaShareAltSquare } from 'react-icons/fa'
import { FaRegCirclePause, FaRegCirclePlay } from 'react-icons/fa6'
import { toast } from 'sonner'

export default function Page({ params }: { params: { slug: string } }) {
  const [idWork, setidWork] = useState<any>({ id_work_space: null })
  //estado del link de la musica
  const [Musica, setMusica] = useState<any>('')
  //estado de referencia del play o pause
  const audioPlayerRef = useRef<any>(null)

  const [tokenIn, setTokenIn] = useState<string>('')

  const { obtenerLocal } = userLocalStoras()

  const slug = params.slug

  useEffect(() => {
    const id = obtenerLocal('work_space')
    if (id !== null) setidWork({ id_work_space: id })

    // Elimina el token después de 1 minuto
    setTimeout(() => {
      setTokenIn('')
    }, 60000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIn])

  const generadorInvitation = async () => {
    await generateTokenInvitations(idWork).then((res: any) =>
      setTokenIn(res.data)
    ).catch

    // Elimina el token después de 1 minuto
    setTimeout(() => {
      setTokenIn('')
    }, 1500000000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenIn).then(() => {
      toast.success('Codigo de Invitacion copiado ')
    })
  }
  // funcion para darle play  usando el estado de referencia
  const handlePlay = () => {
    audioPlayerRef.current.play()
  }
  // funcion para darle pause  usando el estado de referencia
  const handlePause = () => {
    audioPlayerRef.current.pause()
  }
  // funcion para manejar volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value, 10)
    audioPlayerRef.current?.setVolume(volume)
  }

  return (
    <>
      <div className="SlugDashboard ">
        <div className="container-slug-dashboard ">
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
              <h1 className="title-table">{decodeURIComponent(slug)}</h1>

              <div className="container_input_link_musica ">
                {Musica !== '' && (
                  <div className="content_input_play_pause">
                    <FaRegCirclePlay onClick={handlePlay} className='cursor-pointer' />

                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="100"
                      onChange={handleVolumeChange}
                    />

                    <FaRegCirclePause onClick={handlePause} className='cursor-pointer' />
                  </div>
                )}

                <input
                  placeholder="Coloca link de tu musica "
                  type="text"
                  name="musicaElegir"
                  onChange={(e) => setMusica(e.target.value)}
                />
              </div>

              <AudioPlayer videoUrl={Musica} ref={audioPlayerRef} />

              <div className="generate-token-container ">
                <button onClick={generadorInvitation} className="button-share">
                  <div>
                    <FaShareAltSquare />
                  </div>
                  <p>Generar Codigo Invitation</p>
                </button>
                {tokenIn !== '' && (
                  <div className="flex justify-between items-center w-full button-share">
                    <h3 className="!text-[1.3rem]">
                      {tokenIn.slice(0, 10)}...{tokenIn.slice(-10)}
                    </h3>
                    <span
                      className=" p-[.5rem] bg-[#2B3146] !text-[1.3rem] rounded-md hover:cursor-pointer duration-300 ease-in-out hover:bg-[#4E5163]"
                      onClick={handleCopy}
                    >
                      Copiar
                    </span>
                  </div>
                )}
              </div>
            </div>
            <SlugTablas />
          </div>
        </div>
      </div>
    </>
  )
}
