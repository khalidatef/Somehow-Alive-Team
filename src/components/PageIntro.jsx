import Orbi from './Orbi';

export default function PageIntro({ eyebrow, title, children, note, mood = 'calm', className = '' }) {
  return <div className={`subhero ${className}`}><div className="subhero-copy"><p className="eyebrow">{eyebrow}</p><h1 className="section-h">{title}</h1>{children}</div><Orbi mood={mood}>{note}</Orbi></div>;
}
