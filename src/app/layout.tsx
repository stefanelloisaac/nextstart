import type { Metadata } from 'next'
import { Host_Grotesk, Work_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

const host_grotesk = Host_Grotesk({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-sans',
})

const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
})

const jetbrains_mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Next.js Template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${host_grotesk.variable} ${work_sans.variable} ${jetbrains_mono.variable}`}
    >
      <body className='font-sans antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
