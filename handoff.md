# Portfolio — updated 2026-10-10

## Current goal: Reddit look restored (branch `reddit-restore`)

User felt the Codex refresh (`32c7d19`, PR #7) made the site bland and wanted the Reddit elements back from the Aug 15 version (`64625fe`). Done as a **hybrid**: Reddit UI restored on top of the current code. Old sources were read with `git show 64625fe:<path>`.

- **Restored:** vote column (SVG arrows, animated count, particle burst) with a horizontal bar on mobile; meta line `r/adithya • Posted by u/adxthyx • timeAgo`; solid flairs, award medals, `PINNED BY MODERATORS`; action bar (N Comments / Share / Save / Code / Demo); Hot/New/Top tabs with FLIP reorder; filter chips All / About & Skills / AI/ML / Web Dev / Android / Saved; about posts (pinned AMA, Experience, Education, Skills) back in the feed (15 posts); sidebar ProfileCard (banner, online dot, 1 member / 1 online, live karma, Join, Resume, Ask AI, Connect links); Communities I Lurk In; Highlights; trophy case shown openly; Reddit palette; header search placeholder `Search r/adithya…`.
- **Kept from Codex (user's pick):** project previews/screenshots inside cards, `My work / Delivered` lines, `/projects` + `/about` routes, rewritten case studies, ClearWeb.
- **Dropped (user's pick):** the hero intro block (`community-header.tsx` deleted; page h1 is now sr-only) and cake day.
- **Content:** `upvotes`/`comments` were re-added to `Post` (Aug numbers, plus new ones for the new projects), `awards` on AskAPS, ClearWeb and RAG-Bench, and `profile.baseKarma` 2847. `communities`, `highlights` and `communityTagline` are in `lib/content.ts`. `featuredPostIds` was removed.
- **Contrast:** pure #FF4500 behind white text fails axe, so `brand-solid` = #D93A00 (Reddit's own button orange) for fills, `brand-accent` = #FF4500 for decoration, and `brand` = #B33000 for light-mode text. Light `muted-foreground` was darkened for the #dae0e6 canvas, and the destructive tokens use the Codex values.
- `VoteControls` on the article pages now shows the real count.

## Verification (2026-10-10)
- `pnpm lint` and `pnpm build` pass. `pnpm test:e2e`: **38 passed, 4 skipped**. The specs were updated for the 15-post feed, chip names, Hot/New/Top, saved chip, the "Community info" aside, and the removed "first project above 720px" check (the mobile profile card now sits above the feed, as in Aug).
- Screenshots at 1440 and 390 in both themes: votes toggle, the karma updates live (2847 → 2848), votes sync to `/projects`, and there are no console errors. Script: `$SCRATCHPAD/shots.mjs` (needs a `node_modules` symlink and a server on :3100).
- The legacy `?post=` test flaked once under parallel load but passed 3/3 in isolation.

## Next steps
- The user should review it visually and then decide whether to push or open a PR. It is committed locally on `reddit-restore` and not pushed.
- Hot sort puts the older about posts (May/June dates) below all the projects; only the pinned AMA stays on top. If the user wants them higher, consider a gentler decay.
- Old notes: the remote branches `clearweb-on-main` and `codex/portfolio-refresh` are redundant. Multicity Routing needs its stack and details from the user.

## History

### ClearWeb + case-study rewrite (2026-09-30, pushed to `origin/main` as `64a6fa7`)

- PR #7 was already squash-merged into main as `32c7d19`. Local `main` was fast-forwarded to `dc9f1b8` (ClearWeb entry, cherry-picked onto `origin/main`), and the rewrite is committed on top, so history stays linear. The branches `clearweb-on-main` and `codex/portfolio-refresh` on origin are now redundant.
- **User direction:** portfolio copy must *sell* the project. Use Overview → Features → How it works → Tech stack → (My contribution for team work) → Engineering highlights. **No disclaimers**, no "not claimed" or "synthetic" or "single run" caveats, no test-count trivia. Keep facts true; omit weaknesses rather than invent strengths.
- All 11 active entries in `lib/project-content.ts` were rewritten. The AskAPS title is unchanged because tests key on it. ClearWeb is sourced from `~/Desktop/ABC/LangChain/clearweb/` (Nemotron 3.5 Lightning + Nemotron 3 Ultra on Nebius).
- Caveat copy was also removed from `project-preview.tsx` captions, the `project-illustration.tsx` "Concept illustration" tag, and the `benchmark-evidence.tsx` caveat sentence and "Artifact provenance" block.
- Featured: `["ai-askaps", "clearweb", "rag-bench", "reconcile"]`. Tests were updated for 4 featured projects, 11 articles, and 4 in AI/ML.
- Verified: lint, tsc, build, e2e 38 passed / 4 skipped; articles checked at 1440 and 390 px.
- Next: delete the redundant remote branches. Multicity Routing is thin, and the user needs to supply its stack and details. ClearWeb links to github.com/adxthyx/Clearweb.

### Resolved failures and next steps

- Chrome/local-server checks require sandbox escalation; rerunning with approved permissions passes. Browser skill file was absent, so the established isolated Chrome/Playwright workflow was used.
- Theme test initialization is scoped to the top-level site to avoid the PDF viewer's unavailable storage. Hover QA waits for the color transition to settle.
- GitHub CLI is unavailable. PR operations use a temporary Python GitHub API helper with the existing Git credential helper; credentials are never printed or written to disk.
- Next: review PR #7. No required implementation work remains. Additional project evidence or production-provider checks can follow when requested.
