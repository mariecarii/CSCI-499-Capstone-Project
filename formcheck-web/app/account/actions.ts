'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function fail(msg: string): never {
  redirect('/account?error=' + encodeURIComponent(msg))
}

export async function changePassword(formData: FormData) {
  const current = formData.get('current') as string
  const next = formData.get('new') as string
  const confirm = formData.get('confirm') as string

  if (next !== confirm) fail('New passwords do not match')
  if (next.length < 6) fail('New password must be at least 6 characters')
  if (next === current) fail('New password must be different from the current one')

  const supabase = await createClient()

  const { data } = await supabase.auth.getClaims()
  const email = data?.claims?.email as string | undefined
  if (!email) redirect('/login')

  // Re-verify the current password before allowing the change
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email,
    password: current,
  })
  if (verifyError) fail('Current password is incorrect')

  const { error } = await supabase.auth.updateUser({ password: next })
  if (error) fail(error.message)

  redirect('/account?success=1')
}