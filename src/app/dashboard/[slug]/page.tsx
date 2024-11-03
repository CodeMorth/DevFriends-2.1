'use client'
import { AccordionHorizontal } from '@/components/design'
import { AudioPlayer } from '@/components/musica/AudioPlayer'
import { AudioPlayerGlobal } from '@/components/musica/AudioPlayerGlobal'
import { SlugTablas } from '@/components/organins'
import { userLocalStoras } from '@/hook'
import { generateTokenInvitations } from '@/services/generateTokenInvitation.service'
import { musicaService, musicaTable } from '@/services/musica.service'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaShareAltSquare } from 'react-icons/fa'
import { FaRegCirclePause, FaRegCirclePlay } from 'react-icons/fa6'
import { toast } from 'sonner'
import { useSearchParams} from 'next/navigation';

export default function Page({ params }: any) {



 

  const searchParams = useSearchParams();
  //estado para mostrar la musica local o global
  const [TipoMusica, setTipoMusica] = useState(' ')

  const [idWork, setIdWork] = useState<any>({ id_work_space: null })
  //estado del link de la musica
  const [Musica, setMusica] = useState<any>(" ")
  //estado del link de la musica Global
  const [MusicaGlobal, setMusicaGlobal] = useState<any>(" ")
//neuvo estado de musica global
const [prevMusicaGlobal, setPrevMusicaGlobal] = useState<any>(" ");

  //estado de referencia del play o pause
  const audioPlayerRef = useRef<any>(null)
  const audioPlayerGlobalRef = useRef<any>(null)

  const [tokenIn, setTokenIn] = useState<string>('')

  const { obtenerLocal } = userLocalStoras()

  const { slug } = params;
  const idTable:any = searchParams.get('id');


  useEffect(() => {
    const id = obtenerLocal('work_space')
    if (id !== null) setIdWork({ id_work_space: id })

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

  const handlePlay = (ref: any) => ref.current.play()
  const handlePause = (ref: any) => ref.current.pause()

  // funcion para manejar volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>,ref:any) => {
    const volume = parseInt(e.target.value, 10)
    ref.current?.setVolume(volume)
  }

  const changeMusica = (e: any) => {
 
    if (e.target.value === " ") {
      setMusica(" ")
      setMusicaGlobal(" ")
    }
    setTipoMusica(e.target.value);
   
  }



  //funcion para llamar link de la base de dato

  const getMusicaGlobal = async () => {
     await musicaTable(idTable).then(res=> setMusicaGlobal(res.data[0].link_musica )).catch(error => console.log(error))
  }
  //funcion para enviar el link de musica

  const postMusicaglobal = async () => {
    const musicaDatos = {
      link_musica : MusicaGlobal ,
      id_table : idTable
    }
    await musicaService(musicaDatos)
  }

  //llamado al link global
 useEffect(() => {
  if (TipoMusica === "global") {
    getMusicaGlobal();
  }
 
}, [TipoMusica ]);

   // Evaluar cambios en MusicaGlobal
   useEffect(() => {
    // Compara con el valor anterior
    if (MusicaGlobal !== prevMusicaGlobal) { 
      postMusicaglobal() 
        .then(() => getMusicaGlobal()) // Luego obtiene el nuevo valor
        .catch(error => console.log(error));
    }
    setPrevMusicaGlobal(MusicaGlobal); // Actualiza el valor anterior

  
    
  }, [MusicaGlobal]);
  


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
                    <button className="boards-text">Tableros</button>
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
                    <button className="members-text">Miembros +</button>
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
                    <button className="members-text">Configuración</button>
                  </div>
                </div>
              </AccordionHorizontal>
            </div>
          </div>
          <div className="container-slug-right">
            <div className="header-right">
              <h1 className="title-table">{decodeURIComponent(slug)}</h1>

              <div className="container_input_link_musica ">
                <select onChange={changeMusica} value={TipoMusica}>
                  <option value=" ">elige el tipo de musica</option>
                  <option value="local">Musica Local</option>
                  <option value="global">Musica Global</option>
                </select>

                {TipoMusica === 'local' && (
                  <input
                    placeholder="Coloca link de tu musica "
                    type="text"
                    name="musicaElegir"
                    onChange={(e) => setMusica(e.target.value)}
                  />
                )}
                {Musica !== ' ' && (
                  <div className="content_input_play_pause">
                    <FaRegCirclePlay
                      onClick={() => handlePlay(audioPlayerRef)}
                      className="cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="100"
                      onChange={(e) =>handleVolumeChange(e,audioPlayerRef)}
                    />

                    <FaRegCirclePause
                      onClick={() => handlePause(audioPlayerRef)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
                 {/* musica global */}
                 {TipoMusica === "global" && (
                  <input
                    placeholder="Link musica Global"
                    type="text"
                    name="musicaElegir"
                    value={MusicaGlobal}
                    onChange={(e) => setMusicaGlobal(e.target.value)}
                  />
                )}
                {MusicaGlobal !== ' ' && (
                  <div className="content_input_play_pause">
                    <FaRegCirclePlay
                      onClick={() => handlePlay(audioPlayerGlobalRef)}
                      className="cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="100"
                      onChange={(e) =>handleVolumeChange(e,audioPlayerGlobalRef)}
                    />
                    <FaRegCirclePause
                      onClick={() => handlePause(audioPlayerGlobalRef)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {Musica !== ' ' ? (
                <AudioPlayer videoUrl={Musica} ref={audioPlayerRef} />
              ) : (
                <p className="content_video_music_two "></p>
              )}

              {MusicaGlobal !== ' ' && (
                <AudioPlayerGlobal
                  videoUrlGlobal={MusicaGlobal}
                  ref={audioPlayerGlobalRef}
                />
              )}

              <div className="generate-token-container ">
                <button onClick={generadorInvitation} className=" btn_login_box_ingreso ">
                  <div>
                    <FaShareAltSquare />
                  </div>
                  <p>Generar Codigo Invitation</p>
                </button>
                {tokenIn !== '' && (
                  <div className="flex justify-between items-center  btn_login_box_ingreso !text-[1rem] ">
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
