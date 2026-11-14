import { useEffect, useRef, useState } from 'react';
import { story } from '../data/story';
import { siteConfig } from '../config/site';

export default function StoryDialog({ t, language, mode, onFinish }) {
  const [elapsed, setElapsed] = useState(0);
  const dialogRef = useRef(null);
  const skipRef = useRef(null);
  const duration = Math.max(1, siteConfig.storyDurationSeconds) * 1000;
  const scenes = story[language];
  const sceneDuration = duration / scenes.length;
  const index = Math.min(scenes.length - 1, Math.floor(elapsed / sceneDuration));
  const scene = scenes[index];

  useEffect(() => {
    const previousFocus = document.activeElement;
    document.body.classList.add('locked');
    skipRef.current.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onFinish(); }
      if (event.key !== 'Tab') return;
      const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled), a[href]')];
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('locked');
      document.removeEventListener('keydown', handleKey);
      if (previousFocus?.isConnected) previousFocus.focus();
      else document.querySelector('[role="tab"][aria-selected="true"]')?.focus();
    };
  }, [onFinish]);

  useEffect(() => {
    let previousTime = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = Math.min(350, now - previousTime);
      previousTime = now;
      if (!document.hidden) setElapsed((value) => Math.min(duration, value + delta));
    }, 100);
    return () => clearInterval(timer);
  }, [duration]);

  useEffect(() => {
    if (elapsed >= duration) onFinish();
  }, [elapsed, duration, onFinish]);

  function nextScene() {
    if (index === scenes.length - 1) onFinish();
    else setElapsed((index + 1) * sceneDuration);
  }

  return <div className="modal" role="dialog" aria-modal="true" aria-labelledby="loreHeading" aria-describedby="loreText" ref={dialogRef}>
    <div className="lore-window">
      <div className="lore-header"><b>{t.loreHeader}</b><span>{t.loreDuration}</span></div>
      <div className="lore-scene">
        <div className="lore-comic"><span className="comic-tag">{scene.tag}</span><img key={index} src={`${import.meta.env.BASE_URL}${siteConfig.storyImages[index]}`} alt={scene.title} /></div>
        <div className="lore-copy" aria-live="polite" aria-atomic="true"><div className="eyebrow">{t.sceneLabel} {index + 1} / {scenes.length}</div><h2 id="loreHeading">{scene.title}</h2><p id="loreText">{scene.text}</p><div className="lore-quote">{scene.quote}</div></div>
      </div>
      <div className="lore-footer"><span className="lore-counter">0{index + 1} / 0{scenes.length}</span><div className="lore-progress" role="progressbar" aria-label={t.storyProgressLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(elapsed / duration * 100)}><div style={{ width: `${elapsed / duration * 100}%` }} /></div><div className="lore-buttons"><button className="btn btn-ghost" type="button" onClick={nextScene}>{t.nextScene}</button><button className="btn btn-green" ref={skipRef} type="button" onClick={onFinish}>{mode === 'start' ? t.skipStart : t.skipClose}</button></div></div>
      <div className="lore-caption">{t.loreDisclaimer}</div>
    </div>
  </div>;
}
