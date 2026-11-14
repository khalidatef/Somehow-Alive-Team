export const WEATHER_CACHE_KEY = 'somehow-alive-donki-v1';
const MAX_CACHE_AGE = 10 * 60 * 1000;
function nasaUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === 'nasa.gov' || url.hostname.endsWith('.nasa.gov'));
  } catch { return false; }
}

export function normalizeFlare(events, now = new Date()) {
  if (!Array.isArray(events)) return null;
  const valid = events.filter((item) => item && typeof item.classType === 'string' && /^[ABCMX]\d+(\.\d+)?$/.test(item.classType) && typeof (item.peakTime || item.beginTime) === 'string' && Number.isFinite(Date.parse(item.peakTime || item.beginTime)));
  const latest = valid.sort((a, b) => Date.parse(b.peakTime || b.beginTime) - Date.parse(a.peakTime || a.beginTime))[0];
  if (!latest) return null;
  const url = latest.link;
  return { kind: 'Solar flare', classification: latest.classType, occurredAt: latest.peakTime || latest.beginTime, sourceUrl: nasaUrl(url) ? url : 'https://ccmc.gsfc.nasa.gov/tools/DONKI/', fetchedAt: now.toISOString(), source: 'NASA DONKI' };
}

export function readCachedWeather(storage) {
  try {
    const cached = JSON.parse(storage.getItem(WEATHER_CACHE_KEY));
    if (cached && typeof cached.classification === 'string' && typeof cached.kind === 'string' && typeof cached.occurredAt === 'string' && Number.isFinite(Date.parse(cached.occurredAt)) && nasaUrl(cached.sourceUrl)) return cached;
  } catch { /* Missing or corrupt cache falls back to the bundled archive. */ }
  return null;
}

export async function getSpaceWeather({ archive, storage, fetcher = fetch, now = new Date(), signal }) {
  const cached = readCachedWeather(storage);
  const cacheAge = now - new Date(cached?.fetchedAt);
  if (cached?.fetchedAt && cacheAge >= 0 && cacheAge < MAX_CACHE_AGE) return { ...cached, status: 'ARCHIVE', note: 'Recently fetched record · saved locally' };
  const start = new Date(now); start.setUTCDate(start.getUTCDate() - 7);
  const query = new URLSearchParams({ startDate: start.toISOString().slice(0, 10), endDate: now.toISOString().slice(0, 10) });
  try {
    // NASA's September 2026 migration: https://ccmc.gsfc.nasa.gov/tools/DONKI/
    // The public CCMC endpoint supports browser CORS and does not require an API key.
    const response = await fetcher(`https://ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR?${query}`, { signal });
    if (!response.ok) throw new Error('NASA feed unavailable');
    const record = normalizeFlare(await response.json(), now);
    if (!record) throw new Error('No valid flare record in the seven-day window');
    try { storage?.setItem(WEATHER_CACHE_KEY, JSON.stringify(record)); } catch { /* Live data still works without local storage. */ }
    return { ...record, status: 'LIVE', note: 'Latest reported flare in the past seven days' };
  } catch {
    return { ...(cached || archive), status: 'ARCHIVE', note: cached ? 'NASA feed unavailable · last saved record' : 'NASA feed unavailable · sourced historical record' };
  }
}
