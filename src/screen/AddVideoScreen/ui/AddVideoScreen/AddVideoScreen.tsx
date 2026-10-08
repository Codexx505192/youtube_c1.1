'use client'
import { useState } from 'react'
import s from './AddVideoScreen.module.css'
import { parseYoutube} from '@/shared/libs/url-parsers/youtubeParsers'
// import { parseYoutube } from '../../shared/libs'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isAllowedHost, YOUTUBE_DOMAINS } from '@/shared/libs/url-parsers/isAllowedHost'
import useAddVideoForm from '../lib/useAddVideoForm'
isAllowedHost



export const AddVideoScreen = () => {
 const {
  errors,
  videoId,
  register,
  onSubmit,
 } = useAddVideoForm()

      const hasVideoUrlInputError  = !!errors.videoUrl?.message

    return(
        <section>
            <div className={s.container}>
                <h1>AddVideoScreen</h1>

                 <form onSubmit={onSubmit} className={s.form}>
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