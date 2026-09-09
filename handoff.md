# Portfolio refresh — 2026-09-09

## Goal and state

Complete the portfolio refactor, evidence/content improvements, charcoal theme, and final orange/spacing/copy polish. Implementation and local verification are complete. All 75 changed files were staged with `git add .`, committed as `fa9b7e1`, and pushed on `codex/portfolio-refresh`, based on `origin/main` (`64625fe`). [PR #7](https://github.com/adxthyx/PORTFOLIO/pull/7) is open for review against `main`; the local branch tracks its remote. Do not merge without a request.

## Completed work

- Compact name/role hero; three featured projects (AskAPS, Reconcile, RAG-Bench), a full project collection, prominent category filters, quieter secondary controls, and About for experience/education/skills. Trophies remain collapsed.
- Case studies emphasize problem, personal contribution, decisions, and outcome. AskAPS ownership is scoped to HPE application/integration work. RIT is retired, NGO is a team prototype, and routing is inactive; do not invent missing metrics or ownership details.
- Distinct project visuals: AskAPS workflow, actual Reconcile Activity/Insights captures, RAG-Bench results chart, and labeled concept illustrations for other cards. Full pages and the desktop reader share content and evidence.
- Reconcile compact previews now use a 384px grid and square crops. Desktop screenshot panel shrank 361.5px → 276px (24%); full card 650.5px → 565px. Full case-study screens and links remain unchanged.
- Removed the outdated “Off the clock” sentence. Hero personal line: “Side projects get weird: I turned stock charts into a bike game.” Sidebar explains the current engineering focus rather than repeating the hero.
- Charcoal default: canvas `#0E1113`, cards/nav `#181C1F`, raised surfaces `#22272B`, borders `#30363B`, text `#F2F4F5`/`#A8ADB3`. Light/system choices persist. Diagrams use neutral surfaces; RAG bars stay blue, app captures retain their original colors.
- Header logo and Say hello use bright `#FF4500` with charcoal text (5.51:1 contrast); hover `#FF5A1F`. Other white-text buttons retain `#C93600`. Supplied `public/image.png` remains the unchanged browser-tab icon; toolbar color follows the theme.
- Shared URL navigation, browser history/focus, resilient browser storage, votes/saves, contact validation/retry, assistant context from server-side posts, independent statistics loading, accessible dialogs, metadata, and routes implemented. `/prep` and `/chart` rewrites retained.
- Shared dialog entry/exit animation preserves both centering translations, preventing the first frame from dropping below the viewport.

## Evidence boundaries

- Reconcile PNGs were copied unchanged from sibling `Expense Tracker/artifacts/reconcile-revamp/`; they are actual app captures, not mockups.
- Local `rag-bench` FiQA artifacts checked on 2026-09-08: 648 matching query IDs, Recall@5 0.35256277073406705 → 0.4266161736069143 (21.0043% relative gain); configs differ only in name/reranker. Benchmarks were not rerun.
- Evidence links point to `adxthyx/RAG_Rerank` artifact snapshot `06b7929240161e56ee30e3e625e2c62c26b6f27a`; configuration/result URLs were verified HTTP 200. Saved experiment Git revision is unknown and disclosed. Timings use cached query embeddings, not cold production requests; no generated-answer quality claim.
- Additional project evidence remains deferred. External project repositories were not modified.

## Active files

- Latest polish: `components/header.tsx`, `community-header.tsx`, `reconcile-preview.tsx`, `README.md`.
- Content/evidence: `lib/project-content.ts`, `rag-bench-evidence.ts`; `components/project-preview.tsx`, `project-illustration.tsx`, `benchmark-evidence.tsx`; `public/projects/reconcile/`.
- Theme/routes: `app/globals.css`, `layout.tsx`, `opengraph-image.tsx`, `tailwind.config.ts`, `components/theme-provider.tsx`; `app/projects/`, `about/`, `blog/`, `posts/`.
- Shared reading/navigation: `components/post-article.tsx`, `post-body.tsx`, `post-actions.tsx`, `ui/dialog.tsx`; `lib/use-portfolio-navigation.ts`, `use-feed-preferences.ts`, `browser-store.ts`.
- Tests/config: `tests/`, `playwright.config.ts`, `.env.example`, `package.json`, `pnpm-lock.yaml`.

## Verification and preview

- Final `npm run build` passed compilation, TypeScript, ESLint, and 29 static pages. Existing Browserslist/OG runtime notices are informational.
- Final `pnpm test:e2e`: **38 passed, 4 intentional platform skips** (34.7s). Includes mobile/desktop navigation, history, storage errors, contact/assistant retries, API validation, and axe checks in both themes. No real email or paid model request was sent.
- Final visual checks passed at 320, 390, 768, and 1440px in both themes: exact logo/button/hover colors, correct personal line, no overflow/runtime errors, contact opens, full-size Reconcile links preserved. First project title remains above 720px, including 701px at the narrowest width. Desktop homepage/mobile card screenshots inspected.
- Latest artifacts: `/private/tmp/portfolio-final-polish-{before,after}/`; script `/private/tmp/portfolio-final-polish-qa.mjs`. Earlier comprehensive artifacts: `/private/tmp/portfolio-visual-evidence/`; dialog animation proof `/private/tmp/portfolio-dialog-animation-qa.mjs --verify`.
- Preview: **http://127.0.0.1:3000**, exec session **66663**, `npm run start -- --hostname 127.0.0.1 --port 3000`. Stop before rebuilding because `.next` is shared.

## Resolved failures and next steps

- Chrome/local-server checks require sandbox escalation; rerunning with approved permissions passes. Browser skill file was absent, so the established isolated Chrome/Playwright workflow was used.
- Theme test initialization is scoped to the top-level site to avoid the PDF viewer's unavailable storage. Hover QA waits for the color transition to settle.
- GitHub CLI is unavailable. PR operations use a temporary Python GitHub API helper with the existing Git credential helper; credentials are never printed or written to disk.
- Next: review PR #7. No required implementation work remains. Additional project evidence or production-provider checks can follow when requested.
