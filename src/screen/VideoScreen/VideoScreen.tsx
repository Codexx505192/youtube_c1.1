'use client'
import Link from 'next/link'
import s from './VideoScreen.module.css'
import { GetOneVideoDto, VideoDto } from '@/shared/types/typesFromBackend'
import { useEffect, useState } from 'react'


type VideoScreenProps = {
    data: VideoDto
}

export const VideoScreen = ({ data }: VideoScreenProps) => {
 

  // if(!data) return null

  return (
    <div className={s.container}>
        <iframe className={s.iframe}
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
       
       <b className={s.videoTitle}>{data.title}</b>

       <div className={s.videoInfoContainer}>

            <div className={s.chanelImage}>
            <Link href={`/profile/${data.authorUrl}`} className={s.hiddenText}>
            {data.authorName}
            </Link>
            </div>

              <Link href={`/profile/${data.authorUrl}`} className={s.chanelNameLink}>
              {data.authorUrl}
              </Link>
            </div> 
    </div>
  )
}