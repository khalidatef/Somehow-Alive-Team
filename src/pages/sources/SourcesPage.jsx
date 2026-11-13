import { missions } from '../../data/missions';

export default function SourcesPage({ t, language, stage, setStage, onNavigate }) {
  const stages = missions[language];
  const current = stages[Math.min(stage, stages.length - 1)];
  return <section className="page shell active" id="resources" role="tabpanel" aria-labelledby="tab-resources">
    <div className="subhero"><div className="eyebrow">{t.resourcesEyebrow}</div><h1 className="section-h" dangerouslySetInnerHTML={{ __html: t.resourcesTitle }} /><p className="lead">{t.resourcesDesc}</p></div>
    <div className="resources-layout">
      <div className="resource-nav" role="group" aria-label={t.missionStageLabel}>{stages.map((item, index) => <button type="button" key={item.id} aria-pressed={stage === index} onClick={() => setStage(index)}>{[t.stageOne, t.stageTwo, t.stageThree][index]}</button>)}</div>
      <div className="resources-panel" aria-live="polite" aria-atomic="true">
        <div className="resource-top"><div><span className="eyebrow">{current.kicker}</span><h2>{current.title}</h2><p>{current.desc}</p></div><div className="resource-symbol" aria-hidden="true">{current.icon}</div></div>
        <div className="sources-list">{current.sources.map((source) => <article className="source-card" key={source.url}><div className="origin">{source.org}</div><h3>{source.title}</h3><p>{source.description}</p><a href={source.url} target="_blank" rel="noopener noreferrer">{t.openSource} ↗</a></article>)}</div>
      </div>
      <div className="resource-note"><strong aria-hidden="true">ⓘ</strong><span>{t.resourceNote}</span></div>
      <div className="resource-back"><button className="btn btn-green" type="button" onClick={() => onNavigate('game')}>{t.backToPlay} ↗</button></div>
    </div>
  </section>;
}
