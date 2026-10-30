import { useEffect, useRef } from 'react';
import { summaries } from '../data/course-content.js';
import { CitationList, Icon, PageIntro } from './ui.jsx';

const stopWords = new Set(['about','after','also','and','are','can','could','does','from','have','help','into','what','when','where','which','with','would','your','this','that','the','why','how','explain','please','tell','give','some','more','than','then','them','they','their','was','were','will','should','course','lecture','pdf','notes']);
const aiEndpointEnabled = import.meta.env.VITE_AI_ENDPOINT_ENABLED === 'true';
const aiApiBaseUrl = (import.meta.env.VITE_AI_API_BASE_URL || '').replace(/\/$/, '');
const isModelQuestion = (query) => /\b(?:what|which) (?:ai )?model (?:are|is) (?:you|the (?:ai )?tutor) (?:using|running|powered by)\b/i.test(query);

function findRelevantSummaries(query, limit = 3) {
  const words = [...new Set(query.toLowerCase().match(/[a-z0-9-]{3,}/g) || [])].filter((word) => !stopWords.has(word));
  if (!words.length) return [];
  return summaries.map((item) => {
    const searchable = `${item.title} ${item.summary} ${item.sources.map((source) => source.section).join(' ')}`.toLowerCase();
    const score = words.reduce((total, word) => total + (searchable.includes(word) ? (item.title.toLowerCase().includes(word) ? 3 : 1) : 0), 0);
    return { item, score };
  }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((entry) => entry.item);
}

function localTutorAnswer(query) {
  if (isModelQuestion(query)) return {
    content: 'This device is using the local course guide, which is not connected to an AI model. The online AI Tutor needs its server endpoint to be configured.',
    citations: [],
  };
  const relevant = findRelevantSummaries(query, 2);
  if (!relevant.length) return {
    content: 'I can’t find enough support for that in the course summaries, so I won’t guess. Try a named topic such as autonomy, consent, fairness, privacy, copyright, accountability, or deepfakes.',
    citations: [],
  };
  const selected = relevant[0];
  const extra = relevant.length > 1 ? `\n\nA related topic is “${relevant[1].title}.”` : '';
  return {
    content: `Local course guide: ${selected.summary}${extra}\n\nFor a quiz question, use this as a reasoning hint and submit your own choice to see the answer feedback.`,
    citations: relevant.flatMap((item) => item.sources).slice(0, 5),
  };
}

const prompts = ['How are transparency and explainability different?', 'What makes a fairness metric a value choice?', 'Why did the Therac-25 case matter?'];

export default function TutorPage({ messages, setMessages, input, setInput, isLoading, setIsLoading, mode, setMode, error, setError }) {
  const endRef = useRef(null);
  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [messages, isLoading]);

  const send = async (preset = '') => {
    const text = (preset || input).trim();
    if (!text || isLoading) return;
    const userMessage = { role: 'user', content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setError('');
    if (!aiEndpointEnabled) {
      const fallback = localTutorAnswer(text);
      setMessages([...nextMessages, { role: 'assistant', ...fallback, mode: 'local' }]);
      setMode('local');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${aiApiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: nextMessages.slice(-8).map(({ role, content }) => ({ role, content })) }),
      });
      if (!response.ok) throw new Error('The optional AI endpoint is unavailable.');
      const data = await response.json();
      if (!data.answer) throw new Error('The tutor did not return an answer.');
      setMessages((current) => [...current, { role: 'assistant', content: data.answer, citations: data.citations || [], mode: 'ai' }]);
      setMode('ai');
    } catch {
      const fallback = localTutorAnswer(text);
      setMessages((current) => [...current, { role: 'assistant', ...fallback, mode: 'local' }]);
      setMode('local');
      setError('AI is unavailable right now. The local course guide is active.');
    } finally {
      setIsLoading(false);
    }
  };

  return <div className="page-view tutor-view">
    <PageIntro eyebrow="OPTIONAL STUDY COMPANION" title="Ask the course a question." description="Get a concept explained, find a source page, or reason through a dilemma. The tutor is guided by the five lecture PDFs." action={<span className={`tutor-mode-badge ${mode === 'ai' ? 'connected' : ''}`}><span className="status-dot" />{mode === 'ai' ? 'AI connected' : 'Local fallback ready'}</span>} />
    {error && <div className="tutor-connection-note"><Icon name="info" size={16} />{error}</div>}
    <div className="tutor-layout">
      <section className="chat-panel" aria-label="AI Tutor conversation">
        <div className="chat-topline"><span className="tutor-avatar"><Icon name="spark" size={18} /></span><div><strong>Course tutor</strong><span>{mode === 'ai' ? 'Grounded in lecture summaries' : 'Local course-guide mode'}</span></div><span className="chat-live-dot" /></div>
        <div className="chat-messages" aria-live="polite">
          {messages.map((message, index) => <div className={`chat-message ${message.role === 'user' ? 'from-user' : 'from-tutor'}`} key={`${index}-${message.role}`}>
            {message.role === 'assistant' && <span className="message-avatar"><Icon name="spark" size={14} /></span>}
            <div className="message-content"><div className="message-bubble"><p>{message.content}</p></div>
              {message.citations?.length > 0 && <div className="message-citations"><span>COURSE REFERENCES</span><CitationList sources={message.citations} compact /></div>}
              {message.mode === 'local' && index > 0 && <span className="fallback-note">Local summary search · no external content</span>}
            </div>
          </div>)}
          {isLoading && <div className="chat-message from-tutor"><span className="message-avatar"><Icon name="spark" size={14} /></span><div className="message-content"><div className="glass-skeleton" aria-label="Tutor response loading"><span /><span /><i /></div></div></div>}
          <div ref={endRef} />
        </div>
        <form className="chat-compose" onSubmit={(event) => { event.preventDefault(); send(); }}>
          <label className="sr-only" htmlFor="tutor-input">Ask the tutor a question</label><textarea id="tutor-input" rows="1" placeholder="Ask about a course concept…" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(); } }} />
          <button className="send-button" type="submit" aria-label="Send question" disabled={!input.trim() || isLoading}><Icon name="arrow" size={18} /></button>
        </form>
        <div className="chat-compose-foot"><span>Enter to send · Shift + Enter for a new line</span><span>Check important details against the cited PDF.</span></div>
      </section>
      <aside className="tutor-aside">
        <div className="tutor-aside-card"><span className="tutor-aside-icon"><Icon name="file" size={18} /></span><div className="eyebrow">SOURCE-FIRST</div><h3>Five lecture PDFs</h3><p>Answers should point back to the material. If the course notes don’t support a claim, the tutor should say so.</p></div>
        <div className="tutor-aside-card tutor-prompt-card"><div className="eyebrow">TRY ASKING</div><div className="suggestion-list">{prompts.map((prompt) => <button key={prompt} onClick={() => send(prompt)} disabled={isLoading}>{prompt}<Icon name="arrow" size={14} /></button>)}</div></div>
        <div className="tutor-fallback"><Icon name="info" size={15} /><p>If no API key is configured, this page searches the local summaries and shows matching citations. Core study features never depend on the AI service.</p></div>
      </aside>
    </div>
  </div>;
}

