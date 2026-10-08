import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isAllowedHost, parseYoutube } from "@/shared/libs";
import {z} from "zod";
import { useState } from "react";

export default function useAddVideoForm(){
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
    
        //   if(!isAllowedHost(parseUrl.host, YOUTUBE_DOMAINS)) {
        //      ctx.addIssue({
        //       code: 'custom',
        //       message: 'Ссылка должна быть на Youtube',
        //       input: url,
        //     })
        //   }
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
    
      const onSubmitHandler = async (data: Inputs) => {
        console.log('data', data)
                  const url = new URL(data.videoUrl)
    
                  const videoId = parseYoutube(url)
                    
                  if(!videoId) return
                   setVideoId(videoId);
                   await fetch('/api/videos', {
                      method: 'POST',
                      body: JSON.stringify({ videoId }),
                    });
                  }
             
         return {
           register,
           errors,
           videoId,
           onSubmit: handleSubmit(onSubmitHandler),
         }         
}