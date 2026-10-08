import { redirect } from 'next/navigation'

// "/" has no content of its own; send people to the exercise picker.
// (proxy.ts sends signed-out users to /login first.)
export default function Home() {
  redirect('/exercises')
}
