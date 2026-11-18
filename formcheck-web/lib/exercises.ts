// Every exercise the app knows about. Add new ones here.

export type BodyRegion = 'upper' | 'lower'

export type Exercise = {
  slug: string // used in the URL: /session/pull-ups
  name: string
  region: BodyRegion
  description: string
  cameraTip: string //tells where to stand for post detection
  formCues: string[] // what formcheck will check during the set
  guideUrl: string // MuscleWiki page that shows how to do the exercise
}

export const EXERCISES: Exercise[] = [
  {
    slug: 'squats',
    name: 'Squats',
    region: 'lower',
    description: 'Have your feet shoulder-width apart and bend your knees. Press hips back and stop movement once the hip joint is slightly lower than the knees. Then push up to reset back to initial position.',
    // model was train on side-view photos so the camera needs the side profile of the person
    cameraTip: 'Stand sideways to the camera with head and feet in frame',
    formCues: [
      'Keep chest up so your back stays straight',
      'Keep heels flat on the floor'
    ],
    guideUrl: 'https://musclewiki.com/exercise/bodyweight-squat',
  },

  {
    slug: 'pull-ups',
    name: 'Pull-ups',
    region: 'upper',
    description: 'Hang from a bar with straight arms, then pull inwards until your chin clears the bar. Lower with control.',
    cameraTip: 'Face the camera far enough back with your hands on the bar and your hips in frame',
    formCues: ['Start each rep with straight arms.', 'Pull until your chin clears the bar'],
    guideUrl: 'https://musclewiki.com/exercise/pull-ups',
  },
]

export const REGION_LABELS: Record<BodyRegion, string> = {
  upper: 'Upper body',
  lower: 'Lower body',
}

export function getExercise(slug: string) {
  return EXERCISES.find((e) => e.slug === slug)
}

export function exerciseName(slug: string) {
  return getExercise(slug)?.name ?? slug
}
