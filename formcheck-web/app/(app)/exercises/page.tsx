import Link from 'next/link'
import { EXERCISES, REGION_LABELS } from '@/lib/exercises'

const FILTERS = ['all', 'upper', 'lower'] as const
type Filter = (typeof FILTERS)[number]

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  // The filter lives in the URL (/exercises?filter=upper), so it survives a refresh
  const { filter: raw } = await searchParams
  const filter: Filter = FILTERS.includes(raw as Filter) ? (raw as Filter) : 'all'

  const list = filter === 'all' ? EXERCISES : EXERCISES.filter((e) => e.region === filter)

  return (
    <>
      <h1>Exercises</h1>

      <p className="row">
        Filter:
        <Link href="/exercises">{filter === 'all' ? <strong>All</strong> : 'All'}</Link>
        <Link href="/exercises?filter=upper">
          {filter === 'upper' ? <strong>{REGION_LABELS.upper}</strong> : REGION_LABELS.upper}
        </Link>
        <Link href="/exercises?filter=lower">
          {filter === 'lower' ? <strong>{REGION_LABELS.lower}</strong> : REGION_LABELS.lower}
        </Link>
      </p>

      {list.length === 0 && <p>No exercises in this category yet.</p>}

      {list.map((e) => (
        <section key={e.slug}>
          <h2>{e.name}</h2>
          <p>{REGION_LABELS[e.region]}</p>
          <p>{e.description}</p>
          <Link href={`/session/${e.slug}`}>Start</Link>
        </section>
      ))}
    </>
  )
}
