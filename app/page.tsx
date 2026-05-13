import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shwcase — Show up. Stand out.',
  description: 'The platform for creators and brands to connect, collaborate, and grow. Join the waitlist.',
}

export default function LandingPage() {
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
        .fade-1 { animation: fadeUp 0.8s ease forwards; }
        .fade-2 { animation: fadeUp 0.8s ease 0.15s forwards; opacity: 0; }
        .fade-3 { animation: fadeUp 0.8s ease 0.3s forwards; opacity: 0; }
        .fade-4 { animation: fadeUp 0.8s ease 0.45s forwards; opacity: 0; }
        .fade-5 { animation: fadeUp 0.8s ease 0.6s forwards; opacity: 0; }
        .fade-6 { animation: fadeUp 0.8s ease 0.75s forwards; opacity: 0; }
        .stat-card:hover { border-color: #333 !important; }
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
          style={{ fontSize: '13px', color: '#555', textDecoration: 'none' }}>
          @shwcase.app
        </a>
      </header>

      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 40px', textAlign: 'center' }}>

        <div className="fade-1" style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #222', borderRadius: '100px', padding: '6px 16px' }}>
            Coming soon
          </span>
        </div>

        <h1 className="fade-2" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(48px, 8vw, 96px)', color: 'white', lineHeight: 1.05, marginBottom: '12px', maxWidth: '800px' }}>
          Show up.<br />
          <span style={{ fontStyle: 'italic', color: '#888' }}>Stand out.</span>
        </h1>

        <p className="fade-3" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#555', lineHeight: 1.6, maxWidth: '480px', marginBottom: '48px' }}>
          The platform where creators get discovered and brands find real talent. Built for the next generation of creative professionals.
        </p>

        {/* Waitlist form */}
        <form className="fade-4"
          action="https://formspree.io/f/xeendadv"
          method="POST"
          style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '72px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{ flex: 1, padding: '14px 18px', fontSize: '14px', background: '#111', border: '1px solid #222', borderRadius: '12px', color: 'white', fontFamily: 'DM Sans, sans-serif' }}
            />
            <button type="submit"
              style={{ padding: '14px 20px', fontSize: '14px', fontFamily: 'DM Serif Display, serif', background: 'white', color: '#0a0a0a', border: 'none', borderRadius: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Join waitlist
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#444', textAlign: 'center' }}>No spam. We'll only email you when we launch.</p>
        </form>

        {/* Market stats */}
        <div className="fade-5" style={{ width: '100%', maxWidth: '720px', marginBottom: '72px' }}>
          <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>The opportunity</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { stat: '$250B+', label: 'Creator economy market size in 2025' },
              { stat: '207M+', label: 'Active creators worldwide' },
              { stat: '$32B+', label: 'Spent on influencer marketing in 2025' },
            ].map(item => (
              <div key={item.stat} className="stat-card" style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '24px 20px', textAlign: 'center', transition: 'border-color 0.2s' }}>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px, 4vw, 36px)', color: 'white', marginBottom: '8px' }}>{item.stat}</p>
                <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creator / Brand split */}
        <div className="fade-6" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
          {[
            { icon: '✦', label: 'For Creators', sub: 'Photographers, musicians, designers & more', detail: 'Get discovered, find collabs, land brand deals' },
            { icon: '◈', label: 'For Brands', sub: 'Post deals, find talent, run campaigns', detail: 'Connect with verified creators in your niche' },
          ].map(item => (
            <div key={item.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '24px', textAlign: 'left', width: '220px' }}>
              <span style={{ fontSize: '20px', display: 'block', marginBottom: '12px', color: '#555' }}>{item.icon}</span>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: 'white', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5, marginBottom: '10px' }}>{item.sub}</p>
              <p style={{ fontSize: '11px', color: '#444', lineHeight: 1.5 }}>{item.detail}</p>
            </div>
          ))}
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

    </main>
  )
}