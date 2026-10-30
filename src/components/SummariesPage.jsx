import { modules, summaries } from '../data/course-content.js';
import { questions } from '../data/questions.js';
import { CitationList, Icon, PageIntro } from './ui.jsx';

export default function SummariesPage({ selectedModule, setSelectedModule, search, setSearch, openSummary, setOpenSummary, onPractice }) {
  const filtered = summaries.filter((item) => {
    const moduleMatch = selectedModule === 'all' || item.moduleId === selectedModule;
    const needle = search.trim().toLowerCase();
    const searchMatch = !needle || `${item.title} ${item.summary} ${item.sources.map((source) => source.section).join(' ')}`.toLowerCase().includes(needle);
    return moduleMatch && searchMatch;
  });
  return <div className="page-view">
    <PageIntro eyebrow="COURSE NOTES" title="Summaries, by topic." description="Short, source-faithful refreshers for the ideas you’ll meet in practice. Open any topic to revisit its key points and page references." />
    <div className="summary-toolbar">
      <label className="search-field" htmlFor="summary-search"><Icon name="search" size={18} /><input id="summary-search" type="search" placeholder="Find a concept or section…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      <div className="module-filter" role="group" aria-label="Filter summaries by lecture">
        <button className={selectedModule === 'all' ? 'selected' : ''} onClick={() => setSelectedModule('all')}>All lectures</button>
        {modules.map((module) => <button className={selectedModule === module.id ? 'selected' : ''} key={module.id} onClick={() => setSelectedModule(module.id)}>L{Number(module.number)} <span>{module.shortTitle}</span></button>)}
      </div>
    </div>
    <div className="summary-count-row"><span>{filtered.length} topic summaries</span><span>Source references use physical PDF page numbers</span></div>
    <div className="summary-grid">
      {filtered.map((item) => {
        const module = modules.find((candidate) => candidate.id === item.moduleId);
        const count = questions.filter((question) => question.topic === item.id).length;
        const expanded = openSummary === item.id;
        return <article className={`summary-card ${expanded ? 'expanded' : ''}`} key={item.id}>
          <button className="summary-card-head" aria-expanded={expanded} aria-controls={`summary-${item.id}`} onClick={() => setOpenSummary(expanded ? '' : item.id)}>
            <div className="summary-card-meta"><span className="module-chip">LECTURE {module.number}</span><span>{count} practice questions</span></div>
            <div className="summary-title-row"><h2>{item.title}</h2><span className={`expand-mark ${expanded ? 'open' : ''}`}>+</span></div>
            <p className="summary-preview">{item.summary.slice(0, 155)}{item.summary.length > 155 ? '…' : ''}</p>
          </button>
          {expanded && <div className="summary-body" id={`summary-${item.id}`}>
            <p>{item.summary}</p>
            <div className="summary-source-title"><Icon name="file" size={15} /> REFERENCED IN</div>
            <CitationList sources={item.sources} compact />
            <button className="button button-outline button-small" onClick={() => onPractice(item.id)}>Practice this topic <Icon name="arrow" size={15} /></button>
          </div>}
        </article>;
      })}
      {!filtered.length && <div className="empty-state"><Icon name="search" size={22} /><h3>No topics found</h3><p>Try another term or choose a different lecture.</p><button className="text-link" onClick={() => { setSearch(''); setSelectedModule('all'); }}>Clear filters</button></div>}
    </div>
  </div>;
}
