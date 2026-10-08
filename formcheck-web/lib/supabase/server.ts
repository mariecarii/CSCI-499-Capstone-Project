import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Supabase client for code that runs on the SERVER
// (Server Components, Server Actions, Route Handlers).
// It reads and writes the auth cookies through Next.js's cookies() API.
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
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
        },
      },
    }
  )
}
