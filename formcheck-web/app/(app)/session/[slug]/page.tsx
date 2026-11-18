import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getExercise } from '@/lib/exercises'
import Camera from './Camera'

// [slug] in the folder name means this page handles /session/anything.
// The "anything" part arrives in params.slug.
export default async function SessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exercise = getExercise(slug)
  if (!exercise) notFound()

  return (
    <>
      <p>
        <Link href="/exercises">Back to exercises</Link>
      </p>
      <h1>{exercise.name}</h1>

      <section>
        <h2>Before you start</h2>
        <p>{exercise.cameraTip}</p>
        <p>What FormCheck will check:</p>
        <ul>
          {exercise.formCues.map((cue) => (
            <li key={cue}>{cue}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Your set</h2>
        <Camera slug={exercise.slug} />
      </section>

      <section>
        <h2>How to</h2>
        <p>
          <a href={exercise.guideUrl} target="_blank" rel="noopener noreferrer">
            See {exercise.name} on MuscleWiki ↗
          </a>
        </p>
      </section>
    </>
  )
}
