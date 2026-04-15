import { AccordionHorizontal } from '@/components/design'
import TasksPage from '@/components/page/slug/TasksPage'
import {
  ConfigurationWorkSpaces,
  MembersWorkSpaces,
  ModalCodigoInvitation
} from '@/components/molecules'
import { userLocalStoras } from '@/hook'
import { useMultipleModal } from '@/hook/useMultipeModal'
import { generateTokenInvitations } from '@/services/generateTokenInvitation.service'
import { musicaService, musicaTable } from '@/services/musica.service'
import { socket } from '@/lib/socket'
import { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'
import { toast } from 'sonner'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { BiCog } from 'react-icons/bi'

export default function BoardSlugPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const { isModalOpen, openModals, closeModals } = useMultipleModal()

  const [TipoMusica, setTipoMusica] = useState(' ')
  const [idWork, setIdWork] = useState<string | { id_work_space: null }>(
    { id_work_space: null }
  )
  const [Musica, setMusica] = useState<string>(' ')
  const [MusicaGlobal, setMusicaGlobal] = useState<string>(' ')
  const [prevMusicaGlobal, setPrevMusicaGlobal] = useState<string>(' ')
  const [dataSelected, setdataSelected] = useState('')
  const audioPlayerRef = useRef<{
    play: () => void
    pause: () => void
    setVolume: (v: number) => void
  } | null>(null)
  const audioPlayerGlobalRef = useRef<{
    play: () => void
    pause: () => void
    setVolume: (v: number) => void
  } | null>(null)
  const [tokenIn, setTokenIn] = useState<string>('')

  const { obtenerLocal } = userLocalStoras()
  const idTable = searchParams.get('id')

  useEffect(() => {
    if (idTable) socket.emit('joinTable', idTable)

    if (TipoMusica === 'global') {
      socket.on('addMusic', (data: { musicaUpdate: string }) => {
        setMusicaGlobal(data.musicaUpdate)
      })
    }

    return () => {
      socket.off('addMusic')
    }
  }, [TipoMusica, idTable])

  useEffect(() => {
    const id = obtenerLocal('work_space')
    if (id !== null) setIdWork(id)

    setTimeout(() => {
      setTokenIn('')
    }, 60000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIn])

  const generadorInvitation = async () => {
    await generateTokenInvitations({
      id_work_space: idWork,
      id_table: idTable
    })
      .then((res: { data: string }) => setTokenIn(res.data))
      .catch(() => {})

    setTimeout(() => {
      setTokenIn('')
    }, 1500000000)
  }

  const handleCopy = () => {
    void navigator.clipboard.writeText(tokenIn).then(() => {
      toast.success('Codigo de Invitacion copiado ')
    })
  }

  const handlePlay = (ref: { current: { play: () => void } | null }) =>
    ref.current?.play()
  const handlePause = (ref: { current: { pause: () => void } | null }) =>
    ref.current?.pause()

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: { current: { setVolume?: (v: number) => void } | null }
  ) => {
    const volume = Number.parseInt(e.target.value, 10)
    ref.current?.setVolume?.(volume)
  }

  const changeMusica = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === ' ') {
      setMusica(' ')
      setMusicaGlobal(' ')
    }
    setTipoMusica(e.target.value)
  }

  const getMusicaGlobal = async () => {
    if (!idTable) return
    await musicaTable(idTable)
      .then((res) => setMusicaGlobal(res.data[0].link_musica))
      .catch((error) => console.log(error))
  }

  const postMusicaglobal = async () => {
    if (!idTable) return
    const musicaDatos = {
      link_musica: MusicaGlobal,
      id_table: idTable
    }
    await musicaService(musicaDatos)
  }

  useEffect(() => {
    if (TipoMusica === 'global') {
      void getMusicaGlobal()
    }
  }, [TipoMusica])

  useEffect(() => {
    if (MusicaGlobal !== prevMusicaGlobal) {
      void postMusicaglobal()
        .then(() => getMusicaGlobal())
        .catch((error) => console.log(error))
    }
    setPrevMusicaGlobal(MusicaGlobal)
  }, [MusicaGlobal])

  const slugStr = slug ?? ''

  return (
    <>
      <div className="SlugDashboard ">
        <div className="container-slug-dashboard ">
          <div className="container-slug-left">
            <div className="menu-slug">
              <AccordionHorizontal title={'Dev Friend'} titleColor="#f969aa">
                <div className="container">
                  <button
                    type="button"
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
                    type="button"
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
                    type="button"
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
                role="presentation"
                onClick={() => openModals('codigo')}
                className="mt-[1.5rem] bg-[#F183B6] mx-10 p-2 text-center text-3xl  font-bold text-[#2B3146] rounded-md duration-300 ease-in-out hover:bg-primaryPink hover:cursor-pointer"
              >
                Código de Invitación
              </p>
            </div>
          </div>
          {dataSelected === 'task' && (
            <TasksPage
              slug={slugStr}
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
            <div className="flex justify-center items-center w-full p-20 h-full">
              <MembersWorkSpaces idWork={idWork as string} />
            </div>
          )}
          {dataSelected === 'configurationWorks' && (
            <div className="py-20 w-full">
              <ConfigurationWorkSpaces
                idWork={idWork as string}
                idTable={idTable ?? undefined}
              />
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
