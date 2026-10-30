import { modules, summaries } from '../data/course-content.js';
import { questionsById } from '../data/questions.js';
import { CitationList, Icon, PageIntro, ProgressBar } from './ui.jsx';

export default function SessionView({ session, onSelect, onSubmit, onContinue, onExit }) {
  const item = session.items[session.index];
  const question = questionsById[item.questionId];
  const module = modules.find((entry) => entry.id === question.moduleId);
  const answer = session.answers[question.id];
  const choices = item.choiceOrder.map((id) => question.choices.find((choice) => choice.id === id)).filter(Boolean);
  const currentAnswerCorrect = answer?.correct;
  const correctChoice = question.choices.find((choice) => choice.id === question.correctChoiceId);
  const pct = Math.round(((session.index + (answer ? 1 : 0)) / session.items.length) * 100);
  return <div className="page-view session-view">
    <div className="session-topline"><div><div className="eyebrow muted-eyebrow">{session.reviewMode ? 'MISSED QUESTION REVIEW' : session.kind === 'quiz' ? 'QUIZ IN PROGRESS' : 'PRACTICE IN PROGRESS'}</div><h1>{session.topicName}</h1></div><button className="button button-ghost button-small" onClick={onExit}>Exit session</button></div>
    <div className="session-progress-row"><span>Question {session.index + 1} <i>of</i> {session.items.length}</span><span>{module.shortTitle} <b>·</b> {question.difficulty}</span></div>
    <ProgressBar value={pct} label={`Question ${session.index + 1} of ${session.items.length}`} />
    <section className="question-panel" aria-labelledby={`question-${question.id}`}>
      <div className="question-meta"><span className="topic-tag">{summaries.find((summary) => summary.id === question.topic)?.title}</span><span>QUESTION {String(session.index + 1).padStart(2, '0')}</span></div>
      <h2 id={`question-${question.id}`}>{question.prompt}</h2>
      <div className="answer-options" role="radiogroup" aria-labelledby={`question-${question.id}`}>
        {choices.map((choice, index) => {
          const selected = session.selectedChoiceId === choice.id;
          const isCorrect = choice.id === question.correctChoiceId;
          const showAnswer = Boolean(answer);
          const stateClass = showAnswer ? (isCorrect ? 'option-correct' : answer.selectedChoiceId === choice.id ? 'option-incorrect' : '') : selected ? 'option-selected' : '';
          return <button type="button" role="radio" aria-checked={selected} aria-label={`Option ${String.fromCharCode(65 + index)}: ${choice.text}`} className={`answer-option ${stateClass}`} key={choice.id} onClick={() => !answer && onSelect(choice.id)} disabled={Boolean(answer)}>
            <span className="option-letter">{String.fromCharCode(65 + index)}</span><span className="option-text">{choice.text}</span>{showAnswer && isCorrect && <span className="option-check"><Icon name="check" size={16} /></span>}
          </button>;
        })}
      </div>
      {answer && <div className={`answer-feedback ${currentAnswerCorrect ? 'feedback-correct' : 'feedback-incorrect'}`} aria-live="polite">
        <div className="feedback-heading"><span className="feedback-icon"><Icon name={currentAnswerCorrect ? 'check' : 'info'} size={17} /></span><div><strong>{currentAnswerCorrect ? 'That’s right.' : 'Not quite — let’s work through it.'}</strong><span>{currentAnswerCorrect ? 'You identified the course principle.' : 'Here is the answer and why each option fits or does not fit.'}</span></div></div>
        {!currentAnswerCorrect && <div className="correct-answer-callout"><span>Correct answer</span><strong>{correctChoice.text}</strong></div>}
        <p className="correct-explanation">{question.explanation}</p>
        <div className="choice-reasons">
          {choices.map((choice, index) => <div className={`choice-reason ${choice.id === question.correctChoiceId ? 'reason-right' : ''}`} key={choice.id}>
            <span className="reason-mark">{String.fromCharCode(65 + index)}</span><div><strong>{choice.id === question.correctChoiceId ? 'Correct' : 'Why this choice doesn’t fit'}</strong><p>{choice.explanation}</p></div>
          </div>)}
        </div>
        <div className="feedback-source"><div className="summary-source-title"><Icon name="file" size={15} /> CHECK THE SOURCE</div><CitationList sources={[question.source]} compact /></div>
      </div>}
      <div className="question-actions">
        {!answer ? <><p>Select an option, then check your answer.</p><button className="button button-primary" onClick={onSubmit} disabled={!session.selectedChoiceId}>Check answer <Icon name="arrow" size={16} /></button></> : <><p>Your response is saved on this device.</p><button className="button button-primary" onClick={onContinue}>{session.index === session.items.length - 1 ? 'See your result' : 'Next question'} <Icon name="arrow" size={16} /></button></>}
      </div>
    </section>
    <div className="session-bottom"><span><Icon name="lock" size={14} /> Answer key stays hidden until you check your answer.</span><span>{session.items.length - session.index - 1} {session.items.length - session.index - 1 === 1 ? 'question' : 'questions'} remaining</span></div>
  </div>;
}
