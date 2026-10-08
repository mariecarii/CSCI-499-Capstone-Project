'use client'
// 'use client' = this component runs in the BROWSER, because only the
// browser can access the webcam.

import { useEffect, useRef, useState } from 'react'
import { saveWorkout } from './actions'

export default function Camera({ slug }: { slug: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const startedAtRef = useRef<number | null>(null)

  const [cameraOn, setCameraOn] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Timer: counts seconds while the camera is on
  useEffect(() => {
    if (!cameraOn) return
    const id = setInterval(() => {
      if (startedAtRef.current) setSeconds(Math.floor((Date.now() - startedAtRef.current) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [cameraOn])

  // Turn the camera off if the user leaves the page
  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), [])

  async function startCamera() {
    setError(null)
    try {
      // Asks the user for camera permission the first time
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      streamRef.current = stream
      videoRef.current!.srcObject = stream
      await videoRef.current!.play()
      startedAtRef.current = Date.now()
      setSeconds(0)
      setCameraOn(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start the camera')
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCameraOn(false)
  }

  return (
    <div className="stack">
      <video ref={videoRef} playsInline muted />

      <p className="row">
        {cameraOn ? (
          <button onClick={stopCamera}>Stop camera</button>
        ) : (
          <button onClick={startCamera}>Start camera</button>
        )}
        <span>Time: {seconds}s</span>
      </p>
      {error && <p>Error: {error}</p>}

      {/* Manual rep entry until pose detection is added */}
      <form action={saveWorkout} className="row">
        <input type="hidden" name="exercise" value={slug} />
        <input type="hidden" name="duration_seconds" value={seconds} />
        <label>
          Reps: <input name="reps" type="number" min={0} defaultValue={0} required />
        </label>
        <button type="submit">Save workout</button>
      </form>
    </div>
  )
}
