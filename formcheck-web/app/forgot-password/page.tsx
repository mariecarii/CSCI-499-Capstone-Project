import Link from 'next/link'
import { sendResetEmail } from './actions'

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>
}) {
  const { sent, error } = await searchParams

  return (
    <main className="center">
      <h1>FormCheck</h1>
      <h2>Forgot password</h2>

      {error && <p>Error: {error}</p>}

      {sent ? (
        <p>If an account exists for that email, a reset link is on its way. Check your inbox (and spam).</p>
      ) : (
        <form action={sendResetEmail} className="stack">
          <input name="email" type="email" placeholder="Email" required />
          <button type="submit">Send reset link</button>
        </form>
      )}

      <p>
        <Link href="/login">Back to sign in</Link>
      </p>
    </main>
  )
}
