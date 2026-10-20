import Link from 'next/link'

const CURRENT_QUESTION = 'where do you go when you need to think?'
const MOTTO = 'recollections from around the world'

const serif = "'DM Serif Display', Georgia, serif"

const steps = [
  {
    n: '01',
    title: 'i ask one question.',
    body: 'One simple question at a time. Nothing to prepare, no right answer.',
  },
  {
    n: '02',
    title: 'you answer it.',
    body: 'Online in about a minute, or on a card someone hands you.',
  },
  {
    n: '03',
    title: 'i film the places you send me.',
    body: 'Your answer goes on screen or in voiceover over footage of that place.',
  },
]

export default function Home() {
  return (
    <main style={{ background: '#fffafa', color: '#2b2226', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            padding: '36px 0',
          }}
        >
          <div>
            <div style={{ fontFamily: serif, fontSize: 30, lineHeight: 1 }}>shwcase</div>
            <div
              style={{
                fontFamily: serif,
                fontStyle: 'italic',
                fontSize: 16,
                marginTop: 6,
                color: '#7b6a71',
              }}
            >
              {MOTTO}
            </div>
          </div>
          <Link
            href="/ask"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 44,
              padding: '0 22px',
              border: '1px solid #2b2226',
              borderRadius: 22,
              fontSize: 16,
              color: '#2b2226',
              textDecoration: 'none',
            }}
          >
            answer the question
          </Link>
        </header>

        <section style={{ padding: '88px 0' }}>
          <div style={{ fontSize: 14, letterSpacing: '0.08em', color: '#b04a67' }}>
            the question right now
          </div>
          <h1
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: 'clamp(40px, 8vw, 84px)',
              lineHeight: 1.04,
              margin: '20px 0 0',
              maxWidth: 900,
            }}
          >
            {CURRENT_QUESTION}
          </h1>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              color: '#7b6a71',
              maxWidth: 560,
              margin: '32px 0 0',
            }}
          >
            I&apos;m asking one question at a time, then filming the places people send me.
            Answer it and it might end up in a video.
          </p>
          <Link
            href="/ask"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 52,
              marginTop: 40,
              padding: '0 34px',
              background: '#f0b3c1',
              color: '#2b2226',
              borderRadius: 26,
              fontSize: 17,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            answer it
          </Link>
        </section>

        <section style={{ borderTop: '1px solid #f1cdd5', padding: '80px 0' }}>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 40, margin: 0 }}>
            how it works
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 48,
              marginTop: 48,
            }}
          >
            {steps.map((s) => (
              <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: serif, fontSize: 44, color: '#b04a67' }}>{s.n}</span>
                <span style={{ fontSize: 20, fontWeight: 500 }}>{s.title}</span>
                <span style={{ fontSize: 16, lineHeight: 1.6, color: '#7b6a71' }}>{s.body}</span>
              </div>
            ))}
          </div>
        </section>

        <footer
          style={{
            borderTop: '1px solid #f1cdd5',
            padding: '32px 0 56px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            fontSize: 14,
            color: '#7b6a71',
          }}
        >
          <span>shwcase · {MOTTO}</span>
          <span>los angeles</span>
        </footer>
      </div>
    </main>
  )
}
