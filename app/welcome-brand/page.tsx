export default function WelcomeBrand() {
    return (
      <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'DM Sans, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
  
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0a0a0a; }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-1 { animation: fadeUp 0.8s ease forwards; }
          .fade-2 { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
          .fade-3 { animation: fadeUp 0.8s ease 0.4s forwards; opacity: 0; }
          .fade-4 { animation: fadeUp 0.8s ease 0.6s forwards; opacity: 0; }
          .btn:hover { background: #f0f0f0 !important; }
        `}</style>
  
        {/* Logo */}
        <div className="fade-1" style={{ marginBottom: '40px' }}>
          <div style={{ position: 'relative', width: '48px', height: '48px', margin: '0 auto 16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '18px solid white', marginBottom: '-16px' }} />
          </div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'white' }}>Shwcase</span>
        </div>
  
        {/* Main message */}
        <div className="fade-2" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#111', border: '1px solid #222', borderRadius: '100px', padding: '6px 14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#555' }}>◈</span>
            <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Launch Partner</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 6vw, 64px)', color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
            Welcome to<br /><span style={{ fontStyle: 'italic', color: '#888' }}>the inner circle.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#555', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto' }}>
            You're one of only 25 brands with founding access to Shwcase. We'll be in touch personally before launch to get you set up.
          </p>
        </div>
  
        {/* What they get */}
        <div className="fade-3" style={{ width: '100%', maxWidth: '520px', marginBottom: '40px' }}>
          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '20px', padding: '28px', textAlign: 'left' }}>
            <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>Your founding brand benefits</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '◈', title: 'Pre-approved brand status', desc: 'Skip the verification queue entirely. You\'re in from day one.' },
                { icon: '🎯', title: 'Priority placement in deal marketplace', desc: 'Your deals appear first when creators browse the marketplace.' },
                { icon: '👥', title: 'First access to our creator network', desc: 'Browse and connect with creators before the platform opens to the public.' },
                { icon: '📞', title: 'Dedicated onboarding call', desc: 'We\'ll get on a call with you personally before launch to walk you through everything.' },
                { icon: '🤝', title: 'Launch partner status', desc: 'Your brand is recognized as a founding partner — exclusive and permanent.' },
                { icon: '💬', title: 'Direct line to the team', desc: 'Text us directly. No support tickets, no wait times.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '14px', color: 'white', fontWeight: 500, marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Next steps */}
        <div className="fade-3" style={{ width: '100%', maxWidth: '520px', marginBottom: '40px' }}>
          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '20px', padding: '28px', textAlign: 'left' }}>
            <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>What happens next</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: '01', title: 'We review your brand', desc: 'We\'ll check out your submission within 24-48 hours.' },
                { step: '02', title: 'We reach out directly', desc: 'Expect an email or DM from the Shwcase team before June 15.' },
                { step: '03', title: 'Onboarding call', desc: 'We walk you through the platform and get your brand set up.' },
                { step: '04', title: 'Launch day', desc: 'June 15 — you go live with full access before anyone else.' },
              ].map(item => (
                <div key={item.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '11px', color: '#333', fontFamily: 'DM Serif Display, serif', flexShrink: 0, marginTop: '3px', letterSpacing: '0.05em' }}>{item.step}</span>
                  <div>
                    <p style={{ fontSize: '14px', color: 'white', fontWeight: 500, marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* CTAs */}
        <div className="fade-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <a href="https://discord.gg/HH4J3fJHv" target="_blank" rel="noopener noreferrer" className="btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 28px', background: 'white', color: '#0a0a0a', borderRadius: '12px', fontSize: '15px', fontFamily: 'DM Serif Display, serif', textDecoration: 'none', transition: 'background 0.15s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a0a0a">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.13 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Join the Shwcase Discord
          </a>
          <p style={{ fontSize: '12px', color: '#333' }}>We'll see you on June 15. 🖤</p>
        </div>
  
        <div className="fade-4" style={{ display: 'flex', gap: '20px' }}>
          <a href="https://instagram.com/shwcase.app" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '13px', color: '#444', textDecoration: 'none' }}>@shwcase.app</a>
        </div>
  
      </main>
    )
  }