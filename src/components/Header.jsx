import { siteConfig } from '../config/site';

export default function Header({ page, language, setLanguage, t, onNavigate }) {
  const links = [['home', 'navHome'], ['game', 'navGame'], ['resources', 'navResources'], ['educators', 'navEducators']];
  function moveTab(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + (language === 'ar' ? 3 : 1)) % 4;
    if (event.key === 'ArrowLeft') next = (index + (language === 'ar' ? 1 : 3)) % 4;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = 3;
    if (next === undefined) return;
    event.preventDefault();
    onNavigate(links[next][0]);
    document.getElementById(`tab-${links[next][0]}`).focus();
  }
  return <header className="header shell">
    <button className="brand" type="button" onClick={() => onNavigate('home')} aria-label={`${siteConfig.name} — ${t.navHome}`}>
      <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m16 3 12 26-12-8-12 8L16 3Z" stroke="currentColor" strokeWidth="3" fill="var(--lime)" /><path d="M8 18h16" stroke="var(--bg)" strokeWidth="3" /></svg></span>
      <span><b>{siteConfig.name}</b><small>{t.brandSub}</small></span>
    </button>
    <nav className="nav" role="tablist" aria-label={t.navigationLabel}>
      {links.map(([route, label], index) => <button key={route} id={`tab-${route}`} type="button" role="tab" aria-selected={page === route} aria-controls={route} tabIndex={page === route ? 0 : -1} onKeyDown={(event) => moveTab(event, index)} onClick={() => onNavigate(route)}><span className="index">0{index + 1}</span> {t[label]}</button>)}
    </nav>
    <div className="top-actions"><span className="header-tag">{t.conceptTag}</span><button type="button" className="lang-switch" lang={language === 'en' ? 'ar' : 'en'} onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>{language === 'en' ? 'عربي' : 'English'}</button></div>
  </header>;
}
