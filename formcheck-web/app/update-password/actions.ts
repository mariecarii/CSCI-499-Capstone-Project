'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function fail(message: string): never {
  redirect('/update-password?error=' + encodeURIComponent(message))
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('new') as string
  const confirm = formData.get('confirm') as string

  if (password !== confirm) fail('Passwords do not match')
  if (password.length < 6) fail('Password must be at least 6 characters')

  const supabase = await createClient()
  // Works because the reset link already signed the user in (see /auth/confirm)
  const { error } = await supabase.auth.updateUser({ password })
  if (error) fail(error.message)

  redirect('/exercises')
}
