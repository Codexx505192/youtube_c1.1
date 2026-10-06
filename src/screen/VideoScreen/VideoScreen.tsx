'use client'
import Link from 'next/link'
import s from './VideoScreen.module.css'
import { VideoDto } from '@/shared/types/typesFromBackend'
import { useEffect } from 'react'

type VideoScreenProps = {
    videoId: string
}

export const VideoScreen = ({ videoId }: VideoScreenProps) => {
  useEffect(() => {
      (async () => {
        try {
          const dataFromServer = await fetch(`/api/videos?video=${videoId}`)
  
          const response = await dataFromServer.json() as VideoDto
          console.log('response', response)
          
          // setData(response.data)
        } catch (error) {
          
          console.error('Ошибка при загрузке видео:', error)
        } finally {
          // setIsLoading(false)
        }
      })()

    }, [videoId])

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
       
       <b className={s.videoTitle}>название ролика</b>

       <div className={s.videoInfoContainer}>

            <div className={s.chanelImage}>
            <Link href="/2" className={s.hiddenText}>название канала</Link>
            </div>

              <Link href="/4" className={s.chanelNameLink}>
              название канала
              </Link>
            </div> 
    </div>
  )
}