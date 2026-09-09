# r/adithya — Personal portfolio

A Reddit-inspired portfolio with a compact introduction, three featured projects, and case studies focused on contribution and outcomes. Built with Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI, and Motion.

## What you can do

- Start with AskAPS, Reconcile, and RAG-Bench, then open the full project collection. Category filters stay prominent; saved items and ordering live under Project options. Search, filters, and sorting stay in the URL.
- Read projects in a desktop dialog or on a dedicated page. Every post has a shareable URL, and browser Back/Forward works with the reader.
- Save and vote on posts in your browser. These are personal preferences, not public engagement counts.
- Explore AskAPS's workflow, actual Reconcile app screens, a RAG-Bench results chart, and distinct concept illustrations for the other projects. Case studies follow problem, contribution, decisions, and outcome. Experience, education, and skills live under About. Visitor trophies are collapsed in the sidebar.
- Ask the labeled AI assistant about a post. Conversations belong to the current visit and are not public comments.
- View GitHub and LeetCode activity fetched independently, with hourly caching, source links, and refresh timestamps.
- Start in charcoal dark mode, or choose light/system appearance. Theme choices persist, including the browser toolbar color. Keyboard navigation and reduced-motion preferences are supported.

On the home feed, `⌘K` / `Ctrl+K` opens the command palette. `j` / `k` moves through posts and `Enter` opens the selected post. Shortcuts leave focused controls and text fields alone.

## Run locally

Use Node.js 20.9 or newer and pnpm.

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The portfolio pages work without provider keys; contact and AI display an unavailable state until configured.

| Variable                       | Purpose                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Enables the Gemini assistant.                                                                     |
| `GEMINI_MODEL`                 | Optional model override; defaults to `gemini-3.1-flash-lite`.                                     |
| `RESEND_API_KEY`               | Enables contact email delivery.                                                                   |
| `CONTACT_FROM_EMAIL`           | Sender address; use a verified Resend sender for production. Defaults to `onboarding@resend.dev`. |
| `CONTACT_EMAIL`                | Optional recipient override; defaults to the portfolio owner's email.                             |
| `GITHUB_TOKEN`                 | Optional token for GitHub API capacity. Only public repository activity is displayed.             |

Keep credentials in `.env.local` or the hosting environment. LeetCode does not require a key. The API rate limiter is per process; multiple server instances do not share its counters.

## Verify

```sh
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm test:e2e
```

Stop the dev server before building because both use `.next`. Browser tests start the production server automatically, or reuse an existing server on port 3000 during local development.

Tests use installed Chrome on macOS. Elsewhere, install the test browser with `pnpm exec playwright install chromium`; set `PLAYWRIGHT_CHANNEL` to override the browser channel. The suite covers desktop/mobile navigation, browser history, storage failures, form retries, API validation, and axe accessibility checks in both themes. Successful email and AI responses are mocked, so the suite sends no email and makes no paid model calls.

## Editing the portfolio

- `lib/content.ts` owns profile details, resume data, shared types, and legacy posts. `lib/project-content.ts` holds the current project write-ups; dates are editorial updates, not project launch dates. `lib/post-utils.ts` selects the three homepage projects.
- Project descriptions come from the owner's supplied material. The two saved FiQA runs in the local `rag-bench` repository were checked on 2026-09-08: 648 matching query IDs, per-query recall averages, and configurations differing only in experiment name and reranker. The resulting relative gain is 21.0043%; benchmarks were not rerun. Other project metrics and adoption have not been independently audited.
- `lib/rag-bench-evidence.ts` holds the checked FiQA values and links pinned to repository snapshot `06b7929240161e56ee30e3e625e2c62c26b6f27a`. The saved runs themselves record an unknown experiment Git revision. `components/benchmark-evidence.tsx` exposes both configurations, result JSON files, shared settings, report, and timing limitations. The homepage links directly to that evidence section.
- `components/project-preview.tsx` owns workflow and results visuals; `project-illustration.tsx` contains clearly labeled concept illustrations. `reconcile-preview.tsx` displays the actual Activity and Insights captures, copied unchanged from the Reconcile project's `artifacts/reconcile-revamp/` into `public/projects/reconcile/`. Next.js optimizes their delivery; full-resolution images are linked from the case study.
- `lib/blog.ts` owns writing. Only items in `publishedPosts` receive article pages; planned ideas stay labeled as upcoming.
- `components/post-article.tsx`, `post-body.tsx`, and `post-actions.tsx` keep full pages and the desktop reader consistent.
- `components/header.tsx`, `community-header.tsx`, `sidebar.tsx`, and `site-footer.tsx` define the shared navigation and community identity.
- `app/globals.css` and `tailwind.config.ts` define the theme, typography, focus styles, and motion preferences.
- Dark surfaces use `#0E1113`, `#181C1F`, and `#22272B`; borders use `#30363B`. Bright `#FF4500` accents include the header logo and “Say hello” button, paired with charcoal text for 5.51:1 contrast. Small orange text uses `#FF5A1F` on dark surfaces, and other white-text primary buttons use `#C93600` (5.24:1 contrast). Project illustrations stay neutral; the retrieval chart keeps blue data bars and app screenshots retain their actual colors.
- The supplied `public/image.png` is linked unchanged as the browser-tab icon in `app/layout.tsx`. `components/theme-provider.tsx` synchronizes the toolbar color with the selected theme.
- `lib/use-portfolio-navigation.ts`, `use-feed-preferences.ts`, and `browser-store.ts` manage navigation and personal browser state.
- `app/api/` contains the contact, assistant, and coding activity endpoints.
- `public/resume.pdf` is the downloadable résumé.

Legacy home links such as `/?post=ai-askaps` and `/?view=recruiter` continue to work. Projects also have `/projects/[slug]` pages, and other portfolio posts have `/posts/[id]` pages.
