import Link from 'next/link'

const CSS = `
  .v2{--cream:#F2EAD9;--cream-soft:#FAF6EC;--espresso:#2E2118;--mocha:#6F5138;--caramel:#B4895E;--ink-soft:rgba(46,33,24,.58);--hairline:rgba(46,33,24,.16)}
  .v2{background:var(--cream);color:var(--espresso);font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;-webkit-font-smoothing:antialiased}
  .v2 *{margin:0;padding:0;box-sizing:border-box}
  .v2 .mono{font-family:"IBM Plex Mono",monospace;font-weight:400}
  .v2 .grain{position:fixed;inset:-50%;z-index:60;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:.055}
  .v2 .mono-label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--mocha)}

  .v2 .hero{position:relative;min-height:100vh;background:url("/shwcase-hero.jpg") center/cover no-repeat;display:flex;flex-direction:column;justify-content:space-between}
  .v2 .hero::before{content:"";position:absolute;inset:0;background:linear-gradient(to bottom, rgba(24,16,11,.42) 0%, rgba(24,16,11,0) 30%, rgba(24,16,11,0) 60%, rgba(24,16,11,.55) 100%)}
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
  .v2 .btn-dark{display:inline-block;background:var(--espresso);color:var(--cream-soft);font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;padding:13px 24px;border-radius:999px}
  .v2 .hero-cta .micro{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.14em;color:rgba(250,246,236,.66);text-transform:uppercase}
  .v2 .hero-bottom{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:flex-end;padding:40px 28px 30px;gap:20px}
  .v2 .now-card{background:rgba(24,16,11,.55);backdrop-filter:blur(6px);border:1px solid rgba(250,246,236,.14);padding:16px 18px;max-width:210px;border-radius:2px}
  .v2 .now-card .mono-label{color:var(--caramel);margin-bottom:8px;display:block}
  .v2 .now-card .t{color:var(--cream-soft);font-style:italic;font-size:19px;line-height:1.25}
  .v2 .now-card .m{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.12em;color:rgba(250,246,236,.6);margin-top:8px;text-transform:uppercase}
  .v2 .coords{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;color:rgba(250,246,236,.62);text-align:right;text-transform:uppercase;line-height:2;white-space:nowrap}
  @media (max-width:560px){.v2 .coords{display:none}}

  .v2 .statement{padding:170px 28px 130px;max-width:1080px;margin:0 auto}
  .v2 .statement .mono-label{display:block;margin-bottom:40px}
  .v2 .statement p{font-size:clamp(30px,6.4vw,58px);line-height:1.18;font-weight:300;max-width:20ch}
  .v2 .statement p em{font-style:italic}
  .v2 .statement p .inline-img{display:inline-block;width:1.9em;height:1.05em;border-radius:2px;background:url("/shwcase-c-sunpath.jpg") center/cover;vertical-align:-0.14em;margin:0 .08em}
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

  .v2 .archive{padding:40px 0 80px;overflow:hidden}
  .v2 .archive .head{max-width:1080px;margin:0 auto;padding:0 28px 60px;display:flex;justify-content:space-between;align-items:baseline;gap:6px 18px;flex-wrap:wrap}
  .v2 .field{position:relative;max-width:1080px;margin:0 auto;height:1080px}
  .v2 .field .fig{position:absolute}
  .v2 .field .fig img{display:block;width:100%}
  .v2 .field .fig .cap{display:block;margin-top:7px;font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);line-height:1.8}
  .v2 .field .qentry{position:absolute}
  .v2 .field .qentry .qn{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.2em;color:var(--caramel);text-transform:uppercase;display:block;margin-bottom:6px}
  .v2 .field .qentry .qq{display:block;font-size:clamp(21px,5.4vw,30px);font-style:italic;font-weight:400;line-height:1.15;max-width:14ch}
  .v2 .field .qentry .qm{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);display:block;margin-top:8px}
  .v2 .f1{left:0;top:0;width:46%}
  .v2 .f2{right:4%;top:60px;width:32%}
  .v2 .q1{left:4%;top:240px}
  .v2 .f3{right:0;top:430px;width:38%}
  .v2 .q2{left:6%;top:580px}
  .v2 .f4{left:34%;top:740px;width:32%}
  .v2 .f5{right:6%;top:790px;width:24%}
  .v2 .q3{left:4%;top:930px}
  @media (min-width:761px){
    .v2 .field{height:840px}
    .v2 .f1{left:0;right:auto;top:0;width:26%}
    .v2 .q1{left:31%;right:auto;top:30px}
    .v2 .f2{left:auto;right:0;top:20px;width:24%}
    .v2 .f3{left:8%;right:auto;top:430px;width:22%}
    .v2 .q2{left:37%;right:auto;top:470px}
    .v2 .f4{left:auto;right:24%;top:470px;width:20%}
    .v2 .q3{left:auto;right:2%;top:430px}
    .v2 .f5{left:66%;right:auto;top:700px;width:16%}
  }

  .v2 .films{padding:90px 0 110px;max-width:1080px;margin:0 auto}
  .v2 .films .head{padding:0 28px 46px;display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px 18px}
  .v2 .film-a{position:relative;width:92%;aspect-ratio:16/9;background:url("/shwcase-hero.jpg") center 30%/cover;border-radius:2px;overflow:hidden}
  .v2 .film-a .veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(24,16,11,.66),rgba(24,16,11,0) 55%)}
  .v2 .film-a .cap{position:absolute;left:22px;bottom:18px;right:22px;max-width:62%;color:var(--cream-soft)}
  .v2 .film-a .cap .t{font-style:italic;font-size:clamp(21px,4.4vw,32px);line-height:1.15}
  .v2 .film-a .cap .m{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;opacity:.7;margin-top:6px}
  .v2 .film-a .no{position:absolute;top:16px;left:22px;font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.2em;color:rgba(250,246,236,.8);text-transform:uppercase}
  .v2 .film-b{position:relative;width:58%;margin-left:38%;margin-top:-4%;aspect-ratio:4/3;background:url("/shwcase-still-dusk.jpg") center/cover;border-radius:2px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(46,33,24,.45)}
  .v2 .film-b .veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(24,16,11,.6),rgba(24,16,11,0) 60%)}
  .v2 .film-b .cap{position:absolute;left:16px;bottom:14px;color:var(--cream-soft)}
  .v2 .film-b .cap .t{font-style:italic;font-size:19px}
  .v2 .film-b .cap .m{font-family:"IBM Plex Mono",monospace;font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.7;margin-top:4px}
  @media (min-width:761px){.v2 .film-a{width:78%}.v2 .film-b{width:34%;margin-left:60%;margin-top:-6%}}

  .v2 .shop{background:var(--espresso);color:var(--cream-soft);padding:120px 28px;margin-top:50px}
  .v2 .shop .inner{max-width:1080px;margin:0 auto}
  .v2 .shop .mono-label{color:var(--caramel);display:block;margin-bottom:34px}
  .v2 .shop .big{font-size:clamp(46px,11vw,104px);line-height:.98;font-weight:300}
  .v2 .shop .big em{font-style:italic}
  .v2 .shop .row2{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-top:44px}
  .v2 .shop .d{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(250,246,236,.62);line-height:2.1;max-width:300px}
  .v2 .btn-light{display:inline-block;background:var(--cream-soft);color:var(--espresso);font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;padding:13px 24px;border-radius:999px}

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

      <div className="grain"></div>

      <header className="hero">
        <nav>
          <a className="wordmark" href="/">
            shwcase<sup>®</sup>
          </a>
          <div className="links">
            <a href="#archive">archive</a>
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
              answer the question
            </Link>
            <span className="micro">one question · a minute</span>
          </div>
          <div className="hero-bottom">
            <div className="now-card">
              <span className="mono-label">now asking</span>
              <div className="t">question n°1, answered by you, filmed by me.</div>
              <div className="m">answers open · filming nov 18</div>
            </div>
            <div className="coords">
              34.104°n · 118.411°w
              <br />
              franklin canyon, dusk
              <br />
              rec · 24 fps
            </div>
          </div>
        </div>
      </header>

      <section className="statement">
        <span className="mono-label">shwcase is</span>
        <p>
          calm, quiet <em>footage</em> <span className="inline-img"></span> from the places people
          send me. one question at a time, answered slowly, <em>filmed</em> the way it felt.
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
            i ask <em>one question.</em>
          </span>
          <span className="d">nothing to prepare · no right answer</span>
        </div>
        <div className="row">
          <span className="n">02</span>
          <span className="t">
            you <em>answer it.</em>
          </span>
          <span className="d">online in a minute · or on a card</span>
        </div>
        <div className="row">
          <span className="n">03</span>
          <span className="t">
            i film <em>the places</em> you send me.
          </span>
          <span className="d">your answer · on screen or in voiceover</span>
        </div>
      </section>

      <section className="archive" id="archive">
        <div className="head">
          <span className="mono-label">the archive</span>
          <span className="mono-label">every question becomes an entry</span>
        </div>
        <div className="field">
          <div className="fig f1">
            <img src="/shwcase-c-ridge.jpg" alt="the reservoir at dusk" />
            <span className="cap">fig. 01 · the reservoir, 16:32</span>
          </div>
          <div className="fig f2">
            <img src="/shwcase-c-reeds2.jpg" alt="reeds by the water" />
            <span className="cap">fig. 02 · reeds, north shore</span>
          </div>
          <div className="qentry q1">
            <span className="qn">n°1 · asking now</span>
            <span className="qq">where do you go when you need to think?</span>
            <span className="qm">answers open · filming november</span>
          </div>
          <div className="fig f3">
            <img src="/shwcase-c-water2.jpg" alt="last light on the water" />
            <span className="cap">fig. 03 · last light on water</span>
          </div>
          <div className="qentry q2">
            <span className="qn">n°2 · next</span>
            <span className="qq">where were you the last time you felt completely calm?</span>
            <span className="qm">opens after film n°1</span>
          </div>
          <div className="fig f4">
            <img src="/shwcase-c-trail2.jpg" alt="trail under the canopy" />
            <span className="cap">fig. 04 · hastain trail</span>
          </div>
          <div className="qentry q3">
            <span className="qn">n°3 · later</span>
            <span className="qq">what does home sound like?</span>
            <span className="qm">collecting ideas</span>
          </div>
          <div className="fig f5">
            <img src="/shwcase-c-dusk2.jpg" alt="dusk sky gradient" />
            <span className="cap">fig. 05 · dusk gradient</span>
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
            <div className="m">franklin canyon · november 2026 · 24 fps</div>
          </div>
        </div>
        <div className="film-b">
          <div className="veil"></div>
          <div className="cap">
            <div className="t">ambient cut · dusk on the water</div>
            <div className="m">long-form · comes with film n°1</div>
          </div>
        </div>
      </section>

      <section className="shop" id="shop">
        <div className="inner">
          <span className="mono-label">the shop · opens with pack n°1</span>
          <div className="big">
            franklin canyon,
            <br />
            <em>dusk.</em>
          </div>
          <div className="row2">
            <div className="d">
              twenty-some calm clips from the first shoot · water, reeds, canopy, dusk sky ·
              personal + commercial licenses · gumroad
            </div>
            {/* notify destination undecided: email capture (planned) vs IG link */}
            <a className="btn-light" href="#shop">
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
