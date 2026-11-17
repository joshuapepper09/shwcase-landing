'use client'

import { useEffect } from 'react'

const PALETTES: Record<string, { bg: string; ink: string; note: string }> = {
  morning: { bg: '#F7EFE3', ink: '#2E2118', note: 'viewing in morning light' },
  day: { bg: '#F2EAD9', ink: '#2E2118', note: 'viewing in daylight' },
  dusk: { bg: '#F4E3CB', ink: '#2B1B11', note: 'viewing at dusk' },
  night: { bg: '#131926', ink: '#E9E2D2', note: 'viewing at blue hour' },
}

function themeForHour(h: number): string {
  if (h >= 5 && h < 11) return 'morning'
  if (h >= 11 && h < 16) return 'day'
  if (h >= 16 && h < 21) return 'dusk'
  return 'night'
}

export default function TimeTheme() {
  useEffect(() => {
    const apply = () => {
      const t = themeForHour(new Date().getHours())
      const p = PALETTES[t]
      document.documentElement.dataset.shwTime = t
      document.body.style.transition = 'background .9s ease, color .9s ease'
      document.body.style.background = p.bg
      document.body.style.color = p.ink
      const note = document.getElementById('time-note')
      if (note) note.textContent = p.note
    }
    apply()
    const id = setInterval(apply, 10 * 60 * 1000)
    return () => clearInterval(id)
  }, [])
  return null
}
