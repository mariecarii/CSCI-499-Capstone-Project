'use client'

// A submit button that shows an "Are you sure?" popup first.
// If the user clicks Cancel, the form is not submitted.
export default function ConfirmButton({
  message,
  children,
}: {
  message: string
  children: React.ReactNode
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault()
      }}
    >
      {children}
    </button>
  )
}
