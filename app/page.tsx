'use client'

import { useEffect, useRef, useState } from 'react'

const WORKS = [
  { title: 'last light.', by: 'from the shwcase archive', meta: 'a quiet loop · no sound', image: '/shwcase-pier-poster.jpg', video: '/shwcase-pier.mp4', shape: 'wide' },
  { title: "andy's mustang.", by: 'andyflcks', meta: '3 frames · enter the collection', image: 'https://drive.google.com/thumbnail?id=1xQgcSK5w__0BQERRlp9-Ycl0OhtYya58&sz=w1080', href: '/andyflcks', shape: 'portrait' },
  { title: 'coastal dusk.', by: 'from the shwcase archive', meta: 'a quiet loop · no sound', image: '/shwcase-still-01.jpg', video: '/shwcase-coastal-dusk-loop.mp4', shape: 'wide' },
  { title: 'watching the light.', by: 'josh', meta: 'from the archive · a still', image: '/q-light-rooftop.jpg', shape: 'portrait' },
]
const CSS = `
.homeGallery{--wall:#F2EDE3;--ink:#28251F;--dim:#777267;--hair:rgba(40,37,31,.2);height:100svh;min-height:580px;overflow:hidden;position:relative;background:var(--wall);color:var(--ink);font-family:'Cormorant Garamond',Georgia,serif;-webkit-font-smoothing:antialiased}
.homeGallery *{box-sizing:border-box;margin:0;padding:0}
.homeGallery button,.homeGallery a{-webkit-tap-highlight-color:transparent}
.homeGallery button{color:inherit;cursor:pointer}
.homeGallery button:focus-visible,.homeGallery a:focus-visible{outline:2px solid var(--ink);outline-offset:5px}
.hgTop{position:absolute;z-index:10;top:0;left:0;right:0;padding:24px 30px;display:flex;justify-content:space-between;align-items:center}
.hgMark{font-size:27px;text-decoration:none;color:inherit;font-weight:500;letter-spacing:-.03em}.hgMark sup{font-size:8px;vertical-align:11px;margin-left:2px}
.hgTop .tag{font:8px 'IBM Plex Mono',monospace;letter-spacing:.19em;text-transform:uppercase;color:var(--dim)}
.hgToggle{display:flex;border:1px solid var(--hair);border-radius:30px;overflow:hidden}.hgToggle button{border:0;background:transparent;font:8px 'IBM Plex Mono',monospace;letter-spacing:.15em;padding:10px 17px}.hgToggle button.on{background:var(--ink);color:var(--wall)}
.hgRoom{position:absolute;inset:0;perspective:1000px;touch-action:none;cursor:grab;user-select:none;overflow:hidden}
.hgRoom:active{cursor:grabbing}
.hgRoom:before{content:'';position:absolute;left:0;right:0;top:68%;height:32%;background:linear-gradient(#E0D8C8,#D8CDB7);border-top:1px solid rgba(75,66,48,.08)}
.hgRoom:after{content:'';position:absolute;left:0;right:0;top:64%;height:5%;background:linear-gradient(transparent,rgba(80,65,40,.055));pointer-events:none}
.hgPiece{position:absolute;left:50%;top:44%;width:min(52vw,430px);transform-style:preserve-3d;will-change:transform,opacity}
.hgPiece .spot{position:absolute;top:-135px;left:-50px;right:-50px;height:180px;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.9),transparent 68%);pointer-events:none}
.hgFrame{display:block;width:100%;border:1px solid rgba(45,37,25,.32);background:#FCF9F2;padding:12px;box-shadow:0 21px 32px rgba(70,55,30,.18),0 3px 5px rgba(70,55,30,.12);text-align:left}
.hgFrame img,.hgFrame video{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;background:#D9D2C5;pointer-events:none}
.hgPiece.portrait{width:min(35vw,280px)}.hgPiece.portrait .hgFrame img{aspect-ratio:3/4}
.hgCaption{margin:18px auto 0;width:max-content;max-width:100%;text-align:center;font-size:23px;font-style:italic}.hgCaption small{display:block;font:7px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.15em;color:var(--dim);margin-top:6px}
.hgIntro{width:420px;text-align:center}.hgIntro .kicker{font:8px 'IBM Plex Mono',monospace;letter-spacing:.24em;text-transform:uppercase;color:var(--dim)}.hgIntro h1{font-size:66px;font-weight:300;font-style:italic;line-height:.94;margin:22px auto;letter-spacing:-.035em}.hgIntro .introNote{font:8px 'IBM Plex Mono',monospace;line-height:2;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}.hgIntro .rule{margin:26px auto;width:45px;border-top:1px solid var(--hair)}
.hgBottom{position:absolute;bottom:25px;left:30px;right:30px;z-index:10;display:flex;justify-content:space-between;align-items:center;gap:20px;font:8px 'IBM Plex Mono',monospace;letter-spacing:.15em;text-transform:uppercase;color:var(--dim)}
.hgBottom a{color:inherit;text-decoration:none;border-bottom:1px solid var(--hair);padding-bottom:3px}
.hgControls{position:absolute;bottom:82px;left:30px;right:30px;z-index:10;display:flex;justify-content:space-between;align-items:center}
.hgPosition{font:8px 'IBM Plex Mono',monospace;letter-spacing:.17em;text-transform:uppercase;color:var(--dim);line-height:1.9}
.hgArrows{display:flex;gap:10px}.hgArrows button{background:transparent;border:1px solid var(--hair);border-radius:50%;width:44px;height:44px;font:18px Georgia,serif}.hgArrows button:disabled{opacity:.22;cursor:default}.hgArrows button:hover:not(:disabled){background:var(--ink);color:var(--wall)}
.hgList{position:absolute;inset:90px 0 65px;overflow-y:auto;padding:15px max(30px,calc((100vw - 1000px)/2)) 80px}.hgList h1{font-weight:300;font-style:italic;font-size:56px;line-height:.98;margin:30px 0 50px}.hgRow{padding:40px 0;border-top:1px solid var(--hair);display:grid;grid-template-columns:1.25fr 1fr;gap:50px;align-items:center}.hgRow button{width:100%;border:0;background:none}.hgRow img{display:block;width:100%;max-height:400px;object-fit:cover}.hgRow h2{font-weight:300;font-style:italic;font-size:38px}.hgRow p{font:8px 'IBM Plex Mono',monospace;letter-spacing:.15em;line-height:2;text-transform:uppercase;margin-top:14px;color:var(--dim)}.hgRow .view{display:inline-block;margin-top:24px;border-bottom:1px solid var(--hair);padding-bottom:4px;font-style:italic;font-size:21px;text-decoration:none;color:inherit}
.hgCloseup{position:fixed;inset:0;z-index:30;background:rgba(242,237,227,.99);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:85px 25px 35px}.hgCloseup .close{position:absolute;top:25px;right:30px;border:1px solid var(--hair);background:none;border-radius:30px;padding:10px 20px;font:9px 'IBM Plex Mono',monospace}.hgCloseup img,.hgCloseup video{max-width:85vw;max-height:60svh;object-fit:contain;background:#FCF9F2;border:12px solid #FCF9F2;box-shadow:0 20px 45px rgba(70,55,30,.14)}.hgCloseup h2{font-style:italic;font-size:35px;font-weight:300;margin-top:25px}.hgCloseup p{font:8px 'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-top:9px}
@media(max-width:640px){
.hgTop{padding:22px}.hgTop .tag{display:none}.hgMark{font-size:25px}.hgToggle button{padding:9px 12px;font-size:7px}
.hgPiece{width:76vw;top:43%}.hgPiece.portrait{width:60vw}.hgFrame{padding:9px}.hgCaption{font-size:25px}.hgCaption small{font-size:7px;letter-spacing:.1em}.hgIntro{width:79vw}.hgIntro h1{font-size:54px}.hgIntro .introNote{font-size:7px}.hgRoom:before{top:65%;height:35%}.hgRoom:after{top:61%}
.hgBottom{left:22px;right:22px;bottom:24px;font-size:7px;letter-spacing:.08em}.hgBottom .about{display:none}.hgControls{left:22px;right:22px;bottom:85px}.hgPosition{font-size:7px;letter-spacing:.1em;max-width:60%;line-height:2}
.hgList{padding:10px 22px 60px}.hgList h1{font-size:44px}.hgRow{grid-template-columns:1fr;gap:22px}.hgRow h2{font-size:34px}.hgCloseup img,.hgCloseup video{max-width:90vw;border-width:8px}
}
@media(prefers-reduced-motion:reduce){.hgPiece video{display:none}.hgPiece .stillFallback{display:block!important}}
`

export default function Home(){
 const [mode,setMode]=useState<'gallery'|'list'>('gallery')
 const [active,setActive]=useState(0)
 const [zoom,setZoom]=useState<number|null>(null)
 const root=useRef<HTMLDivElement>(null)
 const current=useRef(0),target=useRef(0)
 const drag=useRef<{x:number,start:number}|null>(null), moved=useRef(0)
 const count=WORKS.length+1
 const go=(n:number)=>{target.current=Math.max(0,Math.min(count-1,n));setActive(Math.round(target.current))}
 useEffect(()=>{
  if(mode!=='gallery')return
  const el=root.current;if(!el)return
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
  let raf=0
  const draw=()=>{
   current.current+=(target.current-current.current)*(reduced?1:.085)
   const spacing=innerWidth<640?innerWidth*.91:520
   el.querySelectorAll<HTMLElement>('.hgPiece').forEach((p,i)=>{
    const d=i-current.current
    p.style.transform=`translate(-50%,-50%) translate3d(${d*spacing}px,${Math.min(Math.abs(d),3)*10}px,${-Math.min(Math.abs(d),3)*115}px) rotateY(${-Math.max(-2,Math.min(2,d))*18}deg)`
    p.style.opacity=Math.abs(d)>2.5?'0':'1'
    p.style.pointerEvents=Math.abs(d)<.65?'auto':'none'
   })
   raf=requestAnimationFrame(draw)
  };draw()
  const wheel=(e:WheelEvent)=>{e.preventDefault();target.current=Math.max(0,Math.min(count-1,target.current+(Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX)*.0025));setActive(Math.round(target.current))}
  const down=(e:PointerEvent)=>{drag.current={x:e.clientX,start:target.current};moved.current=0}
  const move=(e:PointerEvent)=>{if(!drag.current)return;const dx=e.clientX-drag.current.x;moved.current=Math.abs(dx);target.current=Math.max(0,Math.min(count-1,drag.current.start-dx/(innerWidth<640?280:500)));setActive(Math.round(target.current))}
  const up=()=>{if(!drag.current)return;drag.current=null;target.current=Math.round(target.current);setActive(target.current)}
  el.addEventListener('wheel',wheel,{passive:false});el.addEventListener('pointerdown',down);window.addEventListener('pointermove',move);window.addEventListener('pointerup',up)
  return()=>{cancelAnimationFrame(raf);el.removeEventListener('wheel',wheel);el.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up)}
 },[mode,count])
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setZoom(null);if(zoom!==null||mode!=='gallery')return;if(e.key==='ArrowRight')go(Math.round(target.current)+1);if(e.key==='ArrowLeft')go(Math.round(target.current)-1)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[zoom,mode])
 const open=(i:number)=>{if(moved.current>8)return;const w=WORKS[i];if(w.href){location.href=w.href;return}setZoom(i)}
 return <main className="homeGallery" data-home="gallery-v1">
 <style>{CSS}</style>
 <header className="hgTop"><a className="hgMark" href="/">shwcase<sup>®</sup></a><span className="tag">recollections from around the world</span><div className="hgToggle"><button className={mode==='gallery'?'on':''} onClick={()=>setMode('gallery')}>GALLERY</button><button className={mode==='list'?'on':''} onClick={()=>setMode('list')}>LIST</button></div></header>
 {mode==='gallery'?<>
 <div className="hgRoom" ref={root} aria-label="Gallery. Scroll, drag, or use arrow buttons to walk.">
 <section className="hgPiece hgIntro"><div className="kicker">the shwcase gallery</div><h1>recollections<br/>from around<br/>the world.</h1><div className="rule"/><p className="introNote">places, people, moments kept.<br/>walk through. stay a while.</p></section>
 {WORKS.map((w,i)=><figure key={w.title} className={`hgPiece ${w.shape}`}><div className="spot"/><button className="hgFrame" onClick={()=>open(i)} aria-label={w.href?`Enter ${w.title}`:`Look closer at ${w.title}`}>
 {w.video?<><video autoPlay muted loop playsInline preload="metadata" poster={w.image} aria-hidden="true" src={w.video}/><img className="stillFallback" style={{display:'none'}} src={w.image} alt=""/></>:<img src={w.image} alt={w.title} draggable="false"/>}
 </button><figcaption className="hgCaption">{w.title}<small>{String(i+1).padStart(2,'0')} / {w.by}</small></figcaption></figure>)}
 </div>
 <div className="hgControls"><div className="hgPosition" aria-live="polite">{active===0?'the entrance':`${String(active).padStart(2,'0')} / ${WORKS[active-1].title}`}<br/>{active===0?'scroll or drag to walk round':'tap the frame to step closer'}</div><div className="hgArrows"><button disabled={active===0} onClick={()=>go(Math.round(target.current)-1)} aria-label="Walk back">←</button><button disabled={active===count-1} onClick={()=>go(Math.round(target.current)+1)} aria-label="Walk on">→</button></div></div>
 </>:<div className="hgList"><h1>the collection.</h1>{WORKS.map((w,i)=><article className="hgRow" key={w.title}><button onClick={()=>{moved.current=0;open(i)}} aria-label={`Open ${w.title}`}><img src={w.image} alt={w.title}/></button><div><h2>{w.title}</h2><p>{String(i+1).padStart(2,'0')} / {w.by}<br/>{w.meta}</p><button className="view" style={{width:'auto'}} onClick={()=>{moved.current=0;open(i)}}>{w.href?'enter the room ↗':'look closer ↗'}</button></div></article>)}</div>}
 <footer className="hgBottom"><span>shwcase / selected recollections</span><span className="about">a growing collection, kept quietly.</span><a href="/ask">leave a recollection ↗</a></footer>
 {zoom!==null&&<section className="hgCloseup" role="dialog" aria-modal="true" aria-label={WORKS[zoom].title}><button className="close" onClick={()=>setZoom(null)} autoFocus>close ×</button>{WORKS[zoom].video?<video src={WORKS[zoom].video} autoPlay muted loop playsInline controls poster={WORKS[zoom].image}/>:<img src={WORKS[zoom].image} alt={WORKS[zoom].title}/>}<h2>{WORKS[zoom].title}</h2><p>{WORKS[zoom].meta}</p></section>}
 </main>
   }
