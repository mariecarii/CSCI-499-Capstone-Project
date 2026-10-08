// Every exercise the app knows about. Add new ones here.

export type BodyRegion = 'upper' | 'lower'

export type Exercise = {
  slug: string // used in the URL: /session/pull-ups
  name: string
  region: BodyRegion
  description: string
}

export const EXERCISES: Exercise[] = [
  {
    slug: 'pull-ups',
    name: 'Pull-ups',
    region: 'upper',
    description: 'Hang from a bar with straight arms, pull until your chin clears the bar, then lower with control.',
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
