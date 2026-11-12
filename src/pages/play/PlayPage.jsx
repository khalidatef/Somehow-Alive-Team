import { useEffect, useRef, useState } from 'react';
import Icon from '../../components/Icon';
import { GAME_URL } from './gameConfig';

export default function PlayPage({ t, theme, setTheme, language, setLanguage }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const frameRef = useRef(null);
  const settingsRef = useRef(null);
  const settingsButtonRef = useRef(null);
  const isFullscreen = nativeFullscreen || expanded;

  useEffect(() => {
    const onFullscreen = () => setNativeFullscreen(document.fullscreenElement === frameRef.current);
    const onPointer = (event) => {
      if (!settingsRef.current?.contains(event.target)) setSettingsOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setExpanded(false);
        if (settingsOpen) {
          setSettingsOpen(false);
          settingsButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [settingsOpen]);

  useEffect(() => {
    document.body.classList.toggle('player-expanded', expanded);
    return () => document.body.classList.remove('player-expanded');
  }, [expanded]);

  useEffect(() => {
    if (!playing || loaded) return;
    const timeout = window.setTimeout(() => setShowHelp(true), 12000);
    return () => window.clearTimeout(timeout);
  }, [playing, loaded]);

  async function toggleFullscreen() {
    if (expanded) { setExpanded(false); return; }
    try {
      if (document.fullscreenElement === frameRef.current) await document.exitFullscreen();
      else await frameRef.current.requestFullscreen();
    } catch {
      setExpanded(true);
    }
  }

  function launch() {
    if (!GAME_URL) return;
    setLoaded(false);
    setShowHelp(false);
    setPlaying(true);
  }

  const systems = [
    { icon: 'power', title: t.powerTitle, text: t.powerText, label: t.power },
    { icon: 'oxygen', title: t.oxygenTitle, text: t.oxygenText, label: t.oxygen },
    { icon: 'signal', title: t.commsTitle, text: t.commsText, label: t.comms },
  ];

  return <section className="play-page" aria-label={t.navPlay}>
    <div className="play-toolbar">
      <div className="play-meta"><p className="eyebrow">{t.eyebrow}</p><span className="pill"><i />{GAME_URL ? t.playtest : t.preview}</span></div>
      <div className="player-actions">
        <div className="settings-wrap" ref={settingsRef}>
          <button className="tool-button" type="button" ref={settingsButtonRef} aria-expanded={settingsOpen} aria-controls="settings-panel" onClick={() => setSettingsOpen(!settingsOpen)}><Icon name="settings" /><span>{t.settings}</span><Icon name="chevron" className={settingsOpen ? 'chevron-open' : ''} /></button>
          {settingsOpen && <div className="settings-panel" id="settings-panel">
            <p>{t.display}</p>
            <div className="settings-options">{['dark', 'light'].map((mode) => <button type="button" key={mode} aria-pressed={theme === mode} onClick={() => setTheme(mode)}>{t[mode]}{theme === mode && <Icon name="check" />}</button>)}</div>
            <p>{t.language}</p>
            <div className="settings-options">{['en', 'ar'].map((lang) => <button type="button" key={lang} lang={lang} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang === 'en' ? 'ENGLISH' : 'العربية'}{language === lang && <Icon name="check" />}</button>)}</div>
          </div>}
        </div>
        <button className="tool-button" type="button" onClick={toggleFullscreen}><Icon name="fullscreen" /><span>{t.fullscreen}</span></button>
      </div>
    </div>

    <section className={`game-frame${expanded ? ' is-expanded' : ''}`} id="player" ref={frameRef} tabIndex={-1} aria-label={language === 'ar' ? 'مساحة لعب Outpost 07' : 'Outpost 07 game player'}>
      <div className="game-world" aria-hidden="true"><div className="world-stars" /><div className="world-planet" /><div className="world-orbit" /><div className="world-terrain terrain-far" /><div className="world-terrain" /><div className="world-grid" /><img className="world-station" src={`${import.meta.env.BASE_URL}assets/station.svg`} alt="" /><div className="world-vignette" /></div>
      {!playing ? <div className="player-preview">
        <div className="camera-label"><span><i className="status-dot" />{t.camera}</span><small>{t.sector}</small></div>
        <div className="connection-label"><span><i className="status-dot" />{GAME_URL ? t.connected : t.pending}</span><small>{t.standby}</small></div>
        <div className="welcome">
          <span className="welcome-emblem" aria-hidden="true"><Icon name="signal" /></span>
          <p className="eyebrow">{t.commander}</p>
          <h1>{t.title}<br /><em>{t.titleAccent}</em></h1>
          <p className="welcome-description">{t.description}</p>
          <button className="launch-button" type="button" disabled={!GAME_URL} onClick={launch}>{GAME_URL ? t.launch : t.waiting}{GAME_URL ? <Icon name="arrow" /> : <span className="waiting-dots" aria-hidden="true"><i /><i /><i /></span>}</button>
          <p className="welcome-note">{GAME_URL ? t.ready : t.note}</p>
        </div>
        <div className="module-tags" aria-hidden="true">{systems.map((system) => <span key={system.icon}><Icon name={system.icon} />{system.label}</span>)}</div>
        <div className="player-bottom"><span><i className="status-dot" />OUTPOST 07 <b>/</b> THE LAST SIGNAL</span><span className="coordinates">28.4° N <b>·</b> 16.6° W <span aria-hidden="true">⌖</span></span></div>
      </div> : <div className="game-embed">
        {!loaded && <p className="game-loading" role="status">{t.loading}</p>}
        <iframe src={GAME_URL} title="Outpost 07 — The Last Signal" allow="autoplay; fullscreen; gamepad" allowFullScreen onLoad={() => { setLoaded(true); setShowHelp(false); }} />
        {showHelp && <div className="embed-help"><p>{t.embedHelp}</p><a className="tool-button" href={GAME_URL} target="_blank" rel="noopener noreferrer">{t.openGame}<Icon name="arrow" /></a></div>}
        <div className="embed-controls"><button className="tool-button" type="button" onClick={() => { setPlaying(false); setLoaded(false); setShowHelp(false); }}>{t.back}</button><a className="tool-button" href={GAME_URL} target="_blank" rel="noopener noreferrer">{t.openGame}<Icon name="arrow" /></a></div>
      </div>}
      {isFullscreen && <button className="tool-button exit-fullscreen" type="button" onClick={toggleFullscreen}><Icon name="close" />{t.exitFullscreen}</button>}
      <i className="frame-corner corner-tl" aria-hidden="true" /><i className="frame-corner corner-tr" aria-hidden="true" /><i className="frame-corner corner-bl" aria-hidden="true" /><i className="frame-corner corner-br" aria-hidden="true" />
    </section>
    <div className="player-caption"><span><i className="status-dot" />{playing ? t.gameCaption : GAME_URL ? t.readyCaption : t.caption}</span><span><Icon name="fullscreen" />{t.fullscreenHint}</span></div>
    {expanded && <p className="feedback" role="status">{t.expanded}</p>}

    <section className="mission-brief" aria-labelledby="brief-title">
      <div className="brief-heading"><div><p className="eyebrow">{t.briefing}</p><h2 id="brief-title">{t.briefTitle}</h2><p>{t.briefText}</p></div><span className="systems-count">{t.systems}</span></div>
      <div className="system-cards">{systems.map((system, index) => <article className="system-card" key={system.icon}><span className="system-icon"><Icon name={system.icon} /></span><span className="system-number">/0{index + 1}</span><h3>{system.title}</h3><p>{system.text}</p></article>)}</div>
    </section>
  </section>;
}
