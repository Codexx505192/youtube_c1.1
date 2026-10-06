import { error } from "console"

const videosData = new Set<string>()

// https://img.youtube.com/vi/${id}/hqdefault.jpg
// https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=3fIdoN15xWM

export async function GET() {
    videosData.add('vrR0x9cCliA')
    videosData.add('WSiXO0r4DtE')
    videosData.add('nQGEHG_GaCc')
    videosData.add('5pM-FSSzREc')
    videosData.add('DWsRGv0n6iY')
    videosData.add('DAjRlsPeilY')
    videosData.add('RS6A7eXSMUw')
    videosData.add('3nYtzOoghAY')
    videosData.add('dNsfGQDnyks')
    videosData.add('mq2u7ER0R3g')
    videosData.add('mq2u7ER0R3g')

    return Response.json({ok: true, data: Array.from(videosData)})
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

