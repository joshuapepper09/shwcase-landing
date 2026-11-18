import Link from 'next/link'
import TimeTheme from './TimeTheme'

const CSS = `
  .v2{--cream:#F2EAD9;--cream-soft:#FAF6EC;--espresso:#2E2118;--mocha:#6F5138;--caramel:#B4895E;--ink-soft:rgba(46,33,24,.58);--hairline:rgba(46,33,24,.16);--hero-tint:rgba(24,16,11,.10)}
  html[data-shw-time='morning'] .v2{--cream:#F7EFE3;--espresso:#2E2118;--mocha:#77573D;--caramel:#C08E68;--ink-soft:rgba(46,33,24,.58);--hairline:rgba(46,33,24,.16);--hero-tint:rgba(70,42,30,.14)}
  html[data-shw-time='dusk'] .v2{--cream:#F4E3CB;--espresso:#2B1B11;--mocha:#6E4527;--caramel:#C97F4B;--ink-soft:rgba(43,27,17,.58);--hairline:rgba(43,27,17,.18);--hero-tint:rgba(64,28,8,.22)}
  html[data-shw-time='night'] .v2{--cream:#131926;--cream-soft:#F4EEE0;--espresso:#E9E2D2;--mocha:#9AA6BE;--caramel:#C99A6C;--ink-soft:rgba(233,226,210,.55);--hairline:rgba(233,226,210,.18);--hero-tint:rgba(6,10,22,.35)}
  .v2{background:var(--cream);color:var(--espresso);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased;transition:background .9s ease,color .9s ease}
  .v2 *{margin:0;padding:0;box-sizing:border-box}
  .v2 .mono{font-family:"IBM Plex Mono",monospace;font-weight:400}
  .v2 .grain{position:fixed;inset:-50%;z-index:60;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.055}
  .v2 .mono-label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--mocha)}

  .v2 .hero{position:relative;min-height:100vh;background:url("/shwcase-pier-poster.jpg") center/cover no-repeat;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
  .v2 .hero .hero-media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
  @media (prefers-reduced-motion:reduce){.v2 .hero .hero-media{display:none}}
  .v2 .hero::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom, rgba(24,16,11,.42) 0%, rgba(24,16,11,0) 30%, rgba(24,16,11,0) 60%, rgba(24,16,11,.55) 100%)}
  .v2 .hero::after{content:"";position:absolute;inset:0;z-index:1;background:var(--hero-tint);transition:background .9s ease;pointer-events:none}
  .v2 nav{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:baseline;padding:26px 28px}
  .v2 .wordmark{font-size:22px;font-weight:500;color:var(--cream-soft);text-decoration:none;letter-spacing:.01em}
  .v2 .wordmark sup{font-size:9px;vertical-align:8px;letter-spacing:0}
  .v2 nav .links{display:flex;gap:20px}
  .v2 nav .links a{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(250,246,236,.82);text-decoration:none}
  .v2 nav .links a.soon{opacity:.4}
  @media (max-width:560px){.v2 nav .links{gap:13px}}

  .v2 .hero-type{position:relative;z-index:3;padding:30px 28px 0}
  .v2 .hero-type .q{color:var(--cream-soft);font-size:clamp(44px,12.5vw,124px);line-height:.94;font-weight:400;letter-spacing:-.01em}
  .v2 .hero-type .q em{font-style:italic;font-weight:300}
  .v2 .hero-type .q .l1{display:block}
  .v2 .hero-type .q .l2{display:block;margin-left:9%}
  .v2 .hero-type .q .l3{display:block;margin-left:2.5%}
  .v2 .hero-type .q .l4{display:block;margin-left:13%}
  .v2 .hero-cta{position:relative;z-index:3;padding:34px 28px 0;display:flex;align-items:center;gap:18px}
  .v2 .btn-dark{display:inline-block;background:var(--espresso);color:var(--cream);font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;padding:13px 24px;border-radius:999px}
  html[data-shw-time='night'] .v2 .btn-dark{background:var(--cream-soft);color:#131926}
  .v2 .hero-cta .micro{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.14em;color:rgba(250,246,236,.66);text-transform:uppercase}
  .v2 .hero-bottom{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:flex-end;padding:40px 28px 30px;gap:20px}
  .v2 .now-card{background:rgba(24,16,11,.55);backdrop-filter:blur(6px);border:1px solid rgba(250,246,236,.14);padding:16px 18px;max-width:230px;border-radius:2px}
  .v2 .now-card .mono-label{color:var(--caramel);margin-bottom:8px;display:block}
  .v2 .now-card .t{color:var(--cream-soft);font-style:italic;font-size:19px;line-height:1.25}
  .v2 .now-card .m{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.12em;color:rgba(250,246,236,.6);margin-top:8px;text-transform:uppercase}
  .v2 .coords{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;color:rgba(250,246,236,.62);text-align:right;text-transform:uppercase;line-height:2;white-space:nowrap}
  @media (max-width:560px){.v2 .coords{display:none}}

  .v2 .statement{padding:170px 28px 130px;max-width:1080px;margin:0 auto}
  .v2 .statement .mono-label{display:block;margin-bottom:40px}
  .v2 .statement p{font-size:clamp(30px,6.4vw,58px);line-height:1.18;font-weight:300;max-width:20ch}
  .v2 .statement p em{font-style:italic}
  .v2 .statement p .inline-img{display:inline-block;width:1.9em;height:1.05em;border-radius:2px;background:url("/shwcase-c-sunpath.svg") center/cover;vertical-align:-0.14em;margin:0 .08em}
  .v2 .statement .sig{margin-top:48px;display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap}
  .v2 .statement .sig .mono-label{color:var(--ink-soft)}

  .v2 .how{padding:0 28px 130px;max-width:1080px;margin:0 auto}
  .v2 .how .head{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--hairline);padding-top:14px;margin-bottom:2px}
  .v2 .how .head .mono-label{color:var(--ink-soft)}
  .v2 .row{display:flex;align-items:baseline;gap:22px;padding:26px 0;border-bottom:1px solid var(--hairline)}
  .v2 .row .n{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--caramel);letter-spacing:.1em}
  .v2 .row .t{font-size:clamp(22px,4vw,32px);font-weight:400}
  .v2 .row .t em{font-style:italic;font-weight:300}
  .v2 .row .d{margin-left:auto;font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);text-align:right;max-width:180px;line-height:1.9}
  @media (max-width:640px){.v2 .row .d{display:none}}

  .v2 .questions{padding:40px 0 90px;overflow:hidden}
  .v2 .questions .head{max-width:1080px;margin:0 auto;padding:0 28px 60px;display:flex;justify-content:space-between;align-items:baseline;gap:6px 18px;flex-wrap:wrap}
  .v2 .field{display:flex;flex-direction:column;gap:26px;padding:0 28px}
  .v2 .field .fig{width:84%}
  .v2 .field .fig:nth-of-type(odd){align-self:flex-end}
  .v2 .field .fig img{display:block;width:100%;border-radius:2px}
  .v2 .field .fig .cap{display:block;margin-top:7px;font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);line-height:1.8}
  .v2 .field .qentry .qn{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.2em;color:var(--caramel);text-transform:uppercase;display:block;margin-bottom:6px}
  .v2 .field .qentry .qq{display:block;font-size:clamp(21px,5.4vw,30px);font-style:italic;font-weight:400;line-height:1.15;max-width:15ch}
  .v2 .field .qentry .qm{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);display:block;margin-top:8px}
  .v2 .field .qentry .qa{display:inline-block;margin-top:12px;font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mocha);text-decoration:none;border-bottom:1px solid var(--hairline);padding-bottom:3px}
  @media (min-width:761px){
    .v2 .field{display:block;position:relative;height:1240px;padding:0}
    .v2 .field .fig{position:absolute}
    .v2 .field .qentry{position:absolute;max-width:220px}
    .v2 .field .f1{left:0;top:0;width:24%}
    .v2 .field .q1{left:29%;top:30px}
    .v2 .field .f2{left:auto;right:0;top:15px;width:22%}
    .v2 .field .f7{left:2%;top:350px;width:18%}
    .v2 .field .q2{left:25%;top:390px}
    .v2 .field .f3{left:52%;top:350px;width:19%}
    .v2 .field .f4{left:auto;right:3%;top:400px;width:22%}
    .v2 .field .f8{left:26%;top:640px;width:17%}
    .v2 .field .q3{left:50%;top:660px}
    .v2 .field .f5{left:2%;top:700px;width:19%}
    .v2 .field .f6{left:auto;right:5%;top:760px;width:23%}
    .v2 .field .q4{left:auto;right:8%;top:1030px}
  }

  .v2 .films{padding:90px 0 110px;max-width:1080px;margin:0 auto}
  .v2 .films .head{padding:0 28px 46px;display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px 18px}
  .v2 .film-a{position:relative;width:92%;aspect-ratio:16/9;background:url("/shwcase-still-05.jpg") center/cover;border-radius:2px;overflow:hidden}
  .v2 .film-a .veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(24,16,11,.66),rgba(24,16,11,0) 55%)}
  .v2 .film-a .cap{position:absolute;left:22px;bottom:18px;right:22px;max-width:62%;color:var(--cream-soft)}
  .v2 .film-a .cap .t{font-style:italic;font-size:clamp(21px,4.4vw,32px);line-height:1.15}
  .v2 .film-a .cap .m{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;opacity:.7;margin-top:6px}
  .v2 .film-a .no{position:absolute;top:16px;left:22px;font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.2em;color:rgba(250,246,236,.8);text-transform:uppercase}
  .v2 .film-b{position:relative;width:58%;margin-left:38%;margin-top:-4%;aspect-ratio:4/3;background:url("/shwcase-still-07.jpg") center/cover;border-radius:2px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(46,33,24,.45)}
  .v2 .film-b .veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(24,16,11,.6),rgba(24,16,11,0) 60%)}
  .v2 .film-b .cap{position:absolute;left:16px;bottom:14px;color:var(--cream-soft)}
  .v2 .film-b .cap .t{font-style:italic;font-size:19px}
  .v2 .film-b .cap .m{font-family:"IBM Plex Mono",monospace;font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.7;margin-top:4px}
  @media (min-width:761px){.v2 .film-a{width:78%}.v2 .film-b{width:34%;margin-left:60%;margin-top:-6%}}

  .v2 .quiet-motion{max-width:680px;margin:90px auto 0;padding:0 28px}
  .v2 .quiet-motion video{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:2px}
  .v2 .quiet-motion figcaption{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin-top:10px;line-height:1.8}
  @media(prefers-reduced-motion:reduce){.v2 .quiet-motion video{display:none}.v2 .quiet-motion{aspect-ratio:16/9;background:url("/shwcase-still-01.jpg") center/cover}.v2 .quiet-motion figcaption{display:none}}
  .v2 .shop{background:#2E2118;color:#FAF6EC;padding:120px 28px;margin-top:50px}
  .v2 .shop .inner{max-width:1080px;margin:0 auto}
  .v2 .shop .mono-label{color:#B4895E;display:block;margin-bottom:34px}
  .v2 .shop .big{font-size:clamp(46px,11vw,104px);line-height:.98;font-weight:300}
  .v2 .shop .big em{font-style:italic}
  .v2 .shop-teaser{margin:44px 0 0;max-width:780px}
  .v2 .shop-teaser img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:2px}
  .v2 .shop-teaser figcaption{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(250,246,236,.62);margin-top:10px;line-height:1.8}
  .v2 .shop .row2{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-top:44px}
  .v2 .shop .d{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(250,246,236,.62);line-height:2.1;max-width:300px}
  .v2 .btn-light{display:inline-block;background:#FAF6EC;color:#2E2118;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;padding:13px 24px;border-radius:999px}

  .v2 footer{padding:100px 28px 70px;max-width:1080px;margin:0 auto}
  .v2 footer .mark{font-size:clamp(40px,9vw,84px);font-style:italic;font-weight:300;line-height:1}
  .v2 footer .under{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;border-top:1px solid var(--hairline);margin-top:40px;padding-top:18px}
  .v2 footer .under .mono-label{color:var(--ink-soft)}
  .v2 footer .socials{display:flex;gap:18px}
  .v2 footer .socials a{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--mocha);text-decoration:none}
`

export default function Home() {
  return (
    <main className="v2">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{CSS}</style>
      <TimeTheme />

      <div className="grain"></div>

      <header className="hero">
        <video className="hero-media" autoPlay muted loop playsInline poster="/shwcase-pier-poster.jpg" aria-hidden="true">
          <source src="/shwcase-pier.mp4" type="video/mp4" />
        </video>
        <nav>
          <a className="wordmark" href="/">
            shwcase<sup>®</sup>
          </a>
          <div className="links">
            <a href="#questions">questions</a>
            <a href="#films">films</a>
            <Link href="/ask">ask</Link>
            <a href="#shop" className="soon">
              shop
            </a>
          </div>
        </nav>

        <div className="hero-type">
          <h1 className="q">
            <span className="l1">
              <em>where do</em>
            </span>
            <span className="l2">you go</span>
            <span className="l3">
              <em>when you</em>
            </span>
            <span className="l4">need to think?</span>
          </h1>
        </div>

        <div>
          <div className="hero-cta">
            <Link className="btn-dark" href="/ask">
              answer a question
            </Link>
            <span className="micro">four open · a minute each</span>
          </div>
          <div className="hero-bottom">
            <div className="now-card">
              <span className="mono-label">now asking</span>
              <div className="t">four questions, all open at once. answer whichever one is yours.</div>
              <div className="m">n°1–4 · answers open</div>
            </div>
            <div className="coords">
              from the archive
              <br />
              last light by the water
              <br />
              <span id="time-note">viewing in daylight</span>
            </div>
          </div>
        </div>
      </header>

      <section className="statement">
        <span className="mono-label">shwcase is</span>
        <p>
          calm, quiet <em>footage</em> <span className="inline-img"></span> from the places people
          send me. a few questions, open all at once, each one <em>answered</em> the way it felt.
        </p>
        <div className="sig">
          <span className="mono-label">recollections from around the world</span>
          <span className="mono-label">los angeles, ca</span>
        </div>
      </section>

      <section className="how">
        <div className="head">
          <span className="mono-label">how it works</span>
          <span className="mono-label">03 steps</span>
        </div>
        <div className="row">
          <span className="n">01</span>
          <span className="t">
            pick the question <em>that's yours.</em>
          </span>
          <span className="d">four open · no right answer</span>
        </div>
        <div className="row">
          <span className="n">02</span>
          <span className="t">
            answer it with <em>a place.</em>
          </span>
          <span className="d">online in a minute · or 20 seconds of footage</span>
        </div>
        <div className="row">
          <span className="n">03</span>
          <span className="t">
            it joins the archive <em>with your name on it.</em>
          </span>
          <span className="d">full credit · your own page</span>
        </div>
      </section>

      <section className="questions" id="questions">
        <div className="head">
          <span className="mono-label">the questions</span>
          <span className="mono-label">all open · answered in images</span>
        </div>
        <div className="field">
          <div className="qentry q1">
            <span className="qn">n°1 · open</span>
            <span className="qq">where do you go when you need to think?</span>
            <span className="qm">answered in images · yours could be here</span>
            <Link className="qa" href="/ask?src=q1">
              answer n°1
            </Link>
          </div>
          <div className="fig f1">
            <img src="/q-think-water.jpg" alt="sitting on the rocks, watching the sun path over the ocean" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
          <div className="fig f7">
            <img src="/q-think-trail.jpg" alt="boots on a quiet trail" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
          <div className="qentry q2">
            <span className="qn">n°2 · open</span>
            <span className="qq">where were you the last time you felt completely calm?</span>
            <span className="qm">answered in images · yours could be here</span>
            <Link className="qa" href="/ask?src=q2">
              answer n°2
            </Link>
          </div>
          <div className="fig f3">
            <img src="/q-calm-blossom.jpg" alt="a camellia in spring" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
          <div className="fig f8">
            <img src="/q-calm-canopy.jpg" alt="blossom canopy against the sky" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
          <div className="qentry q3">
            <span className="qn">n°3 · open</span>
            <span className="qq">what does home sound like?</span>
            <span className="qm">answered in images · yours could be here</span>
            <Link className="qa" href="/ask?src=q3">
              answer n°3
            </Link>
          </div>
          <div className="fig f4">
            <img src="/q-home-vinyl.jpg" alt="a record playing at home" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
          <div className="fig f5">
            <img src="/q-home-candle.jpg" alt="a candle burning in the dark" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
          <div className="qentry q4">
            <span className="qn">n°4 · open</span>
            <span className="qq">when did you last stop to watch the light change?</span>
            <span className="qm">answered in images · yours could be here</span>
            <Link className="qa" href="/ask?src=q4">
              answer n°4
            </Link>
          </div>
          <div className="fig f2">
            <img src="/q-light-rooftop.jpg" alt="rooftop sunset over the city" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
          <div className="fig f6">
            <img src="/q-light-watch.jpg" alt="watching the light change from the rooftop" />
            <span className="cap">answered by josh · los angeles</span>
          </div>
        </div>
      </section>

      <section className="films" id="films">
        <div className="head">
          <span className="mono-label">films</span>
          <span className="mono-label">3–8 min · natural sound · barely cut</span>
        </div>
        <div className="film-a">
          <div className="veil"></div>
          <span className="no">film n°1 · in production</span>
          <div className="cap">
            <div className="t">where do you go when you need to think</div>
            <div className="m">a moment at dusk · selected still</div>
          </div>
        </div>
        <div className="film-b">
          <div className="veil"></div>
          <div className="cap">
            <div className="t">a walk at last light</div>
            <div className="m">from the archive · selected still</div>
          </div>
        </div>
      </section>

      <figure className="quiet-motion">
        <video autoPlay muted loop playsInline preload="metadata" poster="/shwcase-still-01.jpg" aria-label="Coastal dusk, a quiet silent loop">
          <source src="/shwcase-coastal-dusk-loop.mp4" type="video/mp4" />
        </video>
        <figcaption>coastal dusk · a quiet loop · no sound</figcaption>
      </figure>

      <section className="shop" id="shop">
        <div className="inner">
          <span className="mono-label">the shop · opens with pack n°1</span>
          <div className="big">
            a little
            <br />
            <em>stillness.</em>
          </div>
          <figure className="shop-teaser">
            <img src="/shwcase-still-11.jpg" alt="Hazy golden light over the ocean" loading="lazy" />
            <figcaption>an editorial glimpse · not a preview of pack contents</figcaption>
          </figure>
          <div className="row2">
            <div className="d">
              a collection of calm, coming soon · details and licensing to follow
            </div>
            <a className="btn-light" href="https://tally.so/r/OQXD58" target="_blank" rel="noopener noreferrer">
              notify me
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="mark">shwcase</div>
        <div className="under">
          <span className="mono-label">recollections from around the world</span>
          <div className="socials">
            <a href="https://instagram.com">instagram</a>
            <a href="https://tiktok.com">tiktok</a>
            <a href="https://youtube.com">youtube</a>
          </div>
          <span className="mono-label">made quietly in los angeles</span>
        </div>
      </footer>
    </main>
  )
}
