export type VideoDto = {
    videoId: string
    title: string
    author_name: string
    author_url: string
}

export type GetOneVideoDto = {
    ok: boolean
    data: VideoDto | null
}

export type GetAllVideosDto = {
    ok: boolean
    data: VideoDto[]
}