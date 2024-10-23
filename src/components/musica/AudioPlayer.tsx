import React, { forwardRef, useImperativeHandle, useRef } from 'react'

// eslint-disable-next-line react/display-name
export const AudioPlayer = forwardRef(({ videoUrl }: any, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const videoId = videoUrl.split('v=')[1]?.split('&')[0] // Extract the video ID

  useImperativeHandle(ref, () => ({
    play() {
      iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    },
    pause() {
      iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    },
    setVolume(volume: number) {
      iframeRef.current?.contentWindow?.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, '*')
    }
  }))

  if (!videoUrl) {
    return <p className="content_video_music_two "></p>
  }
  return (
    <div className="content_video_music ">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&controls=1&loop=1&playlist=${videoId}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Audio"
      ></iframe>
    </div>
  )
})
