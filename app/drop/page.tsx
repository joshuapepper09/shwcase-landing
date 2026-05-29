'use client'

import { useState } from 'react'

export default function DropPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEnter = async () => {
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/open-call-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'DM Sans, sans-serif', color: 'white' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        input::placeholder { color: #444; }
        input:focus { outline: none; border-color: #555 !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .fade-1 { animation: fadeUp 0.7s ease forwards; }
        .fade-2 { animation: fadeUp 0.7s ease 0.1s forwards; opacity: 0; }
        .fade-3 { animation: fadeUp 0.7s ease 0.2s forwards; opacity: 0; }
        .fade-4 { animation: fadeUp 0.7s ease 0.3s forwards; opacity: 0; }
        .fade-5 { animation: fadeUp 0.7s ease 0.4s forwards; opacity: 0; }
        .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; display: inline-block; animation: pulse 2s infinite; margin-right: 8px; }
        .reward-card { background: #0f0f0f; border: 1px solid #1a1a1a; padding: 28px; transition: border-color 0.2s; }
        .reward-card:hover { border-color: #2a2a2a; }
        .enter-btn { padding: 14px 24px; font-size: 13px; font-family: 'DM Serif Display', serif; background: white; color: #0a0a0a; border: none; cursor: pointer; white-space: nowrap; letter-spacing: 0.04em; transition: opacity 0.15s; }
        .enter-btn:disabled { opacity: 0.4; cursor: default; }
        .enter-btn:hover:not(:disabled) { opacity: 0.9; }
      `}</style>

      {/* Header */}
      <header style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #111' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ position: 'relative', width: '24px', height: '24px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid white', marginBottom: '-9px' }} />
          </div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: 'white' }}>Shwcase</span>
        </a>
        <span style={{ fontSize: '11px', color: '#333', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Open Call</span>
      </header>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '80px 24px 80px' }}>

        {/* Status */}
        <div className="fade-1" style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="live-dot"></span>
          <span style={{ fontSize: '11px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Applications open now</span>
        </div>

        {/* Hero */}
        <div className="fade-2" style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Shwcase — Open Call No. 1
          </p>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(44px, 8vw, 80px)', color: 'white', lineHeight: 1.0, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Submit your<br />work.<br />
            <span style={{ color: '#2a2a2a', fontStyle: 'italic' }}>Get discovered.</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.7, maxWidth: '480px' }}>
            Shwcase is selecting creators from this open call to feature on our platform and social channels. Winners receive cash, a dedicated feature post, and priority placement when we launch.
          </p>
        </div>

        {/* How it works */}
        <div className="fade-3" style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '24px' }}>How it works</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a1a1a' }}>
            {[
              { step: '01', title: 'Pay $5 to enter', desc: 'Entry fee goes directly into the prize pool. 40% goes back to the grand prize winner.' },
              { step: '02', title: 'Submit your portfolio', desc: 'Share your best work — photos, videos, links, social handles. Tell us who you are.' },
              { step: '03', title: 'Shwcase reviews', desc: 'Our team reviews every submission. We select based on creativity, originality, and craft.' },
              { step: '04', title: 'Winners announced', desc: 'We announce winners on @shwcase.app. Grand prize gets cash + a dedicated feature post. Runners up get featured too.' },
            ].map((item) => (
              <div key={item.step} style={{ background: '#0a0a0a', padding: '24px 28px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '13px', color: '#2a2a2a', flexShrink: 0, marginTop: '2px' }}>{item.step}</span>
                <div>
                  <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', color: 'white', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="fade-4" style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '24px' }}>Rewards</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Grand prize */}
            <div className="reward-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #fff, transparent)' }} />
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '10px', color: '#555', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>Grand Prize — 1 winner</p>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'white' }}>Cash + Feature + Priority</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  '40% of the total entry pool — paid out in cash',
                  'Dedicated feature post on @shwcase.app',
                  'Founding Creator status — 6 months Pro free',
                  'Priority placement at top of Discover when we launch',
                ].map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e', flexShrink: 0, marginTop: '7px', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '13px', color: '#888', lineHeight: 1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Runners up */}
            <div className="reward-card">
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '10px', color: '#444', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>Runners Up — 3 winners</p>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'white' }}>Feature + Founding Creator</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Dedicated feature post on @shwcase.app',
                  'Founding Creator status — 6 months Pro free',
                  'Priority placement in Discover at launch',
                ].map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#444', flexShrink: 0, marginTop: '7px', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Everyone */}
            <div className="reward-card">
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '10px', color: '#333', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>All entrants</p>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: '#555' }}>Early beta access</p>
              </div>
              <p style={{ fontSize: '13px', color: '#333', lineHeight: 1.6 }}>Everyone who enters gets early beta access to Shwcase before public launch — plus a profile on the platform from day one.</p>
            </div>
          </div>
        </div>

        {/* Entry form */}
        <div className="fade-5">
          <p style={{ fontSize: '11px', color: '#333', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '24px' }}>Enter the open call</p>
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '32px' }}>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'white', marginBottom: '8px' }}>$5 entry</p>
            <p style={{ fontSize: '13px', color: '#444', marginBottom: '28px', lineHeight: 1.6 }}>Pay to enter. After payment you'll complete your submission — portfolio links, social handles, and a short bio.</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEnter()}
                placeholder="Your email address"
                style={{ flex: 1, padding: '14px 16px', fontSize: '14px', background: '#0a0a0a', border: '1px solid #1a1a1a', color: 'white', fontFamily: 'DM Sans, sans-serif' }}
              />
              <button
                className="enter-btn"
                onClick={handleEnter}
                disabled={loading || !email}>
                {loading ? 'Loading...' : 'Enter — $5'}
              </button>
            </div>
            {error && <p style={{ fontSize: '12px', color: '#ff4444', marginBottom: '8px' }}>{error}</p>}
            <p style={{ fontSize: '11px', color: '#2a2a2a', letterSpacing: '0.06em' }}>Secure payment via Stripe. No subscription. One-time entry.</p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 32px', borderTop: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontSize: '11px', color: '#333', textDecoration: 'none', letterSpacing: '0.06em' }}>← Back to Shwcase</a>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="https://instagram.com/shwcase.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#333', textDecoration: 'none' }}>Instagram</a>
          <a href="https://tiktok.com/@shwcase.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#333', textDecoration: 'none' }}>TikTok</a>
          <a href="https://discord.gg/HH4J3fJHv" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#333', textDecoration: 'none' }}>Discord</a>
        </div>
      </footer>

    </main>
  )
}
