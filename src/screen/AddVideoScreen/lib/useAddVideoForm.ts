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
      }),
      videoCategory: z.string()
    });
    
    type Inputs = {
      videoUrl: string,
      videoCategory: string,
    }

     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<Inputs>({resolver: zodResolver(schema)})
    
      const onSubmitHandler = async (data: Inputs) => {
        console.log('data', data)
                  const url = new URL(data.videoUrl)
    
                  const videoId = parseYoutube(url)
                    
                  if(!videoId) return
                   setVideoId(videoId);
                  //  TODO:
                   await fetch('/api/videos', {
                      method: 'POST',
                      body: JSON.stringify({ userId: '12345', videoId, categoryId: data.videoCategory}),
                    });
                    
                    reset()
                  }
             
         return {
           register,
           errors,
           videoId,
           onSubmit: handleSubmit(onSubmitHandler),
         }         
}