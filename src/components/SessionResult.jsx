import { questionsById } from '../data/questions.js';
import { Icon } from './ui.jsx';

export default function SessionResult({ session, onRetry, onExit, onProgress }) {
  const result = session.result;
  const percent = Math.round((result.score / result.total) * 100);
  const incorrectIds = result.questionIds.filter((id) => session.answers[id] && !session.answers[id].correct);
  const message = percent === 100 ? 'Excellent work.' : percent >= 70 ? 'A solid round.' : 'A useful place to build from.';
  return <div className="page-view result-view">
    <div className="eyebrow muted-eyebrow">SESSION COMPLETE</div>
    <div className="result-panel">
      <div className="result-score-ring" style={{ "--score": `${percent}%` }} aria-label={`${percent} percent correct`}><div><strong>{percent}%</strong><span>correct</span></div></div>
      <div className="result-copy"><span className="result-kicker">{session.reviewMode ? 'REVIEW SESSION' : session.kind === 'quiz' ? 'QUIZ RESULT' : 'PRACTICE RESULT'}</span><h1>{message}</h1><p>You answered <strong>{result.score} of {result.total}</strong> correctly across {session.topicName.toLowerCase()}.</p><span className="result-saved"><Icon name="check" size={14} /> Session saved to your local history</span></div>
    </div>
    <div className="result-actions">
      <button className="button button-primary" onClick={() => onRetry(incorrectIds)} disabled={!incorrectIds.length}>{incorrectIds.length ? `Retry ${incorrectIds.length} missed` : 'All correct — nice work'} <Icon name="rotate" size={16} /></button>
      <button className="button button-outline" onClick={onExit}>Back to setup</button>
      <button className="inline-link" onClick={onProgress}>View progress <Icon name="arrow" size={15} /></button>
    </div>
    <div className="result-review-card"><div className="result-review-heading"><div><div className="eyebrow muted-eyebrow">KEEP GOING</div><h2>{incorrectIds.length ? 'Revisit the ideas that need another pass.' : 'You cleared this set.'}</h2></div><span>{incorrectIds.length} missed</span></div>
      {incorrectIds.length ? <div className="missed-preview-list">{incorrectIds.slice(0, 4).map((id) => <div key={id}><span className="missed-dot" /><span>{questionsById[id]?.prompt}</span></div>)}{incorrectIds.length > 4 && <small>and {incorrectIds.length - 4} more</small>}</div> : <p className="success-note">Try a new topic or make a mixed quiz from the course map.</p>}
    </div>
  </div>;
}

