'use client'

import { useEffect, useRef, useState } from 'react'

const IMG_CAR = 'https://drive.google.com/thumbnail?id=1xQgcSK5w__0BQERRlp9-Ycl0OhtYya58&sz=w1080'
const IMG_INTERIOR = 'https://drive.google.com/thumbnail?id=1w0gGNkvcRGRAogoSyGaSlZK59bPZ62Wa&sz=w1080'
const IMG_LEDGE = 'https://drive.google.com/thumbnail?id=1aK_e1MBY6yEUlIU5A-UEawxdoKXs0JOB&sz=w810'

const CSS = `
.cp{--night:#0B0B0D;--night-soft:#131316;--red:#D3242C;--red-soft:#E5484D;--bone:#EDE9E2;--bone-dim:rgba(237,233,226,.6);--hairline:rgba(237,233,226,.14);
  --wall:#F2EDE3;--wall-low:#E8E1D2;--floor:#D8CFBB;--ink:#221C14;--ink-dim:rgba(34,28,20,.55);--ink-hair:rgba(34,28,20,.16)}
.cp{background:var(--night);color:var(--bone);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased}
.cp *{margin:0;padding:0;box-sizing:border-box}
.cp .mono{font-family:"IBM Plex Mono",monospace}
html.cp-lock,html.cp-lock body{overflow:hidden;height:100%}

/* ---------- entrance overlay ---------- */
.gate{position:fixed;inset:0;z-index:80;background:#000;overflow:hidden;touch-action:manipulation;transition:opacity 1.15s cubic-bezier(.4,0,.2,1);will-change:opacity}
.gate.done{opacity:0;pointer-events:none}
.gate .stage{position:absolute;inset:0}

/* the car, parked */
.gate .car{position:absolute;inset:0;background-image:url("${IMG_CAR}");background-size:cover;background-position:32% 60%;transform-origin:34% 46%;will-change:transform,opacity}
.gate.open .car{animation:carPush 2.7s forwards}
@keyframes carPush{
  0%{transform:scale(1);filter:brightness(1);opacity:1;animation-timing-function:cubic-bezier(.45,.05,.3,1)}
  38%{transform:scale(2.3);filter:brightness(.82) saturate(1.12);opacity:1;animation-timing-function:cubic-bezier(.55,.05,.35,1)}
  72%{transform:scale(2.7);filter:brightness(.6);opacity:.5;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  100%{transform:scale(2.9);filter:brightness(.5);opacity:0}
}
.gate .carTint{position:absolute;inset:0;background:radial-gradient(120% 90% at 30% 55%,transparent 40%,rgba(0,0,0,.55) 100%)}
.gate.open .carTint{animation:tintOut 1s ease 1.15s forwards}
@keyframes tintOut{to{opacity:0}}

/* interior revealed behind the door */
.gate .cab{position:absolute;inset:0;background-image:url("${IMG_INTERIOR}");background-size:cover;background-position:center 30%;opacity:0;transform:scale(1.09);will-change:transform,opacity}
.gate.open .cab{animation:cabIn 1.9s cubic-bezier(.25,.6,.25,1) 1.05s forwards}
@keyframes cabIn{
  0%{opacity:0;transform:scale(1.09)}
  32%{opacity:1}
  100%{opacity:1;transform:scale(1)}
}
.gate .cabTint{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.15) 45%,rgba(11,11,13,.85))}

/* the door itself */
.gate .doorWrap{position:absolute;inset:0;perspective:1200px;perspective-origin:20% 50%;pointer-events:none}
.gate .door{position:absolute;top:0;bottom:0;left:-2%;width:78%;transform-origin:left center;transform:rotateY(0deg);opacity:0;will-change:transform,opacity;
  background:linear-gradient(155deg,#26282e 0%,#16171b 48%,#0b0c0f 100%);
  border-right:2px solid rgba(237,233,226,.28);
  box-shadow:inset -70px 0 110px -50px rgba(211,36,44,.45), inset 0 0 0 1px rgba(237,233,226,.05), 40px 0 90px rgba(0,0,0,.9)}
.gate .door::before{content:"";position:absolute;left:8%;right:12%;top:11%;height:36%;border:1.5px solid rgba(237,233,226,.32);border-bottom:none;border-radius:46% 54% 0 0/70% 70% 0 0;background:linear-gradient(rgba(237,233,226,.05),transparent)}
.gate .door::after{content:"";position:absolute;right:14%;top:57%;width:10%;height:6px;border-radius:3px;background:linear-gradient(90deg,rgba(237,233,226,.6),rgba(237,233,226,.15));box-shadow:0 0 8px rgba(237,233,226,.2)}
.gate.open .door{animation:doorSwing 1.55s 1.05s forwards}
@keyframes doorSwing{
  0%{transform:rotateY(0deg);opacity:0;animation-timing-function:cubic-bezier(.5,.08,.65,.45)}
  7%{opacity:1}
  46%{transform:rotateY(-88deg);animation-timing-function:cubic-bezier(.3,.65,.35,1)}
  68%{transform:rotateY(-116deg);animation-timing-function:cubic-bezier(.35,.7,.4,1)}
  84%{transform:rotateY(-108deg);animation-timing-function:cubic-bezier(.4,0,.3,1)}
  100%{transform:rotateY(-111deg);opacity:1}
}

/* red taillight bleed as you approach */
.gate .glow{position:absolute;left:-10%;top:35%;width:60%;height:40%;background:radial-gradient(closest-side,rgba(211,36,44,.35),transparent 70%);opacity:0}
.gate.open .glow{animation:glowArc 2.7s ease forwards}
@keyframes glowArc{0%{opacity:0}30%{opacity:.9}100%{opacity:.35}}
.gate .spill{position:absolute;top:0;bottom:0;left:0;width:70%;background:linear-gradient(100deg,rgba(237,233,226,.14),rgba(237,233,226,.03) 60%,transparent);opacity:0}
.gate.open .spill{animation:spillIn 1.1s ease 1.2s forwards}
@keyframes spillIn{to{opacity:1}}

/* entrance copy */
.gate .mark{position:absolute;top:26px;left:28px;font-size:20px;font-weight:500;letter-spacing:.01em;color:var(--bone)}
.gate .mark sup{font-size:8px;vertical-align:8px}
.gate .invite{position:absolute;left:0;right:0;bottom:9%;display:flex;flex-direction:column;align-items:center;gap:14px;transition:opacity .5s ease,transform .5s ease}
.gate.open .invite{opacity:0;transform:scale(.96)}
.gate .invite .l1{font-size:30px;font-style:italic;font-weight:300;color:var(--bone)}
.gate .invite .l2{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--bone-dim)}
.gate .dot{width:44px;height:44px;border-radius:50%;border:1px solid rgba(229,72,77,.7);position:relative}
.gate .dot::before{content:"";position:absolute;inset:-1px;border-radius:50%;border:1px solid rgba(229,72,77,.55);animation:ringPulse 2.2s ease-out infinite;will-change:transform,opacity}
.gate .dot::after{content:"";position:absolute;inset:16px;border-radius:50%;background:var(--red-soft)}
@keyframes ringPulse{0%{transform:scale(.7);opacity:.9}70%{transform:scale(1.7);opacity:0}100%{transform:scale(1.7);opacity:0}}
.gate .inCopy{position:absolute;left:0;right:0;bottom:9%;text-align:center;opacity:0;transform:translateY(10px)}
.gate.open .inCopy{animation:copyIn 1s cubic-bezier(.25,.6,.25,1) 2.5s forwards}
@keyframes copyIn{to{opacity:1;transform:translateY(0)}}
.gate .inCopy .l1{font-size:34px;font-style:italic;font-weight:300}
.gate .inCopy .l2{margin-top:10px;font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--bone-dim)}

/* ---------- the room ---------- */
.room{position:relative;height:100svh;min-height:560px;overflow:hidden;user-select:none;-webkit-user-select:none;
  background:linear-gradient(var(--wall) 0%,var(--wall) 58%,var(--wall-low) 66%,var(--floor) 66.3%,var(--floor) 100%);
  opacity:0;transition:opacity 1.1s ease .25s}
.cp.revealed .room{opacity:1}
.room::before{content:"";position:absolute;left:0;right:0;top:58%;height:9%;background:linear-gradient(rgba(120,100,70,.10),transparent);pointer-events:none}

.roomTop{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;align-items:center;justify-content:space-between;padding:22px 26px;color:var(--ink)}
.roomTop .wm{font-size:20px;font-weight:500}
.roomTop .wm sup{font-size:8px;vertical-align:8px}
.roomTop .tag{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-dim)}
@media (max-width:640px){.roomTop .tag{display:none}}
.modeTgl{display:flex;border:1px solid var(--ink-hair);border-radius:999px;overflow:hidden;background:rgba(255,255,255,.35)}
.modeTgl button{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.18em;padding:7px 14px;background:transparent;border:0;color:var(--ink-dim);cursor:pointer}
.modeTgl button.on{background:var(--ink);color:var(--wall)}

.roomScene{position:absolute;inset:0;perspective:820px;perspective-origin:50% 46%;cursor:grab;touch-action:none}
.roomScene.grabbing{cursor:grabbing}
.roomWalk{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform}

.piece{position:absolute;left:50%;top:45%;width:min(56vw,300px);transform-style:preserve-3d}
.piece .spot{position:absolute;left:-18%;right:-18%;top:-34%;height:40%;background:radial-gradient(55% 100% at 50% 0%,rgba(255,255,255,.85),rgba(255,255,255,0) 72%);pointer-events:none}
.piece .frame{background:#FBF8F1;padding:10px 10px 10px;border:1px solid rgba(34,28,20,.35);box-shadow:0 22px 40px rgba(70,58,38,.30),0 3px 8px rgba(70,58,38,.18);cursor:pointer}
.piece .frame img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover;pointer-events:none}
.piece .plate{margin:14px auto 0;width:max-content;max-width:100%;background:rgba(251,248,241,.9);border:1px solid var(--ink-hair);padding:6px 12px;display:flex;gap:10px;align-items:baseline}
.piece .plate .pno{font-size:8.5px;letter-spacing:.18em;color:var(--ink-dim)}
.piece .plate .pt{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:15px;color:var(--ink)}

.piece.titlePiece{width:min(70vw,380px);text-align:center;pointer-events:none}
.piece.titlePiece .kick{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--ink-dim)}
.piece.titlePiece h1{margin-top:16px;font-size:clamp(38px,7.5vw,58px);font-style:italic;font-weight:300;line-height:1.02;color:var(--ink)}
.piece.titlePiece .cnt{margin-top:18px;font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--ink-dim)}
.piece.titlePiece .rule{margin:20px auto 0;width:44px;height:1px;background:var(--ink-hair)}

.walkHint{position:absolute;left:0;right:0;bottom:86px;z-index:6;text-align:center;font-size:8.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--ink-dim)}
.walkHint .sep{margin:0 10px}
.roomArrows{position:absolute;right:26px;bottom:66px;z-index:6;display:flex;gap:10px}
.roomArrows button{width:42px;height:42px;border-radius:50%;border:1px solid var(--ink-hair);background:rgba(255,255,255,.4);color:var(--ink);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.roomArrows button:hover{background:var(--ink);color:var(--wall)}
.roomFoot{position:absolute;left:26px;right:26px;bottom:22px;z-index:6;display:flex;justify-content:space-between;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim)}
@media (max-width:640px){.roomFoot span:last-child{display:none}}

/* ---------- look closer ---------- */
.closer{position:fixed;inset:0;z-index:70;background:rgba(242,237,227,.97);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:70px 24px 40px;animation:clIn .45s ease}
@keyframes clIn{from{opacity:0}to{opacity:1}}
.clFrame{background:#FBF8F1;padding:12px;border:1px solid rgba(34,28,20,.35);box-shadow:0 30px 60px rgba(70,58,38,.3);max-width:min(92vw,440px)}
.clFrame img{display:block;width:100%;max-height:56svh;object-fit:cover}
.clMeta{margin-top:18px;text-align:center;max-width:min(92vw,440px)}
.clMeta .clT{font-size:26px;font-style:italic;font-weight:300;color:var(--ink)}
.clMeta .clM{margin-top:8px;font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-dim)}
.clMeta .clQ{display:block;margin-top:14px;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-dim);line-height:1.9}
.clClose{position:absolute;top:22px;right:26px;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--ink);background:none;border:1px solid var(--ink-hair);border-radius:999px;padding:8px 16px;cursor:pointer}

/* ---------- list view ---------- */
.listView{min-height:100svh;background:linear-gradient(var(--wall),var(--wall-low));padding:110px 26px 60px;color:var(--ink)}
.listHead{display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--ink-hair);padding-bottom:20px;max-width:980px;margin:0 auto}
.listHead h2{font-size:clamp(34px,6vw,54px);font-style:italic;font-weight:300}
.listHead .cnt{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--ink-dim)}
.listRow{display:grid;grid-template-columns:minmax(0,46%) 1fr;gap:clamp(20px,5vw,70px);align-items:center;max-width:980px;margin:0 auto;padding:54px 0;border-bottom:1px solid var(--ink-hair)}
@media (max-width:640px){.listRow{grid-template-columns:1fr;gap:22px;padding:44px 0}}
.listRow .lf{background:#FBF8F1;padding:9px;border:1px solid rgba(34,28,20,.3);box-shadow:0 16px 34px rgba(70,58,38,.22)}
.listRow .lf img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover}
.listRow .lr .no{font-size:9px;letter-spacing:.22em;color:var(--ink-dim);text-transform:uppercase}
.listRow .lr h3{margin-top:12px;font-size:clamp(26px,4.4vw,36px);font-style:italic;font-weight:300}
.listRow .lr .mt{margin-top:12px;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim)}
.listRow .lr .qt{display:block;margin-top:16px;font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-dim);line-height:1.9;max-width:40ch}
.listFoot{max-width:980px;margin:44px auto 0;display:flex;justify-content:space-between;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim)}

@media (prefers-reduced-motion:reduce){
  .gate.open .car,.gate.open .carTint,.gate.open .cab,.gate.open .door,.gate.open .glow,.gate.open .spill,.gate.open .inCopy{animation-duration:.6s !important;animation-delay:0s !important}
  .gate .dot::before{animation:none}
  .closer{animation:none}
}
`

const PIECES = [
  {
    img: IMG_CAR,
    no: '01',
    title: 'the rear.',
    meta: 'mustang · night garage · tail lights',
  },
  {
    img: IMG_INTERIOR,
    no: '02',
    title: 'inside.',
    meta: 'driver seat · engine cooling',
    quiet:
      'one question, when he is ready — where do you go when you need to think? his answer, filmed his way.',
  },
  {
    img: IMG_LEDGE,
    no: '03',
    title: 'the ledge.',
    meta: 'rooftop · city lights behind him',
  },
]

const ANGLES = [-34, -11, 12, 35] // 0: title wall, then the three pieces
const ROT_MIN = ANGLES[0]
const ROT_MAX = ANGLES[ANGLES.length - 1]
const clamp = (v: number) => Math.min(ROT_MAX, Math.max(ROT_MIN, v))

export default function Experience() {
  const [stage, setStage] = useState(0) // 0 parked, 1 opening (single css keyframe timeline), 4 revealed
  const [mode, setMode] = useState<'gallery' | 'list'>('gallery')
  const [zoom, setZoom] = useState<number | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const roomRef = useRef<HTMLDivElement>(null)
  const walkRef = useRef<HTMLDivElement>(null)
  const rot = useRef(ANGLES[0])
  const target = useRef(ANGLES[0])
  const vel = useRef(0)
  const drag = useRef<{ x: number; lastX: number } | null>(null)
  const dragDist = useRef(0)
  const [grabbing, setGrabbing] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('cp-lock')
    ;[IMG_CAR, IMG_INTERIOR, IMG_LEDGE].forEach((s) => {
      const i = new Image()
      i.src = s
    })
    const t = timers.current
    return () => {
      document.documentElement.classList.remove('cp-lock')
      t.forEach(clearTimeout)
    }
  }, [])

  // the walk: wheel + drag with inertia, rendered on a rAF loop
  useEffect(() => {
    if (stage < 4 || mode !== 'gallery') return
    const el = roomRef.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduced ? 1 : 0.085

    let raf = 0
    const tick = () => {
      vel.current *= 0.93
      if (Math.abs(vel.current) < 0.002) vel.current = 0
      target.current = clamp(target.current + vel.current)
      rot.current += (target.current - rot.current) * ease
      if (walkRef.current) {
        walkRef.current.style.transform = `rotateY(${-rot.current}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      target.current = clamp(target.current + d * 0.045)
    }
    const onDown = (e: PointerEvent) => {
      drag.current = { x: e.clientX, lastX: e.clientX }
      dragDist.current = 0
      vel.current = 0
      setGrabbing(true)
      el.setPointerCapture?.(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!drag.current) return
      const dx = e.clientX - drag.current.lastX
      drag.current.lastX = e.clientX
      dragDist.current += Math.abs(dx)
      target.current = clamp(target.current - dx * 0.075)
      vel.current = -dx * 0.02
    }
    const onUp = () => {
      drag.current = null
      setGrabbing(false)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [stage, mode])

  const enter = () => {
    if (stage !== 0) return
    setStage(1)
    timers.current.push(
      setTimeout(() => {
        setStage(4)
        document.documentElement.classList.remove('cp-lock')
      }, 3850),
    )
  }

  const step = (dir: 1 | -1) => {
    const c = target.current
    const next =
      dir === 1
        ? ANGLES.find((a) => a > c + 0.5)
        : [...ANGLES].reverse().find((a) => a < c - 0.5)
    if (next !== undefined) target.current = clamp(next)
  }

  const pieceStyle = (a: number) => ({
    transform: `translate(-50%,-50%) rotateY(${a}deg) translateZ(-780px)`,
  })

  return (
    <main className={`cp ${stage >= 4 ? 'revealed' : ''}`}>
      <style>{CSS}</style>

      <div
        className={`gate ${stage >= 1 ? 'open' : ''} ${stage >= 4 ? 'done' : ''}`}
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
            <div className="l2">walk the room</div>
          </div>
        </div>
      </div>

      <section className="room" ref={roomRef}>
        <div className="roomTop">
          <span className="wm">
            shwcase<sup>®</sup>
          </span>
          <span className="tag mono">andy&apos;s room · creator page · reserved</span>
          <div className="modeTgl">
            <button className={`mono ${mode === 'gallery' ? 'on' : ''}`} onClick={() => setMode('gallery')}>
              GALLERY
            </button>
            <button className={`mono ${mode === 'list' ? 'on' : ''}`} onClick={() => setMode('list')}>
              LIST
            </button>
          </div>
        </div>

        {mode === 'gallery' ? (
          <>
            <div className={`roomScene ${grabbing ? 'grabbing' : ''}`}>
              <div className="roomWalk" ref={walkRef} style={{ transform: `rotateY(${-ANGLES[0]}deg)` }}>
                <div className="piece titlePiece" style={pieceStyle(ANGLES[0])}>
                  <span className="kick">shwcase presents</span>
                  <h1>
                    andy&apos;s
                    <br />
                    mustang.
                  </h1>
                  <div className="cnt">3 frames · night garage · los angeles</div>
                  <div className="rule" />
                </div>
                {PIECES.map((p, i) => (
                  <div className="piece" key={p.no} style={pieceStyle(ANGLES[i + 1])}>
                    <div className="spot" />
                    <div
                      className="frame"
                      onClick={() => {
                        if (dragDist.current < 8) setZoom(i)
                      }}
                    >
                      <img src={p.img} alt={p.title} draggable={false} />
                    </div>
                    <div className="plate">
                      <span className="pno mono">{p.no}</span>
                      <span className="pt">{p.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="walkHint mono">
              <span>scroll or drag to walk round</span>
              <span className="sep">·</span>
              <span>tap a frame to look closer</span>
            </div>
            <div className="roomArrows">
              <button aria-label="walk back" onClick={() => step(-1)}>
                ←
              </button>
              <button aria-label="walk on" onClick={() => step(1)}>
                →
              </button>
            </div>
            <div className="roomFoot mono">
              <span>shwcase · recollections from around the world</span>
              <span>andyflcks · preview</span>
            </div>
          </>
        ) : (
          <div className="listView">
            <div className="listHead">
              <h2>andy&apos;s mustang.</h2>
              <span className="cnt mono">3 frames</span>
            </div>
            {PIECES.map((p) => (
              <div className="listRow" key={p.no}>
                <div className="lf">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="lr">
                  <span className="no mono">frame {p.no}</span>
                  <h3>{p.title}</h3>
                  <div className="mt mono">{p.meta}</div>
                  {p.quiet && <span className="qt mono">{p.quiet}</span>}
                </div>
              </div>
            ))}
            <div className="listFoot mono">
              <span>shwcase · recollections from around the world</span>
              <span>andyflcks · preview</span>
            </div>
          </div>
        )}
      </section>

      {zoom !== null && (
        <div className="closer" onClick={() => setZoom(null)}>
          <button className="clClose mono" onClick={() => setZoom(null)}>
            close ×
          </button>
          <div className="clFrame" onClick={(e) => e.stopPropagation()}>
            <img src={PIECES[zoom].img} alt={PIECES[zoom].title} />
          </div>
          <div className="clMeta">
            <div className="clT">{PIECES[zoom].title}</div>
            <div className="clM mono">
              frame {PIECES[zoom].no} — {PIECES[zoom].meta}
            </div>
            {PIECES[zoom].quiet && <span className="clQ mono">{PIECES[zoom].quiet}</span>}
          </div>
        </div>
      )}
    </main>
  )
}
