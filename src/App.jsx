import { useState } from 'react';
import { formatSource, modules, summaries } from './data/course-content.js';
import { questions, questionsById } from './data/questions.js';
import { accuracyPercent, emptyProgress, latestMissedIds, loadProgress, recordAttempt, recordSession, resetProgress, saveProgress, uniqueAnsweredCount } from './lib/progress.js';
import HomePage from './components/HomePage.jsx';
import SummariesPage from './components/SummariesPage.jsx';
import SessionSetup from './components/SessionSetup.jsx';
import SessionView from './components/SessionView.jsx';
import SessionResult from './components/SessionResult.jsx';
import ProgressPage from './components/ProgressPage.jsx';
import TutorPage from './components/TutorPage.jsx';
import { Icon, PageFooter, makeShuffled } from './components/ui.jsx';

const navItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'summaries', label: 'Summaries', icon: 'book' },
  { id: 'practice', label: 'Practice', icon: 'target' },
  { id: 'quizzes', label: 'Quizzes', icon: 'layers' },
  { id: 'progress', label: 'Progress', icon: 'chart' },
  { id: 'tutor', label: 'AI Tutor', icon: 'spark' },
];
const titleByPage = Object.fromEntries(navItems.map((item) => [item.id, item.label]));

function pickQuestions({ topicId, difficulty, count, shuffleQuestions, shuffleChoices, questionIds }) {
  let pool = questionIds
    ? questionIds.map((id) => questionsById[id]).filter(Boolean)
    : questions.filter((question) => (topicId === 'all' || question.topic === topicId) && (difficulty === 'all' || question.difficulty === difficulty));
  if (shuffleQuestions) pool = makeShuffled(pool);
  pool = pool.slice(0, Math.max(1, Math.min(Number(count) || pool.length, pool.length)));
  return pool.map((question) => ({
    questionId: question.id,
    choiceOrder: shuffleChoices ? makeShuffled(question.choices.map((choice) => choice.id)) : question.choices.map((choice) => choice.id),
  }));
}

export default function App() {
  const [initialProgress] = useState(() => loadProgress());
  const [page, setPage] = useState('home');
  const [progress, setProgress] = useState(initialProgress.progress);
  const [storageAvailable, setStorageAvailable] = useState(initialProgress.persistent);
  const [selectedModule, setSelectedModule] = useState('all');
  const [openSummary, setOpenSummary] = useState('ethics-foundations');
  const [summarySearch, setSummarySearch] = useState('');
  const [setupTopic, setSetupTopic] = useState('all');
  const [setupDifficulty, setSetupDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState('10');
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleChoices, setShuffleChoices] = useState(true);
  const [session, setSession] = useState(null);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', content: 'Ask me to unpack a course idea, connect it to a case, or point you to the lecture pages. I’ll stay grounded in the five PDFs.' }]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMode, setChatMode] = useState('ready');
  const [chatError, setChatError] = useState('');

  const answeredCount = uniqueAnsweredCount(progress);
  const accuracy = accuracyPercent(progress);
  const missedIds = latestMissedIds(progress);
  const commitProgress = (updater) => setProgress((current) => {
    const next = updater(current);
    setStorageAvailable(saveProgress(next));
    return next;
  });

  const startSession = ({ kind = 'practice', topicId = setupTopic, difficulty = setupDifficulty, count = questionCount, questionIds = null } = {}) => {
    const items = pickQuestions({
      topicId,
      difficulty: questionIds ? 'all' : difficulty,
      count: questionIds ? questionIds.length : count,
      shuffleQuestions: questionIds ? false : shuffleQuestions,
      shuffleChoices,
      questionIds,
    });
    if (!items.length) return;
    const topicName = topicId === 'all' ? 'Across the course' : (summaries.find((item) => item.id === topicId)?.title || 'Topic review');
    setSession({ kind, topicId, topicName, items, index: 0, selectedChoiceId: null, answers: {}, startedAt: new Date().toISOString(), completed: false, reviewMode: Boolean(questionIds) });
    setPage(kind === 'quiz' ? 'quizzes' : 'practice');
  };

  const submitCurrentAnswer = () => {
    if (!session || session.completed || !session.selectedChoiceId) return;
    const item = session.items[session.index];
    const question = questionsById[item.questionId];
    if (session.answers[question.id]) return;
    const correct = session.selectedChoiceId === question.correctChoiceId;
    const at = new Date().toISOString();
    const answer = { selectedChoiceId: session.selectedChoiceId, correct, at };
    commitProgress((current) => recordAttempt(current, { questionId: question.id, topicId: question.topic, selectedChoiceId: session.selectedChoiceId, correct, at }));
    setSession((current) => ({ ...current, answers: { ...current.answers, [question.id]: answer } }));
  };

  const continueSession = () => {
    if (!session) return;
    if (session.index < session.items.length - 1) {
      setSession((current) => ({ ...current, index: current.index + 1, selectedChoiceId: null }));
      return;
    }
    const score = Object.values(session.answers).filter((answer) => answer.correct).length;
    const record = {
      id: `session-${Date.now()}`,
      kind: session.reviewMode ? 'review' : session.kind,
      topicId: session.topicId,
      topicName: session.topicName,
      score,
      total: session.items.length,
      questionIds: session.items.map((item) => item.questionId),
      completedAt: new Date().toISOString(),
    };
    commitProgress((current) => recordSession(current, record));
    setSession((current) => ({ ...current, completed: true, result: record }));
  };

  const reviewQuestions = (ids, topicId = 'all') => startSession({ kind: 'practice', topicId, difficulty: 'all', questionIds: ids });
  const clearProgress = () => {
    if (!window.confirm('Reset all locally saved progress and quiz history on this device?')) return;
    const cleared = resetProgress();
    setProgress(emptyProgress());
    setStorageAvailable(cleared);
    setSession(null);
  };
  const goToProgress = () => { setSession(null); setPage('progress'); };

  const renderSession = (kind) => {
    const relevant = session?.kind === kind;
    if (!relevant) return <SessionSetup
      pageType={kind} topic={setupTopic} setTopic={setSetupTopic} difficulty={setupDifficulty} setDifficulty={setSetupDifficulty}
      count={questionCount} setCount={setQuestionCount} shuffleQuestions={shuffleQuestions} setShuffleQuestions={setShuffleQuestions}
      shuffleChoices={shuffleChoices} setShuffleChoices={setShuffleChoices} onStart={() => startSession({ kind })}
      missedCount={kind === 'practice' ? missedIds.length : undefined}
      onStartMissed={kind === 'practice' ? () => reviewQuestions(missedIds) : undefined}
    />;
    if (session.completed) return <SessionResult session={session} onRetry={(ids) => reviewQuestions(ids)} onExit={() => setSession(null)} onProgress={goToProgress} />;
    return <SessionView session={session} onSelect={(choiceId) => setSession((current) => ({ ...current, selectedChoiceId: choiceId }))} onSubmit={submitCurrentAnswer} onContinue={continueSession} onExit={() => setSession(null)} />;
  };

  return <div className="app-shell">
    <aside className="sidebar" aria-label="Course navigation">
      <button className="brand" onClick={() => setPage('home')} aria-label="Ethics, in Practice home">
        <span className="brand-mark"><span>e</span><i /></span><span className="brand-copy"><strong>ethics, in practice</strong><small>COURSE REVISION</small></span>
      </button>
      <div className="nav-caption">STUDY SPACE</div>
      <nav className="primary-nav" aria-label="Main navigation">
        {navItems.map((item) => <button key={item.id} className={`nav-link ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)} aria-current={page === item.id ? 'page' : undefined}>
          <Icon name={item.icon} size={18} /><span>{item.label}</span>{item.id === 'tutor' && <span className="nav-optional">OPTIONAL</span>}
        </button>)}
      </nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-progress">
        <div className="side-progress-heading"><span>Your progress</span><strong>{Math.round((answeredCount / questions.length) * 100)}%</strong></div>
        <div className="progress-track" role="progressbar" aria-label="Question bank coverage" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round((answeredCount / questions.length) * 100)}><span style={{ width: `${(answeredCount / questions.length) * 100}%` }} /></div>
        <p>{answeredCount} of {questions.length} questions explored</p><button className="text-link" onClick={() => setPage('progress')}>View progress <Icon name="arrow" size={14} /></button>
      </div>
      <div className={`local-status ${storageAvailable ? '' : 'volatile'}`}><span className="status-dot" /><span>{storageAvailable ? 'Saved locally on this device' : 'Storage unavailable · session only'}</span></div>
    </aside>

    <div className="main-shell">
      <header className="topbar"><div className="topbar-title-wrap"><span className="topbar-kicker">ETHICAL & PROFESSIONAL ISSUES IN COMPUTING</span><h2>{titleByPage[page] || 'Home'}</h2></div>
        <div className="topbar-meta"><span className="topbar-pill"><Icon name="file" size={14} /> 5 lecture sources</span><span className="topbar-dot" /><span>{questions.length} questions</span></div>
      </header>
      <main className="main-content" id="main-content">
        {page === 'home' && <HomePage answeredCount={answeredCount} accuracy={accuracy} progress={progress} onStart={() => startSession({ kind: 'practice', topicId: 'all', difficulty: 'all', count: 10 })} onOpenSummaries={() => setPage('summaries')} onOpenModule={(id) => { setSelectedModule(id); setPage('summaries'); }} />}
        {page === 'summaries' && <SummariesPage selectedModule={selectedModule} setSelectedModule={setSelectedModule} search={summarySearch} setSearch={setSummarySearch} openSummary={openSummary} setOpenSummary={setOpenSummary} onPractice={(topicId) => { setSession(null); setSetupTopic(topicId); setSetupDifficulty('all'); setPage('practice'); }} />}
        {page === 'practice' && <div className="page-view">{renderSession('practice')}</div>}
        {page === 'quizzes' && <div className="page-view">{renderSession('quiz')}</div>}
        {page === 'progress' && <ProgressPage progress={progress} answeredCount={answeredCount} accuracy={accuracy} missedIds={missedIds} onReviewMissed={() => reviewQuestions(missedIds)} onRetryTopic={(id) => reviewQuestions(latestMissedIds(progress).filter((questionId) => questionsById[questionId]?.topic === id), id)} onReset={clearProgress} storageAvailable={storageAvailable} />}
        {page === 'tutor' && <TutorPage messages={chatMessages} setMessages={setChatMessages} input={chatInput} setInput={setChatInput} isLoading={chatLoading} setIsLoading={setChatLoading} mode={chatMode} setMode={setChatMode} error={chatError} setError={setChatError} />}
        <PageFooter />
      </main>
    </div>
  </div>;
}

