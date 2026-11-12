export default function Header({ page, language, setLanguage, t }) {
  const links = [['mission', 'navMission'], ['play', 'navPlay'], ['sources', 'navSources'], ['educators', 'navEducators']];

  return <header className="site-header">
    <a className="brand" href="#mission" aria-label="Outpost 07">
      <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="m16 3 12 26-12-8-12 8Z" /><path className="brand-cut" d="M8 18h16" /></svg></span>
      <span><b>OUTPOST <span>07</span></b><small>{t.subtitle}</small></span>
    </a>
    <nav className="site-nav" aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
      {links.map(([route, label], index) => <a key={route} href={`#${route}`} aria-current={page === route ? 'page' : undefined}><span>0{index + 1}</span><b>{t[label]}</b></a>)}
    </nav>
    <div className="header-actions"><span className="concept-tag">{t.concept}</span><button className="language-button" type="button" lang={language === 'en' ? 'ar' : 'en'} onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>{language === 'en' ? 'عربي' : 'English'}</button></div>
  </header>;
}
