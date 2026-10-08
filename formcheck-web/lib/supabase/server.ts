import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

<<<<<<< HEAD
// Supabase client for code that runs on the SERVER
// (Server Components, Server Actions, Route Handlers).
// It reads and writes the auth cookies through Next.js's cookies() API.
export async function createClient() {
  const cookieStore = await cookies()

=======
export async function createClient() {
  const cookieStore = await cookies()
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
<<<<<<< HEAD
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Components can't set cookies. That's fine:
            // proxy.ts refreshes the session on every request instead.
          }
=======
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options))
          } catch { /* called from a Server Component; the proxy handles it */ }
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
        },
      },
    }
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
