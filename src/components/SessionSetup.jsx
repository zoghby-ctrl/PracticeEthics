import { summaries } from '../data/course-content.js';
import { questions } from '../data/questions.js';
import { Icon, PageIntro, SelectField } from './ui.jsx';

const topicOptions = [{ value: 'all', label: 'All course topics' }, ...summaries.map((item) => ({ value: item.id, label: item.title }))];

export default function SessionSetup({ pageType, topic, setTopic, difficulty, setDifficulty, count, setCount, shuffleQuestions, setShuffleQuestions, shuffleChoices, setShuffleChoices, onStart, missedCount = 0, onStartMissed }) {
  const available = questions.filter((question) => (topic === 'all' || question.topic === topic) && (difficulty === 'all' || question.difficulty === difficulty)).length;
  const numericCount = Number(count) || 1;
  const selectedCount = Math.min(Math.max(1, numericCount), available || 1);
  const isQuiz = pageType === 'quiz';
  return <>
    <PageIntro eyebrow={isQuiz ? 'QUIZ BUILDER' : 'LOW-PRESSURE PRACTICE'} title={isQuiz ? 'Set up your quiz.' : 'Practice with purpose.'} description={isQuiz ? 'Choose your scope and question count. You’ll get immediate explanations after each submitted answer.' : 'Take one question at a time, by topic or across the full course. Each answer comes with a reason and a page reference.'} />
    <div className="setup-layout">
      <section className="setup-card">
        <div className="setup-card-heading"><span className="setup-step">01</span><div><h2>Choose your focus</h2><p>Pick a topic or mix questions from all five lectures.</p></div></div>
        <SelectField id={`${pageType}-topic`} label="Topic" value={topic} onChange={setTopic} options={topicOptions} />
        <SelectField id={`${pageType}-difficulty`} label="Difficulty" value={difficulty} onChange={setDifficulty} options={[
          { value: 'all', label: 'All levels' }, { value: 'Easy', label: 'Foundational' }, { value: 'Medium', label: 'Applied' }, { value: 'Hard', label: 'Advanced' },
        ]} />
        <label className="field count-field" htmlFor={`${pageType}-count`}><span className="field-label">Question count</span><div className="count-input-wrap"><input id={`${pageType}-count`} type="number" inputMode="numeric" min="1" max={available || 1} value={selectedCount} onChange={(event) => setCount(event.target.value)} /><span>of {available} available</span></div></label>
        <div className="toggle-list">
          <label className="toggle-row"><span><strong>Shuffle questions</strong><small>Change the order each time</small></span><input type="checkbox" checked={shuffleQuestions} onChange={(event) => setShuffleQuestions(event.target.checked)} /></label>
          <label className="toggle-row"><span><strong>Shuffle answer choices</strong><small>Keep the answer key correct as choices move</small></span><input type="checkbox" checked={shuffleChoices} onChange={(event) => setShuffleChoices(event.target.checked)} /></label>
        </div>
        <div className="setup-footer"><span><Icon name="file" size={15} /> {selectedCount} questions in this session</span><button className="button button-primary" onClick={onStart} disabled={!available}>{isQuiz ? 'Start quiz' : 'Start practice'} <Icon name="arrow" size={16} /></button></div>
      </section>
      <aside className="setup-aside">
        <div className="aside-number">{String(selectedCount).padStart(2, '0')}</div><div className="aside-label">questions, selected by you</div>
        <div className="aside-rule" />
        <div className="aside-points"><div><span className="check-dot"><Icon name="check" size={13} /></span><p>Submit when you’re ready to see feedback.</p></div><div><span className="check-dot"><Icon name="check" size={13} /></span><p>Every answer includes a lecture PDF citation.</p></div><div><span className="check-dot"><Icon name="check" size={13} /></span><p>Review missed questions and try them again.</p></div></div>
        {onStartMissed && <button className="retry-missed" onClick={onStartMissed} disabled={!missedCount}><Icon name="rotate" size={16} /><span>Review missed questions</span><strong>{missedCount}</strong></button>}
      </aside>
    </div>
  </>;
}

