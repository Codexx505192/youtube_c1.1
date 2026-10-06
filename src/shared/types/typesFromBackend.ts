export type VideoDto = {
    videoId: string
    title: string
    author_name: string
    author_url: string
}


export type GetGetAllVideosDto = {
    ok: boolean
    data: VideoDto[]
}