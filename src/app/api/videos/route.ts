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

type videosDataContent  = {
  id: string,
  categoryId: string,
}

const videosData = new Map<string, videosDataContent>([
         ['vrR0x9cCliA', { id: 'vrR0x9cCliA', categoryId: 'games'}],
         ['WSiXO0r4DtE', {id: 'WSiXO0r4DtE', categoryId: 'news'}],
         ['nQGEHG_GaCc', {id: 'nQGEHG_GaCc', categoryId: 'fun'}],
         ['5pM-FSSzREc', {id: '5pM-FSSzREc', categoryId: 'science'}],
         ['DWsRGv0n6iY', {id: 'DWsRGv0n6iY', categoryId: 'sport'}],
         ['DAjRlsPeilY', {id: 'DAjRlsPeilY', categoryId: 'games'}],
         ['RS6A7eXSMUw', {id: 'RS6A7eXSMUw', categoryId: 'games'}],
         ['3nYtzOoghAY', {id: '3nYtzOoghAY', categoryId: 'games'}],
         ['dNsfGQDnyks', {id: 'dNsfGQDnyks', categoryId: 'games'}],
         ['mq2u7ER0R3g', {id: 'mq2u7ER0R3g', categoryId: 'games'}],
         ['mq2u7ER0R3g', {id: 'mq2u7ER0R3g', categoryId: 'games'}],
    ]
)

export async function GET(request: Request) {
const urlObject = new URL(request.url)
const videoId = urlObject.searchParams.get('videoId')
console.log('videoId', videoId)

if(videoId){
  try{
const rawResult = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo

      const authorUrl = videoInfo.author_url.split('/').at(-1)
      console.log('authorUrl', authorUrl)

      const result ={
      videoId, 
      authorUrl,
      title: videoInfo.title,
      authorName: videoInfo.author_name,
      }

      return  Response.json({ok: true, data: result})
    }
    catch(error){
      console.log(error)
      return Response.json({ok: false, data: null}, { status: 500 })
    }
}

try{
   const categories: string[] = []

    const promises =  [...videosData].map(async(data) => {
      const videoId =  data[1].id
      const categoryId = data[1].categoryId
    
      const rawResult = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo
      console.log('videoInfo', videoInfo)
      const authorUrl = videoInfo.author_url.split('/').at(-1)

      if(!categories.includes(categoryId)){
       categories.push(categoryId)
      }

      return{
      videoId, 
      authorUrl,
      categoryId: data[1].categoryId, 
      title: videoInfo.title,
      authorName: videoInfo.author_name,
    }
    })

    const result = await Promise.all(promises)
    return Response.json({ok: true, data: result, categories})
  }
  catch(error){
    console.log(error)
    return Response.json({ok: false, data: []}, { status: 500 })
  }
}

export async function POST(request: Request) {
    const data = await request.json()
    console.log('data', data)

    if(videosData.has(data.videoId)) {
        return Response.json({ok: false, error: 'Видео ранее уже было добавлено'}, 
        {status: 400})
    }

    videosData.set(data.videoId, { id: data.videoId, categoryId: data.categoryId })
    console.log('videosData', videosData)


    return Response.json({ok: true})
}

