'use client'

import { useEffect, useRef, useState } from 'react'

const IMG_CAR = 'https://drive.google.com/thumbnail?id=1xQgcSK5w__0BQERRlp9-Ycl0OhtYya58&sz=w1080'
const IMG_INTERIOR = 'https://drive.google.com/thumbnail?id=1w0gGNkvcRGRAogoSyGaSlZK59bPZ62Wa&sz=w1080'
const IMG_LEDGE = 'https://drive.google.com/thumbnail?id=1aK_e1MBY6yEUlIU5A-UEawxdoKXs0JOB&sz=w810'

const CSS = `
.cp{--night:#0B0B0D;--night-soft:#131316;--red:#D3242C;--red-soft:#E5484D;--bone:#EDE9E2;--bone-dim:rgba(237,233,226,.6);--hairline:rgba(237,233,226,.14)}
.cp{background:var(--night);color:var(--bone);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased}
.cp *{margin:0;padding:0;box-sizing:border-box}
.cp .mono{font-family:"IBM Plex Mono",monospace}
html.cp-lock,html.cp-lock body{overflow:hidden;height:100%}

/* ---------- entrance overlay ---------- */
.gate{position:fixed;inset:0;z-index:80;background:#000;overflow:hidden;touch-action:manipulation;transition:opacity 1s ease}
.gate.done{opacity:0;pointer-events:none}
.gate .stage{position:absolute;inset:0}

/* the car, parked */
.gate .car{position:absolute;inset:0;background-image:url("${IMG_CAR}");background-size:cover;background-position:32% 60%;transform-origin:34% 46%;transition:transform 1.15s cubic-bezier(.55,.06,.35,1),filter 1.15s ease,opacity 1.05s ease .2s}
.gate.s1 .car{transform:scale(2.4);filter:brightness(.78) saturate(1.15)}
.gate.s2 .car,.gate.s3 .car{transform:scale(2.9);filter:brightness(.5) blur(3px);opacity:0}
.gate .carTint{position:absolute;inset:0;background:radial-gradient(120% 90% at 30% 55%,transparent 40%,rgba(0,0,0,.55) 100%);transition:opacity .8s ease .3s}
.gate.s2 .carTint,.gate.s3 .carTint{opacity:0}

/* interior revealed behind the door */
.gate .cab{position:absolute;inset:0;background-image:url("${IMG_INTERIOR}");background-size:cover;background-position:center 30%;opacity:0;transform:scale(1.08);transition:opacity 1.1s ease,transform 1.6s ease}
.gate.s2 .cab,.gate.s3 .cab{opacity:1;transform:scale(1)}
.gate .cabTint{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.15) 45%,rgba(11,11,13,.85))}

/* the door itself */
.gate .doorWrap{position:absolute;inset:0;perspective:1200px;perspective-origin:20% 50%;pointer-events:none}
.gate .door{position:absolute;top:0;bottom:0;left:-2%;width:78%;transform-origin:left center;transform:rotateY(0deg);transition:transform 1.25s cubic-bezier(.6,.02,.28,1),opacity .35s ease;opacity:0;
  background:linear-gradient(155deg,#26282e 0%,#16171b 48%,#0b0c0f 100%);
  border-right:2px solid rgba(237,233,226,.28);
  box-shadow:inset -70px 0 110px -50px rgba(211,36,44,.45), inset 0 0 0 1px rgba(237,233,226,.05), 40px 0 90px rgba(0,0,0,.9)}
.gate .door::before{content:"";position:absolute;left:8%;right:12%;top:11%;height:36%;border:1.5px solid rgba(237,233,226,.32);border-bottom:none;border-radius:46% 54% 0 0/70% 70% 0 0;background:linear-gradient(rgba(237,233,226,.05),transparent)}
.gate .door::after{content:"";position:absolute;right:14%;top:57%;width:10%;height:6px;border-radius:3px;background:linear-gradient(90deg,rgba(237,233,226,.6),rgba(237,233,226,.15));box-shadow:0 0 8px rgba(237,233,226,.2)}
.gate.s2 .door,.gate.s3 .door{opacity:1;transform:rotateY(-112deg)}

/* red taillight bleed as you approach */
.gate .glow{position:absolute;left:-10%;top:35%;width:60%;height:40%;background:radial-gradient(closest-side,rgba(211,36,44,.35),transparent 70%);opacity:0;transition:opacity 1s ease}
.gate.s1 .glow{opacity:.9}
.gate.s2 .glow,.gate.s3 .glow{opacity:.35}
.gate .spill{position:absolute;top:0;bottom:0;left:0;width:70%;background:linear-gradient(100deg,rgba(237,233,226,.14),rgba(237,233,226,.03) 60%,transparent);opacity:0;transition:opacity .9s ease .3s}
.gate.s2 .spill,.gate.s3 .spill{opacity:1}

/* entrance copy */
.gate .mark{position:absolute;top:26px;left:28px;font-size:20px;font-weight:500;letter-spacing:.01em;color:var(--bone)}
.gate .mark sup{font-size:8px;vertical-align:8px}
.gate .invite{position:absolute;left:0;right:0;bottom:9%;display:flex;flex-direction:column;align-items:center;gap:14px;transition:opacity .5s ease}
.gate.s1 .invite,.gate.s2 .invite,.gate.s3 .invite,.gate.s4 .invite{opacity:0}
.gate .invite .l1{font-size:30px;font-style:italic;font-weight:300;color:var(--bone)}
.gate .invite .l2{font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--bone-dim)}
.gate .dot{width:44px;height:44px;border-radius:50%;border:1px solid rgba(229,72,77,.7);position:relative;animation:pulse 2.2s ease-out infinite}
.gate .dot::after{content:"";position:absolute;inset:16px;border-radius:50%;background:var(--red-soft)}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(229,72,77,.45)}70%{box-shadow:0 0 0 18px rgba(229,72,77,0)}100%{box-shadow:0 0 0 0 rgba(229,72,77,0)}}
.gate .inCopy{position:absolute;left:0;right:0;bottom:9%;text-align:center;opacity:0;transition:opacity .9s ease .35s}
.gate.s3 .inCopy{opacity:1}
.gate .inCopy .l1{font-size:34px;font-style:italic;font-weight:300}
.gate .inCopy .l2{margin-top:10px;font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--bone-dim)}

/* ---------- page ---------- */
.cp nav{display:flex;justify-content:space-between;align-items:baseline;padding:26px 28px;max-width:1080px;margin:0 auto}
.cp .wordmark{font-size:22px;font-weight:500;color:var(--bone);text-decoration:none}
.cp .wordmark sup{font-size:9px;vertical-align:8px}
.cp nav .tag{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--bone-dim)}

.cp .inside{position:relative;min-height:92vh;display:flex;align-items:flex-end;padding:0 28px 72px;background-image:linear-gradient(rgba(11,11,13,.25),rgba(11,11,13,.4) 55%,var(--night)),url("${IMG_INTERIOR}");background-size:cover;background-position:center 25%}
.cp .inside .in2{max-width:1080px;margin:0 auto;width:100%}
.cp .inside .k{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--red-soft);display:block;margin-bottom:22px}
.cp .inside h1{font-size:clamp(44px,10vw,104px);line-height:.96;font-weight:400;letter-spacing:-.01em}
.cp .inside h1 em{font-style:italic;font-weight:300;color:var(--red-soft)}
.cp .inside .sub{margin-top:26px;font-size:clamp(19px,3.4vw,24px);font-style:italic;font-weight:300;color:var(--bone-dim);max-width:30ch}
.cp .facts{margin-top:38px;display:flex;gap:22px;flex-wrap:wrap;border-top:1px solid var(--hairline);padding-top:16px}
.cp .facts span{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--bone-dim)}
.cp .facts span.hot{color:var(--red-soft)}

.cp .work{background:var(--night-soft);border-top:1px solid var(--hairline);padding:96px 28px}
.cp .work .inner{max-width:1080px;margin:0 auto}
.cp .work .mono-label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--red-soft);display:block;margin-bottom:14px}
.cp .work h2{font-size:clamp(30px,6vw,54px);font-style:italic;font-weight:300;line-height:1.1;max-width:20ch}
.cp .grid{margin-top:52px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
@media (max-width:760px){.cp .grid{grid-template-columns:1fr;max-width:340px}}
.cp .slot{position:relative;aspect-ratio:9/16;background-size:cover;background-position:center;border:1px solid rgba(211,36,44,.35);border-radius:2px;display:flex;flex-direction:column;justify-content:space-between;padding:16px;overflow:hidden;background-color:var(--night)}
.cp .slot::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--red);opacity:.7;z-index:2}
.cp .slot .no{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--red-soft);text-shadow:0 1px 8px rgba(0,0,0,.8)}
.cp .slot .cap{font-style:italic;font-size:19px;line-height:1.3;color:var(--bone);text-shadow:0 1px 10px rgba(0,0,0,.85)}
.cp .slot .idea{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(237,233,226,.75);line-height:1.9;text-shadow:0 1px 8px rgba(0,0,0,.8)}

.cp .quiet{padding:110px 28px;max-width:1080px;margin:0 auto;text-align:left}
.cp .quiet .k{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--bone-dim);display:block;margin-bottom:18px}
.cp .quiet .q{font-size:clamp(22px,4.4vw,34px);font-style:italic;font-weight:300;color:var(--bone-dim);line-height:1.3;max-width:26ch}
.cp .quiet .q b{font-weight:400;color:var(--bone)}

.cp footer{padding:44px 28px 60px;border-top:1px solid var(--hairline);display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;max-width:1080px;margin:0 auto}
.cp footer .f{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--bone-dim)}
.cp footer .f a{color:var(--red-soft);text-decoration:none}

@media (prefers-reduced-motion:reduce){
  .gate .car,.gate .door,.gate .cab,.gate .glow{transition-duration:.01s !important}
  .gate .dot{animation:none}
}
`

export default function Experience() {
  const [stage, setStage] = useState(0) // 0 parked, 1 approach, 2 door open, 3 inside, 4 revealed
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    document.documentElement.classList.add('cp-lock')
    ;[IMG_CAR, IMG_INTERIOR].forEach((s) => {
      const i = new Image()
      i.src = s
    })
    const t = timers.current
    return () => {
      document.documentElement.classList.remove('cp-lock')
      t.forEach(clearTimeout)
    }
  }, [])

  const enter = () => {
    if (stage !== 0) return
    setStage(1)
    timers.current.push(setTimeout(() => setStage(2), 1150))
    timers.current.push(setTimeout(() => setStage(3), 2550))
    timers.current.push(
      setTimeout(() => {
        setStage(4)
        document.documentElement.classList.remove('cp-lock')
      }, 3900),
    )
  }

  return (
    <main className="cp">
      <style>{CSS}</style>

      <div
        className={`gate s${stage} ${stage >= 4 ? 'done' : ''}`}
        onClick={stage === 0 ? enter : undefined}
        role={stage === 0 ? 'button' : undefined}
        aria-label="open the door"
      >
        <div className="stage">
          <div className="cab" />
          <div className="car" />
          <div className="carTint" />
          <div className="glow" />
          <div className="spill" />
          <div className="doorWrap">
            <div className="door" />
          </div>
          <div className="mark">
            shwcase<sup>®</sup>
          </div>
          <div className="invite">
            <div className="dot" />
            <div className="l1">andy&apos;s mustang.</div>
            <div className="l2">tap the door to get in</div>
          </div>
          <div className="inCopy">
            <div className="l1">you&apos;re in.</div>
            <div className="l2">scroll</div>
          </div>
        </div>
      </div>

      <nav>
        <span className="wordmark">
          shwcase<sup>®</sup>
        </span>
        <span className="tag">creator page · reserved</span>
      </nav>

      <section className="inside">
        <div className="in2">
          <span className="k">a page for @andyflcks</span>
          <h1>
            inside
            <br />
            <em>andy&apos;s</em> world.
          </h1>
          <p className="sub">black paint, red tail lights, a city that never fully quiets down.</p>
          <div className="facts">
            <span>reel creator</span>
            <span>los angeles</span>
            <span className="hot">mustang · ecoboost</span>
            <span>gym + car content</span>
          </div>
        </div>
      </section>

      <section className="work">
        <div className="inner">
          <span className="mono-label">his work · shot his way</span>
          <h2>the world from the driver&apos;s seat.</h2>
          <div className="grid">
            <div
              className="slot"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,11,13,.06), rgba(11,11,13,.4)), url('" + IMG_CAR + "')",
              }}
            >
              <span className="no">clip 01</span>
              <span className="cap">the car is the location.</span>
              <span className="idea">mustang · night garage · tail lights</span>
            </div>
            <div
              className="slot"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,11,13,.06), rgba(11,11,13,.4)), url('" + IMG_INTERIOR + "')",
              }}
            >
              <span className="no">clip 02</span>
              <span className="cap">where the thinking happens.</span>
              <span className="idea">driver seat · engine cooling</span>
            </div>
            <div
              className="slot"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,11,13,.06), rgba(11,11,13,.4)), url('" + IMG_LEDGE + "')",
              }}
            >
              <span className="no">clip 03</span>
              <span className="cap">the city behind him.</span>
              <span className="idea">rooftop ledge · night lights</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quiet">
        <span className="k">one question, when he&apos;s ready</span>
        <p className="q">
          where do you go when you need to think? <b>his answer, filmed his way.</b>
        </p>
      </section>

      <footer>
        <span className="f">shwcase · recollections from around the world</span>
        <span className="f">
          <a href="https://www.shwcase.app">shwcase.app</a>
        </span>
      </footer>
    </main>
  )
}
