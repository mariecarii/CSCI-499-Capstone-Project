'use server'
// 'use server' = these functions run ONLY on the server.
// The browser calls them when a form is submitted, but never sees this code.

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  // Supabase checks the email + password. If correct, it returns a session
  // and the server client saves it as cookies on the response.
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) redirect('/login?error=' + encodeURIComponent(error.message))
  redirect('/exercises')
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) redirect('/login?error=' + encodeURIComponent(error.message))

  // If "Confirm email" is ON in Supabase, the account is created but there is
  // no session until the user clicks the link in their email.
  if (!data.session) {
    redirect('/login?message=' + encodeURIComponent('Check your email to confirm your account, then sign in.'))
  }

  redirect('/exercises')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut() // clears the auth cookies
  redirect('/login')
}
