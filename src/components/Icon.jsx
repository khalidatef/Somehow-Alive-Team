const paths = {
  signal: <><path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14M8 8a6 6 0 0 0 0 8M16 8a6 6 0 0 1 0 8" /><circle cx="12" cy="12" r="2" /></>,
  fullscreen: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />,
  settings: <><path d="m9 3-1 3-3 1-2 4 2 2-1 3 3 3 3-1 2 3 4-1 1-3 3-1 1-4-2-2 1-3-3-2-3 1-2-3Z" /><circle cx="11.5" cy="12" r="3" /></>,
  arrow: <path d="M6 18 18 6M6 6h12v12" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  power: <path d="m13 2-9 12h7l-1 8 10-13h-8Z" />,
  oxygen: <><path d="M12 3S5 11 5 15a7 7 0 0 0 14 0c0-4-7-12-7-12Z" /><path d="M8 15a4 4 0 0 0 4 4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
};

export default function Icon({ name, className = '' }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
