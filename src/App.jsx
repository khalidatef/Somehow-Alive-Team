import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import SpaceBackdrop from './components/SpaceBackdrop';
import StoryDialog from './components/StoryDialog';
import HomePage from './pages/home/HomePage';
import PlayPage from './pages/play/PlayPage';
import SourcesPage from './pages/sources/SourcesPage';
import EducatorsPage from './pages/educators/EducatorsPage';
import TeamPage from './pages/team/TeamPage';
import { content } from './data/content';
import { siteConfig } from './config/site';
import { GAME_URL } from './pages/play/gameConfig';
const pages = ['home', 'game', 'resources', 'educators', 'team'];
const aliases = {
  mission: 'home',
  play: 'game',
  sources: 'resources',
  science: 'resources'
};
function getPage() {
  const hash = location.hash.slice(1).split('?')[0];
  return pages.includes(hash) ? hash : aliases[hash] || 'home';
}
function initialTheme() {
  try {
    const theme = localStorage.getItem('somehow-alive-theme');
    return ['dark', 'light'].includes(theme) ? theme : siteConfig.defaultTheme;
  } catch {
    return siteConfig.defaultTheme;
  }
}
export default function App() {
  const [page, setPage] = useState(getPage);
  const [theme, setTheme] = useState(initialTheme);
  const [storyMode, setStoryMode] = useState(null);
  const [playing, setPlaying] = useState(false);
  const t = content.en;
  const navigate = useCallback(destination => {
    const next = pages.includes(destination) ? destination : 'home';
    setPage(next);
    if (next !== 'game') setPlaying(false);
    location.hash = next;
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);
  useEffect(() => {
    const onHash = () => {
      const next = getPage();
      setPage(next);
      if (next !== 'game') setPlaying(false);
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    try {
      localStorage.setItem('somehow-alive-theme', theme);
    } catch {/* Display preferences are optional. */}
  }, [theme]);
  useEffect(() => {
    document.title = `Somehow Alive — ${{
      home: 'The Mission',
      game: 'Play Sol 1',
      resources: 'The Science',
      educators: 'Educators',
      team: 'Team'
    }[page]}`;
    document.querySelector('meta[name="description"]').content = t.heroLead;
  }, [page, t]);
  function startMission() {
    navigate('game');
    if (!GAME_URL || playing) return;
    setStoryMode('start');
  }
  const finishStory = useCallback(() => {
    if (storyMode === 'start') setPlaying(true);
    setStoryMode(null);
  }, [storyMode]);
  return <><SpaceBackdrop theme={theme} /><div className="site-content" inert={storyMode !== null ? true : undefined}><a className="skip-link" href="#main-content" onClick={event => {
        event.preventDefault();
        document.getElementById('main-content').focus();
      }}>Skip to content</a><Header page={page} onNavigate={navigate} /><main id="main-content" tabIndex={-1}>
    {page === 'home' && <HomePage t={t} onStart={startMission} onPreview={() => setStoryMode('preview')} />}
    {page === 'game' && <PlayPage t={t} theme={theme} setTheme={setTheme} playing={playing} onStart={startMission} onStop={() => setPlaying(false)} onSources={() => navigate('resources')} />}
    {page === 'resources' && <SourcesPage onNavigate={navigate} />}{page === 'educators' && <EducatorsPage onNavigate={navigate} />}{page === 'team' && <TeamPage />}
    {pages.filter(route => route !== page).map(route => <section key={route} id={route} role="tabpanel" aria-labelledby={`tab-${route}`} hidden />)}
  </main><footer className="site-footer shell"><div><strong>Somehow Alive<span>THREE SOLS. ONE ROOKIE.</span></strong><p>{t.footer}</p></div><a href="#team">Team, credits & AI use ↗</a></footer></div>{storyMode !== null && <StoryDialog t={t} language="en" mode={storyMode} onFinish={finishStory} />}</>;
}
