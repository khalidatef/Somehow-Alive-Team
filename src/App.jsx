import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import StoryDialog from './components/StoryDialog';
import HomePage from './pages/home/HomePage';
import PlayPage from './pages/play/PlayPage';
import SourcesPage from './pages/sources/SourcesPage';
import EducatorsPage from './pages/educators/EducatorsPage';
import { content } from './data/content';
import { siteConfig } from './config/site';
import { GAME_URL } from './pages/play/gameConfig';

const pages = ['home', 'game', 'resources', 'educators'];
const aliases = { mission: 'home', play: 'game', sources: 'resources' };
function getPage() {
  const hash = window.location.hash.slice(1).split('?')[0];
  return pages.includes(hash) ? hash : aliases[hash] || 'home';
}
function preference(key, values, fallback) {
  try { const value = localStorage.getItem(key); return values.includes(value) ? value : fallback; }
  catch { return fallback; }
}

export default function App() {
  const [page, setPage] = useState(getPage);
  const [language, setLanguage] = useState(() => preference('outpost-demo-language', ['en', 'ar'], siteConfig.defaultLanguage));
  const [theme, setTheme] = useState(() => preference('outpost-demo-theme', ['dark', 'light'], siteConfig.defaultTheme));
  const [resourceStage, setResourceStage] = useState(0);
  const [storyMode, setStoryMode] = useState(null);
  const [playing, setPlaying] = useState(false);
  const t = content[language];

  const navigate = useCallback((destination) => {
    const next = pages.includes(destination) ? destination : 'home';
    setPage(next);
    if (next !== 'game') setPlaying(false);
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = getPage();
      setPage(next);
      if (next !== 'game') setPlaying(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    try {
      localStorage.setItem('outpost-demo-language', language);
      localStorage.setItem('outpost-demo-theme', theme);
    } catch { /* Preferences are optional when local storage is unavailable. */ }
  }, [language, theme]);

  useEffect(() => {
    const titleKey = { home: 'navHome', game: 'navGame', resources: 'navResources', educators: 'navEducators' }[page];
    document.title = `${siteConfig.name} — ${t[titleKey]}`;
    document.querySelector('meta[name="description"]').content = t.heroLead;
  }, [page, t]);

  function startMission() {
    navigate('game');
    if (!GAME_URL || playing) return;
    if (siteConfig.storyDurationSeconds > 0) setStoryMode('start');
    else setPlaying(true);
  }
  const finishStory = useCallback(() => {
    if (storyMode === 'start') setPlaying(true);
    setStoryMode(null);
  }, [storyMode]);
  function sources(stage) { setResourceStage(stage); navigate('resources'); }

  return <>
    <div inert={storyMode !== null ? true : undefined}>
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content').focus(); }}>{t.skipContent}</a>
      <Header page={page} language={language} setLanguage={setLanguage} t={t} onNavigate={navigate} />
      <main id="main-content" tabIndex={-1}>
        {page === 'home' && <HomePage t={t} onStart={startMission} onPreview={() => setStoryMode('preview')} />}
        {page === 'game' && <PlayPage t={t} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} playing={playing} onStart={startMission} onStop={() => setPlaying(false)} onSources={sources} />}
        {page === 'resources' && <SourcesPage t={t} language={language} stage={resourceStage} setStage={setResourceStage} onNavigate={navigate} />}
        {page === 'educators' && <EducatorsPage t={t} onNavigate={navigate} />}
        {pages.filter((route) => route !== page).map((route) => <section key={route} id={route} role="tabpanel" aria-labelledby={`tab-${route}`} hidden />)}
      </main>
      <footer className="site-footer shell"><strong>{siteConfig.name} / {siteConfig.subtitle}</strong><span>{t.footer}</span></footer>
    </div>
    {storyMode !== null && <StoryDialog t={t} language={language} mode={storyMode} onFinish={finishStory} />}
  </>;
}
