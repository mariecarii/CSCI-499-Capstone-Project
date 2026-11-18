// streams a muscleWiki video to the browswer
// format: /api/muscleWiki/media?path=/stream/videos/branded/....mp4
// proxy.ts already blocks signed-out users from this route

import { NextRequest } from "next/server"

// musclewiki's rules for proxying: the video must never be saved to a disk or a shared cache

const BASE_URL = 'https://api.musclewiki.com'

// headers worth passing laong so the video player can seek and show length
const PASS_THROUGH = ['content-type', 'content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified']

export async function GET(request: NextRequest){
    const key = process.env.MUSCLEWIKI_API_KEY
    if(!key) return new Response('MuscleWiki is not configured', {status: 503})

    const path = request.nextUrl.searchParams.get('path') ?? ''
    //only allow musclewiki media paths and without the checks, anyone can use our server and api key to fetch any url
    if(!path.startsWith('/stream/') || path.includes('..') || path.includes('//')){
        return new Response('Invalid path', {status: 400})
    }

    const headers: Record<string, string> = { 'X-API-Key': key }
    //foward range so the browser can stream and seek instead of having to downloading it
    const range = request.headers.get('range')
    if(range) headers['Range'] = range

    const upstream = await fetch(`${BASE_URL}${path}`, { headers, cache: 'no-store' })
    if(!upstream.ok && upstream.status !== 206){
        return new Response('Media unavailable', { status: upstream.status })
    }

    const out = new Headers()
    for(const name of PASS_THROUGH){
        const value = upstream.headers.get(name)
        if(value) out.set(name, value)
    }
    out.set('Cache-Control', 'private, no-store')

    return new Response(upstream.body, { status: upstream.status, headers: out })
}
