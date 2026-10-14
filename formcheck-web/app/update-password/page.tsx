import { updatePassword } from './actions'

// Not in PUBLIC_PATHS: only reachable with a session, which the reset link creates
export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="center">
      <h1>FormCheck</h1>
      <h2>Set a new password</h2>

      {error && <p>Error: {error}</p>}

      <form action={updatePassword} className="stack">
        <input name="new" type="password" placeholder="New password" minLength={6} required />
        <input name="confirm" type="password" placeholder="Confirm new password" minLength={6} required />
        <button type="submit">Save password</button>
      </form>
    </main>
  )
}
