import { AllVideosDto } from "@/shared/types/typesFromBackend"
import { error } from "console"
import { number, string } from "zod"
type OEmbedVideoInfo = {
  "title": string
  "author_name": string
  "author_url": string
  "type": string
  height: number
  width: number
  version: number
  "provider_name": string
  "provider_url": string
  thumbnail_height: number
  thumbnail_width: number
  "thumbnail_url": string
  "html": string
}

const videosData = new Set<string>(
    [
         'vrR0x9cCliA',
         'WSiXO0r4DtE',
         'nQGEHG_GaCc',
         '5pM-FSSzREc',
         'DWsRGv0n6iY',
         'DAjRlsPeilY',
         'RS6A7eXSMUw',
         '3nYtzOoghAY',
         'dNsfGQDnyks',
         'mq2u7ER0R3g',
         'mq2u7ER0R3g',
    ]
)

export async function GET(request: Request) {
const urlObject = new URL(request.url)
const videoId = urlObject.searchParams.get('videoId')
console.log('videoId', videoId)

try{
    const promises =  [...videosData].map(async(videoId) => {
      const rawResult = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo

      return{
      videoId, 
      title: videoInfo.title,
      author_name: videoInfo.author_name,
      author_url: videoInfo.author_url,
      }
    })

    const result = await Promise.all(promises)
    return Response.json({ok: true, data: result})
  }
  catch(error){
    return Response.json({ok: false, data: []}, { status: 500 })

  }
}

export async function POST(request: Request) {
    const data = await request.json()
    
    if(videosData.has(data.videoId)) {
        return Response.json({ok: false, error: 'Видео ранее уже было добавлено'}, {status: 400})
    }

    videosData.add(data.videoId)
    console.log('videosData', videosData)


    return Response.json({ok: true})
}

