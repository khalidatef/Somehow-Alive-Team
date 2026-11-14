import { siteConfig } from '../config/site';
const links = [['home', 'Mission'], ['game', 'Play'], ['resources', 'Science'], ['educators', 'Educators'], ['team', 'Team']];
export default function Header({
  page,
  onNavigate
}) {
  function move(event, index) {
    const next = event.key === 'ArrowRight' ? (index + 1) % links.length : event.key === 'ArrowLeft' ? (index + links.length - 1) % links.length : event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    onNavigate(links[next][0]);
    document.getElementById(`tab-${links[next][0]}`).focus();
  }
  return <header className="header"><div className="header-inner shell"><button className="brand" type="button" onClick={() => onNavigate('home')} aria-label={`${siteConfig.name} home`}><span className="brand-symbol" aria-hidden="true">✦</span><span><b>Somehow <span>Alive</span></b><small>A LITTLE LOST. STILL LEARNING.</small></span></button>
    <nav className="nav" role="tablist" aria-label="Website sections">{links.map(([route, label], i) => <button key={route} id={`tab-${route}`} role="tab" type="button" aria-selected={page === route} aria-controls={route} tabIndex={page === route ? 0 : -1} onClick={() => onNavigate(route)} onKeyDown={event => move(event, i)}>{label}{route === 'game' && <span className="nav-play-icon" aria-hidden="true">↗</span>}</button>)}</nav>
    <span className="header-tag">SPACE APPS 2026<span>GIZA, EGYPT</span></span>
  </div></header>;
}
