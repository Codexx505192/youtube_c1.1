import { VideoScreen } from "@/screen/VideoScreen/VideoScreen";
import { GetOneVideoDto } from "@/shared/types/typesFromBackend";
import { Metadata } from "next";

type VideoPageProps = {
params: Promise<{videoId: string}>
}

// export const metadata: Metadata = {
//   title: "Видео: ...",
// };

export async function generateMetadata(
  { params,  }: VideoPageProps,): Promise<Metadata> {
  const data = await params
  const videoId = data.videoId

   
  try{
  const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`)
  const response = await dataFromServer.json() as GetOneVideoDto

    if(!response.data){
    throw new Error('Нет данных о видео')
    }

    return {
      title: `Видео: ${response.data.title}`
    }
  }
  catch(error){
    console.error(error)
    return {
      title: 'Что-то пошло не так'
    }
  }
}

export default async function VideoPage({params}: VideoPageProps){
const data = await params
const videoId = data.videoId

try{
const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`)
const response = await dataFromServer.json() as GetOneVideoDto

if(!response.data){
  throw new Error('Нет данных о видео')
}

 return(
        <section>
            <VideoScreen data={response.data}/>
        </section>
    )
}
catch (error){
    console.error(error)
    return <div>Что-то Пошло не так</div>
}
}