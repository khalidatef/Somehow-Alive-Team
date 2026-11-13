export default function EducatorsPage({ t, onNavigate }) {
  return (<section className="page shell active" id="educators" role="tabpanel" aria-labelledby="tab-educators"><div className="subhero"><div className="eyebrow">{t.eduEyebrow}</div>
<h1 className="section-h" dangerouslySetInnerHTML={{ __html: t.eduTitle }}></h1>
<p className="lead">{t.eduDesc}</p>
</div>
<div className="edu-layout"><div className="edu-main"><div className="edu-top"><span className="eyebrow">{t.lessonFormat}</span>
<span className="pill"><span className="dot"></span>
<span>{t.toBeApproved}</span>
</span>
</div>
<h2>{t.eduModuleTitle}</h2>
<p>{t.eduModuleDesc}</p>
<div className="edu-stage"><span className="n">{"01"}</span>
<div><h3>{t.eduBefore}</h3>
<p>{t.eduBeforeDesc}</p>
</div>
</div>
<div className="edu-stage"><span className="n">{"02"}</span>
<div><h3>{t.eduDuring}</h3>
<p>{t.eduDuringDesc}</p>
</div>
</div>
<div className="edu-stage"><span className="n">{"03"}</span>
<div><h3>{t.eduAfter}</h3>
<p>{t.eduAfterDesc}</p>
</div>
</div>
</div>
<aside className="edu-aside"><div className="eyebrow">{t.meetGuide}</div>
<div className="robot-art" aria-label="Concept mascot artwork to be replaced by game character"><svg viewBox="0 0 250 238" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M98 34 90 10m60 24 8-24" stroke="var(--mint)" strokeWidth="8" strokeLinecap="round" /><circle cx="90" cy="9" r="8" fill="var(--lime)" /><circle cx="159" cy="9" r="8" fill="var(--lime)" /><rect x="49" y="45" width="154" height="119" rx="46" fill="var(--surface3)" stroke="var(--lime)" strokeWidth="7" /><rect x="68" y="66" width="117" height="72" rx="29" fill="#11303f" stroke="var(--mint)" strokeWidth="5" /><ellipse cx="106" cy="105" rx="10" ry="15" fill="var(--lime)" /><ellipse cx="149" cy="105" rx="10" ry="15" fill="var(--lime)" /><path d="M113 127q14 14 29 0" stroke="var(--lime)" strokeWidth="4" strokeLinecap="round" /><path d="M69 159v36l-19 25m130-61v36l19 25" stroke="var(--mint)" strokeWidth="14" strokeLinecap="round" /><path d="M92 162v52m74-52v52" stroke="var(--edge)" strokeWidth="19" strokeLinecap="round" /><path d="M90 214h-24m101 0h24" stroke="var(--lime)" strokeWidth="10" strokeLinecap="round" /><path d="M44 95H25m178 0h19" stroke="var(--lime)" strokeWidth="11" strokeLinecap="round" /></svg>
</div>
<div className="bubble">{t.robotBubble}</div>
<h3>{t.eduAsideTitle}</h3>
<p>{t.eduAsideDesc}</p>
<button className="btn btn-green" type="button" onClick={() => onNavigate("resources")}><span>{t.exploreSources}</span>
{" ↗"}</button>
</aside>
</div>
</section>
);
}
