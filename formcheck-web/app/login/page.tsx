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
