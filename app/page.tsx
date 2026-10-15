import Link from 'next/link'

// Change this line whenever the question changes
const CURRENT_QUESTION = 'where do you go when you need to think?'

const serif = "'DM Serif Display', Georgia, serif"

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '0 24px', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          maxWidth: 760,
          width: '100%',
          margin: '0 auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <nav style={{ padding: '36px 0' }}>
          <span style={{ fontFamily: serif, fontSize: 28 }}>shwcase</span>
        </nav>

        <section style={{ padding: '96px 0 72px', flex: 1 }}>
          <p style={{ fontSize: 14, letterSpacing: 1, color: '#e0a458', margin: 0 }}>
            the question right now
          </p>
          <h1
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: 'clamp(40px, 8vw, 76px)',
              lineHeight: 1.05,
              margin: '20px 0 0',
            }}
          >
            {CURRENT_QUESTION}
          </h1>
          <p style={{ color: '#9a9286', fontSize: 19, lineHeight: 1.6, maxWidth: 520, marginTop: 28 }}>
            I&apos;m asking one question at a time, then filming the places people send me. Answer it
            and it might end up in a video.
          </p>
          <Link
            href="/ask"
            style={{
              display: 'inline-block',
              marginTop: 36,
              padding: '15px 30px',
              background: '#e0a458',
              color: '#0f0e0c',
              borderRadius: 8,
              fontSize: 17,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            answer it
          </Link>
        </section>

        <footer style={{ borderTop: '1px solid #262626', padding: '28px 0 48px', color: '#9a9286', fontSize: 14 }}>
          shwcase &middot; los angeles
        </footer>
      </div>
    </main>
  )
}
