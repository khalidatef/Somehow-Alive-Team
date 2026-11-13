import { useEffect, useRef, useState } from 'react';
import { GAME_URL } from './gameConfig';
import { siteConfig } from '../../config/site';

export default function PlayPage({ t, theme, setTheme, language, setLanguage, playing, onStart, onStop, onSources }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
        if (settingsOpen) { setSettingsOpen(false); settingsButtonRef.current?.focus(); }
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
    document.body.classList.toggle('game-expanded', expanded);
    return () => document.body.classList.remove('game-expanded');
  }, [expanded]);

  useEffect(() => {
    if (!playing || loaded) return;
    const timeout = window.setTimeout(() => setShowHelp(true), 15000);
    return () => window.clearTimeout(timeout);
  }, [playing, loaded]);

  async function toggleFullscreen() {
    if (expanded) { setExpanded(false); return; }
    try {
      if (document.fullscreenElement === frameRef.current) await document.exitFullscreen();
      else await frameRef.current.requestFullscreen();
    } catch { setExpanded(true); }
  }

  async function start() {
    if (!GAME_URL) return;
    if (document.fullscreenElement === frameRef.current) await document.exitFullscreen().catch(() => {});
    setExpanded(false);
    setLoaded(false);
    setShowHelp(false);
    onStart();
  }

  function stop() { setLoaded(false); setShowHelp(false); onStop(); }

  return <section className="page active" id="game" role="tabpanel" aria-labelledby="tab-game"><div className="play-shell shell">
    <div className="play-meta"><div className="play-meta-left"><div className="eyebrow">{t.gameEyebrow}</div><span className="pill"><span className="dot" />{t.prototype}</span></div><div className="game-actions">
      <div className="settings-wrap" ref={settingsRef}><button className="mini-btn" type="button" ref={settingsButtonRef} aria-expanded={settingsOpen} aria-controls="settingsPop" onClick={() => setSettingsOpen(!settingsOpen)}>⚙ {t.settings}</button>
        {settingsOpen && <div className="settings-pop" id="settingsPop"><div className="title">{t.settingTheme}</div><div className="setting-choice">{['dark', 'light'].map((mode) => <button key={mode} type="button" aria-pressed={theme === mode} onClick={() => setTheme(mode)}>{t[mode]}</button>)}</div><div className="title">{t.settingLang}</div><div className="setting-choice">{['en', 'ar'].map((lang) => <button key={lang} type="button" lang={lang} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang === 'en' ? 'ENGLISH' : 'العربية'}</button>)}</div></div>}
      </div><button className="mini-btn" type="button" onClick={toggleFullscreen}>{t.fullscreen}</button>
    </div></div>

    <div className={`game-frame full-game${expanded ? ' is-expanded' : ''}`} ref={frameRef} id="gameFrame" tabIndex={-1} aria-label={t.gamePlayerLabel}>
      <div className="game-world" aria-hidden="true"><div className="world-planet" /><div className="world-ground" /><div className="game-grid" /><img className="station-graphic" src={`${import.meta.env.BASE_URL}assets/station.svg`} alt="" />
        <div className="game-skytext">CAM 07 / BASE PERIMETER<br /><span>SECTOR 04 — LIVE FEED</span></div><div className="game-sky-right"><span>{t.gameReady}</span><b>{t.missionStatus} 01 / 03</b></div>
        <div className="game-bottom"><div className="objective"><span className="step">{t.objectiveReady}</span><h2>{t.objectiveReadyTitle}</h2><p>{t.objectiveReadyDesc}</p></div><div className="game-stats">{[t.labelPower, t.labelOxygen, t.labelComms].map((label) => <div className="stat" key={label}><div className="stat-head"><span>{label}</span><b>—</b></div><div className="stat-track" /></div>)}</div></div>
      </div>
      {!playing ? <div className="game-start"><div className="start-dialog"><div className="emblem" aria-hidden="true">⌁</div><span className="eyebrow">{t.gameKick}</span><h1 className="game-start-title" dangerouslySetInnerHTML={{ __html: t.gameStartTitle }} /><p>{t.gameStartDesc}</p><button className="btn btn-green btn-big" type="button" disabled={!GAME_URL} onClick={start}>{GAME_URL ? t.startGame : t.waitingForBuild}<span className="arr">↗</span></button></div></div> : <div className="game-embed">
        {!loaded && <p className="game-loading" role="status">{t.loadingGame}</p>}
        <iframe src={GAME_URL} title={`${siteConfig.name} — ${siteConfig.subtitle}`} allow="autoplay; gamepad" allowFullScreen onLoad={() => { setLoaded(true); setShowHelp(false); }} />
        {showHelp && <div className="embed-help"><p>{t.embedHelp}</p><a className="mini-btn" href={GAME_URL} target="_blank" rel="noopener noreferrer">{t.openGame} ↗</a></div>}
        <div className="embed-controls"><button className="mini-btn" type="button" onClick={stop}>{t.backToMission}</button><button className="mini-btn" type="button" onClick={() => onSources(0)}>{t.scienceSources}</button><a className="mini-btn" href={GAME_URL} target="_blank" rel="noopener noreferrer">{t.openGame} ↗</a></div>
      </div>}
      {isFullscreen && <button className="mini-btn exit-fullscreen" type="button" onClick={toggleFullscreen}>{t.exitFullscreen}</button>}
    </div>
    <div className="play-disclaimer"><span>{t.gameDisclaimer}</span><span>{t.escHint}</span></div>
    <div className="play-links"><button className="btn" type="button" onClick={() => onSources(0)}>{t.scienceSources} ↗</button>{playing && <span>{t.returnResetsGame}</span>}</div>
  </div></section>;
}
