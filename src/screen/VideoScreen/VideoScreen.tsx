'use client'
import Link from 'next/link'
import s from './VideoScreen.module.css'
import { GetOneVideoDto, VideoDto } from '@/shared/types/typesFromBackend'
import { useEffect, useState } from 'react'
import { da } from 'zod/locales'

type VideoScreenProps = {
    videoId: string
}

export const VideoScreen = ({ videoId }: VideoScreenProps) => {
const [isLoading, setIsLoading] = useState(true)
const [data, setData] = useState<GetOneVideoDto['data'] | null>(null)

  useEffect(() => {
      (async () => {
        try {
          const dataFromServer = await fetch(`/api/videos?videoId=${videoId}`)
  
          const response = await dataFromServer.json() as GetOneVideoDto
          console.log('response', response)
          
          if(response.data){
            setData(response.data)
          }
        } catch (error) {
          
          console.error('Ошибка при загрузке видео:', error)
        } finally {
          setIsLoading(false)
        }
      })()

    }, [videoId])

    if (isLoading) {
    return <div>загрузка...</div>
  }

  if(!data) return null

  return (
    <div className={s.container}>
        <iframe className={s.iframe}
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
       
       <b className={s.videoTitle}>{data.title}</b>

       <div className={s.videoInfoContainer}>

            <div className={s.chanelImage}>
            <Link href={`/profile/${data.author_url}`} className={s.hiddenText}>{data.author_name}</Link>
            </div>

              <Link href={`/profile/${data.author_url}`} className={s.chanelNameLink}>
              {data.author_name}
              </Link>
            </div> 
    </div>
  )
}