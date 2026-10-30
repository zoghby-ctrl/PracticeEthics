import { formatSource, summaries } from '../src/data/course-content.js';

const stopWords = new Set(['about','after','also','and','are','can','could','does','from','have','help','into','what','when','where','which','with','would','your','this','that','the','why','how','explain','please','tell','give','some','more','than','then','them','they','their','was','were','will','should','course','lecture','pdf','notes','five','four','three','two','one','first','second','third','fourth','fifth']);

function requestedLectureNumber(query) {
  const numberWords = { one: 1, two: 2, three: 3, four: 4, five: 5, first: 1, second: 2, third: 3, fourth: 4, fifth: 5 };
  const match = query.match(/\b(?:lecture|module|lec)\s*(?:number\s*)?(1|2|3|4|5|one|two|three|four|five|first|second|third|fourth|fifth)\b/i);
  if (!match) return null;
  const value = match[1].toLowerCase();
  return Number(value) || numberWords[value] || null;
}

function retrieve(query, limit = 3) {
  const lectureNumber = requestedLectureNumber(query);
  if (lectureNumber) {
    return summaries.filter((item) => item.moduleId === `lecture-${lectureNumber}`);
  }
  const words = [...new Set(query.toLowerCase().match(/[a-z0-9-]{3,}/g) || [])].filter((word) => !stopWords.has(word));
  if (!words.length) return [];
  return summaries.map((item) => {
    const text = `${item.title} ${item.summary} ${item.sources.map((source) => source.section).join(' ')}`.toLowerCase();
    const score = words.reduce((total, word) => total + (text.includes(word) ? (item.title.toLowerCase().includes(word) ? 3 : 1) : 0), 0);
    return { item, score };
  }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((entry) => entry.item);
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const requestOrigin = req.headers.origin;
  if (allowedOrigin && requestOrigin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST.' });
  if (!process.env.OPENAI_API_KEY) return sendJson(res, 503, { error: 'AI tutor is not configured.' });

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1800) : '';
  if (!message) return sendJson(res, 400, { error: 'A question is required.' });
  if (/\b(?:what|which) (?:ai )?model (?:are|is) (?:you|the (?:ai )?tutor) (?:using|running|powered by)\b/i.test(message)) {
    const model = process.env.OPENAI_MODEL || 'gpt-6-luna';
    return sendJson(res, 200, { answer: `This AI Tutor is configured to use OpenAI’s ${model} model. That’s server configuration, not information from the lecture PDFs.`, citations: [] });
  }

  const relevant = retrieve(message, 3);

  const sourceContext = relevant.map((item) => {
    const references = item.sources.map(formatSource).join('\n');
    return `TOPIC: ${item.title}\nSUMMARY: ${item.summary}\nREFERENCES:\n${references}`;
  }).join('\n\n---\n\n') || 'No matching lecture summary was retrieved for this question.';
  const directAnswerRequest = /\b(which (?:option|choice|answer)|correct answer|give me the answer|just the answer|what should i select|is (?:a|b|c|d) correct)\b/i.test(message)
    || ((message.match(/\b[A-D][).:]/g) || []).length >= 3);

  const instructions = `You are a helpful university Ethics tutor. The supplied lecture summaries are the primary course source, but you are not restricted to repeating them. Explain ideas clearly in your own words, use simple examples or analogies when useful, and connect related ideas. When asked to explain or summarize a whole lecture, synthesize the supplied summaries for that lecture into a concise overview.

For claims supported by the supplied course context, cite the exact PDF filename, physical page, and section. If you add general background that is not stated in the PDFs, label that part “Supplemental background” and never present it as course material. If the PDFs do not cover a question, do not stop at a refusal: briefly say the course notes do not cover it, then give a careful general explanation labeled as supplemental. Do not fabricate PDF citations. Keep answers focused, usually under 200 words.

If the learner asks you to select or reveal a multiple-choice answer, do not give the option or answer key. Offer a short hint or explain the relevant idea so they can reason through it themselves.

COURSE SUMMARY CONTEXT:
${sourceContext}`;

  const history = Array.isArray(body.history) ? body.history.slice(-4) : [];
  const input = history.map((entry) => ({
    role: entry?.role === 'assistant' ? 'assistant' : 'user',
    content: typeof entry?.content === 'string' ? entry.content.slice(0, 900) : '',
  })).filter((entry) => entry.content);
  if (!input.length || input[input.length - 1].role !== 'user') input.push({ role: 'user', content: message });

  if (directAnswerRequest) {
    const source = relevant[0]?.sources[0];
    return sendJson(res, 200, {
      answer: relevant.length
        ? `I can help you reason it out, but I won’t select a quiz option before you submit. Which principle or definition from “${relevant[0].title}” best matches the situation?`
        : 'I can help with a hint, but I won’t choose an answer before you submit. What course idea do you think the question is testing?',
      citations: source ? [source] : [],
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-6-luna', reasoning: { effort: 'low' }, instructions, input, max_output_tokens: 500 }),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error('OpenAI Responses API request failed:', response.status, detail.slice(0, 500));
      return sendJson(res, 502, { error: 'The AI tutor could not complete the request.' });
    }
    const data = await response.json();
    const answer = (data.output || [])
      .filter((item) => item.type === 'message')
      .flatMap((item) => item.content || [])
      .filter((part) => part.type === 'output_text')
      .map((part) => part.text)
      .join('\n')
      .trim();
    if (!answer) return sendJson(res, 502, { error: 'The AI tutor returned an empty response.' });
    const citations = [...new Map(relevant.flatMap((item) => item.sources).map((source) => [formatSource(source), source])).values()].slice(0, 6);
    return sendJson(res, 200, { answer, citations });
  } catch (error) {
    console.error('OpenAI Responses API request error:', error?.message || error);
    return sendJson(res, 502, { error: 'The AI tutor is temporarily unavailable.' });
  }
}
