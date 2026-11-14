const moods = new Set(['calm', 'happy', 'alert', 'thinking']);

export function OrbiAvatar({ mood = 'calm' }) {
  const expression = moods.has(mood) ? mood : 'calm';
  return <span className="orbi-avatar" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}assets/characters/orbi-${expression}.jpeg`} width="100" height="100" alt="" loading="lazy" /></span>;
}

export default function Orbi({ mood = 'calm', label = 'ORBI / YOUR CO-PILOT', children, className = '' }) {
  return <aside className={`orbi-companion ${className}`} aria-label="A note from ORBI"><OrbiAvatar mood={mood} /><div><span className="orbi-label">{label}</span><p>{children}</p></div></aside>;
}
