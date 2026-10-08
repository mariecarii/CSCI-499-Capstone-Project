'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getExercise } from '@/lib/exercises'

export async function saveWorkout(formData: FormData) {
  const exercise = formData.get('exercise') as string
  const reps = Number(formData.get('reps'))
  const durationSeconds = Number(formData.get('duration_seconds'))

  // Never trust form data: check it on the server
  if (!getExercise(exercise)) redirect('/exercises')
  if (!Number.isInteger(reps) || reps < 0) redirect(`/session/${exercise}`)

  const supabase = await createClient()

  // user_id is filled in by the database (default auth.uid()).
  // Row Level Security rejects the insert if it's not the signed-in user.
  const { error } = await supabase.from('workouts').insert({
    exercise,
    reps,
    duration_seconds: Number.isFinite(durationSeconds) ? Math.max(0, Math.round(durationSeconds)) : 0,
  })
  if (error) throw new Error(error.message)

  redirect('/history')
}
