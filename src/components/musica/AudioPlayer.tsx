import React from 'react';

export const AudioPlayer = ({ videoUrl }: any) => {
    
    const videoId = videoUrl.split('v=')[1]?.split('&')[0]; // Extract the video ID


   
    

 if(!videoUrl){
   
return <p className='content_video_music_two '>
   
</p>
 }
 

    return (
        <div className='content_video_music '>
            <iframe
            className='w-full h-full'
               
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&loop=1&playlist=${videoId}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube Audio"
            ></iframe>
        </div>
    );
};
