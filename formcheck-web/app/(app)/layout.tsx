import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/login/actions'

// The (app) folder is a "route group": the parentheses keep it out of the URL.
// Every page inside it (exercises, history, session, settings) shares this layout.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // getUser() asks Supabase for the latest user record, so a new display name
  // shows up right away
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const displayName = user.user_metadata?.display_name || user.email

  return (
    <>
      <nav className="nav">
        <Link href="/exercises" className="brand">
          <strong>FormCheck</strong>
        </Link>
        <Link href="/exercises">Exercises</Link>
        <Link href="/history">History</Link>
        <Link href="/settings">Settings</Link>
        <span>{displayName}</span>
        <form action={signOut}>
          <button>Sign out</button>
        </form>
      </nav>
      <main className="page">{children}</main>
    </>
  )
}
