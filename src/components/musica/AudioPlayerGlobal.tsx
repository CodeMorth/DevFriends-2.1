import React, { forwardRef, useImperativeHandle, useRef } from 'react'

// eslint-disable-next-line react/display-name
export const AudioPlayerGlobal = forwardRef(({ videoUrlGlobal }: any, ref) => {
  const iframeRefGlobal = useRef<HTMLIFrameElement>(null)
  const videoId = videoUrlGlobal.split('v=')[1]?.split('&')[0] // Extract the video ID

  useImperativeHandle(ref, () => ({
    play() {
      iframeRefGlobal.current?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    },
    pause() {
      iframeRefGlobal.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    },
    setVolume(volume: number) {
      iframeRefGlobal.current?.contentWindow?.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, '*')
    }
  }))

  if (!videoUrlGlobal) {
    return <p className="content_video_music_two "></p>
  }
  return (
    <div className="content_video_music ">
      <iframe
        ref={iframeRefGlobal}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&controls=1&loop=1&playlist=${videoId}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Audio"
      ></iframe>
    </div>
  )
})
