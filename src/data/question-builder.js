export function buildQuestions(moduleId, pdf, rows) {
  return rows.map(([id, topic, difficulty, prompt, options, correctIndex, explanation, notes, page, section]) => ({
    id,
    moduleId,
    topic,
    difficulty,
    prompt,
    choices: options.map((text, index) => ({
      id: `${id}-${String.fromCharCode(97 + index)}`,
      text,
      explanation: index === correctIndex ? explanation : notes[index],
    })),
    correctChoiceId: `${id}-${String.fromCharCode(97 + correctIndex)}`,
    explanation,
    source: { pdf, page, section },
    origin: 'lecture-pdf',
  }));
}
