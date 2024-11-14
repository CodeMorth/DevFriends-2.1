import { AudioPlayer } from '@/components/musica/AudioPlayer'
import { AudioPlayerGlobal } from '@/components/musica/AudioPlayerGlobal'
import { SlugTablas } from '@/components/organins'
import React from 'react'
import { FaShareAltSquare } from 'react-icons/fa'
import { FaRegCirclePause, FaRegCirclePlay } from 'react-icons/fa6'

interface TasksPageProps {
  slug: string
  changeMusica: any
  TipoMusica: any
  setMusica: any
  Musica: any
  setMusicaGlobal: any
  MusicaGlobal: any
  audioPlayerRef: any
  audioPlayerGlobalRef: any
  handlePlay: any
  handlePause: any
  handleVolumeChange: any
  generadorInvitation: any
  tokenIn: any
  handleCopy: any
}

const TasksPage = ({
  slug,
  changeMusica,
  TipoMusica,
  setMusica,
  Musica,
  setMusicaGlobal,
  MusicaGlobal,
  audioPlayerRef,
  audioPlayerGlobalRef,
  handlePlay,
  handlePause,
  handleVolumeChange,
  generadorInvitation,
  tokenIn,
  handleCopy
}: TasksPageProps) => {
  return (
    <>
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
                  onChange={(e) => handleVolumeChange(e, audioPlayerRef)}
                />

                <FaRegCirclePause
                  onClick={() => handlePause(audioPlayerRef)}
                  className="cursor-pointer"
                />
              </div>
            )}
            {/* musica global */}
            {TipoMusica === 'global' && (
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
                  onChange={(e) => handleVolumeChange(e, audioPlayerGlobalRef)}
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
            <button
              onClick={generadorInvitation}
              className=" btn_login_box_ingreso "
            >
              <div>
                <FaShareAltSquare />
              </div>
              <p>Invitar Amigo</p>
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
    </>
  )
}

export default TasksPage
