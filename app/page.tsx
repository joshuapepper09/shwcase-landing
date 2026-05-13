'use client'

import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [userType, setUserType] = useState<'creator' | 'brand' | null>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showFloat, setShowFloat] = useState(false)

  const LAUNCH_DATE = new Date('2026-06-15T00:00:00')
  const WAITLIST_COUNT = 312

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = LAUNCH_DATE.getTime() - now.getTime()
      if (diff <= 0) return
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowFloat(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      await fetch('https://formspree.io/f/xeendadv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userType: userType || 'not specified' }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  const creatorFeatures = [
    { icon: '📸', title: 'Build your portfolio', desc: 'Post your work, showcase your gear, and let your creative identity speak for itself.' },
    { icon: '🤝', title: 'Collab with creators', desc: 'Send and receive collab requests from photographers, musicians, videographers, and more.' },
    { icon: '💼', title: 'Land brand deals', desc: 'Apply to paid brand deals posted by companies looking for exactly your type of content.' },
    { icon: '🔗', title: 'Grow your network', desc: 'Connect with creators in your city, your niche, and beyond. Your next opportunity is one connection away.' },
    { icon: '📅', title: 'Host & attend events', desc: 'Create events for your community or discover creative events happening near you.' },
    { icon: '📊', title: 'Track your growth', desc: 'See who\'s viewing your profile, which posts are performing, and how your network is expanding.' },
  ]

  const brandFeatures = [
    { icon: '🎯', title: 'Find the right talent', desc: 'Search creators by category, location, and style. No more cold DMs or agency markups.' },
    { icon: '📋', title: 'Post brand deals', desc: 'List your campaign, set your budget, and receive applications from qualified creators instantly.' },
    { icon: '✅', title: 'Verified creator profiles', desc: 'Every creator on Shwcase has a verified profile with their portfolio, gear, and past work.' },
    { icon: '💬', title: 'Manage everything in-app', desc: 'Message creators, review applications, and run your entire campaign workflow in one place.' },
    { icon: '📈', title: 'Scale your campaigns', desc: 'From micro-creators to large productions — find talent at every level for every budget.' },
    { icon: '🔒', title: 'Brand-only access', desc: 'Brands go through a verification process, keeping the platform trusted on both sides.' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'DM Sans, sans-serif', display: 'flex', flexDirection: 'column' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        input::placeholder { color: #555; }
        input:focus { outline: none; border-color: #fff !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-1 { animation: fadeUp 0.8s ease forwards; }
        .fade-2 { animation: fadeUp 0.8s ease 0.15s forwards; opacity: 0; }
        .fade-3 { animation: fadeUp 0.8s ease 0.3s forwards; opacity: 0; }
        .fade-4 { animation: fadeUp 0.8s ease 0.45s forwards; opacity: 0; }
        .fade-5 { animation: fadeUp 0.8s ease 0.6s forwards; opacity: 0; }
        .fade-6 { animation: fadeUp 0.8s ease 0.75s forwards; opacity: 0; }
        .float-btn { animation: slideUp 0.4s ease forwards; }
        .feature-card:hover { border-color: #2a2a2a !important; background: #161616 !important; }
        .type-btn:hover { border-color: #444 !important; }
      `}</style>

      {/* Header */}
      <header style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '28px', height: '28px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'white' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '11px solid white', marginBottom: '-10px' }} />
          </div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'white' }}>Shwcase</span>
        </div>
        <a href="https://instagram.com/shwcase.app" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '13px', color: '#555', textDecoration: 'none' }}>@shwcase.app</a>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px 40px', textAlign: 'center' }}>

        {/* Coming soon pill */}
        <div className="fade-1" style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #222', borderRadius: '100px', padding: '6px 16px' }}>
            Coming soon · {WAITLIST_COUNT}+ on the waitlist
          </span>
        </div>

        {/* Hero text */}
        <h1 className="fade-2" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(48px, 8vw, 96px)', color: 'white', lineHeight: 1.05, marginBottom: '12px', maxWidth: '800px' }}>
          Show up.<br />
          <span style={{ fontStyle: 'italic', color: '#888' }}>Stand out.</span>
        </h1>

        <p className="fade-3" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#555', lineHeight: 1.6, maxWidth: '480px', marginBottom: '48px' }}>
          The platform where creators get discovered and brands find real talent. Built for the next generation of creative professionals.
        </p>

        {/* Countdown */}
        <div className="fade-4" style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}>
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map(t => (
            <div key={t.label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '16px 20px', minWidth: '70px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'white', lineHeight: 1 }}>
                {String(t.value).padStart(2, '0')}
              </p>
              <p style={{ fontSize: '10px', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>{t.label}</p>
            </div>
          ))}
        </div>

        {/* Waitlist form */}
        <div className="fade-5" style={{ width: '100%', maxWidth: '440px', marginBottom: '100px' }}>
          {submitted ? (
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'white', marginBottom: '8px' }}>You're on the list ✦</p>
              <p style={{ fontSize: '14px', color: '#555' }}>We'll email you the moment Shwcase launches.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                {(['creator', 'brand'] as const).map(type => (
                  <button key={type} type="button" onClick={() => setUserType(type)} className="type-btn"
                    style={{ flex: 1, padding: '10px', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', borderRadius: '10px', border: `1px solid ${userType === type ? '#fff' : '#222'}`, background: userType === type ? 'white' : 'transparent', color: userType === type ? '#0a0a0a' : '#555', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span>{type === 'creator' ? '✦' : '◈'}</span>
                    <span style={{ textTransform: 'capitalize' }}>{type}</span>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email" required
                  style={{ flex: 1, padding: '14px 18px', fontSize: '14px', background: '#111', border: '1px solid #222', borderRadius: '12px', color: 'white', fontFamily: 'DM Sans, sans-serif' }}
                />
                <button type="submit" disabled={submitting}
                  style={{ padding: '14px 20px', fontSize: '14px', fontFamily: 'DM Serif Display, serif', background: 'white', color: '#0a0a0a', border: 'none', borderRadius: '12px', cursor: 'pointer', whiteSpace: 'nowrap', opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Joining...' : 'Join waitlist'}
                </button>
              </div>
              <p style={{ fontSize: '12px', color: '#444', textAlign: 'center' }}>No spam. We'll only email you when we launch.</p>
            </form>
          )}
        </div>

        {/* Market stats */}
        <div className="fade-5" style={{ width: '100%', maxWidth: '720px', marginBottom: '100px' }}>
          <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>The opportunity</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { stat: '$250B+', label: 'Creator economy market size in 2025' },
              { stat: '207M+', label: 'Active creators worldwide' },
              { stat: '$32B+', label: 'Spent on influencer marketing in 2025' },
            ].map(item => (
              <div key={item.stat} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '24px 20px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px, 4vw, 36px)', color: 'white', marginBottom: '8px' }}>{item.stat}</p>
                <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creator features */}
        <div style={{ width: '100%', maxWidth: '860px', marginBottom: '100px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px', color: '#555' }}>✦</span>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'white' }}>Built for creators</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {creatorFeatures.map(f => (
              <div key={f.title} className="feature-card" style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '24px', transition: 'all 0.2s', cursor: 'default' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '16px', color: 'white', marginBottom: '8px' }}>{f.title}</p>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand features */}
        <div style={{ width: '100%', maxWidth: '860px', marginBottom: '100px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', justifyContent: 'center' }}>
            <span style={{ fontSize: '16px', color: '#555' }}>◈</span>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'white' }}>Built for brands</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {brandFeatures.map(f => (
              <div key={f.title} className="feature-card" style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '24px', transition: 'all 0.2s', cursor: 'default' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '16px', color: 'white', marginBottom: '8px' }}>{f.title}</p>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 5vw, 48px)', color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
            Ready to<br /><span style={{ fontStyle: 'italic', color: '#888' }}>show up?</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '28px' }}>Join the waitlist and be first in when we launch June 15.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ padding: '16px 32px', fontSize: '15px', fontFamily: 'DM Serif Display, serif', background: 'white', color: '#0a0a0a', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
            Join the waitlist
          </button>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 32px', borderTop: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: '#333' }}>© 2026 Shwcase. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://instagram.com/shwcase.app" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '12px', color: '#444', textDecoration: 'none' }}>Instagram</a>
          <a href="https://tiktok.com/@shwcase" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '12px', color: '#444', textDecoration: 'none' }}>TikTok</a>
        </div>
      </footer>

      {/* Floating button */}
      {showFloat && !submitted && (
        <div className="float-btn" style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ padding: '14px 28px', background: 'white', color: '#0a0a0a', borderRadius: '100px', fontSize: '14px', fontFamily: 'DM Serif Display, serif', border: 'none', cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
            Join the waitlist ↑
          </button>
        </div>
      )}

    </main>
  )
}