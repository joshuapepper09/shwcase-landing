'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const CREATOR_TYPES = ['Photographer', 'Videographer', 'Content Creator', 'Musician', 'Graphic Designer', 'Model', 'Athlete', 'Podcaster', 'Other']

function SubmitForm() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    instagram: '',
    tiktok: '',
    creator_type: '',
    bio: '',
    portfolio_links: '',
  })

  useEffect(() => {
    if (!sessionId) window.location.href = '/drop'
  }, [sessionId])

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.creator_type || !form.bio) {
      setError('Please fill out all required fields.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/open-call-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, session_id: sessionId }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setSubmitting(false); return }
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    fontSize: '14px',
    background: '#0f0f0f',
    border: '1px solid #1a1a1a',
    color: 'white',
    fontFamily: 'DM Sans, sans-serif',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    fontSize: '10px',
    color: '#444',
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
    display: 'block',
  }

  if (submitted) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500&display=swap');`}</style>
      <div style={{ textAlign: 'center', maxWidth: '440px' }}>
        <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>Shwcase — Open Call</p>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '40px', color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
          Submission<br />received. ✦
        </h1>
        <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.7, marginBottom: '32px' }}>
          Your entry is in. Shwcase will review all submissions and announce winners on Instagram live. Follow <strong style={{ color: '#666' }}>@shwcase.app</strong> so you don't miss it.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <a href="https://instagram.com/shwcase.app" target="_blank" rel="noopener noreferrer"
            style={{ padding: '12px 28px', background: 'white', color: '#0a0a0a', fontSize: '13px', fontFamily: 'DM Serif Display, serif', textDecoration: 'none', letterSpacing: '0.04em' }}>
            Follow @shwcase.app
          </a>
          <a href="https://discord.gg/HH4J3fJHv" target="_blank" rel="noopener noreferrer"
            style={{ padding: '12px 28px', background: 'transparent', color: '#444', border: '1px solid #1a1a1a', fontSize: '13px', fontFamily: 'DM Serif Display, serif', textDecoration: 'none', letterSpacing: '0.04em' }}>
            Join the Discord
          </a>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        input::placeholder, textarea::placeholder { color: #333; }
        input:focus, textarea:focus { outline: none; border-color: #333 !important; }
      `}</style>

      <header style={{ padding: '24px 32px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '24px', height: '24px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid white', marginBottom: '-9px' }} />
          </div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: 'white' }}>Shwcase</span>
        </div>
        <span style={{ fontSize: '11px', color: '#333', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Open Call — Submission</span>
      </header>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '60px 24px 80px' }}>

        <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>Payment confirmed ✦</p>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 40px)', color: 'white', marginBottom: '8px', lineHeight: 1.15 }}>
          Complete your submission.
        </h1>
        <p style={{ fontSize: '14px', color: '#444', marginBottom: '48px', lineHeight: 1.6 }}>
          Tell us who you are and share your best work. Be real — we're looking for genuine creativity, not perfection.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div>
            <label style={labelStyle}>Full name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your name" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Email *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com" style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Instagram handle</label>
              <input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })}
                placeholder="@username" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>TikTok handle</label>
              <input value={form.tiktok} onChange={e => setForm({ ...form, tiktok: e.target.value })}
                placeholder="@username" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Creator type *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {CREATOR_TYPES.map(type => (
                <button key={type} onClick={() => setForm({ ...form, creator_type: type })}
                  style={{ padding: '10px 8px', fontSize: '12px', fontFamily: 'DM Sans, sans-serif', border: `1px solid ${form.creator_type === type ? '#fff' : '#1a1a1a'}`, background: form.creator_type === type ? 'white' : 'transparent', color: form.creator_type === type ? '#0a0a0a' : '#444', cursor: 'pointer', textAlign: 'center' as const }}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Bio * <span style={{ color: '#2a2a2a', fontSize: '9px' }}>— Who are you? What do you create? Keep it real.</span></label>
            <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell us about yourself and your creative work..."
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' as const }} />
          </div>

          <div>
            <label style={labelStyle}>Portfolio links * <span style={{ color: '#2a2a2a', fontSize: '9px' }}>— Paste links to your best work. Instagram, website, Google Drive, etc.</span></label>
            <textarea value={form.portfolio_links} onChange={e => setForm({ ...form, portfolio_links: e.target.value })}
              placeholder="https://instagram.com/yourhandle&#10;https://yourwebsite.com&#10;https://drive.google.com/..."
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' as const }} />
          </div>

          {error && <p style={{ fontSize: '13px', color: '#ff4444' }}>{error}</p>}

          <button onClick={handleSubmit} disabled={submitting}
            style={{ width: '100%', padding: '16px', fontSize: '15px', fontFamily: 'DM Serif Display, serif', background: 'white', color: '#0a0a0a', border: 'none', cursor: 'pointer', opacity: submitting ? 0.5 : 1, letterSpacing: '0.04em' }}>
            {submitting ? 'Submitting...' : 'Submit entry →'}
          </button>

          <p style={{ fontSize: '11px', color: '#2a2a2a', textAlign: 'center', letterSpacing: '0.06em' }}>
            Winners announced live on @shwcase.app Instagram
          </p>
        </div>
      </div>
    </main>
  )
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a0a0a' }} />}>
      <SubmitForm />
    </Suspense>
  )
}