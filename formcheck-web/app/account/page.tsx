import { changePassword } from './actions'

export default async function AccountPage({
  searchParams,
}: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const { error, success } = await searchParams
  return (
    <main style={{ maxWidth: 320, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>Change password</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Password updated.</p>}
      <form action={changePassword} style={{ display: 'grid', gap: 8 }}>
        <input name="current" type="password" placeholder="Current password" required />
        <input name="new" type="password" placeholder="New password" required minLength={6} />
        <input name="confirm" type="password" placeholder="Confirm new password" required minLength={6} />
        <button type="submit">Update password</button>
      </form>
      <p><a href="/">← Back</a></p>
    </main>
  )
}