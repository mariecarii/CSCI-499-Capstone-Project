<<<<<<< HEAD
import Link from 'next/link'
import { signIn, signUp } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  // Messages come back through the URL, e.g. /login?error=Invalid+login+credentials
  const { error, message } = await searchParams

  return (
    <main className="center">
      <h1>FormCheck</h1>

      {error && <p>Error: {error}</p>}
      {message && <p>{message}</p>}

      <form className="stack">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />

        {/* Both buttons submit the same form; formAction picks which server function runs */}
        <button formAction={signIn}>Sign in</button>

        <p>Don&apos;t have an account?</p>
        <button formAction={signUp} className="small">
          Sign up
        </button>
      </form>

      <p>
        <Link href="/forgot-password">Forgot password?</Link>
      </p>
    </main>
  )
}
=======
import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (
    <main style={{ maxWidth: 320, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>Form Check</h1>
      <br/>
      <h2>Log in</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form style={{ display: 'grid', gap: 8 }}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </main>
  )
}
>>>>>>> 11bfd34f8c1c95c1e8d70772ffdb4036db112f8b
