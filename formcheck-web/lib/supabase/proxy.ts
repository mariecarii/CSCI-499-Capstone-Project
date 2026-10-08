import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

<<<<<<< HEAD
// Pages anyone can visit without being signed in
const PUBLIC_PATHS = ['/login', '/forgot-password']

// Runs before EVERY matching request (see proxy.ts in the project root).
// Job 1: refresh the access token if it's about to expire, and save the new cookies.
// Job 2: send signed-out users to /login.
=======
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
<<<<<<< HEAD
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Put new cookies on the request (so pages rendered now see them)...
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          // ...and on the response (so the browser stores them).
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
=======
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options))
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
        },
      },
    }
  )

<<<<<<< HEAD
  // Verifies the token's signature (and refreshes it if needed).
  // Never use getSession() here: it trusts the cookie without checking it.
  const { data } = await supabase.auth.getClaims()
  const isSignedIn = !!data?.claims
  const isPublic = PUBLIC_PATHS.some((p) => request.nextUrl.pathname.startsWith(p))

  if (!isSignedIn && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
=======
  const { data } = await supabase.auth.getClaims()
  const isPublic = request.nextUrl.pathname.startsWith('/login')

  if (!data?.claims && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return supabaseResponse
}
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
