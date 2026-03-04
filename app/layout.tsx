import React from "react"
import type { Metadata } from 'next'
import { StudentProvider } from '@/lib/student-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'CareerPath Kenya - Digital Career Guidance System',
  description: 'Helping Kenyan high school students discover university courses aligned with their interests, strengths, and career goals.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <StudentProvider>
          {children}
        </StudentProvider>
      </body>
    </html>
  )
}
