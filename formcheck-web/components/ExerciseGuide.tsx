import { getExerciseGuide } from '@/lib/musclewiki'
import type { Exercise } from '@/lib/exercises'

// server component: runs on the server so that the API key stays there
export default async function ExerciseGuide({ exercise }: { exercise: Exercise }){
    const guide = await getExerciseGuide(exercise.muscleWiki.search)

    if(!guide){
        return(
            <section>
                <h2>How to</h2>
                <p>
                    <a href={exercise.muscleWiki.pageUrl} target="_blank" rel="noopener noreferrer">
                        See {exercise.name} on MuscleWiki
                    </a>
                </p>
            </section>
        )
    } 

    //show the male by default and use the side view first
  const videos = guide.videos
    .filter((v) => v.gender === 'male')
    .sort((a, b) => (a.angle === 'side' ? -1 : b.angle === 'side' ? 1 : 0))

  return (
    <section>
      <h2>How to do it</h2>
      {guide.difficulty && <p>Difficulty: {guide.difficulty}</p>}

      <ol>
        {guide.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div className="row">
        {videos.map((v) => (
          <figure key={v.src} className="guide-video">
            {/* preload="none": each video request uses part of our MuscleWiki quota,
                so nothing downloads until the user presses play */}
            <video src={v.src} controls playsInline muted loop preload="none" />
            <figcaption>{v.angle === 'side' ? 'Side view' : 'Front view'}</figcaption>
          </figure>
        ))}
      </div>

      <p>
        <small>
          Exercise guide from{' '}
          <a href={exercise.muscleWiki.pageUrl} target="_blank" rel="noopener noreferrer">
            MuscleWiki ↗
          </a>
        </small>
      </p>
    </section>
  )
}
