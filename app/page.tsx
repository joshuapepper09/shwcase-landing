'use client'

import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [userType, setUserType] = useState<'creator' | 'brand' | null>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showFloat, setShowFloat] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState(100)

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
      setSpotsLeft(prev => Math.max(prev - 1, 0))
    } catch {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  const creatorFeatures = [
    { icon: '✦', title: 'Build your portfolio', desc: 'Post your work, showcase your gear, and let your creative identity speak for itself.' },
    { icon: '◈', title: 'Collab with creators', desc: 'Send and receive collab requests from photographers, musicians, videographers, and more.' },
    { icon: '✦', title: 'Land brand deals', desc: 'Apply to paid brand deals posted by companies looking for exactly your type of content.' },
    { icon: '◈', title: 'Grow your network', desc: 'Connect with creators in your city, your niche, and beyond. Your next opportunity is one connection away.' },
    { icon: '✦', title: 'Host & attend events', desc: 'Create events for your community or discover creative events happening near you.' },
    { icon: '◈', title: 'Track your growth', desc: "See who's viewing your profile, which posts are performing, and how your network is expanding." },
  ]

  const brandFeatures = [
    { icon: '◈', title: 'Find the right talent', desc: 'Search creators by category, location, and style. No more cold DMs or agency markups.' },
    { icon: '✦', title: 'Post brand deals', desc: 'List your campaign, set your budget, and receive applications from qualified creators instantly.' },
    { icon: '◈', title: 'Verified creator profiles', desc: 'Every creator on Shwcase has a verified profile with their portfolio, gear, and past work.' },
    { icon: '✦', title: 'Manage everything in-app', desc: 'Message creators, review applications, and run your entire campaign workflow in one place.' },
    { icon: '◈', title: 'Scale your campaigns', desc: 'From micro-creators to large productions — find talent at every level for every budget.' },
    { icon: '✦', title: 'Brand-only access', desc: 'Brands go through a verification process, keeping the platform trusted on both sides.' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'DM Sans, sans-serif', display: 'flex', flexDirection: 'column' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        input::placeholder { color: #555; }
        input:focus { outline: none; border-color: #fff !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .fade-1 { animation: fadeUp 0.8s ease forwards; }
        .fade-2 { animation: fadeUp 0.8s ease 0.15s forwards; opacity: 0; }
        .fade-3 { animation: fadeUp 0.8s ease 0.3s forwards; opacity: 0; }
        .fade-4 { animation: fadeUp 0.8s ease 0.45s forwards; opacity: 0; }
        .fade-5 { animation: fadeUp 0.8s ease 0.6s forwards; opacity: 0; }
        .float-btn { animation: slideUp 0.4s ease forwards; }
        .feature-card:hover { border-color: #2a2a2a !important; background: #161616 !important; }
        .type-btn:hover { border-color: #444 !important; }
        .founding-card { background: #111; border: 1px solid #333; border-radius: 20px; padding: 28px; text-align: left; transition: all 0.2s; position: relative; overflow: hidden; }
        .founding-card::before { content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 1px; background: linear-gradient(135deg, #fff 0%, #555 50%, #fff 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
        .founding-card:hover { transform: translateY(-2px); }
        .brand-card { background: #111; border: 1px solid #222; border-radius: 20px; padding: 28px; text-align: left; transition: all 0.2s; }
        .brand-card:hover { border-color: #333 !important; transform: translateY(-2px); }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; display: inline-block; animation: pulse 2s infinite; margin-right: 8px; }
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

        {/* Beta badge */}
        <div className="fade-1" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #222', borderRadius: '100px', padding: '6px 16px', display: 'flex', alignItems: 'center' }}>
            <span className="live-dot"></span>Beta — {spotsLeft} spots remaining
          </span>
          <span style={{ fontSize: '11px', color: '#22c55e', letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid #1a3a1a', borderRadius: '100px', padding: '6px 16px' }}>
            ◈ 1 brand deal live now
          </span>
        </div>

        <h1 className="fade-2" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(48px, 8vw, 96px)', color: 'white', lineHeight: 1.05, marginBottom: '12px', maxWidth: '800px' }}>
          Show up.<br />
          <span style={{ fontStyle: 'italic', color: '#888' }}>Stand out.</span>
        </h1>

        <p className="fade-3" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#555', lineHeight: 1.6, maxWidth: '480px', marginBottom: '32px' }}>
          The professional network for creators. Build your profile, apply to brand deals, and get discovered.
        </p>

        {/* Beta callout */}
        <div className="fade-4" style={{ marginBottom: '48px', width: '100%', maxWidth: '580px' }}>
          <div style={{ background: '#0f1a0f', border: '1px solid #1a3a1a', borderRadius: '16px', padding: '24px 28px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="live-dot"></span>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: 'white' }}>Beta drop — 100 spots only</p>
            </div>
            <p style={{ fontSize: '14px', color: '#4a7a4a', lineHeight: 1.6 }}>
              We're hand-selecting the first 100 creators before public launch. One brand is already on the platform with a live deal — and they're choosing from whoever gets in.
            </p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '4px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#22c55e' }}>✦</span>
                <span style={{ fontSize: '12px', color: '#4a7a4a' }}>Real brand. Real deal. Real money.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#22c55e' }}>✦</span>
                <span style={{ fontSize: '12px', color: '#4a7a4a' }}>100 spots. When they're gone, they're gone.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist form */}
        <div className="fade-5" style={{ width: '100%', maxWidth: '440px', marginBottom: '80px' }}>
          {submitted ? (
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'white', marginBottom: '8px' }}>You're in ✦</p>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>We'll reach out with your beta access.</p>
              <a href="https://discord.gg/HH4J3fJHv" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '13px', color: '#888', textDecoration: 'none', border: '1px solid #333', borderRadius: '100px', padding: '8px 18px', display: 'inline-block' }}>
                Join our Discord →
              </a>
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
                <button type="submit" disabled={submitting || !userType}
                  style={{ padding: '14px 20px', fontSize: '14px', fontFamily: 'DM Serif Display, serif', background: 'white', color: '#0a0a0a', border: 'none', borderRadius: '12px', cursor: 'pointer', whiteSpace: 'nowrap', opacity: submitting || !userType ? 0.4 : 1 }}>
                  {submitting ? 'Securing...' : 'Claim spot'}
                </button>
              </div>
              <p style={{ fontSize: '12px', color: !userType ? '#666' : '#444', textAlign: 'center' }}>
                {!userType ? 'Select Creator or Brand to continue' : `${spotsLeft} spots remaining. No spam.`}
              </p>
            </form>
          )}
        </div>

        {/* Founding offers */}
        <div className="fade-5" style={{ width: '100%', maxWidth: '720px', marginBottom: '100px' }}>
          <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Founding member offers</p>
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '24px' }}>Skip the waitlist and lock in your spot before we launch.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>

            <div className="founding-card">
              <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', color: '#111', background: 'white', borderRadius: '100px', padding: '3px 10px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                Most Popular
              </div>
              <div style={{ marginBottom: '16px', marginTop: '4px' }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'white' }}>$7</span>
                <span style={{ fontSize: '13px', color: '#555', marginLeft: '6px' }}>one-time</span>
              </div>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'white', marginBottom: '6px' }}>Founding Creator</p>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>Lock in your founding status forever.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {['Skip the waitlist — instant access', 'Permanent Founding Creator badge', '6 months of Pro free ($29.94 value)', 'First access to brand deals in beta', 'Direct line to the Shwcase team'].map(perk => (
                  <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>✦</span>
                    <span style={{ fontSize: '13px', color: '#aaa' }}>{perk}</span>
                  </div>
                ))}
              </div>
              <a href="https://buy.stripe.com/4gM7sLaOS4dx6Em3qLgw001" target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', width: '100%', padding: '14px', background: 'white', color: '#0a0a0a', borderRadius: '12px', fontSize: '14px', fontFamily: 'DM Serif Display, serif', textDecoration: 'none', textAlign: 'center' }}>
                Get founding access →
              </a>
            </div>

            <div className="brand-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid #222', borderRadius: '100px', padding: '4px 10px' }}>Limited · 25 spots</span>
              </div>
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'white' }}>$49.99</span>
                <span style={{ fontSize: '13px', color: '#555', marginLeft: '6px' }}>one-time</span>
              </div>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'white', marginBottom: '6px' }}>Brand Early Access</p>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>Be a launch partner on Shwcase.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {['Post deals to our first 100 creators', 'Priority placement in deal marketplace', 'First access to our creator network', 'Dedicated onboarding call', 'Launch partner status', 'Direct line to the Shwcase team'].map(perk => (
                  <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#555' }}>◈</span>
                    <span style={{ fontSize: '13px', color: '#888' }}>{perk}</span>
                  </div>
                ))}
              </div>
              <a href="https://buy.stripe.com/5kQfZh5uyeSb9Qy7H1gw002" target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', width: '100%', padding: '14px', background: 'white', color: '#0a0a0a', borderRadius: '12px', fontSize: '14px', fontFamily: 'DM Serif Display, serif', textDecoration: 'none', textAlign: 'center' }}>
                Get brand access →
              </a>
            </div>
          </div>
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
                <span style={{ fontSize: '18px', color: '#555', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
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
                <span style={{ fontSize: '18px', color: '#555', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '16px', color: 'white', marginBottom: '8px' }}>{f.title}</p>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 5vw, 48px)', color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
            100 spots.<br /><span style={{ fontStyle: 'italic', color: '#888' }}>Are you in?</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '28px' }}>Hand-selected beta access. One brand deal already live.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ padding: '16px 32px', fontSize: '15px', fontFamily: 'DM Serif Display, serif', background: 'white', color: '#0a0a0a', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
            Claim your spot
          </button>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ padding: '24px 32px', borderTop: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '12px', color: '#333' }}>© 2026 Shwcase. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://instagram.com/shwcase.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#444', textDecoration: 'none' }}>Instagram</a>
          <a href="https://tiktok.com/@shwcase.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#444', textDecoration: 'none' }}>TikTok</a>
          <a href="https://discord.gg/HH4J3fJHv" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#444', textDecoration: 'none' }}>Discord</a>
        </div>
      </footer>

      {showFloat && !submitted && (
        <div className="float-btn" style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ padding: '14px 28px', background: 'white', color: '#0a0a0a', borderRadius: '100px', fontSize: '14px', fontFamily: 'DM Serif Display, serif', border: 'none', cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
            Claim your spot ↑
          </button>
        </div>
      )}

    </main>
  )
}