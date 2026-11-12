import { useEffect, useState } from 'react';
import Header from './components/Header';
import PlayPage from './pages/play/PlayPage';
import { copy } from './copy';

const pages = ['mission', 'play', 'sources', 'educators'];

function getPage() {
  const hash = window.location.hash.slice(1);
  return pages.includes(hash) ? hash : 'play';
}

function readPreference(key, values, fallback) {
  try {
    const value = localStorage.getItem(key);
    return values.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [page, setPage] = useState(getPage);
  const [language, setLanguage] = useState(() => readPreference('outpost-demo-language', ['en', 'ar'], 'en'));
  const [theme, setTheme] = useState(() => readPreference('outpost-demo-theme', ['dark', 'light'], 'dark'));
  const t = copy[language];

  useEffect(() => {
    const onHashChange = () => { setPage(getPage()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#080e19' : '#eef2ec';
    try {
      localStorage.setItem('outpost-demo-language', language);
      localStorage.setItem('outpost-demo-theme', theme);
    } catch { /* Preferences are optional when storage is unavailable. */ }
  }, [language, theme]);

  useEffect(() => {
    document.title = `OUTPOST 07 — ${copy[language][{ mission: 'navMission', play: 'navPlay', sources: 'navSources', educators: 'navEducators' }[page]]}`;
  }, [page, language]);

  return <div className="site-shell">
    {page === 'play' && <a className="skip-link" href="#player" onClick={(event) => { event.preventDefault(); document.getElementById('player').focus(); }}>{t.skip}</a>}
    <Header page={page} language={language} setLanguage={setLanguage} t={t} />
    <main>{page === 'play' ? <PlayPage t={t} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} /> : <section className="empty-page" aria-label={t[{ mission: 'navMission', sources: 'navSources', educators: 'navEducators' }[page]]} />}</main>
    {page === 'play' && <footer className="site-footer"><strong>OUTPOST 07 <span>/</span> THE LAST SIGNAL</strong><span>{t.footer}</span><span className="footer-orbit" aria-hidden="true">LUNA SECTOR 04 <i /></span></footer>}
  </div>;
}
