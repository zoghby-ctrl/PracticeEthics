# Ethics, in Practice

A responsive revision app for the five lectures in **Ethical and Professional Issues in Computing**. It is built with React and Vite. Core studying works without an account, API key, or network connection after the page loads.

## Included

- Five lecture modules and 18 topic summaries, each with lecture PDF page citations.
- 112 original multiple-choice questions grounded in the supplied PDFs. Every question includes four choices, its correct answer, explanations, difficulty, topic, and source page. No supplemental questions are mixed into the bank.
- Topic or whole-course practice, configurable quizzes, shuffled questions and choices, immediate submitted-answer feedback, scores, missed-question review, and retry.
- Progress and quiz history stored in the current browser's local storage. The public app can be opened on any device; progress is saved separately on each device and browser.
- An offline course-guide fallback for the AI Tutor, with citations from the lecture summaries.
- An optional server-side OpenAI Responses API tutor. The API key is read only by `/api/chat.js` and is never bundled into browser code.

## Run locally

Requires Node.js 20.19 or newer (or 22.12 or newer).

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

The workflow at `.github/workflows/pages.yml` builds and publishes the site whenever changes are pushed to `main`.

1. Push this project to `zoghby-ctrl/Practice` on the `main` branch.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions** if it is not already selected.
3. Open **Actions** and wait for the **Deploy to GitHub Pages** workflow to finish.

The site URL will be **https://zoghby-ctrl.github.io/Practice/**. You can open that link on phones, tablets, and computers. This static deployment uses the local tutor fallback; GitHub Pages cannot run the server function itself.

## Optional GPT-6 Luna tutor

To connect the public GitHub Pages site to the tutor, deploy this project to Vercel as well. The Vercel deployment hosts `/api/chat.js`; GitHub Pages continues to host the website.

In Vercel Project Settings → Environment Variables, add:

```env
OPENAI_API_KEY=your_server_side_key
OPENAI_MODEL=gpt-6-luna
ALLOWED_ORIGIN=https://zoghby-ctrl.github.io
```

Then redeploy the Vercel project. In GitHub, open **Settings → Secrets and variables → Actions → Variables** and add:

```text
VITE_AI_ENDPOINT_ENABLED=true
VITE_AI_API_BASE_URL=https://your-vercel-project.vercel.app
```

The Vercel URL should be the origin only, without a trailing slash. Push a commit or rerun the Pages workflow so it rebuilds with these variables. Keep `OPENAI_API_KEY` only in Vercel's server-side environment; never add it to GitHub, a `VITE_` variable, or browser code. Without this separate Vercel setup, the GitHub Pages site still works and the tutor uses its local course-guide mode.

The tutor receives relevant topic summaries, not quiz answer keys. It is instructed to cite the supplied PDF pages, say when the course material does not support an answer, and coach students through quiz reasoning without revealing the answer before submission.

## Content updates

- `src/data/course-content.js` contains lecture modules and summaries.
- `src/data/lecture1.js` through `src/data/lecture5.js` contain the question data.
- `src/data/questions.js` exports the combined question bank.

Source references use the physical page numbers in the supplied PDFs.

## Local data

Progress is saved only in the current browser's local storage. It does not sync between devices. Use **Reset progress** on the Progress page to clear it.
