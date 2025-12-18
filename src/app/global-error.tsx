'use client'

import './globals.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang='en'>
      <body className='font-sans antialiased'>
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <h2 className='text-2xl font-bold'>Something went wrong globally!</h2>
          <pre className='my-4 rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-100'>
            {error.message}
          </pre>
          <button
            onClick={() => reset()}
            className='rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90'
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
