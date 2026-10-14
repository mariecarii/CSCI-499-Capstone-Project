'use server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function sendResetEmail(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()

  // The address the user is on right now, e.g. http://localhost:3000
  const origin = (await headers()).get('origin') ?? 'http://localhost:3000'

  // Supabase emails a reset link (using the "Reset Password" template).
  // redirectTo is used if the template still has the default link.
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  })

  if (error && error.status === 429) {
    redirect('/forgot-password?error=' + encodeURIComponent('Too many requests. Please wait a bit and try again.'))
  }

  // Same message whether or not the account exists
  redirect('/forgot-password?sent=1')
}
