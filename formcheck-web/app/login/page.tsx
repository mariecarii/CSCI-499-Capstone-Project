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