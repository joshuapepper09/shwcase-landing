const CSS = `
  .p{--bone:#F2EFE7;--bone-soft:#FAF8F2;--ink:#10161C;--ink-soft:rgba(16,22,28,.56);--hairline:rgba(16,22,28,.14);--gold:#B7A681;--ghost:rgba(16,22,28,.30)}
  .p{background:var(--bone);color:var(--ink);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased;min-height:100vh}
  .p *{margin:0;padding:0;box-sizing:border-box}
  .p .mono{font-family:"IBM Plex Mono",monospace;font-weight:400}
  .p .grain{position:fixed;inset:-50%;z-index:60;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.05}
  .p .mono-label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--ink-soft)}

  .p nav{display:flex;justify-content:space-between;align-items:baseline;padding:26px 28px;max-width:1120px;margin:0 auto}
  .p .wordmark{font-size:22px;font-weight:500;letter-spacing:.01em;color:var(--ink);text-decoration:none}
  .p nav .right{display:flex;align-items:center;gap:14px}
  .p .ring{display:inline-block;width:11px;height:11px;border:1.5px solid var(--gold);border-radius:50%}
  @media (max-width:560px){.p nav .right .mono-label{display:none}}

  .p .wrap{max-width:1120px;margin:0 auto;padding:0 28px}

  .p .plaque{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;padding:110px 0 90px;border-bottom:1px solid var(--hairline)}
  .p .plaque .who .mono-label{display:block;margin-bottom:34px}
  .p .plaque h1{font-size:clamp(52px,10vw,118px);line-height:.96;font-weight:300;font-style:italic;color:var(--ghost);letter-spacing:-.01em}
  .p .plaque .handle{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.22em;color:var(--ink-soft);margin-top:30px;text-transform:uppercase}
  .p .score{border:1px solid var(--hairline);padding:26px 30px 22px;min-width:200px;text-align:left;flex-shrink:0}
  .p .score .mono-label{display:block;margin-bottom:14px}
  .p .score .n{font-size:clamp(48px,7vw,76px);line-height:1;font-weight:300}
  .p .score .micro{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin-top:14px;line-height:1.9}
  @media (max-width:760px){.p .plaque{flex-direction:column;align-items:flex-start;padding:70px 0 60px}.p .score{width:100%}}

  .p section{padding:80px 0 0}
  .p .head{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--hairline);padding-top:14px;margin-bottom:40px}
  .p .head .mono-label{color:var(--ink-soft)}

  .p .frames{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
  @media (max-width:760px){.p .frames{grid-template-columns:1fr}}
  .p .frame{border:1px solid var(--hairline);aspect-ratio:4/5;display:flex;align-items:center;justify-content:center}
  .p .frame span{font-style:italic;font-weight:300;font-size:26px;color:var(--ghost)}
  .p .frame-meta{padding:14px 2px 0;display:flex;justify-content:space-between;align-items:baseline}
  .p .frame-meta .t{font-style:italic;font-size:17px;color:var(--ghost)}
  .p .frame-meta .m{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-soft)}

  .p .rows{border-top:1px solid var(--hairline)}
  .p .row{display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:22px 0;border-bottom:1px solid var(--hairline)}
  .p .row .k{font-size:clamp(19px,2.6vw,25px);font-weight:400}
  .p .row .k em{font-style:italic}
  .p .row .v{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;color:var(--ink-soft);text-transform:uppercase;text-align:right;white-space:nowrap}
  .p .ledger-note{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-top:26px}

  .p .shelf{border:1px solid var(--hairline);padding:44px 28px;text-align:center}
  .p .shelf span{font-style:italic;font-weight:300;font-size:24px;color:var(--ghost)}

  .p .close{padding:150px 0 60px;text-align:center}
  .p .close h2{font-size:clamp(44px,8vw,88px);font-weight:300;font-style:italic;line-height:1.02;letter-spacing:-.01em}
  .p .close .mono-label{display:block;margin-top:34px}

  .p footer{border-top:1px solid var(--hairline);margin-top:60px}
  .p .foot-in{max-width:1120px;margin:0 auto;padding:24px 28px;display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap}
  .p .foot-in .mono-label{color:var(--ink-soft)}
`

export default function ProfileExample() {
  return (
    <main className="p">
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
        <header className="plaque">
          <div className="who">
            <span className="mono-label">wing — &nbsp;·&nbsp; to be claimed</span>
            <h1>creator name.</h1>
            <div className="handle">@ _ _ _ _ _ _ &nbsp;·&nbsp; exhibited since —</div>
          </div>
          <div className="score">
            <span className="mono-label">shwcase score</span>
            <div className="n">0</div>
            <div className="micro">
              earned in public.
              <br />
              every point has provenance.
            </div>
          </div>
        </header>

        <section>
          <div className="head">
            <span className="mono-label">exhibits</span>
            <span className="mono-label">0 shown</span>
          </div>
          <div className="frames">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="frame">
                  <span>to be shown.</span>
                </div>
                <div className="frame-meta">
                  <span className="t">title —</span>
                  <span className="m">medium — · season one</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="head">
            <span className="mono-label">the record</span>
            <span className="mono-label">no receipt, no points</span>
          </div>
          <div className="rows">
            <div className="row">
              <div className="k">
                seasons <em>exhibited</em>
              </div>
              <div className="v">0</div>
            </div>
            <div className="row">
              <div className="k">
                pieces <em>delivered</em>
              </div>
              <div className="v">0</div>
            </div>
            <div className="row">
              <div className="k">
                awards <em>won</em>
              </div>
              <div className="v">—</div>
            </div>
            <div className="row">
              <div className="k">
                collectors <em>gained</em>
              </div>
              <div className="v">0</div>
            </div>
            <div className="row">
              <div className="k">
                creators <em>referred</em>
              </div>
              <div className="v">0</div>
            </div>
            <div className="row">
              <div className="k">
                jury <em>service</em>
              </div>
              <div className="v">—</div>
            </div>
          </div>
          <div className="ledger-note">
            no entries yet — the record begins with season one.
          </div>
        </section>

        <section>
          <div className="head">
            <span className="mono-label">recognition</span>
            <span className="mono-label">the shelf</span>
          </div>
          <div className="shelf">
            <span>no awards yet.</span>
          </div>
        </section>

        <div className="close">
          <h2>this spot is open.</h2>
          <span className="mono-label">an example profile — season one is forming.</span>
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
