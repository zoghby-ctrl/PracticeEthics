import { modules } from '../data/course-content.js';
import { questions } from '../data/questions.js';
import { formatDate, Icon, StatCard } from './ui.jsx';

export default function HomePage({ answeredCount, accuracy, progress, onStart, onOpenSummaries, onOpenModule }) {
  const recentSession = progress.sessions[0];
  return <div className="page-view home-view">
    <section className="hero-panel">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> A STUDY SPACE BUILT FROM YOUR LECTURES</div>
        <h1>Understand the <em>why</em><br />behind every answer.</h1>
        <p>Revise ethics in computing through clear summaries, thoughtful practice, and feedback that points back to your course PDFs.</p>
        <div className="hero-actions">
          <button className="button button-light" onClick={onStart}>Start a 10-question practice <Icon name="arrow" size={16} /></button>
          <button className="button button-quiet-light" onClick={onOpenSummaries}>Browse summaries</button>
        </div>
      </div>
      <div className="hero-side" aria-label="Course overview">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="hero-emblem"><Icon name="spark" size={38} /></div>
        <div className="hero-side-note"><span>THE COURSE</span><strong>5 lectures</strong><small>ethics · rights · software · AI</small></div>
        <div className="hero-count"><strong>{questions.length}</strong><span>source-cited<br />questions</span></div>
        <div className="hero-spark hero-spark-one">✳</div><div className="hero-spark hero-spark-two">·</div>
      </div>
    </section>

    <div className="stat-grid">
      <StatCard icon="book" eyebrow="QUESTION BANK" value={`${answeredCount} / ${questions.length}`} label="questions explored" accent="sage" />
      <StatCard icon="chart" eyebrow="YOUR ACCURACY" value={progress.attempts.length ? `${accuracy}%` : '—'} label={progress.attempts.length ? `${progress.attempts.length} submitted answers` : 'Appears after your first answer'} accent="peach" />
      <StatCard icon="layers" eyebrow="LAST SESSION" value={recentSession ? `${recentSession.score}/${recentSession.total}` : 'Ready'} label={recentSession ? `${recentSession.topicName} · ${formatDate(recentSession.completedAt)}` : 'Choose a topic or mix the course'} accent="lavender" />
    </div>

    <div className="section-heading-row">
      <div><div className="eyebrow muted-eyebrow">YOUR COURSE MAP</div><h2>Five lectures. One clear path.</h2></div>
      <button className="inline-link" onClick={onOpenSummaries}>Explore all summaries <Icon name="arrow" size={15} /></button>
    </div>
    <section className="module-grid" aria-label="Course modules">
      {modules.map((module) => {
        const count = questions.filter((question) => question.moduleId === module.id).length;
        return <button className="module-card" key={module.id} onClick={() => onOpenModule(module.id)}>
          <div className="module-card-top"><span className="module-number">{module.number}</span><span className="module-count">{count} questions</span></div>
          <h3>{module.title}</h3><p>{module.description}</p>
          <span className="module-open"><Icon name="arrow" size={15} /></span>
        </button>;
      })}
    </section>
    <div className="home-note"><span className="note-icon"><Icon name="pin" size={17} /></span><p>Every question and topic summary points back to a lecture PDF page, so you can follow the reasoning to its source.</p><span className="note-tag">PDF-GROUNDED</span></div>
    <aside className="semester-promo" aria-label="Semester OS student planner">
      <span className="semester-promo-mark" aria-hidden="true">S</span>
      <div className="semester-promo-copy">
        <span className="semester-promo-kicker">ANOTHER STUDENT PROJECT</span>
        <h3>Semester OS</h3>
        <p>Organize your schedule, manual attendance, notes, assignments, and study progress in one local-first workspace.</p>
        <span className="semester-promo-note">No account or cloud sync · Offline-capable · Your academic data stays in your browser</span>
      </div>
      <a className="button button-outline button-small semester-promo-link" href="https://semester-os-4y6.pages.dev" target="_blank" rel="noopener noreferrer">Try the live beta <Icon name="arrow" size={14} /></a>
    </aside>
  </div>;
}
