# r/adithya — Reddit Portfolio

A portfolio you browse like a subreddit. Vote on posts, sort by Hot/New/Top, hit ⌘K, and ask u/adithya-bot anything. Built with Next.js 14, TypeScript, Tailwind CSS, Radix UI, and Motion.

## 🚀 Features

- **Reddit, committed to the bit**: flairs, awards, pinned posts, cake day, live karma that updates as you vote, and an "About Community" sidebar for r/adithya.
- **Working feed mechanics**: Hot/New/Top sorting (hot score decays with post age), category filter chips, real-time search, and votes that persist in localStorage.
- **AI comment threads**: every post has a comment section where u/adithya-bot (Gemini) answers questions as me.
- **⌘K command palette**: jump to any post, open any modal, switch theme, or hit external links from anywhere.
- **Old-Reddit keyboard nav**: `j`/`k` to walk the feed, `Enter` to open.
- **Live stats**: GitHub (repos, commits, stars, languages) and LeetCode (solved by difficulty, ranking) fetched server-side with animated count-ups and skeleton loading.
- **Motion**: spring-physics feed entrance, FLIP reordering on sort change, upvote particle burst — all respecting `prefers-reduced-motion`.
- **Accessible modals**: every dialog is built on Radix (focus trap, Escape, scroll lock, proper aria).
- **Reddit Sans** typography self-hosted via `next/font`, layered Reddit dark palette, dynamic OG image styled as a Reddit post card.
- **Contact form**: Resend-powered with toast feedback and rate limiting.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict, errors enforced at build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with semantic design tokens
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Motion](https://motion.dev/) (LazyMotion + domMax)
- **Command Palette**: [cmdk](https://cmdk.paco.me/) · **Toasts**: [sonner](https://sonner.emilkowal.ski/)
- **AI**: Google Gemini · **Email**: [Resend](https://resend.com/)
- **Data**: GitHub REST API, LeetCode GraphQL API

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/adxthyx/reddit-portfolio.git
   cd reddit-portfolio
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Set up environment variables in `.env`:
   \`\`\`env
   GITHUB_TOKEN=your_github_personal_access_token
   RESEND_API_KEY=your_resend_api_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/` — App Router pages, API routes, fonts/metadata, dynamic OG image.
- `components/` — feed, post cards, Radix-based modals, command palette, sidebar.
- `components/ui/` — shadcn/ui primitives (dialog, command, skeleton, ...).
- `lib/content.ts` — **all portfolio content lives here** (typed posts + profile).
- `lib/` — votes (localStorage), motion variants, keyboard nav, API security.
- `public/` — static assets, resume PDF, self-hosted Reddit Sans fonts.

---
Built with ❤️ by [adxthyx](https://github.com/adxthyx)
