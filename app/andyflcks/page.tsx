import type { Metadata } from 'next'
import Experience from './experience'

export const metadata: Metadata = {
  title: 'andy · shwcase',
  description: 'a shwcase creator page, reserved for @andyflcks.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <Experience />
}
