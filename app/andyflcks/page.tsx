'use client'

import { useEffect, useRef, useState } from 'react'

const WORKS = [
  { title: 'last light.', by: 'from the shwcase archive', meta: 'a quiet loop · no sound', image: '/shwcase-pier-poster.jpg', video: '/shwcase-pier.mp4', shape: 'wide' },
  { title: "andy's mustang.", by: 'andyflcks', meta: '3 frames · enter the collection', image: 'https://lh3.googleusercontent.com/d/1xQgcSK5w__0BQERRlp9-Ycl0OhtYya58=w1080', href: '/andyflcks', shape: 'portrait' },
  { title: 'coastal dusk.', by: 'from the shwcase archive', meta: 'a quiet loop · no sound', image: '/shwcase-still-01.jpg', video: '/shwcase-coastal-dusk-loop.mp4', shape: 'wide' },
  { title: 'watching the light.', by: 'josh', meta: 'from the archive · a still', image: '/q-light-rooftop.jpg', shape: 'portrait' },
]

const GARAGE_WORKS = [
 {title:'the rear, at night.',by:'andyflcks',meta:'01 / parking structure · night',image:'https://lh3.googleusercontent.com/d/1LhUYKoxb11xwop_BCKvGboZC5-RhiEem=w1600',shape:'portrait',r:.5625},
 {title:'the cockpit.',by:'andyflcks',meta:'02 / inside the car',image:'https://lh3.googleusercontent.com/d/1kenJPDZV9Lj3aY7bvhgsyLjl_G6TyU_7=w1600',shape:'portrait',r:.5625},
 {title:'daylight.',by:'andyflcks',meta:'03 / front three-quarter · day',image:'https://lh3.googleusercontent.com/d/11PjQVy-X5Rh4j0ooT4TauMVTlLaYvvBW=w1600',shape:'portrait',r:.5625},
 {title:'in the structure.',by:'andyflcks',meta:'04 / rear three-quarter · night',image:'https://lh3.googleusercontent.com/d/1CMZ0O5fEY_N7L_0qHBhJHkQrqhzueB1w=w1600',shape:'portrait',r:.75},
 {title:'dusk profile.',by:'andyflcks',meta:'05 / side · golden hour',image:'https://lh3.googleusercontent.com/d/1XPO9vUfAmtWyYVxw7rjOK7qBvMNsVJ5Q=w1600',shape:'portrait',r:.5625},
 {title:'low light.',by:'andyflcks',meta:'06 / front three-quarter · shade',image:'https://lh3.googleusercontent.com/d/13HSD0umqXN3i6SB9V_ylU8MZG4glzePT=w1600',shape:'portrait',r:.5625},
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
.garageMode .hgCloseup{background:#0b0e11;color:#e8eaec}.garageMode .hgCloseup img{background:#0b0e11;border-color:#14181c;box-shadow:0 20px 45px rgba(0,0,0,.5)}.garageMode .hgCloseup p{color:#8d979e}.garageMode .hgCloseup .close{border-color:#3a444c;color:#dfe5ea;background:transparent}
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

.museumLocation{position:absolute;left:30px;top:88px;z-index:10;font:8px 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.19em;line-height:1.8}.museumLocation strong{display:block;font:italic 25px 'Cormorant Garamond',Georgia,serif;letter-spacing:0;text-transform:none}.museumMapBtn{position:absolute;left:30px;bottom:135px;z-index:12;background:rgba(255,255,255,.9);border:1px solid #a9adb0;border-radius:30px;padding:13px 19px;font:9px 'IBM Plex Mono',monospace;letter-spacing:.12em;display:flex;gap:12px;align-items:center}.museumMapBtn span{font-size:17px}.garageMode{--ink:#f0f2f3;--dim:#bfc4c6;background:#23272a;color:#f0f2f3}.garageMode .hgTop{background:linear-gradient(#171b1be6,transparent)}.garageMode .hgToggle{background:#202627cc;border-color:#767e82}.garageMode .hgToggle .on{background:#e7e9e7;color:#202627}.garageMode .museumMapBtn,.garageMode .roomWayfinding,.garageMode .hgPosition,.garageMode .hgSeatLink,.garageMode .hgArrows button{background:#1c2429e0;color:#e9eded;border-color:#758087}.garageMode .roomWayfinding button.selected:before{background:#e8b85d}.garageMode .roomWayfinding button,.garageMode .roomWayfinding small{color:#d9dfe1}.garageMode .hgBottom{color:#d0d7db}.garageMode .hgList{background:#242b30}.garageMode .hgCloseup{background:#141a1f;color:white}
.museumMap{position:fixed;inset:0;z-index:100;background:#f7f8f8;color:#20262a;overflow:auto;padding:28px 36px 25px}.mapHeader{display:flex;justify-content:space-between;align-items:flex-start}.mapEyebrow{font:8px 'IBM Plex Mono',monospace;letter-spacing:.2em;line-height:1.8;text-transform:uppercase}.museumMap h1{font:italic 68px/.95 'Cormorant Garamond',Georgia,serif;margin-top:20px;letter-spacing:-.04em}.mapClose{border:1px solid #9ba4a8;border-radius:30px;padding:12px 18px;background:none;font:9px 'IBM Plex Mono',monospace}.mapLayout{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(245px,.65fr);gap:5vw;align-items:center;max-width:1360px;margin:14px auto 0}.mapPlan{position:relative}.mapPlan svg{width:100%;max-height:440px;display:block}.mapRoom{fill:#eef0f1;stroke:#9ca6ad;stroke-width:1.3;cursor:pointer;transition:fill .25s,stroke .25s}.mapRoom:hover,.mapRoom.selected{fill:#d8e1e6;stroke:#253b49;stroke-width:2}.mapRoom.garage{fill:#27343d;stroke:#27343d}.mapRoom.garage:hover,.mapRoom.garage.selected{fill:#405765;stroke:#b98e44;stroke-width:3}.mapPlan text{pointer-events:none;font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:1px;fill:#3b4b55}.mapPlan .mapName{font:italic 29px 'Cormorant Garamond',Georgia,serif;letter-spacing:0}.mapPlan .mapLight{fill:#edf1f3}.mapPlan .mapDim{fill:#929b9f;font-size:8px}.mapCaption{display:flex;justify-content:space-between;font:7px 'IBM Plex Mono',monospace;letter-spacing:.12em;text-transform:uppercase;padding:4px 15px}.mapDetails{border-top:1px solid #acb4b9;padding-top:19px;min-height:270px}.mapDetails h2{font:italic 44px/.95 'Cormorant Garamond',Georgia,serif;margin:12px 0 18px}.mapDetails p{font:12px/1.7 'IBM Plex Mono',monospace;color:#667178;max-width:310px}.mapEnter{display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:25px;padding:14px 0;border:0;border-top:1px solid #afb7bc;background:none;font:italic 24px 'Cormorant Garamond',Georgia,serif}.mapLegend{display:flex;gap:9px;flex-wrap:wrap;max-width:1360px;margin:20px auto 0;border-top:1px solid #d3d9dc;padding-top:16px}.mapLegend button{border:1px solid #b9c2c7;background:none;border-radius:25px;padding:10px 16px;font:8px 'IBM Plex Mono',monospace}.mapLegend button.selected{background:#283a46;color:white;border-color:#283a46}.mapFooter{font:7px 'IBM Plex Mono',monospace;letter-spacing:.15em;color:#7c888e;text-transform:uppercase;max-width:1360px;margin:24px auto 0;display:flex;justify-content:space-between}
@media(max-width:640px){.museumLocation{top:80px;left:22px;font-size:6px}.museumLocation strong{font-size:23px}.museumMapBtn{left:22px;bottom:126px;padding:10px 14px;font-size:7px}.museumMap{padding:23px 20px}.museumMap h1{font-size:47px;margin-top:14px}.mapLayout{grid-template-columns:1fr;gap:15px;margin-top:24px}.mapPlan svg{max-height:none}.mapDetails{min-height:0;padding-top:14px}.mapDetails h2{font-size:36px;margin:9px 0 10px}.mapDetails p{font-size:10px;max-width:none}.mapEnter{font-size:23px;margin-top:17px;padding:12px 0}.mapLegend{margin-top:12px;gap:6px;padding-top:12px}.mapLegend button{font-size:7px;padding:9px 11px}.mapFooter{font-size:6px;margin-top:18px;line-height:1.7;gap:15px}.mapClose{font-size:7px;padding:10px 13px}.mapEyebrow{font-size:7px}.mapCaption{font-size:5px;padding:4px 0}}

.exteriorCanvas,.exteriorMount{position:absolute;inset:0;touch-action:none}.exteriorStatus{position:absolute;top:45%;width:100%;text-align:center;font:9px 'IBM Plex Mono',monospace;letter-spacing:.18em;text-transform:uppercase}.exteriorHeading{position:absolute;top:98px;left:32px;pointer-events:none;z-index:2}.exteriorHeading p{font:8px 'IBM Plex Mono',monospace;letter-spacing:.2em;text-transform:uppercase;margin-bottom:15px}.exteriorHeading h1{font:italic clamp(45px,5.7vw,83px)/.84 'Cormorant Garamond',Georgia,serif;letter-spacing:-.045em}.exteriorHeading h1 span{display:block}.exteriorHint{position:absolute;right:32px;top:100px;font:7px/1.9 'IBM Plex Mono',monospace;letter-spacing:.16em;text-transform:uppercase;pointer-events:none;color:#606f76}.campusNav{position:absolute;left:32px;right:32px;bottom:55px;display:flex;align-items:end;justify-content:space-between;gap:20px;z-index:5;pointer-events:none}.campusSelect{pointer-events:auto;max-width:390px;background:rgba(247,250,250,.87);backdrop-filter:blur(15px);border:1px solid rgba(97,118,130,.28);padding:21px 24px;box-shadow:0 12px 35px #233a4810}.campusSelect .eyebrow{font:7px 'IBM Plex Mono',monospace;letter-spacing:.18em;text-transform:uppercase}.campusSelect h2{font:italic 34px/1.05 'Cormorant Garamond',Georgia,serif;margin:9px 0 11px}.campusSelect p{font:9px/1.8 'IBM Plex Mono',monospace;color:#63717a}.campusEnter{font:italic 23px 'Cormorant Garamond',Georgia,serif;border:0;border-top:1px solid #aebbc2;background:none;width:100%;display:flex;justify-content:space-between;align-items:center;padding-top:12px;margin-top:15px}.campusRooms{pointer-events:auto;display:flex;flex-wrap:wrap;gap:7px;justify-content:flex-end;max-width:550px}.campusRooms button{font:7px 'IBM Plex Mono',monospace;letter-spacing:.07em;border:1px solid #9baab2;border-radius:30px;background:#f1f5f3d9;padding:12px 16px}.campusRooms button.selected{background:#2a3c46;border-color:#2a3c46;color:white}.campusMode .hgBottom{color:#647780}.campusMode .hgTop{background:linear-gradient(#e9eef0cc,transparent)}.museumTopNav{display:flex;gap:8px}.museumTopNav button{background:#f5f7f4d9;border:1px solid #a9b5bc;border-radius:28px;padding:11px 17px;font:7px 'IBM Plex Mono',monospace;letter-spacing:.12em}.garageMode .museumTopNav button{background:#243039db;color:#e3e9ec;border-color:#84919a}.museumLocation{pointer-events:none}.garageMode .roomWayfinding button{color:#e6ebed}.roomWayfinding{bottom:155px}.museumMapBtn{top:145px;bottom:auto}.hgControls{bottom:90px}.carNote{position:absolute;right:30px;bottom:38px;font:6px 'IBM Plex Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:#b3bfc6}.screenRoom .screenTop .back{margin-left:auto}.screenRoom .screenCaption{bottom:42px}
@media(max-width:640px){.exteriorHeading{top:82px;left:22px}.exteriorHeading p{font-size:6px;margin-bottom:11px}.exteriorHeading h1{font-size:47px}.exteriorHint{top:88px;right:22px;font-size:5px;max-width:88px;text-align:right}.campusNav{left:22px;right:22px;bottom:53px;display:flex;flex-direction:column-reverse;align-items:stretch;gap:9px}.campusSelect{padding:13px 16px;max-width:none}.campusSelect h2{font-size:28px;margin:7px 0}.campusSelect p{font-size:7px;line-height:1.7}.campusSelect .eyebrow{font-size:6px}.campusEnter{font-size:21px;padding-top:8px;margin-top:9px}.campusRooms{justify-content:flex-start;gap:5px;max-width:none}.campusRooms button{font-size:5.5px;padding:9px 11px}.museumTopNav{gap:5px}.museumTopNav button{padding:9px 12px;font-size:6px}.roomWayfinding{bottom:122px}.museumMapBtn{top:135px;bottom:auto}.hgControls{bottom:68px}.carNote{font-size:5px;bottom:41px;right:22px}.hgBottom{font-size:5px}.screenRoom .screenCaption{bottom:32px}.screenRoom .roomLabel{max-width:130px}}

.cleanArrow{display:inline-block;vertical-align:middle;flex-shrink:0}.museumTopNav button,.screenRoom .back{display:inline-flex;align-items:center;gap:10px}.museumTopNav button .cleanArrow{width:15px;height:12px}.hgArrows button{display:grid;place-items:center}.garageMode .spatialCanvas{touch-action:none}.exteriorHint{font-size:7px}
`


function SpatialGallery({target,onActive,onOpen,garage=false,josh=false}:{target:{current:number};onActive:(n:number)=>void;onOpen:(n:number)=>void;garage?:boolean;josh?:boolean}){
 const roomWorks=garage?GARAGE_WORKS:josh?WORKS.filter((_,i)=>i!==1):WORKS
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
    const scene=new T.Scene();scene.background=new T.Color(garage?'#202a31':'#f0f2f3');scene.fog=new T.Fog(garage?'#202a31':'#f1f3f4',28,65)
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'})
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(el.clientWidth,el.clientHeight)
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap
    el.appendChild(renderer.domElement)
    const camera=new T.PerspectiveCamera(innerWidth<640?(garage?92:64):55,el.clientWidth/el.clientHeight,.1,100)
    const materials:any[]=[],geometries:any[]=[],textures:any[]=[],videos:HTMLVideoElement[]=[]
    const mat=(color:string,extra:any={})=>{const m=new T.MeshStandardMaterial({color,roughness:.78,...extra});materials.push(m);return m}
    const white=mat(garage?'#a6aeb2':'#ffffff'),side=mat(garage?'#8c989f':'#edf0f2'),floor=mat(garage?'#4f5b63':'#d4dadd',{roughness:.28,metalness:.12}),metal=mat('#343b40',{metalness:.6,roughness:.3}),wood=mat('#aca69a')
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
    const hemi=new T.HemisphereLight('#f7fbff',garage?'#24313c':'#e4e8eb',garage?1.3:3);scene.add(hemi)
    const sun=new T.DirectionalLight('#ffffff',garage ? .6 : 3.2);sun.position.set(-3,12,6);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-17;sun.shadow.camera.right=17;sun.shadow.camera.top=24;sun.shadow.camera.bottom=-24;sun.shadow.camera.far=55;sun.shadow.bias=-.0008;sun.shadow.normalBias=.03;scene.add(sun);sun.target.position.set(1,0,-9);scene.add(sun.target)
    // Slim gallery benches and an arrival plinth give the walk a human scale.
    for(const z of (garage?[]:[-4,-16])){box(2.8,.13,.72,0,.62,z,wood);for(const x of [-1.15,1.15])box(.055,.59,.5,x,.3,z,metal)}
    const label=(lines:{text:string,size:number,italic?:boolean,color?:string}[],w:number,h:number)=>{
     const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d')!;ctx.fillStyle='#ffffff';ctx.fillRect(0,0,1024,512)
     let y=70;for(const l of lines){ctx.fillStyle=l.color||'#22282b';ctx.font=`${l.italic?'italic ':''}${l.size}px ${l.italic?'Georgia':'monospace'}`;ctx.textAlign='center';ctx.fillText(l.text,512,y);y+=l.size*1.5+15}
     const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;textures.push(tex);const m=new T.MeshBasicMaterial({map:tex,toneMapped:false});materials.push(m);const g=new T.PlaneGeometry(w,h);geometries.push(g);return new T.Mesh(g,m)
    }
    // A freestanding dedication wall, not a website headline pinned to the screen.
    if(!garage)box(4.2,3.2,.2,0,1.6,-7,white)
    const dedication=label([{text:'SHWCASE / THE RECOLLECTION ROOMS',size:23,color:'#747d83'},{text:'some places',size:78,italic:true},{text:'stay with you.',size:78,italic:true},{text:'WALK THROUGH. STAY A WHILE.',size:20,color:'#7e878d'}],3.8,1.9);dedication.position.set(0,2,-6.88);if(!garage)scene.add(dedication)
    const exhibits:any[]=[];const loader=new T.TextureLoader()
    const placements=[{x:-8.31,z:0,angle:Math.PI/2,w:4.4,h:2.7},{x:8.31,z:-7.5,angle:-Math.PI/2,w:2.25,h:3.05},{x:-8.31,z:-14.5,angle:Math.PI/2,w:4.4,h:2.7},{x:8.31,z:-21,angle:-Math.PI/2,w:3.6,h:2.4}]
    const garagePlacements=[{x:-8.31,z:3,angle:Math.PI/2,w:1.55,h:2.75},{x:-8.31,z:-3,angle:Math.PI/2,w:1.55,h:2.75},{x:-8.31,z:-9,angle:Math.PI/2,w:1.55,h:2.75},{x:8.31,z:1,angle:-Math.PI/2,w:1.55,h:2.75},{x:8.31,z:-5,angle:-Math.PI/2,w:1.55,h:2.75},{x:8.31,z:-11,angle:-Math.PI/2,w:1.55,h:2.75}]
    for(let i=0;i<roomWorks.length;i++){
     const w:any=roomWorks[i],p=garage?garagePlacements[i]:josh&&w.video?{...placements[i],w:4.4,h:2.7}:placements[i],group=new T.Group();group.position.set(p.x,2.45,p.z);group.rotation.y=p.angle;scene.add(group)
     const frame=new T.Mesh(new T.BoxGeometry(p.w+.25,p.h+.25,.12),white);frame.castShadow=true;group.add(frame);geometries.push(frame.geometry)
     let tex
     if(w.video){const v=document.createElement('video');v.src=w.video;v.crossOrigin='anonymous';v.muted=true;v.loop=true;v.playsInline=true;v.preload='auto';v.play().catch(()=>{});videos.push(v);tex=new T.VideoTexture(v)}
     else tex=loader.load(w.image)
     tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();if(garage&&w.r){const tR=p.w/p.h,s=tR/w.r;if(s<1){tex.repeat.x=s;tex.offset.x=(1-s)/2}else{tex.repeat.y=1/s;tex.offset.y=(1-1/s)/2}}textures.push(tex)
     const image=new T.Mesh(new T.PlaneGeometry(p.w,p.h),new T.MeshBasicMaterial({map:tex,toneMapped:false}));image.position.z=.067;image.userData.work=i;group.add(image);exhibits.push(image);geometries.push(image.geometry);materials.push(image.material)
     const plate=label([{text:`0${i+1} / ${w.by.toUpperCase()}`,size:27,color:'#6b757c'},{text:w.title,size:62,italic:true}],1.45,.72);plate.position.set(0,-p.h/2-.64,.025);group.add(plate)
     const lamp=new T.SpotLight('#ffffff',24,10,Math.PI/5,.7,1);lamp.position.set(p.x*.75,5.1,p.z+1.4);lamp.target.position.set(p.x,2.5,p.z);scene.add(lamp);scene.add(lamp.target)
    }
    // Far wall becomes a living window: an installation, not another framed thumbnail.
    if(!garage){const endVideo=document.createElement('video');endVideo.src='/shwcase-coastal-dusk-loop.mp4';endVideo.muted=true;endVideo.loop=true;endVideo.playsInline=true;endVideo.play().catch(()=>{});videos.push(endVideo)
    const endTex=new T.VideoTexture(endVideo);endTex.colorSpace=T.SRGBColorSpace;textures.push(endTex)
    const vista=new T.Mesh(new T.PlaneGeometry(9,4.7),new T.MeshBasicMaterial({map:endTex,toneMapped:false}));vista.position.set(0,2.6,-27.8);scene.add(vista);materials.push(vista.material);geometries.push(vista.geometry)}
    if(garage){
     const concrete=mat('#424d56'),stripe=mat('#b4a071'),glow=mat('#ecf4ff',{emissive:'#dbeeff',emissiveIntensity:2});
     box(17,.25,40,0,5.6,-8,concrete);
     for(let z=7;z>=-26;z-=5){box(17,.4,.35,0,5.1,z,concrete);box(4,.035,.17,0,4.86,z,glow);const light=new T.PointLight('#e0ecff',22,12,2);light.position.set(0,4.5,z);scene.add(light)}
     for(const x of [-5.5,5.5])for(let z=7;z>=-24;z-=5){box(3.1,.004,.065,x,.015,z,stripe);box(.065,.004,3.2,x+1.5,.015,z-1.6,stripe)}
     for(let y=.25;y<4.8;y+=.22)box(7.5,.035,.08,0,y,-27.65,concrete);
     const sign=label([{text:'B1 / THE GARAGE',size:56},{text:"andy\'s mustang.",size:80,italic:true},{text:'A STUDY IN MOTION.',size:24}],5.2,2.6);sign.position.set(0,3.1,-27.5);scene.add(sign);

    }
    if(garage){
     // Reflection environment: dark garage with long fluorescent strips, so the black paint picks up the same streaks as in Andy's clips.
     const envScene=new T.Scene();envScene.background=new T.Color('#07090b')
     const envStrip=(w:number,x:number,z:number)=>{const s=new T.Mesh(new T.PlaneGeometry(w,.7),new T.MeshBasicMaterial({color:'#dcebf7'}));s.position.set(x,5,z);s.rotation.x=Math.PI/2;envScene.add(s)}
     for(let i=0;i<5;i++)envStrip(7,-4+i*2,-6+i*3)
     const envSide=new T.Mesh(new T.PlaneGeometry(9,2.4),new T.MeshBasicMaterial({color:'#23303a'}));envSide.position.set(-7,1.6,-3);envSide.rotation.y=Math.PI/2;envScene.add(envSide)
     const pmrem=new T.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(envScene,.05).texture;pmrem.dispose()

     // Andy's actual car: a black S650 Mustang fastback, modeled panel by panel from his clips.
     const car=new T.Group();car.position.set(0,.03,-3);car.rotation.y=-.16;scene.add(car)
     const paint=new T.MeshPhysicalMaterial({color:'#0b0d10',metalness:.25,roughness:.34,clearcoat:1,clearcoatRoughness:.07,envMapIntensity:1.6,side:T.DoubleSide});materials.push(paint)
     const glass=new T.MeshPhysicalMaterial({color:'#0e151b',metalness:.15,roughness:.05,clearcoat:1,clearcoatRoughness:.03,envMapIntensity:2.1,side:T.DoubleSide});materials.push(glass)
     const satin=mat('#15181c',{roughness:.55,metalness:.3}),rubber=mat('#14161a',{roughness:.94}),rimM=mat('#171a1f',{metalness:.75,roughness:.32}),steel=mat('#6a7378',{metalness:.9,roughness:.35}),caliperM=mat('#9c1620',{roughness:.4,metalness:.2}),chrome=mat('#c8d2da',{metalness:1,roughness:.18})
     const redLens=new T.MeshStandardMaterial({color:'#2a0504',emissive:'#ff2d12',emissiveIntensity:2.8});materials.push(redLens)
     const whiteLens=new T.MeshStandardMaterial({color:'#1d232a',emissive:'#e8f2ff',emissiveIntensity:3.4});materials.push(whiteLens)
     const amberLens=new T.MeshStandardMaterial({color:'#241503',emissive:'#ff9a1f',emissiveIntensity:1.7});materials.push(amberLens)
     const well=mat('#050607',{roughness:1,side:T.DoubleSide})
     const cb=(w:number,h:number,d:number,x:number,y:number,z:number,m:any,parent:any=car)=>{const g=new T.BoxGeometry(w,h,d);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh}
     // Lofts a ring of half-outlines (bottom center, up the left side, to top center) along z; mirrored, smooth-shaded.
     const loft=(stations:{z:number;pts:number[][]}[],material:any)=>{const cr=(a:number,b:number,c:number,d:number,t:number)=>{const v=.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t);return Math.min(Math.max(v,Math.min(b,c)),Math.max(b,c))};const dense=[stations[0]];for(let s=0;s<stations.length-1;s++){const a=stations[Math.max(0,s-1)],b=stations[s],c=stations[s+1],d=stations[Math.min(stations.length-1,s+2)];dense.push({z:cr(a.z,b.z,c.z,d.z,.5),pts:b.pts.map((p,i)=>[cr(a.pts[i][0],b.pts[i][0],c.pts[i][0],d.pts[i][0],.5),cr(a.pts[i][1],b.pts[i][1],c.pts[i][1],d.pts[i][1],.5)])});dense.push(c)}stations=dense;const per=stations[0].pts.length*2-2,pos:number[]=[]
      for(const s of stations){const ring:number[][]=[...s.pts];for(let i=s.pts.length-2;i>=1;i--)ring.push([-s.pts[i][0],s.pts[i][1]]);for(const p of ring)pos.push(p[0],p[1],s.z)}
      const idx:number[]=[];for(let s=0;s<stations.length-1;s++)for(let i=0;i<per;i++){const a=s*per+i,b=s*per+(i+1)%per,c=(s+1)*per+i,d=(s+1)*per+(i+1)%per;idx.push(a,c,b,b,c,d)}
      const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();geometries.push(g)
      const m=new T.Mesh(g,material);m.castShadow=true;m.receiveShadow=true;car.add(m);return m}
     // Main body: nose low and wide, long hood, shoulders over the axles, Kamm tail.
     loft([
      {z:-2.44,pts:[[0,.30],[.58,.30],[.84,.35],[.90,.50],[.88,.63],[.62,.68],[0,.69]]},
      {z:-2.34,pts:[[0,.15],[.74,.16],[.92,.25],[.95,.46],[.93,.68],[.78,.75],[0,.76]]},
      {z:-2.05,pts:[[0,.13],[.78,.14],[.945,.26],[.97,.50],[.945,.72],[.78,.80],[0,.81]]},
      {z:-1.70,pts:[[0,.13],[.80,.14],[.955,.28],[.972,.55],[.948,.80],[.76,.875],[0,.885]]},
      {z:-1.36,pts:[[0,.52],[.62,.50],[.90,.50],[.972,.58],[.945,.83],[.75,.90],[0,.91]]},
      {z:-0.95,pts:[[0,.15],[.80,.16],[.95,.32],[.955,.60],[.925,.88],[.72,.955],[0,.965]]},
      {z:-0.45,pts:[[0,.16],[.80,.17],[.945,.33],[.95,.62],[.92,.90],[.70,.975],[0,.985]]},
      {z: 0.10,pts:[[0,.16],[.80,.17],[.945,.33],[.95,.62],[.92,.905],[.70,.98],[0,.99]]},
      {z: 0.65,pts:[[0,.16],[.80,.17],[.948,.33],[.955,.62],[.925,.905],[.705,.985],[0,.995]]},
      {z: 1.36,pts:[[0,.54],[.62,.52],[.90,.52],[.968,.60],[.945,.90],[.72,.985],[0,.995]]},
      {z: 1.75,pts:[[0,.17],[.79,.18],[.95,.34],[.96,.60],[.935,.90],[.715,.985],[0,.99]]},
      {z: 2.10,pts:[[0,.19],[.76,.20],[.92,.36],[.935,.62],[.91,.905],[.70,.97],[0,.975]]},
      {z: 2.32,pts:[[0,.24],[.68,.26],[.86,.40],[.885,.64],[.865,.885],[.66,.945],[0,.95]]},
      {z: 2.41,pts:[[0,.32],[.50,.36],[.68,.48],[.72,.66],[.70,.85],[.52,.90],[0,.905]]},
     ],paint)
     // Glasshouse: fastback sweep from the windshield base to the decklid.
     loft([
      {z:-1.02,pts:[[0,.96],[.62,.962],[.73,.975],[.68,.99],[0,.995]]},
      {z:-0.70,pts:[[0,.96],[.66,.965],[.775,1.07],[.70,1.16],[0,1.175]]},
      {z:-0.30,pts:[[0,.96],[.68,.965],[.79,1.14],[.715,1.30],[0,1.345]]},
      {z: 0.15,pts:[[0,.96],[.685,.965],[.79,1.15],[.705,1.335],[0,1.385]]},
      {z: 0.60,pts:[[0,.96],[.68,.965],[.78,1.14],[.70,1.32],[0,1.37]]},
      {z: 1.05,pts:[[0,.96],[.67,.965],[.76,1.11],[.685,1.245],[0,1.28]]},
      {z: 1.50,pts:[[0,.96],[.65,.962],[.72,1.04],[.63,1.13],[0,1.15]]},
      {z: 1.85,pts:[[0,.962],[.62,.962],[.67,.99],[.55,1.0],[0,1.005]]},
     ],glass)
     // Roof panel and pillars cap the glass in body color.
     loft([
      {z:-0.34,pts:[[0,1.352],[.60,1.345],[.63,1.33],[.30,1.325],[0,1.33]]},
      {z: 0.15,pts:[[0,1.392],[.60,1.385],[.63,1.37],[.30,1.365],[0,1.37]]},
      {z: 0.60,pts:[[0,1.377],[.59,1.37],[.62,1.355],[.30,1.35],[0,1.355]]},
      {z: 0.95,pts:[[0,1.31],[.57,1.30],[.60,1.285],[.30,1.28],[0,1.285]]},
     ],paint)
     const bar=(x1:number,y1:number,z1:number,x2:number,y2:number,z2:number,w:number,m:any)=>{const a=new T.Vector3(x1,y1,z1),b=new T.Vector3(x2,y2,z2),len=a.distanceTo(b);const g=new T.BoxGeometry(w,w,len);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.copy(a).lerp(b,.5);mesh.lookAt(b);mesh.castShadow=true;car.add(mesh);return mesh}
     for(const s of [-1,1]){
      bar(s*.70,.99,-.97,s*.655,1.33,-.32,.05,paint) // A-pillar
      bar(s*.66,1.0,.42,s*.645,1.36,.42,.045,glass) // B-pillar (black, reads as glass)
      // C-pillar sail: fastback's body-color sweep over the rear glass
      const sail=new T.Shape();sail.moveTo(.62,1.06);sail.lineTo(.67,1.295);sail.lineTo(.69,1.25);sail.lineTo(.74,1.0);sail.lineTo(.72,.98);sail.closePath()
      const sailG=new T.ExtrudeGeometry(sail,{depth:.06,bevelEnabled:false});geometries.push(sailG)
      const sailM=new T.Mesh(sailG,paint);sailM.rotation.y=-Math.PI/2*s;sailM.position.set(s*(s>0?.70:-.64),0,1.12);sailM.castShadow=true;car.add(sailM)
      // Mirrors on stalks
      bar(s*.93,1.0,-.52,s*1.02,1.04,-.50,.035,paint)
      const mir=cb(.10,.085,.16,s*1.045,1.06,-.48,paint);mir.rotation.y=s*.12
      cb(.085,.06,.005,s*1.045,1.06,-.395,glass).rotation.y=s*.12
      // Door handles, flush
      cb(.13,.028,.02,s*.945,.90,.42,satin)
      // Side skirt extensions
      cb(.07,.075,1.9,s*.93,.155,.02,satin)
      // "@andyflcks" on the quarter glass, like the real car
      const dc=document.createElement('canvas');dc.width=512;dc.height=64;const dctx=dc.getContext('2d')!;dctx.clearRect(0,0,512,64);dctx.font='600 40px Georgia';dctx.fillStyle='#dfe5ea';dctx.textAlign='center';dctx.textBaseline='middle';dctx.fillText('@andyflcks',256,34)
      const dtex=new T.CanvasTexture(dc);dtex.colorSpace=T.SRGBColorSpace;textures.push(dtex)
      const dm=new T.MeshBasicMaterial({map:dtex,transparent:true,toneMapped:false});materials.push(dm)
      const dg=new T.PlaneGeometry(.30,.0375);geometries.push(dg)
      const dpl=new T.Mesh(dg,dm);dpl.position.set(s*.755,1.12,.93);dpl.rotation.y=s*Math.PI/2;dpl.rotation.z=s*-.06;car.add(dpl)
     }
     // Front fascia: hexagonal honeycomb grille, pony badge, slim tri-projector lamps, corner blades.
     const hexC=document.createElement('canvas');hexC.width=hexC.height=256;const hx=hexC.getContext('2d')!;hx.fillStyle='#0a0c0e';hx.fillRect(0,0,256,256);hx.strokeStyle='#232a30';hx.lineWidth=2.5
     for(let r=0;r<12;r++)for(let c=0;c<12;c++){const cx=c*24+(r%2?12:0),cy=r*21;hx.beginPath();for(let k=0;k<6;k++){const a=Math.PI/3*k+Math.PI/6;const px=cx+11*Math.cos(a),py=cy+11*Math.sin(a);k?hx.lineTo(px,py):hx.moveTo(px,py)}hx.closePath();hx.stroke()}
     const hexTex=new T.CanvasTexture(hexC);hexTex.colorSpace=T.SRGBColorSpace;hexTex.wrapS=hexTex.wrapT=T.RepeatWrapping;hexTex.repeat.set(3,2);textures.push(hexTex)
     const grilleM=new T.MeshStandardMaterial({map:hexTex,roughness:.5,metalness:.35});materials.push(grilleM)
     const grilleSh=new T.Shape();grilleSh.moveTo(-.60,.48);grilleSh.lineTo(-.70,.60);grilleSh.lineTo(-.64,.79);grilleSh.lineTo(.64,.79);grilleSh.lineTo(.70,.60);grilleSh.lineTo(.60,.48);grilleSh.closePath()
     const grilleG=new T.ShapeGeometry(grilleSh);geometries.push(grilleG)
     const grille=new T.Mesh(grilleG,grilleM);grille.position.set(0,0,-2.435);grille.rotation.y=Math.PI;grille.rotation.x=.1;car.add(grille)
     const surrG=new T.ShapeGeometry(grilleSh);geometries.push(surrG)
     const surr=new T.Mesh(surrG,satin);surr.scale.set(1.06,1.08,1);surr.position.set(0,-.01,-2.428);surr.rotation.y=Math.PI;surr.rotation.x=.1;car.add(surr)
     // Pony: simplified galloping silhouette on a dark roundel, like the grille badge.
     const ponyC=document.createElement('canvas');ponyC.width=ponyC.height=256;const pc=ponyC.getContext('2d')!;pc.fillStyle='#101216';pc.beginPath();pc.arc(128,128,124,0,7);pc.fill()
     pc.fillStyle='#cfd8df';pc.beginPath();const PP=[[38,132],[58,104],[74,96],[84,108],[96,92],[120,86],[150,88],[176,84],[196,74],[210,80],[204,92],[188,96],[196,110],[210,128],[204,138],[188,124],[170,120],[160,140],[170,166],[158,170],[146,146],[128,138],[112,152],[104,176],[94,172],[96,148],[84,140],[66,146],[52,142],[62,130]];pc.moveTo(PP[0][0],PP[0][1]);for(const p of PP.slice(1))pc.lineTo(p[0],p[1]);pc.closePath();pc.fill()
     const ponyTex=new T.CanvasTexture(ponyC);ponyTex.colorSpace=T.SRGBColorSpace;textures.push(ponyTex)
     const ponyM=new T.MeshBasicMaterial({map:ponyTex,transparent:true,toneMapped:false});materials.push(ponyM)
     const ponyG=new T.PlaneGeometry(.13,.13);geometries.push(ponyG)
     const pony=new T.Mesh(ponyG,ponyM);pony.position.set(0,.665,-2.448);pony.rotation.y=Math.PI;car.add(pony)
     const pony2=new T.Mesh(ponyG,ponyM);pony2.scale.set(.8,.8,1);pony2.position.set(0,.815,2.428);car.add(pony2)
     for(const s of [-1,1]){
      // Headlight housing: slim wedge sweeping back
      const hl=new T.Shape();hl.moveTo(.42,.70);hl.lineTo(.84,.745);hl.lineTo(.88,.83);hl.lineTo(.52,.85);hl.closePath()
      const hlG=new T.ExtrudeGeometry(hl,{depth:.14,bevelEnabled:false});geometries.push(hlG)
      const hm=new T.Mesh(hlG,satin);hm.scale.x=s;hm.position.set(0,0,-2.42);car.add(hm)
      // DRL blade under the projectors
      const drl=cb(.42,.022,.03,0,0,0,whiteLens);drl.position.set(s*.655,.74,-2.415);drl.rotation.z=s*.06
      for(let j=0;j<3;j++){const proj=cb(.05,.045,.02,s*(.54+j*.11),.795,-2.405,well);const dot=cb(.02,.02,.022,s*(.54+j*.11),.795,-2.407,whiteLens)}
      cb(.04,.03,.02,s*.88,.765,-2.385,amberLens)
      // Vertical corner blade
      const blade=cb(.025,.16,.03,s*.90,.50,-2.33,whiteLens);blade.rotation.z=s*-.1;blade.rotation.y=s*.25
      // Lower intake
      cb(1.15,.16,.04,0,.28,-2.42,well)
     }
     // Splitter lip
     cb(1.66,.028,.2,0,.145,-2.42,satin)
     // Rear: black decklid panel, chevron tri-bars, lip spoiler, diffuser, quad tips.
     cb(1.5,.34,.03,0,.80,2.40,satin)
     for(const s of [-1,1])for(let j=0;j<3;j++){const lamp=cb(.085,.27,.035,s*(.26+j*.155),.80,2.425,redLens);lamp.rotation.z=s*-.16}
     cb(1.3,.024,.17,0,.962,2.31,paint).rotation.x=.2 // spoiler lip
     cb(1.5,.2,.12,0,.22,2.36,satin) // diffuser
     for(let j=-2;j<=2;j++)cb(.025,.15,.1,j*.16,.155,2.38,well)
     const exG=new T.CylinderGeometry(.042,.042,.12,20);geometries.push(exG)
     for(const x of [-.62,-.48,.48,.62]){const tip=new T.Mesh(exG,chrome);tip.rotation.x=Math.PI/2;tip.position.set(x,.235,2.415);car.add(tip)}
     for(const s of [-1,1])cb(.03,.14,.03,s*.885,.40,2.365,amberLens)
     // Wheels: black split-5-spokes, red calipers (his car has them), arch rings.
     const tireG=new T.TorusGeometry(.299,.054,20,64);geometries.push(tireG)
     const rimG=new T.CylinderGeometry(.245,.245,.2,40);geometries.push(rimG)
     const faceG=new T.CylinderGeometry(.235,.235,.02,40);geometries.push(faceG)
     const discG=new T.CylinderGeometry(.19,.19,.03,32);geometries.push(discG)
     const archG=new T.TorusGeometry(.41,.045,12,48);geometries.push(archG)
     const wellG=new T.CylinderGeometry(.42,.42,.26,32,1,true);geometries.push(wellG)
     const wheelAt=(x:number,z:number)=>{
      const side=x>0?1:-1
      const wl=new T.Group();wl.position.set(x,.352,z);car.add(wl)
      const tire=new T.Mesh(tireG,rubber);tire.rotation.y=Math.PI/2;tire.scale.z=2.1;tire.castShadow=true;wl.add(tire)
      const rim=new T.Mesh(rimG,rimM);rim.rotation.z=Math.PI/2;wl.add(rim)
      const face=new T.Mesh(faceG,rimM);face.rotation.z=Math.PI/2;face.position.x=side*.09;wl.add(face)
      const disc=new T.Mesh(discG,steel);disc.rotation.z=Math.PI/2;disc.position.x=-side*.02;wl.add(disc)
      const cal=cb(.09,.15,.06,0,.14,0,caliperM,wl);cal.position.x=-side*.02
      for(let k=0;k<5;k++)for(const d of [-1,1]){const ang=k*Math.PI*2/5+d*.11;const sp=cb(.02,.21,.028,side*.1,Math.sin(ang)*.115,Math.cos(ang)*.115,rimM,wl);sp.rotation.x=-ang}
      cb(.05,.05,.03,side*.1,0,0,well,wl)
      const arch=new T.Mesh(archG,paint);arch.rotation.y=Math.PI/2;arch.position.set(side*.955,.352,z);car.add(arch)
      const wellM=new T.Mesh(wellG,well);wellM.rotation.z=Math.PI/2;wellM.position.set(side*.80,.352,z);car.add(wellM)
     }
     wheelAt(-.84,-1.36);wheelAt(.84,-1.36);wheelAt(-.84,1.36);wheelAt(.84,1.36)
     // Soft contact shadow grounds the car on the concrete.
     const shC=document.createElement('canvas');shC.width=shC.height=256;const shx=shC.getContext('2d')!;const grad=shx.createRadialGradient(128,128,30,128,128,124);grad.addColorStop(0,'rgba(0,0,0,.62)');grad.addColorStop(1,'rgba(0,0,0,0)');shx.fillStyle=grad;shx.fillRect(0,0,256,256)
     const shTex=new T.CanvasTexture(shC);textures.push(shTex)
     const shM=new T.MeshBasicMaterial({map:shTex,transparent:true,depthWrite:false});materials.push(shM)
     const shG=new T.PlaneGeometry(6.2,3.4);geometries.push(shG)
     const sh=new T.Mesh(shG,shM);sh.rotation.x=-Math.PI/2;sh.rotation.z=Math.PI/2;sh.position.set(0,.012,-3);scene.add(sh)
     const carLight=new T.SpotLight('#eef4ff',130,20,Math.PI/4,.65,1);carLight.position.set(3.5,5.2,0);carLight.target.position.set(0,.7,-3);carLight.castShadow=true;carLight.shadow.mapSize.set(2048,2048);carLight.shadow.bias=-.0004;carLight.shadow.normalBias=.02;scene.add(carLight);scene.add(carLight.target);const rimL=new T.DirectionalLight('#bcd2e8',.55);rimL.position.set(6,4,-9);scene.add(rimL)
     const fill=new T.PointLight('#dce9f4',18,9,2);fill.position.set(-2,3,-2);scene.add(fill)
    }

    const stops=[{p:garage?[5.8,3.1,6.8]:[0,1.65,9],l:garage?[0,1,-3]:[0,2,-7]},{p:[-3,1.65,3],l:[-8.3,2.4,0]},{p:[3.6,1.65,-5],l:[8.3,2.4,-7.5]},{p:[-3,1.65,-10],l:[-8.3,2.4,-14.5]},{p:[2.8,1.65,-18],l:[7.7,2.35,-21]}]
    let orbitElevation=.3,orbitRadius=innerWidth<640?7.4:6.5,previous=performance.now(),progress=target.current,raf=0,drag:null|{x:number;y:number;start:number}=null,travel=0,lastActive=-1,inertia=0,lastInteract=performance.now()
    const cp=new T.Vector3(),look=new T.Vector3(),raycaster=new T.Raycaster(),pointer=new T.Vector2()
    const resize=()=>{if(!el)return;camera.aspect=el.clientWidth/el.clientHeight;camera.fov=innerWidth<640?(garage?92:68):55;if(garage)orbitRadius=innerWidth<640?7.4:6.5;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)}
    const animate=()=>{if(dead)return;const now=performance.now(),dt=Math.min((now-previous)/1000,.5);previous=now;progress+=(target.current-progress)*(1-Math.exp(-dt*3));if(garage){if(!drag){if(Math.abs(inertia)>.02){update(target.current+inertia*dt);inertia*=Math.exp(-dt*2.6)}else if(now-lastInteract>5000)update(target.current+dt*.055)}camera.position.set(Math.sin(progress+.6)*orbitRadius,.7+Math.sin(orbitElevation)*orbitRadius,-3+Math.cos(progress+.6)*orbitRadius);camera.lookAt(0,.72,-3);renderer.render(scene,camera);raf=requestAnimationFrame(animate);return}const a=Math.min(roomWorks.length-1,Math.floor(progress)),f=Math.max(0,Math.min(1,progress-a));const t=f*f*(3-2*f);cp.fromArray(stops[a].p).lerp(new T.Vector3().fromArray(stops[a+1].p),t);look.fromArray(stops[a].l).lerp(new T.Vector3().fromArray(stops[a+1].l),t);camera.position.copy(cp);camera.lookAt(look);renderer.render(scene,camera);raf=requestAnimationFrame(animate)}
    const update=(v:number)=>{target.current=garage?v:Math.max(0,Math.min(roomWorks.length,v));const a=Math.round(target.current);if(a!==lastActive){lastActive=a;callbacks.current.onActive(a)}}
    const wheel=(e:WheelEvent)=>{e.preventDefault();if(garage){orbitRadius=Math.max(4.4,Math.min(7.7,orbitRadius+e.deltaY*.005));return}update(target.current+e.deltaY*.0016)}
    const down=(e:PointerEvent)=>{drag={x:e.clientX,y:e.clientY,start:target.current};travel=0;inertia=0;lastInteract=performance.now()}
    const move=(e:PointerEvent)=>{if(!drag)return;const dy=drag.y-e.clientY,dx=drag.x-e.clientX;travel=Math.hypot(dx,dy);if(garage){const now2=performance.now(),nt=drag.start+dx*.009;inertia=(nt-target.current)/Math.max((now2-lastInteract)/1000,.016)*.35;lastInteract=now2;update(nt);orbitElevation=Math.max(.06,Math.min(.8,orbitElevation+dy*.0022));return}update(drag.start+(Math.abs(dy)>Math.abs(dx)?dy:dx)/400)}
    const up=(e:PointerEvent)=>{if(!drag)return;drag=null;lastInteract=performance.now();if(garage){if(travel<=10){const r=el.getBoundingClientRect();pointer.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(exhibits)[0];if(hit)callbacks.current.onOpen(hit.object.userData.work)}return}if(travel>10){update(Math.round(target.current));return}const r=el.getBoundingClientRect();pointer.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(exhibits)[0];if(hit){const i=hit.object.userData.work;if(Math.abs(progress-i-1)<.2)callbacks.current.onOpen(i);else update(i+1)}}
    el.addEventListener('wheel',wheel,{passive:false});el.addEventListener('pointerdown',down);window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('resize',resize)
    animate();setStatus('')
    dispose=()=>{cancelAnimationFrame(raf);el.removeEventListener('wheel',wheel);el.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('resize',resize);videos.forEach(v=>{v.pause();v.removeAttribute('src');v.load()});textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());renderer.dispose();renderer.domElement.remove()}
   }catch(e){setStatus('The room could not load. Return to the museum and try again.');console.error(e)}
  };boot();return()=>{dead=true;dispose()}
 },[target,garage,josh])
 return <div className="spatialCanvas"><div className="spatialMount" ref={mount}/>{status?<p className="spatialStatus">{status}</p>:null}</div>
}

function Arrow({left=false}:{left?:boolean}){return <svg className="cleanArrow" width="22" height="16" viewBox="0 0 24 16" fill="none" aria-hidden="true" style={{transform:left?'rotate(180deg)':undefined}}><path d="M2 8h19M15 2l6 6-6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function MuseumExterior({onSelect}:{onSelect:(room:'lobby'|'josh'|'garage'|'screen')=>void}){
 const mount=useRef<HTMLDivElement>(null),callback=useRef(onSelect);callback.current=onSelect
 const [status,setStatus]=useState('opening the museum grounds')
 useEffect(()=>{let dead=false,clean=()=>{};const boot=async()=>{try{
 const url='https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js',T=await import(/* webpackIgnore: true */ url);if(dead||!mount.current)return
 const el=mount.current,scene=new T.Scene();scene.background=new T.Color('#e4eaec');scene.fog=new T.Fog('#e4eaec',170,300)
 const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setSize(el.clientWidth,el.clientHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;el.appendChild(renderer.domElement)
 const camera=new T.PerspectiveCamera(innerWidth<640?45:36,el.clientWidth/el.clientHeight,.1,220),world=new T.Group();scene.add(world)
 const mats:any[]=[],geos:any[]=[],targets:any[]=[],trees:any[]=[]
 const mat=(c:string,e:any={})=>{const m=new T.MeshStandardMaterial({color:c,roughness:.72,...e});mats.push(m);return m}
 const stoneCanvas=document.createElement('canvas');stoneCanvas.width=stoneCanvas.height=512;const stoneCtx=stoneCanvas.getContext('2d')!;stoneCtx.fillStyle='#e0ded6';stoneCtx.fillRect(0,0,512,512);let seed=9;for(let i=0;i<18000;i++){seed=(seed*1664525+1013904223)>>>0;const x=seed%512;seed=(seed*1664525+1013904223)>>>0;const y=seed%512;stoneCtx.fillStyle=i%2?'#cbc8be':'#efeee8';stoneCtx.fillRect(x,y,1,1)}const stoneTex=new T.CanvasTexture(stoneCanvas);stoneTex.wrapS=stoneTex.wrapT=T.RepeatWrapping;stoneTex.repeat.set(4,4);stoneTex.anisotropy=4;
 const white=mat('#f5f5ef',{map:stoneTex,bumpMap:stoneTex,bumpScale:.035}),edge=mat('#d7dcd9'),glass=mat('#66818d',{metalness:.25,roughness:.15}),dark=mat('#26353d'),paving=mat('#c1c9c6'),green=mat('#687c6d'),water=mat('#71969e',{metalness:.4,roughness:.18}),sand=mat('#b2b8ad'),gold=mat('#b7a681',{metalness:.5,roughness:.2})
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:any,parent:any=world)=>{const g=new T.BoxGeometry(w,h,d);geos.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 const ground=box(240,.3,240,0,-1,0,mat('#dce3df'));ground.castShadow=false
 box(41,1.15,33,0,-.22,0,edge);box(40,.1,32,0,.4,0,paving)
 // A pale stone campus: a long skylit gallery, a dark cinema and a garage court.
 const gallery=new T.Group();world.add(gallery)
 box(17,4.8,17,-7,2.85,-3,white,gallery);box(18,.32,18,-7,5.38,-3,white,gallery)
 box(17.3,.07,17.3,-7,5.58,-3,edge,gallery)
 for(let i=0;i<5;i++){box(1.5,.22,14,-12.5+i*2.7,5.78,-3,glass,gallery);box(.11,.22,14,-13.2+i*2.7,5.88,-3,white,gallery)}
 box(17,1.45,.08,-7,2.1,5.55,glass,gallery);for(let x=-15;x<2;x+=2)box(.13,3.8,.18,x,2.35,5.65,white,gallery)
 const cinema=new T.Group();world.add(cinema);box(10,6.8,13,8,3.85,-5,dark,cinema);box(10.5,.3,13.5,8,7.38,-5,dark,cinema)
 for(let x=3.3;x<13;x+=.55)box(.12,6.6,.12,x,3.8,1.6,edge,cinema)
 box(8,3.5,7,5,2.2,5,white);box(8.5,.35,7.5,5,4.1,5,white);box(6.4,2.7,.1,5,1.9,8.57,glass)
 for(let x=2.5;x<8;x+=1.4)box(.1,2.7,.2,x,1.9,8.6,dark)
 // A cutaway lower-ground garage, open to the sky at the far right.
 const garage=new T.Group();world.add(garage);box(8,1.1,11,15,.7,6,dark,garage);box(.25,2.1,11,11.1,1.2,6,white,garage);box(8,2.1,.25,15,1.2,.5,white,garage);box(.25,2.1,11,18.9,1.2,6,white,garage)
 for(let z=2;z<11;z+=2.5){box(3,.02,.06,15,1.28,z,gold,garage);box(.06,.02,2.5,16.5,1.28,z+1.25,gold,garage)}
 const ramp=box(7,.17,9,15,.7,14.1,paving,garage);ramp.rotation.x=.08
 // Gallery walk, reflecting pool, sculpture court and quiet planting.
 box(18,.04,3,-1,.49,11,white);box(4,.04,13,-2,.49,14,white)
 box(11,.07,3.8,-11,.5,10.5,dark);box(10.5,.08,3.3,-11,.55,10.5,water)
 const ringG=new T.TorusGeometry(1.7,.16,12,64);geos.push(ringG);const ring=new T.Mesh(ringG,gold);ring.position.set(-2,2.3,11);ring.rotation.y=.65;ring.castShadow=true;world.add(ring);box(3,.25,3,-2,.6,11,white)
 for(const x of [-18.2,18.1])for(let z=-13;z<14;z+=4.5){box(2.2,.25,2.2,x,.55,z,sand);const trunk=box(.18,1.8,.18,x,1.5,z,mat('#77796a'));const g=new T.IcosahedronGeometry(.95,3);geos.push(g);const crown=new T.Mesh(g,green);crown.position.set(x,2.8,z);crown.scale.set(1,1.3,1);crown.castShadow=true;world.add(crown);trees.push(crown)}
 for(let z=-13;z<12;z+=4.5)box(1.3,.4,.45,-16.8,.8,z,dark)
 for(let i=0;i<4;i++)box(8+i*.6,.13,.6,5,.43-i*.11,9+i*.6,white)
 // Architectural detailing at model scale.
 const joint=mat('#9da8a8'),bronze=mat('#706750',{metalness:.7,roughness:.3}),interior=mat('#293a42'),warm=mat('#eed4a0',{emissive:'#d5a363',emissiveIntensity:.35});
 for(let x=-15;x<2;x+=1.4){box(.015,4.5,.025,x,2.8,5.68,joint,gallery);box(.015,.025,17,x,5.63,-3,joint,gallery)}
 for(let z=-10;z<5;z+=1.5){box(17,.025,.015,-7,5.63,z,joint,gallery);box(.03,4.5,.015,-15.53,2.8,z,joint,gallery)}
 for(let x=-12.5;x<0;x+=2.7){for(let z=-9;z<4;z+=2.1)box(1.5,.04,.045,x,5.93,z,white,gallery)}
 for(let x=2;x<9;x+=1.4){box(.07,2.9,.25,x,1.9,8.61,bronze);box(.58,1.65,.2,x+.36,1.6,8.38,interior);box(.45,.035,.1,x+.36,3.4,8.4,warm)}
 for(let z=-11;z<1;z+=.58){box(.13,6.6,.13,13.08,3.8,z,edge,cinema)}
 for(let x=-19;x<=19;x+=2)box(.018,.015,32,x,.475,0,joint);
 for(let z=-15;z<=15;z+=2)box(39,.015,.018,0,.48,z,joint);
 for(let x=-15;x<-6;x+=1.4){box(.04,.015,3.15,x,.61,10.5,mat('#92aeb3',{metalness:.35,roughness:.1}))}
 // Lighting bollards and planted grasses along the approach.
 for(let z=9;z<=17;z+=2){for(const x of [-4.6,.6]){box(.12,.65,.12,x,.8,z,dark);box(.13,.08,.13,x,1.13,z,warm)}}
 for(const x of [-18.2,18.1])for(let z=-13;z<14;z+=4.5)for(let k=0;k<7;k++){const blade=box(.05,.28+(k%3)*.08,.05,x+Math.sin(k*2.4)*.75,.85,z+Math.cos(k*2.4)*.75,green);blade.rotation.z=Math.sin(k)*.2}
 // Labels are part of the miniature, and remain readable from the orbit.
 const label=(text:string,x:number,y:number,z:number,w:number,d:number,color='#2c3d46')=>{const c=document.createElement('canvas');c.width=1024;c.height=128;const ctx=c.getContext('2d')!;ctx.clearRect(0,0,1024,128);ctx.fillStyle=color;ctx.textAlign='center';ctx.font='500 60px monospace';ctx.fillText(text,512,85);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const m=new T.MeshBasicMaterial({map:tx,transparent:true,toneMapped:false});mats.push(m);const g=new T.PlaneGeometry(w,d);geos.push(g);const p=new T.Mesh(g,m);p.rotation.x=-Math.PI/2;p.position.set(x,y,z);world.add(p);return tx}
 const txs=[label('S H W C A S E',-6,.52,14.8,10,1.25),label('01 / RECOLLECTIONS',-7,5.95,4.5,11,1),label('02 / SCREENING',8,7.58,-5,7,.8,'#d4dee2'),label('B1 / GARAGE',15,1.4,4,5,.6,'#d4dee2')]
 const hit=(group:any,id:string)=>{group.traverse((o:any)=>{if(o.isMesh){o.userData.room=id;targets.push(o)}})};hit(gallery,'josh');hit(cinema,'screen');hit(garage,'garage')
 const lobbyHit=box(8,3.5,7,5,2.2,5,new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));lobbyHit.userData.room='lobby';targets.push(lobbyHit)
 scene.add(new T.HemisphereLight('#f4fbff','#b8c1b9',2.7));const sun=new T.DirectionalLight('#fff4d9',3.2);sun.position.set(-30,50,28);sun.castShadow=true;sun.shadow.mapSize.set(4096,4096);sun.shadow.normalBias=.025;sun.shadow.radius=3;Object.assign(sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,far:130});sun.shadow.bias=-.0005;scene.add(sun)
 let az=.7,goal=.7,elevation=.85,goalElevation=.85,radius=innerWidth<640?125:67,goalRadius=radius,drag:null|{x:number;y:number;a:number;e:number}=null,moved=0,raf=0,last=performance.now()
 const aim=new T.Vector3(0,0,0),pointer=new T.Vector2(),ray=new T.Raycaster()
 const resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight);camera.fov=innerWidth<640?45:36;camera.updateProjectionMatrix();goalRadius=innerWidth<640?125:67}
 const draw=()=>{if(dead)return;const now=performance.now(),dt=Math.min(.1,(now-last)/1000);last=now;const f=1-Math.exp(-dt*6);az+=(goal-az)*f;elevation+=(goalElevation-elevation)*f;radius+=(goalRadius-radius)*f;camera.position.set(Math.sin(az)*radius*Math.cos(elevation),Math.sin(elevation)*radius,Math.cos(az)*radius*Math.cos(elevation));camera.lookAt(aim);renderer.render(scene,camera);raf=requestAnimationFrame(draw)}
 const down=(e:PointerEvent)=>{drag={x:e.clientX,y:e.clientY,a:goal,e:goalElevation};moved=0;el.setPointerCapture(e.pointerId)}
 const move=(e:PointerEvent)=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;moved=Math.hypot(dx,dy);goal=drag.a-dx*.006;goalElevation=Math.max(.48,Math.min(1.25,drag.e+dy*.003))}
 const up=(e:PointerEvent)=>{if(!drag)return;drag=null;if(moved>8)return;const r=el.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pointer,camera);const h=ray.intersectObjects(targets)[0];if(h)callback.current(h.object.userData.room)}
 const wheel=(e:WheelEvent)=>{e.preventDefault();goalRadius=Math.max(45,Math.min(innerWidth<640?150:95,goalRadius+e.deltaY*.025))}
 el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('wheel',wheel,{passive:false});window.addEventListener('resize',resize);draw();setStatus('')
 clean=()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('wheel',wheel);mats.forEach(m=>m.dispose());geos.forEach(g=>g.dispose());txs.forEach(t=>t.dispose());stoneTex.dispose();renderer.dispose();renderer.domElement.remove()}
 }catch(e){console.error(e);setStatus('Choose a gallery below to enter the museum.')}};boot();return()=>{dead=true;clean()}},[])
 return <div className="exteriorCanvas"><div ref={mount} className="exteriorMount"/>{status&&<p className="exteriorStatus">{status}</p>}</div>
}


export default function Home(){
 const [exterior,setExterior]=useState(false)
 const [garage,setGarage]=useState(true)
 const [josh,setJosh]=useState(false)
 const [mapRoom,setMapRoom]=useState<'lobby'|'josh'|'garage'|'screen'>('josh')
 const [active,setActive]=useState(0)
 const [zoom,setZoom]=useState<number|null>(null)
 const [screening,setScreening]=useState<number|null>(null)
 const target=useRef(0)
 const works:any[]=garage?[]:josh?WORKS.filter((_,i)=>i!==1):WORKS
 const go=(n:number)=>{target.current=garage?n:Math.max(0,Math.min(works.length,n));setActive(Math.round(target.current))}
 const enterRoom=(room:string)=>{setZoom(null);setScreening(null);setExterior(false);if(room==='screen'){setScreening(0);return}setJosh(room==='josh');setGarage(room==='garage');target.current=0;setActive(0)}
 const open=(i:number)=>{if(garage){setZoom(i);return}if(works[i].href){enterRoom('garage');return}setZoom(i)}
 const outside=()=>{setExterior(true);setScreening(null);setZoom(null)}
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setZoom(null);setScreening(null)}if(exterior||zoom!==null||screening!==null)return;if(e.key==='ArrowRight')go(Math.round(target.current)+1);if(e.key==='ArrowLeft')go(Math.round(target.current)-1)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[exterior,zoom,screening,works.length])
 const roomName=mapRoom==='garage'?"andy's garage.":mapRoom==='josh'?"josh's gallery.":mapRoom==='screen'?'the screening room.':'the museum lobby.'
 return <main className={`homeGallery ${exterior?'campusMode':garage?'garageMode':''}`} data-home="museum-orbit-v4">
 <style>{CSS}</style>
 <header className="hgTop"><a className="hgMark" href="/">shwcase<sup>®</sup></a><span className="tag">the shwcase museum</span><nav className="museumTopNav" aria-label="Museum navigation">{!exterior&&<button onClick={outside}>THE MUSEUM <Arrow/></button>}</nav></header>
 {exterior?<>
 <MuseumExterior onSelect={setMapRoom}/>
 <div className="exteriorHeading"><p>a museum without closing hours</p><h1>the shwcase<span>museum.</span></h1></div><p className="exteriorHint">drag to orbit<br/>tap a building<br/>choose your room</p>
 <div className="campusNav"><aside className="campusSelect"><div className="eyebrow">{mapRoom==='garage'?'B1 / ANDYFLCKS':mapRoom==='josh'?'G.01 / JOSH PEPPER':mapRoom==='screen'?'G.02 / MOVING IMAGES':'G.00 / WELCOME'}</div><h2>{roomName}</h2><p>{mapRoom==='garage'?'One car. An empty garage. Walk all the way around it.':mapRoom==='josh'?'Follow the light through the white gallery. Recollections from the shwcase archive.':mapRoom==='screen'?'Silent films, a quiet seat, and a moment that can last.':'Step inside the skylit hall and find your way through the collection.'}</p><button className="campusEnter" onClick={()=>enterRoom(mapRoom)}>step inside <Arrow/></button></aside><nav className="campusRooms" aria-label="Select a building">{(['lobby','josh','screen','garage'] as const).map(r=><button key={r} onClick={()=>setMapRoom(r)} className={mapRoom===r?'selected':''}>{r==='lobby'?'00 / LOBBY':r==='josh'?"01 / JOSH'S GALLERY":r==='screen'?'02 / SCREENING':"B1 / ANDY'S GARAGE"}</button>)}</nav></div>
 </>:<>
 <SpatialGallery target={target} garage={garage} josh={josh} onActive={setActive} onOpen={open}/>
 <div className="museumLocation">{garage?'B1 / ANDYFLCKS':josh?'G.01 / JOSH PEPPER':'G.00 / THE SHWCASE MUSEUM'}<strong>{garage?'the garage.':'the recollection rooms.'}</strong></div>
 {!garage&&<nav className="roomWayfinding" aria-label="Exhibition route">{(garage?['the mustang','the rear','inside','the ledge']:josh?['arrival','last light','coast','rooftop']:['arrival','last light','andy','coast','rooftop']).map((name,i)=><button key={name} onClick={()=>go(i)} className={active===i?'selected':''} aria-label={`Walk to ${name}`}><span>{String(i).padStart(2,'0')}</span><small>{name}</small></button>)}</nav>}

 <div className="hgControls"><div className="hgPosition" aria-live="polite">{garage?'THE MUSTANG / 360 STUDY':active===0?'THE ENTRANCE':`${String(active).padStart(2,'0')} / ${works[Math.min(active-1,works.length-1)].title}`}<br/>{garage?'drag to orbit / scroll to zoom / tap a frame':active===0?'scroll or drag to walk round':'tap the frame to step closer'}</div><div className="hgArrows"><button disabled={!garage&&active===0} onClick={()=>go(garage?target.current-Math.PI/2:Math.round(target.current)-1)} aria-label={garage?'Orbit left':'Walk back'}><Arrow left/></button><button disabled={!garage&&active===works.length} onClick={()=>go(garage?target.current+Math.PI/2:Math.round(target.current)+1)} aria-label={garage?'Orbit right':'Walk on'}><Arrow/></button></div></div>
 {garage&&<p className="carNote">the real car, rebuilt from his clips / andyflcks</p>}
 </>}
 <footer className="hgBottom"><span>shwcase / recollections from around the world</span><span className="about">a growing museum, kept quietly.</span></footer>
 {zoom!==null&&(()=>{const zw=(garage?GARAGE_WORKS:works)[zoom];return <section className="hgCloseup" role="dialog" aria-modal="true" aria-label={zw.title}><button autoFocus className="close" onClick={()=>setZoom(null)}>close ×</button>{zw.video?<video src={zw.video} autoPlay muted loop playsInline poster={zw.image}/>:<img src={zw.image} alt={zw.title}/>}<h2>{zw.title}</h2><p>{zw.meta}</p></section>})()}
 {screening!==null&&<section className="screenRoom" role="dialog" aria-modal="true" aria-label="The screening room"><video className="screenGlow" src={WORKS[screening].video} autoPlay muted loop playsInline aria-hidden="true"/><div className="roomShell"/><div className="screenFloor"/><header className="screenTop"><div className="roomLabel"><strong>shwcase / screening room</strong><br/>moving images, kept quietly.</div><button autoFocus className="back" onClick={()=>setScreening(null)}><Arrow left/> back to the museum</button></header><div className="projection"><video key={screening} src={WORKS[screening].video} poster={WORKS[screening].image} autoPlay muted loop playsInline aria-label={WORKS[screening].title}/></div><div className="seat"/><footer className="screenCaption"><div><span className="chapterNo">G.02 / SCREENING</span><h2>{WORKS[screening].title}</h2><p className="quietNote">no sound. no hurry.</p></div><div className="filmChoices">{[0,2].map(i=><button key={i} className={screening===i?'selected':''} onClick={()=>setScreening(i)}>{WORKS[i].title}</button>)}</div></footer></section>}

 </main>
       }
