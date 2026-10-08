import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getExercise } from '@/lib/exercises'
import Camera from './Camera'

// [slug] in the folder name means this page handles /session/anything.
// The "anything" part arrives in params.slug.
export default async function SessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exercise = getExercise(slug)
  if (!exercise) notFound() // shows the 404 page for unknown exercises

  return (
    <>
      <p>
        <Link href="/exercises">Back to exercises</Link>
      </p>
      <h1>{exercise.name}</h1>
      <p>Pose detection is not built yet. For now this page shows your camera and lets you log reps by hand.</p>
      <Camera slug={exercise.slug} />
    </>
  )
}
