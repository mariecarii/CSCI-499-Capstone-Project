import { createClient } from '@/lib/supabase/server'
import { logout } from './login/actions'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  return (
    <main style={{ maxWidth: 480, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>FormCheck</h1>
      <p>Signed in as {data?.claims?.email}</p>
      <p><a href="/account">Change password</a></p>    
      <form action={logout}><button>Log out</button></form>
      {/* Exercise picker + webcam goes here next */}
    </main>
  )
}