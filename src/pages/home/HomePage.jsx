import { useEffect, useRef } from 'react';

export default function HomePage({ t, onStart, onPreview }) {
  const scrollRef = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const overviewRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const container = scrollRef.current;
      if (!container) return;
      const max = Math.max(1, container.offsetHeight - window.innerHeight);
      const progress = reducedMotion.matches ? 0 : Math.max(0, Math.min(1, (window.scrollY - container.offsetTop) / max));
      const first = Math.max(0, 1 - progress * 2.4);
      const second = Math.max(0, Math.min(1, (progress - .24) * 2.2));
      firstRef.current.style.opacity = first;
      firstRef.current.style.transform = `translateY(${-25 * progress}px) scale(${1 - .24 * progress})`;
      secondRef.current.style.opacity = second;
      secondRef.current.style.transform = `translateY(${26 * (1 - second)}px) scale(${.88 + .12 * second})`;
      firstRef.current.setAttribute('aria-hidden', String(first < .25));
      secondRef.current.setAttribute('aria-hidden', String(second < .25));
      frame = 0;
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
    };
  }, []);

  return (<section className="page active" id="home" role="tabpanel" aria-labelledby="tab-home"><div id="introScroll" className="intro-scroll" ref={scrollRef}><div className="intro-sticky"><div className="hero-art" aria-hidden="true"><span className="art-sticker">{t.artSticker}</span>
<svg viewBox="0 0 900 440" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#8bc4c2" strokeWidth="5" fill="#132e3a"><path d="M66 356V224h161v132M242 357V164l72-40h149l72 40v193M554 358V244l46-34h170v148" /><path d="M310 125V86h155v39M358 84V53m33 30V46m33 37V52" /><path d="M86 244h126M266 188h244M566 261h191" /></g>
<g fill="#9ccbd0" stroke="#c2e3d5" strokeWidth="3"><rect x="100" y="267" width="42" height="37" rx="3" /><rect x="163" y="267" width="42" height="37" rx="3" /><rect x="283" y="204" width="48" height="41" rx="3" /><rect x="356" y="204" width="48" height="41" rx="3" /><rect x="430" y="204" width="48" height="41" rx="3" /><rect x="585" y="281" width="43" height="37" rx="3" /><rect x="653" y="281" width="43" height="37" rx="3" /></g>
<g stroke="#c0dde0" strokeWidth="5"><path d="M46 352V156m-42 0h84M13 134h66m-32 22L10 95m37 61 38-61M810 351V164m-47 0h94m-78-21h64m-34 21-32-49m32 49 34-49" /><path d="M12 361h859" strokeWidth="9" strokeOpacity=".35" /></g>
<g stroke="var(--lime)" strokeWidth="5"><path d="M380 354V288h43v66" /><path d="M376 285h51" /><circle cx="808" cy="99" r="10" fill="var(--lime)" /></g>
<g fill="#f4b46e"><rect x="431" y="285" width="29" height="35" rx="2" /><rect x="710" y="281" width="32" height="37" rx="2" /></g>
<path d="M96 377c170-9 250 18 391 0s257 11 349-3" stroke="#82afa5" strokeWidth="3" strokeDasharray="10 10" /></svg>
</div>
<div className="hero-inner shell"><div className="hero-copy"><div id="heroFirst" className="hero-beat hero-beat-first" ref={firstRef}><div className="eyebrow">{t.heroEyebrow}</div>
<h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t.heroTitle }}></h1>
<p className="lead">{t.heroLead}</p>
</div>
<div id="heroSecond" className="hero-beat hero-beat-second" ref={secondRef}><div className="eyebrow">{t.revealEyebrow}</div>
<h2 className="hero-title" dangerouslySetInnerHTML={{ __html: t.revealTitle }}></h2>
<p className="lead">{t.revealLead}</p>
</div>
<div className="hero-tools"><button className="btn btn-green btn-big" type="button" onClick={onStart}><span>{t.startGame}</span>
<span className="arr">{"↗"}</span>
</button>
<button className="btn" id="whatIsIt" type="button" onClick={() => overviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}><span>{t.findOut}</span>
<span className="arr">{"↓"}</span>
</button>
</div>
<div className="hero-scrollhint"><span className="arrow-circ">{"↓"}</span>
<span>{t.scrollHint}</span>
</div>
</div>
</div>
<div className="strip-marker">{t.artCaption}</div>
</div>
</div>
<div className="shell"><div className="hero-bottom-stripe"></div>
</div>
<div className="intro-bottom shell" id="missionOverview" ref={overviewRef}><div className="eyebrow">{t.overviewEyebrow}</div>
<h2 className="section-h" dangerouslySetInnerHTML={{ __html: t.overviewTitle }}></h2>
<p className="lead">{t.overviewLead}</p>
<div className="threecols"><article className="mission-card"><span className="card-icon">{"☀"}</span>
<span className="num">{"01"}</span>
<h3>{t.cardPowerT}</h3>
<p>{t.cardPowerD}</p>
</article>
<article className="mission-card"><span className="card-icon">{"◎"}</span>
<span className="num">{"02"}</span>
<h3>{t.cardOxygenT}</h3>
<p>{t.cardOxygenD}</p>
</article>
<article className="mission-card"><span className="card-icon">{"⌁"}</span>
<span className="num">{"03"}</span>
<h3>{t.cardCommsT}</h3>
<p>{t.cardCommsD}</p>
</article>
</div>
<div className="promo-strip"><div className="promo-art"><div className="filmframe"><svg viewBox="0 0 430 230" fill="none" aria-hidden="true"><rect width="430" height="230" fill="#1f4250" /><circle cx="322" cy="46" r="100" fill="#4a7b83" /><path d="M0 207 100 170 180 191 290 132 430 194v36H0" fill="#34565e" /><g stroke="#a6d7d0" strokeWidth="5" fill="#19343d"><path d="M96 193v-82h102v82m23 0v-111l51-31h63l32 31v111" /></g>
<path d="M253 192v-64h39v64" fill="var(--lime)" stroke="#2d444a" strokeWidth="4" /><path d="M0 215h430" stroke="var(--lime)" strokeWidth="4" /></svg>
<span className="stamp">{t.incidentStamp}</span>
</div>
</div>
<div className="promo-copy"><span className="eyebrow">{t.promoEyebrow}</span>
<h3 dangerouslySetInnerHTML={{ __html: t.promoTitle }}></h3>
<p>{t.promoText}</p>
<button className="btn" id="previewStory" type="button" onClick={onPreview}><span>{t.watchIntro}</span>
<span className="arr">{"↗"}</span>
</button>
</div>
</div>
<div className="final-cta"><div className="eyebrow">{t.readyLabel}</div>
<h2 className="section-h">{t.readyTitle}</h2>
<p>{t.readyDesc}</p>
<button className="btn btn-green btn-big" type="button" onClick={onStart}><span>{t.startGame}</span>
<span className="arr">{"↗"}</span>
</button>
</div>
</div>
</section>
);
}
