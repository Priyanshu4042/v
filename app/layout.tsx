import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Speech to Text App',
  description: 'A Next.js app with OpenAI Whisper speech transcription',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  )
} 