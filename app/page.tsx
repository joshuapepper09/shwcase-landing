'use client'

import { useEffect, useRef, useState } from 'react'

const WORKS = [
  { title: 'last light.', by: 'from the shwcase archive', meta: 'a quiet loop · no sound', image: '/shwcase-pier-poster.jpg', video: '/shwcase-pier.mp4', shape: 'wide' },
  { title: "andy's mustang.", by: 'andyflcks', meta: '3 frames · enter the collection', image: 'https://drive.google.com/thumbnail?id=1xQgcSK5w__0BQERRlp9-Ycl0OhtYya58&sz=w1080', href: '/andyflcks', shape: 'portrait' },
  { title: 'coastal dusk.', by: 'from the shwcase archive', meta: 'a quiet loop · no sound', image: '/shwcase-still-01.jpg', video: '/shwcase-coastal-dusk-loop.mp4', shape: 'wide' },
  { title: 'watching the light.', by: 'josh', meta: 'from the archive · a still', image: '/q-light-rooftop.jpg', shape: 'portrait' },
]
const CSS = `
.homeGallery{--wall:#FFFFFF;--ink:#17191B;--dim:#72777B;--hair:rgba(40,37,31,.2);height:100svh;min-height:580px;overflow:hidden;position:relative;background:var(--wall);color:var(--ink);font-family:'Cormorant Garamond',Georgia,serif;-webkit-font-smoothing:antialiased}
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
.hgFrame{display:block;width:100%;border:1px solid rgba(45,37,25,.32);background:#FFFFFF;padding:12px;box-shadow:0 21px 32px rgba(70,55,30,.18),0 3px 5px rgba(70,55,30,.12);text-align:left}
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
.hgCloseup{position:fixed;inset:0;z-index:30;background:#FFFFFF;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:85px 25px 35px}.hgCloseup .close{position:absolute;top:25px;right:30px;border:1px solid var(--hair);background:none;border-radius:30px;padding:10px 20px;font:9px 'IBM Plex Mono',monospace}.hgCloseup img,.hgCloseup video{max-width:85vw;max-height:60svh;object-fit:contain;background:#FFFFFF;border:12px solid #FFFFFF;box-shadow:0 20px 45px rgba(70,55,30,.14)}.hgCloseup h2{font-style:italic;font-size:35px;font-weight:300;margin-top:25px}.hgCloseup p{font:8px 'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-top:9px}
@media(max-width:640px){
.hgTop{padding:22px}.hgTop .tag{display:none}.hgMark{font-size:25px}.hgToggle button{padding:9px 12px;font-size:7px}
.hgPiece{width:76vw;top:43%}.hgPiece.portrait{width:60vw}.hgFrame{padding:9px}.hgCaption{font-size:25px}.hgCaption small{font-size:7px;letter-spacing:.1em}.hgIntro{width:79vw}.hgIntro h1{font-size:54px}.hgIntro .introNote{font-size:7px}.hgRoom:before{top:65%;height:35%}.hgRoom:after{top:61%}
.hgBottom{left:22px;right:22px;bottom:24px;font-size:7px;letter-spacing:.08em}.hgBottom .about{display:none}.hgControls{left:22px;right:22px;bottom:85px}.hgPosition{font-size:7px;letter-spacing:.1em;max-width:60%;line-height:2}
.hgList{padding:10px 22px 60px}.hgList h1{font-size:44px}.hgRow{grid-template-columns:1fr;gap:22px}.hgRow h2{font-size:34px}.hgCloseup img,.hgCloseup video{max-width:90vw;border-width:8px}
}
@media(prefers-reduced-motion:reduce){.hgPiece video{display:none}.hgPiece .stillFallback{display:block!important}}

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

.hgRoom:before,.hgRoom:after{display:none}
.hgFrame{padding:18px;border:1px solid #c6c9ca;box-shadow:2px 3px 2px #bfc1c2,8px 14px 20px rgba(28,32,35,.14);background:white}
.hgPiece .spot{top:-110px;height:110px;left:-60px;right:-60px;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,1),rgba(255,255,255,.4) 40%,transparent 70%)}
.hgCaption{font-size:22px}.hgCaption small{color:#666d72;letter-spacing:.18em}
.hgIntro h1{font-size:57px;letter-spacing:-.045em}.hgIntro .rule{width:25px}
.hgIntro{width:350px}.hgTop{padding-top:25px}.hgMark{font-size:25px}
.hgPosition{background:rgba(255,255,255,.75);padding:9px 12px;border-left:1px solid #bfc3c6}
.hgArrows button{background:rgba(255,255,255,.65);border-color:#bcc1c4}
.hgBottom{font-size:7px;letter-spacing:.19em}.hgBottom a{font-size:7px}
@media(max-width:640px){.hgIntro{width:78vw}.hgIntro h1{font-size:49px}.hgPiece{top:42%}.hgPiece.portrait{width:55vw}.hgFrame{padding:13px}.hgCaption{font-size:23px}.hgTop{background:linear-gradient(#fff,rgba(255,255,255,.65),transparent)}.hgPosition{font-size:7px;max-width:65%}}


.hgSeatLink{position:absolute;left:50%;bottom:85px;transform:translateX(-50%);z-index:11;border:0;background:none;font:italic 22px 'Cormorant Garamond',Georgia,serif;border-bottom:1px solid #aeb3b7;padding:8px 0!important;white-space:nowrap}
.hgSeatLink small{display:block;font:6px 'IBM Plex Mono',monospace;letter-spacing:.17em;text-transform:uppercase;margin-top:7px;color:#757b80}
.screenRoom{position:fixed;inset:0;z-index:40;background:#0e1114;color:#e8eaec;overflow:hidden;animation:screenArrive 1.3s ease both;font-family:'Cormorant Garamond',Georgia,serif}
@keyframes screenArrive{from{opacity:0}to{opacity:1}}
.screenRoom .screenGlow{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:blur(80px) saturate(.5);opacity:.18;transform:scale(1.2);pointer-events:none}
.screenRoom .roomShell{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.6),transparent 22%,transparent 78%,rgba(0,0,0,.6))}
.screenRoom .screenTop{position:absolute;left:30px;right:30px;top:25px;z-index:2;display:flex;justify-content:space-between;align-items:center}
.screenRoom .roomLabel{font:8px 'IBM Plex Mono',monospace;letter-spacing:.18em;text-transform:uppercase;color:#a5adb5;line-height:2}.screenRoom .roomLabel strong{font-weight:400;color:#eee}
.screenRoom .back{border:1px solid #59616a;border-radius:30px;background:transparent;padding:11px 18px;color:#e0e4e7;font:8px 'IBM Plex Mono',monospace;letter-spacing:.12em}
.screenRoom .projection{position:absolute;left:14%;right:14%;top:18%;bottom:27%;display:flex;align-items:center;justify-content:center}
.screenRoom .projection video{display:block;width:100%;height:100%;object-fit:contain;filter:none;box-shadow:0 0 60px rgba(197,217,237,.06);animation:screenArrive 1.7s ease both}
.screenRoom .projection:after{content:'';position:absolute;inset:0;box-shadow:inset 0 0 45px 8px #0e1114;pointer-events:none}
.screenRoom .screenFloor{position:absolute;top:73%;bottom:0;left:0;right:0;background:linear-gradient(rgba(10,12,14,.1),#080a0d);border-top:1px solid rgba(255,255,255,.035)}
.screenRoom .seat{position:absolute;width:28%;height:16px;left:36%;bottom:15%;background:linear-gradient(#4d4842,#252320);box-shadow:0 25px 24px #020304;transform:perspective(300px) rotateX(18deg)}
.screenRoom .seat:before,.screenRoom .seat:after{content:'';position:absolute;top:12px;width:5px;height:35px;background:#08090a;left:7%}.screenRoom .seat:after{left:auto;right:7%}
.screenRoom .screenCaption{position:absolute;bottom:30px;left:30px;right:30px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px}
.screenRoom h2{font-size:36px;font-weight:300;font-style:italic;margin:0 0 8px}.screenRoom .quietNote{font:7px 'IBM Plex Mono',monospace;line-height:2;letter-spacing:.14em;text-transform:uppercase;color:#8c959e}
.screenRoom .filmChoices{display:flex;gap:22px}.screenRoom .filmChoices button{border:0;border-bottom:1px solid transparent;color:#89939c;background:none;font:italic 20px 'Cormorant Garamond',Georgia,serif;padding:4px 0}.screenRoom .filmChoices button.selected{color:#e6eaed;border-color:#78838c}
.hgSit{background:none;border:0;border-bottom:1px solid #aaa;margin-top:25px!important;font:italic 23px 'Cormorant Garamond',Georgia,serif;padding:5px 0!important}
@media(max-width:640px){.hgSeatLink{bottom:145px;font-size:20px}.hgSeatLink small{font-size:6px}.screenRoom .screenTop{left:22px;right:22px;top:22px}.screenRoom .roomLabel{font-size:6px;letter-spacing:.1em}.screenRoom .back{padding:10px 12px;font-size:7px}.screenRoom .projection{left:5%;right:5%;top:25%;bottom:32%}.screenRoom .projection:after{box-shadow:inset 0 0 18px 3px #0e1114}.screenRoom .seat{width:45%;left:27.5%;bottom:22%;height:12px}.screenRoom .screenFloor{top:68%}.screenRoom .screenCaption{left:22px;right:22px;bottom:30px;display:block}.screenRoom h2{font-size:32px}.screenRoom .filmChoices{margin-top:25px;gap:25px}.screenRoom .filmChoices button{font-size:20px}.screenRoom .quietNote{font-size:6px}}
@media(prefers-reduced-motion:reduce){.screenRoom,.screenRoom .projection video{animation:none}}


.spatialCanvas{position:absolute;inset:0;touch-action:none;cursor:grab;background:#f0f2f3}
.spatialCanvas:active{cursor:grabbing}.spatialCanvas canvas{display:block;width:100%;height:100%}
.spatialStatus{position:absolute;left:25px;top:45%;right:25px;text-align:center;font:10px 'IBM Plex Mono',monospace;letter-spacing:.15em;text-transform:uppercase;color:#75818a}
.hgTop{background:linear-gradient(rgba(255,255,255,.95),rgba(255,255,255,.5),transparent)}
.hgControls{pointer-events:none}.hgControls button,.hgControls .hgPosition{pointer-events:auto}
.roomWayfinding{position:absolute;left:50%;bottom:150px;transform:translateX(-50%);display:flex;z-index:12;gap:0;border-top:1px solid #b8c1c5;background:rgba(255,255,255,.7);backdrop-filter:blur(6px)}
.roomWayfinding button{border:0;background:none;width:62px;position:relative;padding:11px 5px!important;color:#7c868c;font:10px 'IBM Plex Mono',monospace}
.roomWayfinding button.selected{color:#151d23}.roomWayfinding button.selected:before{content:'';position:absolute;width:5px;height:5px;border-radius:50%;top:-3px;left:calc(50% - 2px);background:#26343c}
.roomWayfinding small{display:block;font:italic 12px 'Cormorant Garamond',Georgia,serif;margin-top:5px}
.hgSeatLink{bottom:84px;background:rgba(255,255,255,.75)}
@media(max-width:640px){.roomWayfinding{bottom:182px}.roomWayfinding button{width:51px;font-size:9px}.roomWayfinding small{font-size:11px}.hgSeatLink{bottom:118px;font-size:20px}.hgControls{bottom:67px}.hgPosition{max-width:64%;font-size:6px}.hgBottom{bottom:20px;font-size:6px}.hgArrows button{width:38px;height:38px}.hgTop .hgMark{font-size:23px}}


.spatialMount{position:absolute;inset:0}
.screenRoom.journal .screenGlow,.screenRoom.journal .screenFloor,.screenRoom.journal .seat,.screenRoom.journal .roomShell{display:none}
.screenRoom.journal .projection{inset:0}
.screenRoom.journal .projection video{width:100%;height:100%;object-fit:cover;box-shadow:none;filter:none;animation:journalReveal 1.3s cubic-bezier(.2,.7,.2,1) both}
@keyframes journalReveal{from{clip-path:inset(8% 10%);transform:scale(1.06)}to{clip-path:inset(0);transform:scale(1)}}
.screenRoom.journal .projection:after{box-shadow:none;background:linear-gradient(rgba(2,8,14,.3),transparent 30%,transparent 45%,rgba(2,8,14,.7))}
.screenRoom .screenView{position:absolute;right:30px;bottom:135px;z-index:2;border:0;border-bottom:1px solid rgba(255,255,255,.4);background:none;color:#e6edf3;font:italic 19px 'Cormorant Garamond',Georgia,serif;padding:6px 0}
.screenRoom .chapterNo{display:block;font:8px 'IBM Plex Mono',monospace;letter-spacing:.2em;color:#c7d1d8;margin-bottom:14px}
.screenRoom.journal .screenCaption{bottom:35px;align-items:flex-end}
.screenRoom.journal h2{font-size:clamp(65px,12vw,170px);line-height:.8;letter-spacing:-.05em;margin:0 0 28px}
.screenRoom.journal .quietNote{color:#d0d9df;font-size:7px}
.screenRoom.journal .filmChoices button{color:#c6d0d9;font-size:24px}.screenRoom.journal .filmChoices button.selected{color:white;border-color:white}
.screenRoom.journal .roomLabel,.screenRoom.journal .roomLabel strong{color:white}.screenRoom.journal .back{border-color:rgba(255,255,255,.65);color:white;background:rgba(5,15,25,.1)}
@media(max-width:640px){.hgToggle button{padding:9px 9px;font-size:7px}.screenRoom.journal h2{font-size:80px}.screenRoom.journal .screenCaption{bottom:30px}.screenRoom .screenView{right:22px;bottom:245px;font-size:17px}.screenRoom .chapterNo{font-size:7px}.screenRoom.journal .filmChoices{margin-top:28px}.screenRoom.journal .filmChoices button{font-size:23px}.screenRoom.journal .roomLabel{max-width:140px}.screenRoom.journal .back{font-size:6px;letter-spacing:.02em}}
@media(prefers-reduced-motion:reduce){.screenRoom.journal .projection video{animation:none}}

`


function SpatialGallery({target,onActive,onOpen}:{target:{current:number};onActive:(n:number)=>void;onOpen:(n:number)=>void}){
 const mount=useRef<HTMLDivElement>(null)
 const [status,setStatus]=useState('preparing the rooms')
 const callbacks=useRef({onActive,onOpen});callbacks.current={onActive,onOpen}
 useEffect(()=>{
  let dead=false,dispose=()=>{}
  const boot=async()=>{
   try{
    const moduleUrl='https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js'
    const T=await import(/* webpackIgnore: true */ moduleUrl)
    if(dead||!mount.current)return
    const el=mount.current
    const scene=new T.Scene();scene.background=new T.Color('#f0f2f3');scene.fog=new T.Fog('#f1f3f4',28,65)
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'})
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(el.clientWidth,el.clientHeight)
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap
    el.appendChild(renderer.domElement)
    const camera=new T.PerspectiveCamera(innerWidth<640?64:55,el.clientWidth/el.clientHeight,.1,100)
    const materials:any[]=[],geometries:any[]=[],textures:any[]=[],videos:HTMLVideoElement[]=[]
    const mat=(color:string,extra:any={})=>{const m=new T.MeshStandardMaterial({color,roughness:.78,...extra});materials.push(m);return m}
    const white=mat('#ffffff'),side=mat('#edf0f2'),floor=mat('#d4dadd',{roughness:.28,metalness:.12}),metal=mat('#343b40',{metalness:.6,roughness:.3}),wood=mat('#aca69a')
    const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:any)=>{const g=new T.BoxGeometry(w,h,d);geometries.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o}
    box(17,.2,40,0,-.1,-8,floor)
    box(.25,5.6,40,-8.5,2.8,-8,side);box(.25,5.6,40,8.5,2.8,-8,white)
    box(17,5.6,.3,0,2.8,-28,white)
    // Two roof bands leave a long open skylight above the whole exhibition.
    box(5.3,.16,40,-5.85,5.5,-8,white);box(5.3,.16,40,5.85,5.5,-8,white)
    for(let z=8;z>=-26;z-=4){box(.08,.16,17,0,5.54,z,side).rotation.y=Math.PI/2}
    // Real floor joints recede with the camera, rather than a painted perspective.
    const seam=mat('#bac3c8')
    for(let z=10;z>=-27;z-=3.5)box(17,.003,.009,0,.006,z,seam)
    for(let x=-7;x<=7;x+=3.5)box(.009,.003,40,x,.006,-8,seam)
    const hemi=new T.HemisphereLight('#f7fbff','#b6a997',3);scene.add(hemi)
    const sun=new T.DirectionalLight('#fff9ee',3.2);sun.position.set(-3,12,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-17;sun.shadow.camera.right=17;sun.shadow.camera.top=24;sun.shadow.camera.bottom=-24;sun.shadow.camera.far=55;sun.shadow.bias=-.0008;scene.add(sun);sun.target.position.set(1,0,-9);scene.add(sun.target)
    // Slim gallery benches and an arrival plinth give the walk a human scale.
    for(const z of [-4,-16]){box(2.8,.13,.72,0,.62,z,wood);for(const x of [-1.15,1.15])box(.055,.59,.5,x,.3,z,metal)}
    const label=(lines:{text:string,size:number,italic?:boolean,color?:string}[],w:number,h:number)=>{
     const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d')!;ctx.fillStyle='#ffffff';ctx.fillRect(0,0,1024,512)
     let y=70;for(const l of lines){ctx.fillStyle=l.color||'#22282b';ctx.font=`${l.italic?'italic ':''}${l.size}px ${l.italic?'Georgia':'monospace'}`;ctx.textAlign='center';ctx.fillText(l.text,512,y);y+=l.size*1.5+15}
     const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;textures.push(tex);const m=new T.MeshBasicMaterial({map:tex});materials.push(m);const g=new T.PlaneGeometry(w,h);geometries.push(g);return new T.Mesh(g,m)
    }
    // A freestanding dedication wall, not a website headline pinned to the screen.
    box(4.2,3.2,.2,0,1.6,-7,white)
    const dedication=label([{text:'SHWCASE / THE RECOLLECTION ROOMS',size:23,color:'#747d83'},{text:'some places',size:78,italic:true},{text:'stay with you.',size:78,italic:true},{text:'WALK THROUGH. STAY A WHILE.',size:20,color:'#7e878d'}],3.8,1.9);dedication.position.set(0,2,-6.88);scene.add(dedication)
    const exhibits:any[]=[];const loader=new T.TextureLoader()
    const placements=[{x:-8.31,z:0,angle:Math.PI/2,w:4.4,h:2.7},{x:8.31,z:-7.5,angle:-Math.PI/2,w:2.25,h:3.05},{x:-8.31,z:-14.5,angle:Math.PI/2,w:4.4,h:2.7},{x:8.31,z:-21,angle:-Math.PI/2,w:3.6,h:2.4}]
    for(let i=0;i<WORKS.length;i++){
     const w=WORKS[i],p=placements[i],group=new T.Group();group.position.set(p.x,2.45,p.z);group.rotation.y=p.angle;scene.add(group)
     const frame=new T.Mesh(new T.BoxGeometry(p.w+.25,p.h+.25,.12),white);frame.castShadow=true;group.add(frame);geometries.push(frame.geometry)
     let tex
     if(w.video){const v=document.createElement('video');v.src=w.video;v.crossOrigin='anonymous';v.muted=true;v.loop=true;v.playsInline=true;v.preload='auto';v.play().catch(()=>{});videos.push(v);tex=new T.VideoTexture(v)}
     else tex=loader.load(w.image)
     tex.colorSpace=T.SRGBColorSpace;textures.push(tex)
     const image=new T.Mesh(new T.PlaneGeometry(p.w,p.h),new T.MeshBasicMaterial({map:tex}));image.position.z=.067;image.userData.work=i;group.add(image);exhibits.push(image);geometries.push(image.geometry);materials.push(image.material)
     const plate=label([{text:`0${i+1} / ${w.by.toUpperCase()}`,size:27,color:'#6b757c'},{text:w.title,size:62,italic:true}],1.45,.72);plate.position.set(0,-p.h/2-.64,.025);group.add(plate)
     const lamp=new T.SpotLight('#ffffff',24,10,Math.PI/5,.7,1);lamp.position.set(p.x*.75,5.1,p.z+1.4);lamp.target.position.set(p.x,2.5,p.z);scene.add(lamp);scene.add(lamp.target)
    }
    // Far wall becomes a living window: an installation, not another framed thumbnail.
    const endVideo=document.createElement('video');endVideo.src='/shwcase-coastal-dusk-loop.mp4';endVideo.muted=true;endVideo.loop=true;endVideo.playsInline=true;endVideo.play().catch(()=>{});videos.push(endVideo)
    const endTex=new T.VideoTexture(endVideo);endTex.colorSpace=T.SRGBColorSpace;textures.push(endTex)
    const vista=new T.Mesh(new T.PlaneGeometry(9,4.7),new T.MeshBasicMaterial({map:endTex}));vista.position.set(0,2.6,-27.8);scene.add(vista);materials.push(vista.material);geometries.push(vista.geometry)
    const stops=[{p:[0,1.65,9],l:[0,2,-7]},{p:[-3,1.65,3],l:[-8.3,2.4,0]},{p:[3.6,1.65,-5],l:[8.3,2.4,-7.5]},{p:[-3,1.65,-10],l:[-8.3,2.4,-14.5]},{p:[2.8,1.65,-18],l:[7.7,2.35,-21]}]
    let progress=target.current,raf=0,drag:null|{x:number;y:number;start:number}=null,travel=0,lastActive=-1
    const cp=new T.Vector3(),look=new T.Vector3(),raycaster=new T.Raycaster(),pointer=new T.Vector2()
    const resize=()=>{if(!el)return;camera.aspect=el.clientWidth/el.clientHeight;camera.fov=innerWidth<640?68:55;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)}
    const animate=()=>{if(dead)return;progress+=(target.current-progress)*.035;const a=Math.min(3,Math.floor(progress)),f=Math.max(0,Math.min(1,progress-a));const t=f*f*(3-2*f);cp.fromArray(stops[a].p).lerp(new T.Vector3().fromArray(stops[a+1].p),t);look.fromArray(stops[a].l).lerp(new T.Vector3().fromArray(stops[a+1].l),t);camera.position.copy(cp);camera.lookAt(look);renderer.render(scene,camera);raf=requestAnimationFrame(animate)}
    const update=(v:number)=>{target.current=Math.max(0,Math.min(4,v));const a=Math.round(target.current);if(a!==lastActive){lastActive=a;callbacks.current.onActive(a)}}
    const wheel=(e:WheelEvent)=>{e.preventDefault();update(target.current+e.deltaY*.0016)}
    const down=(e:PointerEvent)=>{drag={x:e.clientX,y:e.clientY,start:target.current};travel=0}
    const move=(e:PointerEvent)=>{if(!drag)return;const dy=drag.y-e.clientY,dx=drag.x-e.clientX;travel=Math.hypot(dx,dy);update(drag.start+(Math.abs(dy)>Math.abs(dx)?dy:dx)/400)}
    const up=(e:PointerEvent)=>{if(!drag)return;drag=null;if(travel>10){update(Math.round(target.current));return}const r=el.getBoundingClientRect();pointer.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(exhibits)[0];if(hit){const i=hit.object.userData.work;if(Math.abs(progress-i-1)<.2)callbacks.current.onOpen(i);else update(i+1)}}
    el.addEventListener('wheel',wheel,{passive:false});el.addEventListener('pointerdown',down);window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('resize',resize)
    animate();setStatus('')
    dispose=()=>{cancelAnimationFrame(raf);el.removeEventListener('wheel',wheel);el.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('resize',resize);videos.forEach(v=>{v.pause();v.removeAttribute('src');v.load()});textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());renderer.dispose();renderer.domElement.remove()}
   }catch(e){setStatus('The spatial room could not load. LIST is always available.');console.error(e)}
  };boot();return()=>{dead=true;dispose()}
 },[target])
 return <div className="spatialCanvas"><div className="spatialMount" ref={mount}/>{status?<p className="spatialStatus">{status}</p>:null}</div>
}

export default function Home(){
 const [mode,setMode]=useState<'gallery'|'list'>('gallery')
 const [active,setActive]=useState(0)
 const [zoom,setZoom]=useState<number|null>(null)
 const [screening,setScreening]=useState<number|null>(null)
 const [journal,setJournal]=useState(true)
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
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape'){setZoom(null);setScreening(null)}if(screening!==null||zoom!==null||mode!=='gallery')return;if(e.key==='ArrowRight')go(Math.round(target.current)+1);if(e.key==='ArrowLeft')go(Math.round(target.current)-1)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[zoom,mode,screening])
 const open=(i:number)=>{if(moved.current>8)return;const w=WORKS[i];if(w.href){location.href=w.href;return}setZoom(i)}
 return <main className="homeGallery" data-home="spatial-journal-v5">
 <style>{CSS}</style>
 <header className="hgTop"><a className="hgMark" href="/">shwcase<sup>®</sup></a><span className="tag">recollections from around the world</span><div className="hgToggle"><button className={mode==='gallery'?'on':''} onClick={()=>setMode('gallery')}>GALLERY</button><button onClick={()=>{setJournal(true);setScreening(0)}}>JOURNAL</button><button className={mode==='list'?'on':''} onClick={()=>setMode('list')}>LIST</button></div></header>
 {mode==='gallery'?<>
 <SpatialGallery target={target} onActive={setActive} onOpen={open}/>
 <nav className="roomWayfinding" aria-label="Exhibition route">{['arrival','last light','andy','coast','rooftop'].map((name,i)=><button key={name} onClick={()=>go(i)} className={active===i?'selected':''} aria-label={`Walk to ${name}`}><span>{String(i).padStart(2,'0')}</span><small>{name}</small></button>)}</nav>
 <div className="hgControls"><div className="hgPosition" aria-live="polite">{active===0?'the entrance':`${String(active).padStart(2,'0')} / ${WORKS[active-1].title}`}<br/>{active===0?'scroll or drag to walk round':'tap the frame to step closer'}</div><div className="hgArrows"><button disabled={active===0} onClick={()=>go(Math.round(target.current)-1)} aria-label="Walk back">←</button><button disabled={active===count-1} onClick={()=>go(Math.round(target.current)+1)} aria-label="Walk on">→</button></div></div>
 </>:<div className="hgList"><h1>the collection.</h1>{WORKS.map((w,i)=><article className="hgRow" key={w.title}><button onClick={()=>{moved.current=0;open(i)}} aria-label={`Open ${w.title}`}><img src={w.image} alt={w.title}/></button><div><h2>{w.title}</h2><p>{String(i+1).padStart(2,'0')} / {w.by}<br/>{w.meta}</p><button className="view" style={{width:'auto'}} onClick={()=>{moved.current=0;open(i)}}>{w.href?'enter the room ↗':'look closer ↗'}</button></div></article>)}</div>}
 {mode==='gallery'&&<button className="hgSeatLink" onClick={()=>setScreening(0)}>enter the moment<small>the moving journal ↗</small></button>}
 <footer className="hgBottom"><span>shwcase / selected recollections</span><span className="about">a growing collection, kept quietly.</span><a href="/ask">leave a recollection ↗</a></footer>
 {zoom!==null&&<section className="hgCloseup" role="dialog" aria-modal="true" aria-label={WORKS[zoom].title}><button className="close" onClick={()=>setZoom(null)} autoFocus>close ×</button>{WORKS[zoom].video?<video src={WORKS[zoom].video} autoPlay muted loop playsInline poster={WORKS[zoom].image}/>:<img src={WORKS[zoom].image} alt={WORKS[zoom].title}/>}<h2>{WORKS[zoom].title}</h2><p>{WORKS[zoom].meta}</p>{WORKS[zoom].video&&<button className="hgSit" onClick={()=>{setScreening(zoom);setZoom(null)}}>sit with this moment ↗</button>}</section>}
 {screening!==null&&<section className={`screenRoom ${journal?'journal':''}`} role="dialog" aria-modal="true" aria-label="The moving journal">
 <video className="screenGlow" key={'glow'+screening} src={WORKS[screening].video} autoPlay muted loop playsInline aria-hidden="true"/>
 <div className="roomShell"/><div className="screenFloor"/>
 <header className="screenTop"><div className="roomLabel"><strong>shwcase / moving journal</strong><br/>recollections from around the world</div><button autoFocus className="back" onClick={()=>setScreening(null)}>← back to the gallery</button></header>
 <div className="projection"><video key={screening} src={WORKS[screening].video} poster={WORKS[screening].image} autoPlay muted loop playsInline aria-label={WORKS[screening].title}/></div>
 <div className="seat" aria-hidden="true"/><button className="screenView" onClick={()=>setJournal(!journal)}>{journal?'take a seat in the screening room ↗':'let the film fill the room ↗'}</button>
 <footer className="screenCaption"><div><span className="chapterNo">{screening===0?'01':'02'} / FIELD NOTES</span><h2>{WORKS[screening].title}</h2><p className="quietNote">a moving image, a place to pause.<br/>no sound. no hurry.</p></div><div className="filmChoices">{[0,2].map(i=><button key={i} className={screening===i?'selected':''} onClick={()=>setScreening(i)}>{WORKS[i].title}</button>)}</div></footer>
 </section>}

 </main>
   }
