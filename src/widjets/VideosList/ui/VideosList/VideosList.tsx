import Link from 'next/link'
import s from './VideosList.module.css'
import React from 'react'
import Image from 'next/image'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'

type VideosListProps = {
 data: GetAllVideosDto['data']
}

export const  VideosList = ({data}: VideosListProps) => {
if(data?.length <= 0){
  return <div className={s.noVideos}>Нет видео</div>
}

  return (
     <div className={s.videoGrid}>
      {data.map((videoInfo) => (
          <div className={s.videoBlock} key={videoInfo.videoId}>
            <Link href={`/video/${videoInfo.videoId}`} className={s.videoPreview}>
            <Image 
            unoptimized
            fill
            src={`https://img.youtube.com/vi/${videoInfo.videoId}/hqdefault.jpg`} 
            alt="видео с ютуб"
            className={s.vodeoImg}
            />
             </Link>

            <div className={s.videoInfoContainer}>

            <div className={s.chanelImage}>
            <Link href={`/profile/${videoInfo.authorUrl}`} className={s.hiddenText}>
            {videoInfo.authorName}
            </Link>
            </div>

            <div className={s.videoInfo}>
              <Link href={`/video/${videoInfo.videoId}`} className={s.videoTitleLink}>
              <b>{videoInfo.title}</b>
              </Link>

              <Link href={`/profile/${videoInfo.authorUrl}`} className={s.chanelNameLink}>
              {videoInfo.authorName}
              </Link>
            </div>

            </div> 
            <Link href={`/video/${videoInfo.videoId}`} className={s.link}/> 
          </div>
        ))}
    </div>
  )
}
