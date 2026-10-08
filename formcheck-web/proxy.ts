import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

<<<<<<< HEAD
// Next.js 16 calls this before each request. (On Next.js 15 and earlier,
// this file must be named middleware.ts and the function middleware.)
=======
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
<<<<<<< HEAD
  // Skip static files and images so the proxy only runs for real pages
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
=======
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
