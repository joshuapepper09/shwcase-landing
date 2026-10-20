import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'shwcase',
  description: 'recollections from around the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          background: '#fffafa',
          color: '#2b2226',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  )
}
