import type { Metadata } from 'next'
import './globals.css'

// The favicon comes from app/icon.png automatically (Next.js file convention)
export const metadata: Metadata = {
  title: 'FormCheck',
  description: 'Exercise form feedback using your camera',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
