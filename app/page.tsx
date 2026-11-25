import Link from 'next/link'

const CSS = `
  .s{--bone:#F2EFE7;--ink:#10161C;--ink-soft:rgba(16,22,28,.56);--hairline:rgba(16,22,28,.14);--gold:#B7A681;--ghost:rgba(16,22,28,.30)}
  .s{background:var(--bone);color:var(--ink);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased;min-height:100vh}
  .s *{margin:0;padding:0;box-sizing:border-box}
  .s .grain{position:fixed;inset:-50%;z-index:60;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.05}
  .s .mono-label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--ink-soft)}
  .s a{color:inherit}

  .s nav{display:flex;justify-content:space-between;align-items:baseline;padding:26px 28px;max-width:1120px;margin:0 auto}
  .s .wordmark{font-size:22px;font-weight:500;letter-spacing:.01em}
  .s nav .right{display:flex;align-items:center;gap:14px}
  .s .ring{display:inline-block;width:11px;height:11px;border:1.5px solid var(--gold);border-radius:50%}
  @media (max-width:560px){.s nav .right .mono-label{display:none}}

  .s .wrap{max-width:1120px;margin:0 auto;padding:0 28px}

  .s .hero{padding:120px 0 90px;text-align:center}
  .s .hero .mono-label{display:block;margin-bottom:40px}
  .s .hero h1{font-size:clamp(64px,13vw,150px);line-height:.94;font-weight:300;font-style:italic;letter-spacing:-.01em}
  .s .hero .sub{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--ink-soft);margin-top:40px}
  .s .hero .rule{width:60px;height:1px;background:var(--gold);margin:36px auto 0}

  .s section{padding:80px 0 0}
  .s .head{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--hairline);padding-top:14px;margin-bottom:44px}
  .s .head .mono-label{color:var(--ink-soft)}

  .s .board-row{display:flex;justify-content:center;gap:26px;margin-bottom:26px}
  .s .slot{width:calc((100% - 52px)/3);max-width:340px}
  @media (max-width:760px){.s .board-row{flex-direction:column;align-items:center;gap:34px;margin-bottom:34px}.s .slot{width:100%;max-width:420px}}
  .s .frame{border:1px solid var(--hairline);aspect-ratio:4/5;display:flex;align-items:center;justify-content:center}
  .s .frame span{font-style:italic;font-weight:300;font-size:26px;color:var(--ghost)}
  .s .frame-meta{padding:14px 2px 0;display:flex;justify-content:space-between;align-items:baseline}
  .s .frame-meta .t{font-style:italic;font-size:17px;color:var(--ghost)}
  .s .frame-meta .m{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-soft)}

  .s .rows{border-top:1px solid var(--hairline)}
  .s .row{display:flex;justify-content:space-between;align-items:baseline;gap:24px;padding:26px 0;border-bottom:1px solid var(--hairline)}
  .s .row .k{font-size:clamp(22px,3vw,30px);font-weight:400;display:flex;align-items:baseline;gap:16px}
  .s .row .k em{font-style:italic}
  .s .row .k .n{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--gold);letter-spacing:.1em}
  .s .row .k .d{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-size:16px;color:var(--ink-soft);margin-top:6px;font-style:normal}
  .s .row .v{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;color:var(--ink-soft);text-transform:uppercase;text-align:right;white-space:nowrap}
  @media (max-width:760px){.s .row{flex-direction:column;gap:10px}.s .row .v{text-align:left}}
  .s .example-link{display:inline-block;margin-top:30px;font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--gold);padding-bottom:5px}

  .s .layer{padding:110px 0 0;text-align:center}
  .s .layer h2{font-size:clamp(36px,6.5vw,64px);font-weight:300;font-style:italic;line-height:1.05;letter-spacing:-.01em;max-width:22ch;margin:34px auto 0}
  .s .layer .mono-small{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-soft);margin-top:30px;line-height:2.1}

  .s .close{padding:140px 0 70px;text-align:center}
  .s .close h2{font-size:clamp(44px,8vw,88px);font-weight:300;font-style:italic;line-height:1.02;letter-spacing:-.01em}
  .s .cta{margin-top:44px;display:flex;flex-direction:column;align-items:center;gap:20px}
  .s .cta .mono-label{color:var(--ink-soft)}
  .s .cta a{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink);text-decoration:none;border:1px solid var(--hairline);border-radius:999px;padding:13px 26px}

  .s footer{border-top:1px solid var(--hairline);margin-top:40px}
  .s .foot-in{max-width:1120px;margin:0 auto;padding:24px 28px;display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap}
  .s .foot-in .mono-label{color:var(--ink-soft)}
`

const wings = ['G.01', 'G.02', 'B1', 'B2', 'B3']

export default function SeasonOne() {
  return (
    <main className="s">
      <style>{CSS}</style>
      <div className="grain" />

      <nav>
        <span className="wordmark">shwcase</span>
        <div className="right">
          <span className="mono-label">season one · forming</span>
          <span className="ring" />
        </div>
      </nav>

      <div className="wrap">
        <header className="hero">
          <span className="mono-label">a stage for creators</span>
          <h1>season one.</h1>
          <div className="sub">the founding five · twenty spots</div>
          <div className="rule" />
        </header>

        <section>
          <div className="head">
            <span className="mono-label">the board</span>
            <span className="mono-label">0 of 5 shown</span>
          </div>
          <div className="board-row">
            {wings.slice(0, 3).map((w) => (
              <div className="slot" key={w}>
                <div className="frame">
                  <span>to be shown.</span>
                </div>
                <div className="frame-meta">
                  <span className="t">wing {w}</span>
                  <span className="m">to be shown</span>
                </div>
              </div>
            ))}
          </div>
          <div className="board-row">
            {wings.slice(3).map((w) => (
              <div className="slot" key={w}>
                <div className="frame">
                  <span>to be shown.</span>
                </div>
                <div className="frame-meta">
                  <span className="t">wing {w}</span>
                  <span className="m">to be shown</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="head">
            <span className="mono-label">how it works</span>
            <span className="mono-label">for creators</span>
          </div>
          <div className="rows">
            <div className="row">
              <div className="k">
                <span className="n">01</span>
                <span>
                  <em>apply.</em>
                  <span className="d">free, and open to anyone with a body of work.</span>
                </span>
              </div>
              <div className="v">free</div>
            </div>
            <div className="row">
              <div className="k">
                <span className="n">02</span>
                <span>
                  the <em>spot.</em>
                  <span className="d">a numbered place in the season class. twenty per season; the founding five show free.</span>
                </span>
              </div>
              <div className="v">$20 / season</div>
            </div>
            <div className="row">
              <div className="k">
                <span className="n">03</span>
                <span>
                  the <em>score.</em>
                  <span className="d">earned in public. every point has provenance.</span>
                </span>
              </div>
              <div className="v">shwcase score</div>
            </div>
          </div>
          <Link href="/example" className="example-link">
            see an example profile →
          </Link>
        </section>

        <section className="layer">
          <span className="mono-label">between exhibits · the process layer</span>
          <h2>a look into the lives of creators.</h2>
          <div className="mono-small">
            formal exhibits, plus weekly process drops.
            <br />
            the studio, the work, the week.
          </div>
        </section>

        <div className="close">
          <h2>this season is forming.</h2>
          <div className="cta">
            <span className="mono-label">applications · opening with season one</span>
            <a href="https://tally.so/r/OQXD58" target="_blank" rel="noopener noreferrer">
              get notified ↗
            </a>
          </div>
        </div>
      </div>

      <footer>
        <div className="foot-in">
          <span className="mono-label">shwcase</span>
          <span className="mono-label">recollections from around the world.</span>
        </div>
      </footer>
    </main>
  )
}
