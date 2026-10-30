import { summaries } from '../data/course-content.js';
import { questions, questionsById } from '../data/questions.js';
import { latestMissedIds, topicAttempts } from '../lib/progress.js';
import { formatDate, Icon, PageIntro, ProgressBar } from './ui.jsx';

export default function ProgressPage({ progress, answeredCount, accuracy, missedIds, onReviewMissed, onRetryTopic, onReset, storageAvailable }) {
  const topicRows = summaries.map((summary) => {
    const bankCount = questions.filter((question) => question.topic === summary.id).length;
    const attempts = topicAttempts(progress, summary.id);
    const correct = attempts.filter((attempt) => attempt.correct).length;
    const rate = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
    const lastMisses = latestMissedIds(progress).filter((id) => questionsById[id]?.topic === summary.id);
    return { summary, bankCount, attempts, rate, lastMisses };
  });
  const hasData = progress.attempts.length || progress.sessions.length;
  return <div className="page-view progress-view">
    <PageIntro eyebrow="YOUR STUDY RECORD" title="Progress that stays yours." description="Attempts, missed questions, and completed quizzes are saved in this browser. No account needed." action={<span className={`storage-badge ${storageAvailable ? '' : 'warning'}`}><span className="status-dot" />{storageAvailable ? 'Saved locally' : 'Browser storage unavailable'}</span>} />
    <div className="progress-overview">
      <div className="progress-overview-main"><div className="eyebrow">QUESTION BANK COVERAGE</div><strong>{answeredCount}<span> / {questions.length}</span></strong><p>unique questions answered at least once</p><ProgressBar value={(answeredCount / questions.length) * 100} label="Question bank coverage" /><small>{Math.max(questions.length - answeredCount, 0)} questions left to explore</small></div>
      <div className="progress-overview-stat"><span className="overview-icon"><Icon name="chart" size={18} /></span><div className="eyebrow">ANSWER ACCURACY</div><strong>{progress.attempts.length ? `${accuracy}%` : '—'}</strong><p>{progress.attempts.length ? `${progress.attempts.length} submitted answers` : 'Complete a question to begin'}</p></div>
      <div className="progress-overview-stat"><span className="overview-icon orange-icon"><Icon name="rotate" size={18} /></span><div className="eyebrow">NEEDS ANOTHER PASS</div><strong>{missedIds.length}</strong><p>questions currently marked missed</p><button className="text-link" onClick={onReviewMissed} disabled={!missedIds.length}>Review missed <Icon name="arrow" size={14} /></button></div>
    </div>
    <div className="progress-section-heading"><div><div className="eyebrow muted-eyebrow">TOPIC BY TOPIC</div><h2>Where you’ve been practising</h2></div><button className="button button-ghost button-small danger-text" onClick={onReset}>Reset progress</button></div>
    <div className="topic-progress-list">
      {topicRows.map(({ summary, bankCount, attempts, rate, lastMisses }) => <div className="topic-progress-row" key={summary.id}>
        <div className="topic-progress-title"><span className="topic-progress-marker" /><div><strong>{summary.title}</strong><small>{attempts.length ? `${attempts.length} attempts · ${bankCount} questions in bank` : `${bankCount} questions · not started`}</small></div></div>
        <div className="topic-progress-meter"><ProgressBar value={rate} label={`${summary.title} accuracy`} /><span>{attempts.length ? `${rate}%` : '—'}</span></div>
        <button className="icon-button" aria-label={`Practice ${summary.title}`} onClick={() => onRetryTopic(summary.id)} title={lastMisses.length ? 'Retry missed questions in this topic' : 'No missed questions in this topic'} disabled={!lastMisses.length}><Icon name="rotate" size={16} /></button>
      </div>)}
    </div>
    <section className="history-section"><div className="progress-section-heading"><div><div className="eyebrow muted-eyebrow">QUIZ HISTORY</div><h2>Completed sessions</h2></div><span>{progress.sessions.length} saved</span></div>
      {progress.sessions.length ? <div className="history-list">{progress.sessions.map((entry) => <article className="history-card" key={entry.id}><span className="history-icon"><Icon name={entry.kind === 'quiz' ? 'layers' : 'target'} size={17} /></span><div className="history-main"><strong>{entry.kind === 'quiz' ? 'Quiz' : entry.kind === 'review' ? 'Missed-question review' : 'Practice'} · {entry.topicName}</strong><span>{formatDate(entry.completedAt)} · {entry.total} questions</span></div><strong className="history-score">{entry.score}<small> / {entry.total}</small></strong><span className="history-percent">{Math.round((entry.score / entry.total) * 100)}%</span></article>)}</div> : <div className="history-empty"><Icon name="clock" size={19} /><div><strong>No completed sessions yet</strong><span>Finished quizzes and practice sets will appear here.</span></div></div>}
    </section>
    {!hasData && <div className="progress-start-note"><span><Icon name="spark" size={16} /></span><p>Your record starts when you submit your first answer. Progress stays on this browser until you clear it.</p></div>}
  </div>;
}
