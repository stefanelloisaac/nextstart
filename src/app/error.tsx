'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h2>Something went wrong!</h2>
      <pre className='my-4 rounded bg-red-100 p-4 text-red-700'>{error.message}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
