import Link from 'next/link'
import { resetPassword } from './actions'

// The reset email links here:
//   /reset-password?token_hash=abc...   (our email template)
//   /reset-password?code=abc...         (Supabase's default template)
// Just opening this page changes nothing. The token is only used when the
// form is submitted, so email scanners that "preview" links can't use it up.
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; code?: string; error?: string }>
}) {
  const { token_hash, code, error } = await searchParams
  const hasToken = Boolean(token_hash || code)

  return (
    <main className="center">
      <h1>FormCheck</h1>
      <h2>Reset your password</h2>

      {error && <p>Error: {error}</p>}

      {hasToken ? (
        <form action={resetPassword} className="stack">
          {token_hash && <input type="hidden" name="token_hash" value={token_hash} />}
          {code && <input type="hidden" name="code" value={code} />}
          <input name="new" type="password" placeholder="New password" minLength={6} required />
          <input name="confirm" type="password" placeholder="Confirm new password" minLength={6} required />
          <button type="submit">Save new password</button>
        </form>
      ) : (
        <p>
          This reset link is missing or incomplete. <Link href="/forgot-password">Request a new one</Link>.
        </p>
      )}

      <p>
        <Link href="/login">Back to sign in</Link>
      </p>
    </main>
  )
}
