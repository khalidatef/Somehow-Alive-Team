import { useEffect, useState } from 'react';
import { getSpaceWeather } from '../services/spaceWeather';

const historicalRecord = { kind: 'Geomagnetic storm', classification: 'G5', occurredAt: '2024-05-10', sourceUrl: 'https://science.nasa.gov/science-research/heliophysics/what-nasa-is-learning-from-the-biggest-geomagnetic-storm-in-20-years/', source: 'NASA historical example' };

export default function SunToday() {
  const [weather, setWeather] = useState({ ...historicalRecord, status: 'ARCHIVE', note: 'Historical record · checking NASA DONKI…' });
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    let active = true;
    async function load() {
      let archive = historicalRecord;
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/donki-archive.json`, { signal: controller.signal });
        if (response.ok) archive = await response.json();
      } catch { /* The embedded historical example remains available offline. */ }
      let storage;
      try { storage = window.localStorage; } catch { /* Private mode may deny storage access. */ }
      const result = await getSpaceWeather({ archive, storage, signal: controller.signal });
      if (active) setWeather(result);
    }
    load();
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, []);
  const date = new Date(weather.occurredAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  return <article className="sun-widget" aria-live="polite">
    <div className="sun-widget-top"><span className="eyebrow">SUN TODAY</span><span className={`data-tag ${weather.status.toLowerCase()}`}><i />{weather.status}</span></div>
    <div className="sun-reading"><span>{weather.classification}</span><div><h3>{weather.kind}</h3><p>{date}{weather.occurredAt.includes('T') ? ' · UTC' : ''}</p></div><span className="sun-glyph" aria-hidden="true">☀</span></div>
    <p className="widget-note">{weather.note}</p><p className="orbi-note">“This is the same database our storm chapter is built on.” <b>— ORBI</b></p>
    <a className="text-link" href={weather.sourceUrl} target="_blank" rel="noopener noreferrer">View the source record ↗</a>
  </article>;
}
