import type { Metadata, Viewport } from 'next'
import './globals.css'

const title = 'shwcase - where do you go when you need to think?'
const description =
  'one question, a minute. recollections from around the world, gathered one answer at a time.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shwcase.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://www.shwcase.app',
    siteName: 'shwcase',
    type: 'website',
    images: [{ url: '/og-cover.png', width: 1200, height: 630, alt: 'shwcase' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-cover.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#F2EAD9',
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          background: '#F2EAD9',
          color: '#2E2118',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        {children}
      </body>
    </html>
  )
}
