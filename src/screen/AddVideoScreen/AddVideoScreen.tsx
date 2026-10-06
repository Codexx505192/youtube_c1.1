'use client'
import { useState } from 'react'
import s from './AddVideoScreen.module.css'
import { parseYoutube} from '@/shared/libs/url-parsers/youtubeParsers'
// import { parseYoutube } from '../../shared/libs'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isAllowedHost, YOUTUBE_DOMAINS } from '@/shared/libs/url-parsers/isAllowedHost'
isAllowedHost



export const AddVideoScreen = () => {
const [videoId, setVideoId] = useState('')

const schema = z.object({
  videoUrl: z
  .string()
  .min(1, { message: 'Поле не должно быть пустым'})
  .superRefine((url, ctx) => {
    
    let parseUrl: URL;
     try {
       parseUrl = new URL(url)
       
      } 
      catch{
        ctx.addIssue({
          code: 'custom',
          message: 'Поле должно содержать ссылку',
          input: url,
        })
        return;
      }

      if(!isAllowedHost(parseUrl.host, YOUTUBE_DOMAINS)) {
         ctx.addIssue({
          code: 'custom',
          message: 'Ссылка должна быть на Youtube',
          input: url,
        })
      }
  })
});

type Inputs = {
  videoUrl: string
}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({resolver: zodResolver(schema)})

  const onSubmit = async (data: Inputs) => {
    console.log('data', data)
              const url = new URL(data.videoUrl)

              const videoId = parseYoutube(url)
                
              if(!videoId) return
               setVideoId(videoId);
               await fetch('/api/videos', {
                  method: 'POST',
                  body: JSON.stringify({ videoId }),
                });
                
               const dataFromServer = await fetch('/api/videos', {
                  method: 'GET',
                });

                const response = await dataFromServer.json()

                console.log('dataFromServer', response)
              }

  console.log('errors', errors)
  const hasVideoUrlInputError  = !!errors.videoUrl?.message

    return(
        <section>
            <div className={s.container}>
                <h1>AddVideoScreen</h1>

                 <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                 <label>
                    <input 
                    type="text" 
                    placeholder="Вставьте ссылку на видео" 
                    {...register('videoUrl')}
                    className={s.input}
                    />

                    {hasVideoUrlInputError && (
                      <p className={s.error}>{errors.videoUrl?.message}</p>
                    )}
                 </label>

                    <button className={s.submitButton}>загрузить</button>
                  </form>

                  {videoId && (
                    <iframe 
                   width="700" 
                   height="350"
                   src={`https://www.youtube.com/embed/${videoId}`} 
                   title="YouTube video player" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   referrerPolicy="strict-origin-when-cross-origin" 
                   allowFullScreen
                   className={s.iframe}
                  ></iframe>
                  )}
            </div>
        </section>
    )
}