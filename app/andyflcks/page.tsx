import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'andy · shwcase',
  description: 'a shwcase creator page, reserved for @andyflcks.',
  robots: { index: false, follow: false },
}

const CSS = `
  .cp{--night:#0B0B0D;--night-soft:#131316;--smoke:#1B1B1F;--red:#D3242C;--red-soft:#E5484D;--bone:#EDE9E2;--bone-dim:rgba(237,233,226,.6);--hairline:rgba(237,233,226,.14)}
  .cp{background:var(--night);color:var(--bone);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased;min-height:100vh}
  .cp *{margin:0;padding:0;box-sizing:border-box}
  .cp .grain{position:fixed;inset:-50%;z-index:60;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.06}
  .cp .mono-label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--red-soft)}

  .cp nav{display:flex;justify-content:space-between;align-items:baseline;padding:26px 28px;max-width:1080px;margin:0 auto}
  .cp .wordmark{font-size:22px;font-weight:500;color:var(--bone);text-decoration:none;letter-spacing:.01em}
  .cp .wordmark sup{font-size:9px;vertical-align:8px}
  .cp nav .tag{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--bone-dim)}

  .cp .hero{position:relative;padding:120px 28px 90px;max-width:1080px;margin:0 auto}
  .cp .hero::before{content:"";position:absolute;top:-140px;right:-180px;width:560px;height:560px;pointer-events:none;background:radial-gradient(closest-side,rgba(211,36,44,.20),rgba(211,36,44,0) 72%)}
  .cp .hero .kicker{margin-bottom:34px;display:block}
  .cp .hero h1{font-size:clamp(46px,11vw,118px);line-height:.95;font-weight:400;letter-spacing:-.01em;position:relative}
  .cp .hero h1 em{font-style:italic;font-weight:300}
  .cp .hero h1 .r1{display:block}
  .cp .hero h1 .r2{display:block;margin-left:8%;color:var(--red-soft)}
  .cp .hero h1 .r3{display:block;margin-left:3%}
  .cp .facts{margin-top:44px;display:flex;gap:26px;flex-wrap:wrap;border-top:1px solid var(--hairline);padding-top:16px}
  .cp .facts span{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--bone-dim)}
  .cp .facts span.hot{color:var(--red-soft)}

  .cp .statement{padding:40px 28px 110px;max-width:1080px;margin:0 auto}
  .cp .statement p{font-size:clamp(26px,5.6vw,50px);line-height:1.2;font-weight:300;max-width:22ch;color:var(--bone)}
  .cp .statement p em{font-style:italic;color:var(--red-soft)}

  .cp .frames{background:var(--night-soft);border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline);color:var(--bone);padding:110px 28px}
  .cp .frames .inner{max-width:1080px;margin:0 auto}
  .cp .frames .mono-label{color:var(--red-soft);display:block;margin-bottom:14px}
  .cp .frames .q{font-size:clamp(28px,6vw,56px);font-style:italic;font-weight:300;line-height:1.12;max-width:18ch}
  .cp .frames .sub{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--bone-dim);margin-top:18px;line-height:2}
  .cp .grid{margin-top:60px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  @media (max-width:760px){.cp .grid{grid-template-columns:1fr;max-width:340px}}
  .cp .slot{position:relative;aspect-ratio:9/16;background-size:cover;background-position:center;border:1px solid rgba(211,36,44,.35);border-radius:2px;display:flex;flex-direction:column;justify-content:space-between;padding:16px;overflow:hidden;background:var(--night)}
  .cp .slot::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--red);opacity:.7}
  .cp .slot::after{content:"";position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.08;pointer-events:none}
  .cp .slot .no{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--red-soft)}
  .cp .slot .wait{font-style:italic;font-size:21px;line-height:1.25;color:var(--bone)}
  .cp .slot .idea{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--bone-dim);line-height:1.9}
  .cp .frames .note{margin-top:44px;font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--bone-dim);line-height:2.1;max-width:420px}

  .cp .how{padding:110px 28px;max-width:1080px;margin:0 auto}
  .cp .how .head{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--hairline);padding-top:14px;margin-bottom:2px}
  .cp .how .head .mono-label{color:var(--bone-dim)}
  .cp .row{display:flex;align-items:baseline;gap:22px;padding:26px 0;border-bottom:1px solid var(--hairline)}
  .cp .row .n{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--red-soft);letter-spacing:.1em}
  .cp .row .t{font-size:clamp(21px,4vw,30px);font-weight:400}
  .cp .row .t em{font-style:italic;font-weight:300}
  .cp .row .d{margin-left:auto;font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--bone-dim);text-align:right;max-width:200px;line-height:1.9}
  @media (max-width:640px){.cp .row .d{display:none}}

  .cp footer{padding:80px 28px 60px;max-width:1080px;margin:0 auto}
  .cp footer .under{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;border-top:1px solid var(--hairline);padding-top:18px}
  .cp footer .mono-label{color:var(--bone-dim)}
  .cp footer a{color:var(--red-soft);text-decoration:none}
`

export default function AndyPage() {
  return (
    <main className="cp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{CSS}</style>
      <div className="grain"></div>

      <nav>
        <Link className="wordmark" href="/">
          shwcase<sup>®</sup>
        </Link>
        <span className="tag">creator page · reserved</span>
      </nav>

      <header className="hero">
        <span className="mono-label kicker">a page for @andyflcks</span>
        <h1>
          <span className="r1">
            <em>where does</em>
          </span>
          <span className="r2">andy go</span>
          <span className="r3">
            <em>to think?</em>
          </span>
        </h1>
        <div className="facts">
          <span>reel creator</span>
          <span>los angeles</span>
          <span className="hot">mustang · eco now, gt soon</span>
          <span>gym + car content</span>
        </div>
      </header>

      <section className="statement">
        <p>
          black paint, red tail lights, a city that never fully quiets down. his answer belongs in
          that world. one question, answered his way, in <em>his</em> footage. full credit, his
          name on it, <em>forever.</em>
        </p>
      </section>

      <section className="frames">
        <div className="inner">
          <span className="mono-label">his answer · waiting on his clips</span>
          <div className="q">where do you go when you need to think?</div>
          <div className="sub">or any of the four open questions · he picks the one that's his</div>
          <div className="grid">
            <div
              className="slot"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,11,13,.28), rgba(11,11,13,.62)), url('https://drive.google.com/thumbnail?id=1xQgcSK5w__0BQERRlp9-Ycl0OhtYya58&sz=w810')",
              }}
            >
              <span className="no">clip 01</span>
              <span className="wait">his place, filmed his way.</span>
              <span className="idea">could be: the mustang at blue hour, windows down</span>
            </div>
            <div
              className="slot"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,11,13,.28), rgba(11,11,13,.62)), url('https://drive.google.com/thumbnail?id=1w0gGNkvcRGRAogoSyGaSlZK59bPZ62Wa&sz=w810')",
              }}
            >
              <span className="no">clip 02</span>
              <span className="wait">20 to 60 seconds. no talking needed.</span>
              <span className="idea">could be: a rooftop or parking structure, engine cooling</span>
            </div>
            <div
              className="slot"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,11,13,.28), rgba(11,11,13,.62)), url('https://drive.google.com/thumbnail?id=1aK_e1MBY6yEUlIU5A-UEawxdoKXs0JOB&sz=w810')",
              }}
            >
              <span className="no">clip 03</span>
              <span className="wait">natural sound. barely cut.</span>
              <span className="idea">could be: the gym before anyone else is there</span>
            </div>
          </div>
          <div className="note">
            the frames stay empty until his clips land · ideas above are only starting points, from
            what he already shoots
          </div>
        </div>
      </section>

      <section className="how">
        <div className="head">
          <span className="mono-label">how it works for creators</span>
          <span className="mono-label">03 steps</span>
        </div>
        <div className="row">
          <span className="n">01</span>
          <span className="t">
            pick a question <em>that's yours.</em>
          </span>
          <span className="d">four open on shwcase.app</span>
        </div>
        <div className="row">
          <span className="n">02</span>
          <span className="t">
            shoot your answer, <em>your way.</em>
          </span>
          <span className="d">20–60 seconds · phone is fine</span>
        </div>
        <div className="row">
          <span className="n">03</span>
          <span className="t">
            it premieres with the others, <em>your name on it.</em>
          </span>
          <span className="d">full credit · this page · the finished film to post</span>
        </div>
      </section>

      <footer>
        <div className="under">
          <span className="mono-label">
            reserved for <a href="https://www.instagram.com/andyflcks/" target="_blank" rel="noopener noreferrer">@andyflcks</a>
          </span>
          <span className="mono-label">recollections from around the world</span>
          <span className="mono-label">shwcase</span>
        </div>
      </footer>
    </main>
  )
}
