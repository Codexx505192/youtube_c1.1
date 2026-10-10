'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import  Image from 'next/image'
import s from './HomeScree.module.css'
import Link from 'next/link'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'
import { DEFAULT_CATEGORY, VIDEO_CATEGORIES } from '@/shared/constants/videoCategories'
import { VideosList } from '@/widjets/VideosList'

interface FormValues {
  videoUrl: string
}

type HomeScreenProps = {
  data: GetAllVideosDto['data']
  categories: typeof VIDEO_CATEGORIES
}

export const HomeScreen = ({data,categories}: HomeScreenProps) => {

 console.log('process.env.SERVER_API_URL', process.env.SERVER_API_URL)
 console.log('NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST)
 
  return (
    <div className={s.container}>
      <div className={s.categoriesContainer}>
     <Link 
     href="/" className={s.categoryLink}>
      {DEFAULT_CATEGORY.title}
     </Link>  

     {categories.length > 0 && 
      categories.map((category) => (
       <Link 
       key={category.id} 
       href={`/${category.id}`} 
       className={s.categoryLink}>
        {category.title}
        </Link>
      ))
     }
      </div>

    {/* <div className={s.videoGrid}>

      {data?.length > 0 ? (
        data.map((videoInfo) => (
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
        ))
      ) : (
        <div>нет видео</div>
      )}
    </div> */}

    <VideosList data={data} />
    </div>
  )
}