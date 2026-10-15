import { redirect } from 'next/navigation'

// Paste your Tally form link between the quotes on the next line
const FORM_URL = 'https://tally.so/r/1WPkvQ'

export default async function AskRedirect({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const src = typeof params.src === 'string' ? params.src.slice(0, 40) : ''
  redirect(src ? `${FORM_URL}?src=${encodeURIComponent(src)}` : FORM_URL)
}
