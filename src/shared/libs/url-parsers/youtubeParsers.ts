const YOUTUBE_DOMAINS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be']

const isAllowedHost = (host: string, allow: string[]) => {
    const h = host.toLowerCase().replace(/^www\./, '')
    return allow.some(d => h === d.toLowerCase().replace(/^www\./, ''))
}

const YT_ID = /^[A-Za-z0-9_-]{11}$/

const RE_YT_SHORTS_PATH = /^\/shorts\/([A-Za-z0-9_-]{11})(?:[/?]|$)/

const RE_YT_EMBED_PATH = /^\/embed\/([A-Za-z0-9_-]{11})(?:[/?]|$)/


export const parseYoutube = (u: URL): string | null => {
    // if(!isAllowedHost(u.hostname, YOUTUBE_DOMAINS)) return null это ненужно

    if(u.hostname.toLowerCase().replace(/^www\./, '') === 'youtu.be'){
        const id = u.pathname.slice(1).split('/')[0]
        return YT_ID.test(id) ? id: null
    }

    if(u.pathname === '/watch'){
        const id = u.searchParams.get('v') ?? ''
        return YT_ID.test(id) ? id :null
    }

    const shorts = RE_YT_SHORTS_PATH.exec(u.pathname)
    if(shorts) return shorts[1]

    const embed = RE_YT_EMBED_PATH.exec(u.pathname)
    if(shorts) return shorts[1]

    return null
}