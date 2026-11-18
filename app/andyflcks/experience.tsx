'use client'

import { useEffect, useRef, useState } from 'react'

const IMG_CAR = 'https://drive.google.com/thumbnail?id=1xQgcSK5w__0BQERRlp9-Ycl0OhtYya58&sz=w1080'
const IMG_INTERIOR = 'https://drive.google.com/thumbnail?id=1w0gGNkvcRGRAogoSyGaSlZK59bPZ62Wa&sz=w1080'
const IMG_LEDGE = 'https://drive.google.com/thumbnail?id=1aK_e1MBY6yEUlIU5A-UEawxdoKXs0JOB&sz=w810'

const CSS = `
.cp{--night:#0B0B0D;--night-soft:#131316;--red:#D3242C;--red-soft:#E5484D;--bone:#EDE9E2;--bone-dim:rgba(237,233,226,.6);--hairline:rgba(237,233,226,.14);
  --wall:#FFFFFF;--wall-low:#F4F5F6;--floor:#E8EAEC;--ink:#17191B;--ink-dim:rgba(34,28,20,.55);--ink-hair:rgba(34,28,20,.16)}
.cp{background:var(--night);color:var(--bone);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased}
.cp *{margin:0;padding:0;box-sizing:border-box}
.cp .mono{font-family:"IBM Plex Mono",monospace}
html.cp-lock,html.cp-lock body{overflow:hidden;height:100%}

/* ---------- a quiet invitation ---------- */
.gate{position:fixed;inset:0;z-index:80;background:var(--wall);color:var(--ink);overflow:hidden;transition:opacity .8s ease;touch-action:manipulation}
.gate.done{opacity:0;pointer-events:none;visibility:hidden;transition:opacity .8s ease,visibility 0s .8s}
.gate .entryHeader{position:absolute;top:24px;left:28px;right:28px;display:flex;justify-content:space-between;align-items:center;z-index:2}
.gate .mark{font-size:23px;font-weight:500}
.gate .mark sup{font-size:8px;vertical-align:9px}
.gate .entryNo{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim)}
.gate .entryLayout{position:absolute;inset:90px 9vw 72px;display:grid;grid-template-columns:1fr 1fr;gap:7vw;align-items:center}
.gate .entryArt{grid-column:2;grid-row:1;background:#fbf8f1;padding:12px;border:1px solid rgba(34,28,20,.2);box-shadow:0 18px 42px rgba(70,58,38,.16);transform:rotate(2deg);transition:transform 1.2s cubic-bezier(.22,.6,.3,1),opacity 1.15s ease}
.gate .entryArt img{width:100%;height:min(58vh,620px);display:block;object-fit:cover;object-position:34% 60%}
.gate .entryArt figcaption{padding:13px 0 3px;font:8px 'IBM Plex Mono',monospace;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-dim)}
.gate .entryCopy{grid-column:1;grid-row:1;transition:opacity .45s ease,transform .7s ease}
.gate .entryKicker{font:9px 'IBM Plex Mono',monospace;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-dim)}
.gate h1{font-size:clamp(50px,6.7vw,100px);font-style:italic;font-weight:300;line-height:.95;margin:23px 0}
.gate .entryNote{font:9px 'IBM Plex Mono',monospace;letter-spacing:.13em;line-height:1.9;text-transform:uppercase;color:var(--ink-dim)}
.gate .enterButton{display:inline-flex;align-items:center;gap:34px;margin-top:32px;padding:15px 22px;border:1px solid rgba(34,28,20,.4);border-radius:999px;background:transparent;color:var(--ink);font-family:'Cormorant Garamond',Georgia,serif;font-size:21px;font-style:italic;cursor:pointer;min-height:52px;transition:background .2s,color .2s}
.gate .enterButton:hover{background:var(--ink);color:var(--wall)}
.gate .enterButton:focus-visible{outline:2px solid var(--ink);outline-offset:5px}
.gate .enterButton span{font:18px Georgia,serif}
.gate .entryFooter{position:absolute;bottom:25px;left:28px;right:28px;display:flex;justify-content:space-between;font:8px 'IBM Plex Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-dim)}
.gate.open .entryCopy{opacity:0;transform:translateY(-12px)}
.gate.open .entryArt{transform:rotate(0deg) scale(1.075);opacity:0}
@media(max-width:640px){
  .gate .entryHeader{top:22px;left:24px;right:24px}
  .gate .entryLayout{inset:84px 28px 64px;display:flex;flex-direction:column;gap:25px;justify-content:center}
  .gate .entryArt{width:min(100%,320px);padding:8px;flex-shrink:1;min-height:0}
  .gate .entryArt img{height:clamp(170px,32svh,300px);object-position:32% 60%}
  .gate .entryArt figcaption{font-size:7px;padding:9px 0 2px}
  .gate .entryCopy{text-align:center;flex-shrink:0}
  .gate h1{font-size:48px;margin:13px 0;line-height:1}
  .gate h1 br{display:none}
  .gate .entryKicker{font-size:8px}
  .gate .entryNote{font-size:8px}
  .gate .enterButton{margin-top:19px;font-size:20px;padding:12px 23px}
  .gate .entryFooter{left:24px;right:24px;bottom:23px;font-size:7px}
}

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
.piece .frame{background:#FFFFFF;padding:10px 10px 10px;border:1px solid rgba(34,28,20,.35);box-shadow:0 22px 40px rgba(70,58,38,.30),0 3px 8px rgba(70,58,38,.18);cursor:pointer}
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
.closer{position:fixed;inset:0;z-index:70;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:70px 24px 40px;animation:clIn .45s ease}
@keyframes clIn{from{opacity:0}to{opacity:1}}
.clFrame{background:#FFFFFF;padding:12px;border:1px solid rgba(34,28,20,.35);box-shadow:0 30px 60px rgba(70,58,38,.3);max-width:min(92vw,440px)}
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
.listRow .lf{background:#FFFFFF;padding:9px;border:1px solid rgba(34,28,20,.3);box-shadow:0 16px 34px rgba(70,58,38,.22)}
.listRow .lf img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover}
.listRow .lr .no{font-size:9px;letter-spacing:.22em;color:var(--ink-dim);text-transform:uppercase}
.listRow .lr h3{margin-top:12px;font-size:clamp(26px,4.4vw,36px);font-style:italic;font-weight:300}
.listRow .lr .mt{margin-top:12px;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim)}
.listRow .lr .qt{display:block;margin-top:16px;font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-dim);line-height:1.9;max-width:40ch}
.listFoot{max-width:980px;margin:44px auto 0;display:flex;justify-content:space-between;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim)}

@media (prefers-reduced-motion:reduce){
  .gate .entryArt,.gate .entryCopy,.gate{transition:opacity .3s ease !important;transform:none !important}
  .closer{animation:none}
}

.galleryArchitecture{position:absolute;inset:0;overflow:hidden;pointer-events:none;background:linear-gradient(90deg,#e9eaeb 0%,#fafafa 13%,#fff 40%,#fff 75%,#f1f2f3 100%)}
.galleryArchitecture .ceiling{position:absolute;inset:0 0 auto;height:17%;background:linear-gradient(#ebedef,#fafafa);clip-path:polygon(0 0,100% 0,86% 100%,14% 100%);border-bottom:1px solid #ddd}
.galleryArchitecture .leftWall{position:absolute;inset:0 auto 0 0;width:14%;background:linear-gradient(90deg,#f3f3f3,#e6e7e8);clip-path:polygon(0 0,100% 17%,100% 69%,0 100%)}
.galleryArchitecture .rightWall{position:absolute;inset:0 0 0 auto;width:14%;background:linear-gradient(90deg,#e7e8e9,#f6f6f6);clip-path:polygon(0 17%,100% 0,100% 100%,0 69%)}
.galleryArchitecture .floor{position:absolute;left:0;right:0;top:69%;height:31%;background:linear-gradient(#e2e4e5,#f6f7f7);border-top:2px solid #d9dbdc}
.galleryArchitecture .floor:after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0,transparent calc(25% - 1px),rgba(130,135,140,.09) 25%);transform:perspective(150px) rotateX(35deg);transform-origin:top center}
.galleryArchitecture .track{position:absolute;left:17%;right:17%;top:10%;height:2px;background:#c4c6c8;box-shadow:0 1px 2px #fff;display:flex;justify-content:space-around}
.galleryArchitecture .track i{display:block;width:9px;height:15px;border-radius:2px;background:linear-gradient(90deg,#373b3f,#62666a);transform:rotate(-12deg);box-shadow:0 4px 5px #bfc2c5}
.galleryArchitecture .bench{position:absolute;bottom:15%;left:19%;width:14%;height:13px;background:linear-gradient(#c6c1b8,#9f9a91);box-shadow:0 17px 15px rgba(0,0,0,.12)}
.galleryArchitecture .bench:before,.galleryArchitecture .bench:after{content:'';position:absolute;top:10px;width:4px;height:29px;background:#34383b;left:9%}.galleryArchitecture .bench:after{left:auto;right:9%}
@media(max-width:640px){.galleryArchitecture .leftWall,.galleryArchitecture .rightWall{width:7%}.galleryArchitecture .ceiling{height:15%;clip-path:polygon(0 0,100% 0,93% 100%,7% 100%)}.galleryArchitecture .bench{left:12%;width:25%;bottom:20%;height:8px}.galleryArchitecture .bench:before,.galleryArchitecture .bench:after{height:22px;top:7px}.galleryArchitecture .track{left:12%;right:12%;top:11%}}

.room{background:#fff}
.room:before{display:none}
.roomScene{z-index:1}
.roomTop,.roomArrows,.roomFoot,.walkHint{z-index:6}
.piece .frame{padding:16px;border-color:#c3c7ca;box-shadow:2px 3px 2px #bfc1c2,8px 14px 20px rgba(28,32,35,.14)}
.piece .plate{background:#fff;border-color:#d5d9dc}
.gate .entryArt{background:white;border-color:#c3c7ca;transform:rotate(0deg);box-shadow:3px 5px 2px #d3d5d7,12px 20px 30px rgba(28,32,35,.12)}

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
      }, 800),
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

      <div className={`gate ${stage >= 1 ? 'open' : ''} ${stage >= 4 ? 'done' : ''}`} data-entrance="quiet-entry-v6" aria-hidden={stage >= 4}>
        <div className="entryHeader">
          <span className="mark">shwcase<sup>®</sup></span>
          <span className="entryNo mono">collection 01</span>
        </div>
        <div className="entryLayout">
          <figure className="entryArt">
            <img src={IMG_CAR} alt="The rear of Andy's Mustang in the garage at night" />
            <figcaption>01 / the rear.</figcaption>
          </figure>
          <div className="entryCopy">
            <div className="entryKicker">a room by andyflcks</div>
            <h1>andy&apos;s<br /> mustang.</h1>
            <p className="entryNote">night garage · 3 frames<br />a small collection, a moment kept.</p>
            <button className="enterButton" onClick={enter} disabled={stage !== 0} tabIndex={stage === 0 ? 0 : -1}>step inside <span aria-hidden="true">↗</span></button>
          </div>
        </div>
        <div className="entryFooter"><span>recollections from around the world</span><span>shwcase / 001</span></div>
      </div>

      <section className="room" ref={roomRef}><div className="galleryArchitecture" aria-hidden="true"><div className="ceiling"/><div className="leftWall"/><div className="rightWall"/><div className="floor"/><div className="track"><i/><i/><i/><i/></div><div className="bench"/></div>
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
