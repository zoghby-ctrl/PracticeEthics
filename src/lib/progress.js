const STORAGE_KEY = 'ethics-revision-progress-v1';

export function emptyProgress() {
  return { attempts: [], sessions: [] };
}

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { progress: emptyProgress(), persistent: true };
    const parsed = JSON.parse(raw);
    return {
      progress: {
        attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      },
      persistent: true,
    };
  } catch {
    return { progress: emptyProgress(), persistent: false };
  }
}

export function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function recordAttempt(progress, attempt) {
  return { ...progress, attempts: [...progress.attempts, attempt] };
}

export function recordSession(progress, session) {
  return { ...progress, sessions: [session, ...progress.sessions].slice(0, 60) };
}

export function latestMissedIds(progress) {
  const latestByQuestion = new Map();
  for (const attempt of progress.attempts) latestByQuestion.set(attempt.questionId, attempt);
  return [...latestByQuestion.values()]
    .filter((attempt) => !attempt.correct)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .map((attempt) => attempt.questionId);
}

export function uniqueAnsweredCount(progress) {
  return new Set(progress.attempts.map((attempt) => attempt.questionId)).size;
}

export function accuracyPercent(progress) {
  if (!progress.attempts.length) return 0;
  const correct = progress.attempts.filter((attempt) => attempt.correct).length;
  return Math.round((correct / progress.attempts.length) * 100);
}

export function topicAttempts(progress, topicId) {
  return progress.attempts.filter((attempt) => attempt.topicId === topicId);
}

export function resetProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
