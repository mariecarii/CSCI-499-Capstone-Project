import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

// Next.js 16 calls this before each request. (On Next.js 15 and earlier,
// this file must be named middleware.ts and the function middleware.)
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Skip static files and images so the proxy only runs for real pages
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
