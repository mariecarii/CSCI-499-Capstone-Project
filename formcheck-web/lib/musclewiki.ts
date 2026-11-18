// server-only helper for musclewiki api
// only import this from server code
// MUSCLEWIKI_API_KEY

const BASE_URL = 'https://api.musclewiki.com'

// cached since limited monthly quota
const ONE_WEEK = 60 * 60 * 24 * 7 // 60 seconds * 60 mins * 24 hours * 7 days

type ApiVideo = {
    url: string | null
    angle: string // front or side
    gender: string // male or female
    og_image: string | null
}

type ApiExercise = {
    id: number
    name: string
    difficulty: string | null
    steps: string[]
    videos: ApiVideo[]
}

export type GuideVideo = {
    angle: string
    gender: string
    src: string // using own proxy URL instead of raw MuscleWiki URL
}

export type ExerciseGuide = {
    name: string
    difficulty: string | null
    steps: string[]
    videos: GuideVideo[]
}

// Since musclewiki's media lives under /stream/... and needs the API key. 
// The browser gets a link to OUR route, which adds the key onto the server
function toProxyUrl(url: string): string | null {
    try{
        const{ pathname } = new URL(url, BASE_URL)
        if(!pathname.startsWith('/stream/')) return null
        return `/api/musclewiki/media?path=${encodeURIComponent(pathname)}`
    } catch{
        return null
    }
}

export async function getExerciseGuide(search: string): Promise<ExerciseGuide | null>{
    const key = process.env.MUSCLEWIKI_API_KEY
    if(!key){
        console.warn('[musclewiki MUSCLEWIKI_API_KEY is not set')
        return null
    }

    try{
        const url = `${BASE_URL}/search?q=${encodeURIComponent(search)}&limit=5`      
        const res = await fetch(url, {
            headers: { 'X-API-key': key },
            next: { revalidate: ONE_WEEK },
        })
        if(!res.ok){
            // 401 warning key, 403 invalid key or plan doesn't allow API access, 429 monthly quota used up
            console.warn(`[muscleWiki] search "${search}" failed: ${res.status}`)
            return null
        }

        const results = (await res.json()) as ApiExercise[]
        // prefer exact name matching otherwise take the best match
        const match = results.find((e) => e.name.toLowerCase() === search.toLowerCase()) ?? results[0]
        if(!match) return null

        const videos: GuideVideo[] = []
        for(const v of match.videos ?? []){
            const src = v.url ? toProxyUrl(v.url) : null
            if(src) videos.push({ angle: v.angle, gender: v.gender, src })
        }

        return{
            name: match.name,
            difficulty: match.difficulty,
            steps: match.steps ?? [],
            videos,
        }
    }catch(err){
        console.warn('[muscleWiki] request failed:', err)
        return null
    }
}
