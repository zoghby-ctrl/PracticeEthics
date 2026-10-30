import { lecture1Questions } from './lecture1.js';
import { lecture2Questions } from './lecture2.js';
import { lecture3Questions } from './lecture3.js';
import { lecture4Questions } from './lecture4.js';
import { lecture5Questions } from './lecture5.js';

export const questions = [
  ...lecture1Questions,
  ...lecture2Questions,
  ...lecture3Questions,
  ...lecture4Questions,
  ...lecture5Questions,
];

export const questionsById = Object.fromEntries(questions.map((question) => [question.id, question]));
