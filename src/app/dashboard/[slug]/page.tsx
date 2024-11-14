'use client'
import { AccordionHorizontal } from '@/components/design'

import { userLocalStoras } from '@/hook'
import { generateTokenInvitations } from '@/services/generateTokenInvitation.service'
import { musicaService, musicaTable } from '@/services/musica.service'
import { useEffect, useRef, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { socket } from '@/lib/socket'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { BiCog } from 'react-icons/bi'
import TasksPage from '@/components/page/slug/TasksPage'
import {
  ConfigurationWorkSpaces,
  MembersWorkSpaces,
  ModalCodigoInvitation
} from '@/components/molecules'
import { useMultipleModal } from '@/hook/useMultipeModal'

export default function Page({ params }: any) {
  const searchParams = useSearchParams()

  const { isModalOpen, openModals, closeModals } = useMultipleModal()


  //estado para mostrar la musica local o global
  const [TipoMusica, setTipoMusica] = useState(' ')

  const [idWork, setIdWork] = useState<any>({ id_work_space: null })
  //estado del link de la musica
  const [Musica, setMusica] = useState<any>(' ')
  //estado del link de la musica Global
  const [MusicaGlobal, setMusicaGlobal] = useState<any>(' ')
  //neuvo estado de musica global
  const [prevMusicaGlobal, setPrevMusicaGlobal] = useState<any>(' ')

  const [dataSelected, setdataSelected] = useState('')

  //estado de referencia del play o pause
  const audioPlayerRef = useRef<any>(null)
  const audioPlayerGlobalRef = useRef<any>(null)

  const [tokenIn, setTokenIn] = useState<string>('')

  const { obtenerLocal } = userLocalStoras()

  const { slug } = params
  const idTable: any = searchParams.get('id')

  //sokect io de musica global
  useEffect(() => {
    // Unirse a la sala específica de la tarjeta cuando el componente se monta
    socket.emit('joinTable', idTable)

    if (TipoMusica === 'global') {
      socket.on('addMusic', (data) => {
        setMusicaGlobal(data.musicaUpdate)
      })
    }

    // Limpia el evento cuando el componente se desmonte
    return () => {
      socket.off('addMusic')
    }
  }, [TipoMusica, setMusicaGlobal])

  useEffect(() => {
    const id = obtenerLocal('work_space')
    if (id !== null) setIdWork(id)

    // Elimina el token después de 1 minuto
    setTimeout(() => {
      setTokenIn('')
    }, 60000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIn])

  const generadorInvitation = async () => {
    await generateTokenInvitations({
      id_work_space: idWork,
      id_table: idTable
    }).then((res: any) => setTokenIn(res.data)).catch

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
  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: any
  ) => {
    const volume = parseInt(e.target.value, 10)
    ref.current?.setVolume(volume)
  }

  const changeMusica = (e: any) => {
    if (e.target.value === ' ') {
      setMusica(' ')
      setMusicaGlobal(' ')
    }
    setTipoMusica(e.target.value)
  }

  //funcion para llamar link de la base de dato
  const getMusicaGlobal = async () => {
    await musicaTable(idTable)
      .then((res) => setMusicaGlobal(res.data[0].link_musica))
      .catch((error) => console.log(error))
  }
  //funcion para enviar el link de musica

  const postMusicaglobal = async () => {
    const musicaDatos = {
      link_musica: MusicaGlobal,
      id_table: idTable
    }
    await musicaService(musicaDatos)
  }

  //llamado al link global
  useEffect(() => {
    if (TipoMusica === 'global') {
      getMusicaGlobal()
    }
  }, [TipoMusica])

  // Evaluar cambios en MusicaGlobal
  useEffect(() => {
    // Compara con el valor anterior
    if (MusicaGlobal !== prevMusicaGlobal) {
      postMusicaglobal()
        .then(() => getMusicaGlobal()) // Luego obtiene el nuevo valor
        .catch((error) => console.log(error))
    }
    setPrevMusicaGlobal(MusicaGlobal) // Actualiza el valor anterior
  }, [MusicaGlobal])
  return (
    <>
      <div className="SlugDashboard ">
        <div className="container-slug-dashboard ">
          <div className="container-slug-left">
            <div className="menu-slug">
              <AccordionHorizontal title={'Dev Friend'} titleColor="#f969aa">
                <div className="container">
                  <button
                    onClick={() => {
                      setdataSelected('task')
                    }}
                    className="boards-container"
                  >
                    <div className="icon_container">
                      <MdOutlineDashboardCustomize className="w-full h-full" />
                    </div>
                    <h1 className="boards-text">Tareas</h1>
                  </button>
                  <button
                    onClick={() => {
                      setdataSelected('membersWorks')
                    }}
                    className="members-container"
                  >
                    <div className="icon_container">
                      <FaUsers className="w-full h-full" />
                    </div>
                    <div className="members-text">Miembros</div>
                  </button>
                  <button
                    onClick={() => {
                      setdataSelected('configurationWorks')
                    }}
                    className="members-container"
                  >
                    <div className="icon_container">
                      <BiCog className="w-full h-full" />
                    </div>
                    <span className="members-text">Configuración</span>
                  </button>
                </div>
              </AccordionHorizontal>
            </div>
            <div>
            <p
                onClick={() => openModals('codigo')}
                className="mt-[1.5rem] bg-[#F183B6] mx-10 p-2 text-center text-3xl  font-bold text-[#2B3146] rounded-md duration-300 ease-in-out hover:bg-primaryPink hover:cursor-pointer"
              >
                Código de Invitación
              </p>
            </div>
          </div>
          {dataSelected === 'task' && (
            <TasksPage
              slug={slug}
              changeMusica={changeMusica}
              TipoMusica={TipoMusica}
              setMusica={setMusica}
              Musica={Musica}
              setMusicaGlobal={setMusicaGlobal}
              MusicaGlobal={MusicaGlobal}
              audioPlayerRef={audioPlayerRef}
              audioPlayerGlobalRef={audioPlayerGlobalRef}
              handlePlay={handlePlay}
              handlePause={handlePause}
              handleVolumeChange={handleVolumeChange}
              generadorInvitation={generadorInvitation}
              tokenIn={tokenIn}
              handleCopy={handleCopy}
            />
          )}
          {dataSelected === 'membersWorks' && (
           <div className='flex justify-center items-center w-full p-20 h-full'>
             <MembersWorkSpaces idWork={idWork} />
           </div>
          )}
          {dataSelected === 'configurationWorks' && (
            <div className='py-20 w-full'>
              <ConfigurationWorkSpaces idWork={idWork} idTable={idTable}/>
            </div>

          )}
        </div>
      </div>
      <ModalCodigoInvitation
          visible={isModalOpen('codigo')}
          closeModal={() => closeModals('codigo')}
        />
    </>
  )
}
