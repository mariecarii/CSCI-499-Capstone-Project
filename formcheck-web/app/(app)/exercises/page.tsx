import Link from 'next/link'
import { cookies } from 'next/headers'
import { EXERCISES, REGION_LABELS } from '@/lib/exercises'
import { GUIDE_MODEL_COOKIE, guideUrlFor, parseGuideModel } from '@/lib/guide-model'
import GuideModelSwitch from '@/components/GuideModelSwitch'

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

  const model = parseGuideModel((await cookies()).get(GUIDE_MODEL_COOKIE)?.value)

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

      <GuideModelSwitch current={model} />

      {list.map((e) => (
        <section key={e.slug}>
          <h2>{e.name}</h2>
          <p>{REGION_LABELS[e.region]}</p>
          <p>{e.description}</p>
          <p className="row">
            <Link href={`/session/${e.slug}`}>Start</Link>
            <a href={guideUrlFor(e.guideUrl, model)} target="_blank" rel="noopener noreferrer">
              How to (MuscleWiki)
            </a>
          </p>
        </section>
      ))}
    </>
  )
}

