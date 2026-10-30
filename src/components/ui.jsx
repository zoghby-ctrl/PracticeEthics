import { formatSource } from '../data/course-content.js';

export function Icon({ name, size = 18, className = '' }) {
  const paths = {
    home: <><path d="m3.5 10 8.5-7 8.5 7"/><path d="M5.5 9v11h13V9M9 20v-6h6v6"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 11h7"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    chart: <><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M20 6v4h-4"/></>,
    spark: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    file: <><path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"/><path d="M13 3v7h7M8 14h8M8 17h6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    rotate: <><path d="M3 12a9 9 0 0 1 15-6l2 2"/><path d="M20 4v4h-4M21 12a9 9 0 0 1-15 6l-2-2"/><path d="M4 20v-4h4"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></>,
    pin: <><path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/></>,
  };
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.spark}</svg>;
}

export function CitationList({ sources, compact = false }) {
  if (!sources?.length) return null;
  return <div className={`citation-list ${compact ? 'citation-list-compact' : ''}`}>
    {sources.map((source, index) => <div className="citation-item" key={`${source.pdf}-${source.page}-${index}`}>
      <Icon name="file" size={14} /><span>{formatSource(source)}</span>
    </div>)}
  </div>;
}

export function PageFooter() {
  return <footer className="page-footer"><i>Made By Ahmed El-Zoghby</i></footer>;
}

export function SelectField({ label, value, onChange, options, id }) {
  return <label className="field" htmlFor={id}>
    <span className="field-label">{label}</span>
    <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
    </select>
  </label>;
}

export function ProgressBar({ value, label }) {
  return <div className="progress-track" role="progressbar" aria-label={label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(value)}>
    <span style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
  </div>;
}

export function PageIntro({ eyebrow, title, description, action }) {
  return <div className="page-intro"><div><div className="eyebrow muted-eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

export function StatCard({ icon, eyebrow, value, label, accent }) {
  return <div className={`stat-card accent-${accent}`}><div className="stat-card-icon"><Icon name={icon} size={17} /></div><div className="stat-eyebrow">{eyebrow}</div><strong className="stat-value">{value}</strong><span className="stat-label">{label}</span></div>;
}

export function makeShuffled(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

export function formatDate(isoDate) {
  try { return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(isoDate)); }
  catch { return isoDate; }
}
