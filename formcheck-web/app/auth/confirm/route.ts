import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Every confirmation / reset email links here, e.g.
//   /auth/confirm?token_hash=abc...&type=email&next=/exercises        (sign up)
//   /auth/confirm?token_hash=abc...&type=recovery&next=/update-password (forgot password)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  // Only allow paths inside this app, so the link can't send users to another site
  const nextParam = searchParams.get('next') ?? '/exercises'
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/exercises'

  if (token_hash && type) {
    const supabase = await createClient()
    // Supabase checks the token (exists, right type, not expired, not used yet).
    // If valid, the user is signed in and the session is saved as cookies.
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) redirect(next)
  }

  redirect('/login?error=' + encodeURIComponent('This link is invalid or has expired. Please try again.'))
}
