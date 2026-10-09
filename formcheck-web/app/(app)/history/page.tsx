import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { exerciseName } from '@/lib/exercises'

type Workout = {
  id: string
  exercise: string
  reps: number
  duration_seconds: number
  created_at: string
}

// This page runs on the server, whose clock may be in UTC. Without a fixed
// time zone, a 9 PM workout in New York would show up under the next day.
const TIME_ZONE = 'America/New_York'

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const { sort } = await searchParams
  const ascending = sort === 'earliest'

  const supabase = await createClient()
  // No .eq('user_id', ...) needed: Row Level Security only returns this user's rows
  const { data, error } = await supabase
    .from('workouts')
    .select('id, exercise, reps, duration_seconds, created_at')
    .order('created_at', { ascending })

  if (error) return <p>Could not load history: {error.message}</p>
  const workouts = (data ?? []) as Workout[]

  // Group workouts by day, keeping the sorted order
  const days: { day: string; items: Workout[] }[] = []
  for (const w of workouts) {
    const day = new Date(w.created_at).toLocaleDateString('en-US', {
      timeZone: TIME_ZONE,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    const last = days[days.length - 1]
    if (last && last.day === day) last.items.push(w)
    else days.push({ day, items: [w] })
  }

  return (
    <>
      <h1>History</h1>

      <p className="row">
        Sort:
        <Link href="/history">{ascending ? 'Latest first' : <strong>Latest first</strong>}</Link>
        <Link href="/history?sort=earliest">{ascending ? <strong>Earliest first</strong> : 'Earliest first'}</Link>
      </p>

      {days.length === 0 && <p>No workouts yet.</p>}

      {days.map((d) => (
        <section key={d.day}>
          <h2>{d.day}</h2>
          <ul>
            {d.items.map((w) => (
              <li key={w.id}>
                {new Date(w.created_at).toLocaleTimeString('en-US', {
                  timeZone: TIME_ZONE,
                  hour: 'numeric',
                  minute: '2-digit',
                })}{' '}
                · {exerciseName(w.exercise)} · {w.reps} reps · {w.duration_seconds}s
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}
