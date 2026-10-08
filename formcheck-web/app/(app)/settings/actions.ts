'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Sends the user back to Settings with a message in the URL
function back(kind: 'ok' | 'error', message: string): never {
  redirect(`/settings?${kind}=${encodeURIComponent(message)}`)
}

export async function updateDisplayName(formData: FormData) {
  const name = ((formData.get('display_name') as string) ?? '').trim()
  if (name.length < 1 || name.length > 40) back('error', 'Display name must be 1 to 40 characters')

  const supabase = await createClient()
  // Saved in the user's "metadata" in Supabase Auth, so no extra table is needed
  const { error } = await supabase.auth.updateUser({ data: { display_name: name } })
  if (error) back('error', error.message)

  back('ok', 'Display name updated')
}

export async function changePassword(formData: FormData) {
  const current = formData.get('current') as string
  const next = formData.get('new') as string
  const confirm = formData.get('confirm') as string

  if (next !== confirm) back('error', 'New passwords do not match')
  if (next.length < 6) back('error', 'New password must be at least 6 characters')

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const email = data?.claims?.email as string | undefined
  if (!email) redirect('/login')

  // Make sure the person typing knows the current password
  const { error: wrongPassword } = await supabase.auth.signInWithPassword({ email, password: current })
  if (wrongPassword) back('error', 'Current password is incorrect')

  const { error } = await supabase.auth.updateUser({ password: next })
  if (error) back('error', error.message)

  back('ok', 'Password updated')
}

export async function resetWorkouts() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub // "sub" (subject) is the user's id
  if (!userId) redirect('/login')

  const { error } = await supabase.from('workouts').delete().eq('user_id', userId)
  if (error) back('error', error.message)

  back('ok', 'All workout history deleted')
}

export async function deleteAccount(formData: FormData) {
  if (formData.get('confirm_text') !== 'DELETE') back('error', 'Type DELETE to confirm')

  const supabase = await createClient()
  // Calls the delete_own_account() function from the SQL migration.
  // Workouts are removed too, because of ON DELETE CASCADE.
  const { error } = await supabase.rpc('delete_own_account')
  if (error) back('error', error.message)

  await supabase.auth.signOut({ scope: 'local' }) // clear this browser's cookies
  redirect('/login?message=' + encodeURIComponent('Your account has been deleted'))
}
