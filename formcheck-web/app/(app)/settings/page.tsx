import { createClient } from '@/lib/supabase/server'
import ConfirmButton from '@/components/ConfirmButton'
import { changePassword, deleteAccount, resetWorkouts, updateDisplayName } from './actions'

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>
}) {
  const { ok, error } = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <h1>Settings</h1>
      <p>Signed in as {user?.email}</p>

      {ok && <p>{ok}</p>}
      {error && <p>Error: {error}</p>}

      <section>
        <h2>Display name</h2>
        <form action={updateDisplayName} className="row">
          <input
            name="display_name"
            defaultValue={user?.user_metadata?.display_name ?? ''}
            maxLength={40}
            required
          />
          <button>Save</button>
        </form>
      </section>

      <section>
        <h2>Change password</h2>
        <form action={changePassword} className="stack" style={{ maxWidth: 300 }}>
          <input name="current" type="password" placeholder="Current password" required />
          <input name="new" type="password" placeholder="New password" minLength={6} required />
          <input name="confirm" type="password" placeholder="Confirm new password" minLength={6} required />
          <button>Update password</button>
        </form>
      </section>

      <section>
        <h2>Reset workout data</h2>
        <p>Deletes all of your saved workouts. Your account stays.</p>
        <form action={resetWorkouts}>
          <ConfirmButton message="Delete ALL workout history? This cannot be undone.">Reset all workouts</ConfirmButton>
        </form>
      </section>

      <section>
        <h2>Delete account</h2>
        <p>Deletes your account and all of your workouts.</p>
        <form action={deleteAccount} className="row">
          <input name="confirm_text" placeholder="Type DELETE" autoComplete="off" required />
          <ConfirmButton message="Delete your account permanently? This cannot be undone.">Delete account</ConfirmButton>
        </form>
      </section>
    </>
  )
}
