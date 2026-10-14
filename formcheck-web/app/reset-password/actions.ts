'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function resetPassword(formData: FormData) {
  const token_hash = (formData.get('token_hash') as string) || null
  const code = (formData.get('code') as string) || null
  const password = formData.get('new') as string
  const confirm = formData.get('confirm') as string

  // Sends the user back to this page WITH their token, so they can retry
  function retry(message: string): never {
    const params = new URLSearchParams()
    if (token_hash) params.set('token_hash', token_hash)
    if (code) params.set('code', code)
    params.set('error', message)
    redirect(`/reset-password?${params}`)
  }
  function expired(): never {
    redirect('/forgot-password?error=' + encodeURIComponent('That reset link is invalid or has expired. Request a new one.'))
  }

  // 1. Check the passwords BEFORE using the token (each token works only once)
  if (password !== confirm) retry('Passwords do not match')
  if (password.length < 6) retry('Password must be at least 6 characters')

  const supabase = await createClient()

  // 2. Use the token from the email. If valid, Supabase signs the user in.
  if (token_hash) {
    const { error } = await supabase.auth.verifyOtp({ type: 'recovery', token_hash })
    if (error) expired()
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) expired()
  } else {
    expired()
  }

  // 3. Save the new password for the now signed-in user
  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    // The token is used up but the user IS signed in, so finish on /update-password
    redirect('/update-password?error=' + encodeURIComponent(error.message))
  }

  // 4. Sign out everywhere (old sessions on other devices too), then sign in fresh
  await supabase.auth.signOut()
  redirect('/login?message=' + encodeURIComponent('Password updated. Sign in with your new password.'))
}
