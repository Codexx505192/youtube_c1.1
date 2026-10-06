'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import  Image from 'next/image'
import Link from 'next/link'
import s from './HomeScree.module.css'

interface FormValues {
  videoUrl: string
}

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<string[] | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const hasVideoUrlInputError = Boolean(errors.videoUrl)

  useEffect(() => {
    (async () => {
      try {
        const dataFromServer = await fetch('/api/videos', {
          method: 'GET',
        })

        const response = await dataFromServer.json()
        
        setData(response.data)
      } catch (error) {
        
        console.error('Ошибка при загрузке видео:', error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const onSubmit = async (formData: FormValues) => {
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: formData.videoUrl }),
      })

      if (response.ok) {
        reset()
        const updatedData = await fetch('/api/videos').then((res) => res.json())
        setData(updatedData)
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error)
    }
  }

  if (isLoading) {
    return <div>загрузка...</div>
  }

  return (
    <div className={s.container}>
      {data && data.length > 0 ? (
        data.map((videoId) => (
          <div className={s.videoBlock} key={videoId}>
            <Link href={`/video/${videoId}`} className={s.videoPreview}>
            <Image 
            width="325"
            height="223"
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
            alt="видео с ютуб"
            className={s.vodeoImg}
            />
             </Link>

            <div className={s.videoInfoContainer}>

            <div className={s.chanelImage}>
            <Link href="/2" className={s.hiddenText}>название канала</Link>
            </div>

            <div className={s.videoInfo}>
              <Link href={`/video/${videoId}`} className={s.videoTitleLink}>
              <b>название ролика</b>
              </Link>
              <Link href="/4" className={s.chanelNameLink}>название канала</Link>
            </div>

            </div> 
            <Link href={`/video/${videoId}`} className={s.link}/> 
          </div>
        ))
      ) : (
        <div>нет видео</div>
      )}
    </div>
  )
}