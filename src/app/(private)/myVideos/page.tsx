// import { AddVideoScreen } from "@/screen/AddVideoScreen";
import { MyVideosScreen } from "@/screen/MyVideosScreen/MyVideosScreen";
import { GetAllVideosDto } from "@/shared/types/typesFromBackend";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Мои видео'
}

export default async function MyVideosPage(){
const userId = '12345'

    
    try{
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?userId=${userId}`)
    const response = await dataFromServer.json() as GetAllVideosDto
    console.log('response', response)
    
    if(!response.data){
      throw new Error('Нет данных о видео')
    }
    
      return <MyVideosScreen data={response.data}/>
    }
    catch (error){
        console.error(error)
        return <div>Что-то Пошло не так</div>
    }
}