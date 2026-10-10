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
  userId: string
}

const videosData = new Map<string, videosDataContent>([
         ['vrR0x9cCliA', {userId: '0',id: 'vrR0x9cCliA', categoryId: 'games'}],
         ['WSiXO0r4DtE', {userId: '0',id: 'WSiXO0r4DtE', categoryId: 'news'}],
         ['nQGEHG_GaCc', {userId: '0',id: 'nQGEHG_GaCc', categoryId: 'fun'}],
         ['5pM-FSSzREc', {userId: '0',id: '5pM-FSSzREc', categoryId: 'science'}],
         ['DWsRGv0n6iY', {userId: '0',id: 'DWsRGv0n6iY', categoryId: 'sport'}],
         ['DAjRlsPeilY', {userId: '0',id: 'DAjRlsPeilY', categoryId: 'games'}],
         ['RS6A7eXSMUw', {userId: '0',id: 'RS6A7eXSMUw', categoryId: 'games'}],
         ['3nYtzOoghAY', {userId: '0',id: '3nYtzOoghAY', categoryId: 'games'}],
         ['dNsfGQDnyks', {userId: '0',id: 'dNsfGQDnyks', categoryId: 'games'}],
         ['mq2u7ER0R3g', {userId: '0',id: 'mq2u7ER0R3g', categoryId: 'games'}],
         ['mq2u7ER0R3g', {userId: '0',id: 'mq2u7ER0R3g', categoryId: 'games'}],
    ]
)

export async function GET(request: Request) {
const urlObject = new URL(request.url)
const userIdParam = urlObject.searchParams.get('userId')
const videoIdParam = urlObject.searchParams.get('videoId')
const categoryIdParam = urlObject.searchParams.get('categoryId')



if(videoIdParam){
  try{
const rawResult = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoIdParam}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo

      const authorUrl = videoInfo.author_url.split('/').at(-1)
      console.log('authorUrl', authorUrl)

      const result ={
      videoId: videoIdParam, 
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
   const categories = Array.from(new Set([...videosData].map((data) => data[1].categoryId)))

    const promises =  [...videosData]
     .filter((data) => categoryIdParam ? data[1].categoryId === categoryIdParam: true)
     .filter((data) => userIdParam ? data[1].userId === userIdParam: true)
     .map(async(data) => {
      const videoId =  data[1].id
      const categoryId = data[1].categoryId
    
      const rawResult = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo
      console.log('videoInfo', videoInfo)
      const authorUrl = videoInfo.author_url.split('/').at(-1)

      return{
      videoId, 
      authorUrl,
      categoryId: data[1].categoryId, 
      title: videoInfo.title,
      authorName: videoInfo.author_name,
    }
    })

    const result = await Promise.all(promises)
    return Response.json({
      ok: true, 
      data: result, 
      categories
    })
  }
  catch(error){
    console.log(error)
    return Response.json({ok: false, data: []}, { status: 500 })
  }
}

// --


export async function POST(request: Request) {
    const data = await request.json()
    console.log('data', data)

    if(videosData.has(data.videoId)) {
        return Response.json({ok: false, error: 'Видео ранее уже было добавлено'}, 
        {status: 400})
    }

    videosData.set(data.videoId, {
      id: data.videoId, 
      userId: data.userId, 
      categoryId: data.categoryId 
    })
    
    return Response.json({ok: true})
}

