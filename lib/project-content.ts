import type { Post } from "@/lib/content"

// Project facts supplied by Adithya. Dates below are write-up updates, not launch dates.
const updatedAt = "2026-09-08T00:00:00+05:30"

export const projectEntries: Omit<Post, "subreddit" | "author">[] = [
  {
    id: "ai-askaps",
    title: "AskAPS — AI Assistant for HPE Supply Chain Planning",
    content:
      "An AI assistant in Microsoft Teams and on the web that answers supply-chain planning questions from documentation, support tickets, and live planning data in one place.",
    projectDetails: {
      context: "HPE · Deployed internally",
      contribution:
        "Built the AskAPS application and integration layer across Teams, the web app, and HPE's AI services.",
      outcome: "Planners get documents, related tickets, and planning figures from a single conversation.",
    },
    fullContent: `## Overview
AskAPS is an AI assistant for HPE's supply-chain planning and materials-management teams. Planners ask a question in Microsoft Teams or the web app, and AskAPS answers from documentation, support tickets, and live planning data, with follow-up questions, filters, tables, and exports in the same conversation.

A question like **"Which root-cause category is contributing the most to the current error?"** used to mean running a report in one tool, looking up definitions in another, and searching tickets in a third. AskAPS brings that investigation into one place.

## Features
- **KnowledgeAI:** answers from planning documentation, with domain routing, scoped retrieval, page-level citations, and normalized source links.
- **TicketingAI:** finds related support tickets in the right repository, prefetches relevant documentation, and links straight to ticket-raising destinations.
- **MetricsAI:** natural-language questions over planning data, with filters, stateful refinements, paginated result tables, caching, and email export.
- **Two channels, one experience:** rich Adaptive Cards in Microsoft Teams and a React web app, backed by the same services.
- **Saved work:** favourites, feedback, and usage tracking.

## How it works
1. A planner asks a question in Teams or on the web.
2. The FastAPI backend routes it to the right domain: documents, tickets, or metrics.
3. Service adapters call HPE's retrieval service (Hippo) and text-to-SQL analytics service (GeniAIus), normalizing their streaming events.
4. Results come back as citations, ticket cards, or data tables, and follow-up refinements continue the same session.

## Tech stack
- **Backend:** Python, FastAPI, Redis (sessions and caching), MySQL (questions, favourites, feedback, usage)
- **Frontend:** React, Vite, Microsoft Teams Adaptive Cards
- **AI services:** Hippo retrieval, GeniAIus text-to-SQL, server-sent event streaming
- **Deployment:** Docker, Kubernetes

## My contribution
I own the AskAPS application and integration layer: KnowledgeAI, TicketingAI, and MetricsAI integration; the Teams bot with Adaptive Cards, conversation state, and action dispatch; Redis-backed sessions; the shared FastAPI chat execution layer and service adapters; favourites, feedback, and usage events; retries and regression tests; and Docker packaging, Kubernetes compatibility, and release validation.

## Engineering highlights
**One backend, two channels.** Teams and the web app call the same FastAPI services. Only presentation is channel-specific; routing, state, caching, and business rules are shared, so both channels behave identically.

**Follow-up questions that keep their context.** I built a normalized SSE client for the analytics service that validates a single session ID and keeps refinement state separate from the original question. A follow-up sends only the selected refinement with that exact session, so filters and context survive every turn.

**Precise scoping.** KnowledgeAI combines weighted keywords with embedding similarity to pick document types, and asks the planner to choose when a match is ambiguous. Declarative MetricsAI profiles define each data source, its verified columns, and its filter rules.

**Deployed and maintained.** AskAPS runs internally at HPE and is actively maintained, with usage and feedback tracked.`,
    postedAt: updatedAt,
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    pinned: true,
    tags: ["FastAPI", "React", "Redis", "MySQL", "Microsoft Teams", "Kubernetes"],
  },
  {
    id: "clearweb",
    title: "ClearWeb — AI Dark-Pattern Detector for Checkout Pages",
    content:
      "A Chrome extension backed by a multi-agent AI system that exposes hidden fees, pre-ticked add-ons, subscription traps, and manipulative consent on checkout pages.",
    projectDetails: {
      context: "Chrome extension · Multi-agent AI",
      contribution:
        "Built the React extension, the FastAPI multi-agent backend on NVIDIA Nemotron, and an evidence verifier.",
      outcome:
        "Shows what you will actually pay, with every finding backed by exact text on the page.",
    },
    fullContent: `## Overview
ClearWeb is an AI shopping guardian. Open it on any checkout, payment, or cookie page, and three AI agents inspect the page, the site's official terms, and the prices in parallel. A larger model combines their results, and every claim is checked against exact on-page evidence before you see it.

It catches the tricks checkouts use to push up the price:

- Protection plans and add-ons that are already ticked
- Fees that only appear at the final step
- Free trials that renew automatically
- Cashback presented as if it were a discount
- EMI plans with hidden charges
- Cookie banners that make "accept all" the easy choice

It is built for online shoppers, with first-class support for Indian e-commerce and payment flows: UPI, EMI, and cashback.

## Features
- **Multi-agent analysis:** three specialist agents (page, official terms, prices) run concurrently, and an orchestrator model synthesizes their results.
- **Evidence-verified findings:** every amount and claim must match text captured from the page, down to word and number boundaries. Unsupported claims never reach the user as facts.
- **Charge breakdown:** amounts are grouped into what you pay now, fees and taxes, items, discounts, later benefits such as cashback, and list prices (MRP).
- **One-click fixes:** with your permission, ClearWeb switches off optional add-ons and marketing cookies, verifies the result, and offers Undo.
- **Three safety modes:** Observe (read-only), Assist (acts only after a click), and Auto-fix (enabled per site, limited to removing verified optional extras).
- **Live re-analysis:** page changes are hashed and debounced at 750 ms, so the analysis stays current while cosmetic changes cost nothing.
- **Workspace UI:** a draggable, resizable React panel with Page, Compare (up to four tabs), and Activity views, follow-up chat, a Ctrl/Cmd+K command palette, "Show on page" highlighting, light and dark themes, and reduced-motion support.

## How it works
1. **Capture.** The content script builds a redacted outline of every visible row and control on the page.
2. **Triage.** A fast Nemotron Lightning model selects the relevant blocks by ID only, so it can never introduce text. The selection is packed into a compact 6 KB snapshot, with totals, fees, and preselected options always kept.
3. **Analyze.** Three Nemotron Lightning workers analyze the page, the official terms, and the prices in parallel. Progress streams live to the UI as typed NDJSON events.
4. **Synthesize.** Nemotron Ultra reconciles the workers' findings, answers follow-up questions, and proposes actions from a fixed allowlist.
5. **Verify.** A deterministic verifier checks every amount with Decimal arithmetic, matches every quote to captured page text, and authorizes each action before the extension runs it.

## Tech stack
- **Extension:** TypeScript, React 19, Chrome Manifest V3 (service worker, content scripts, side panel, chrome.storage), esbuild
- **Backend:** Python, FastAPI, Pydantic v2, httpx (async), Uvicorn
- **AI:** NVIDIA Nemotron 3.5 Lightning (workers and triage) and Nemotron 3 Ultra (orchestrator) on Nebius, plus optional domain-restricted Tavily search
- **Data:** SQLite for the cost ledger and result cache
- **Infrastructure:** self-hosted through Cloudflare Tunnel, with TypeScript API contracts generated from OpenAPI
- **Testing:** pytest and Playwright

## Engineering highlights
**The AI never gets the last word.** The models propose findings; deterministic code decides what is shown. Quotes must match captured text exactly, a negative amount can never count as proof of a charge, and both 1,234.56 and 1.234,56 number formats are parsed correctly.

**Model output can't touch the page.** The extension never executes code or selectors that come from a model. Actions come from a fixed allowlist, can only switch things off, and are checked after they run. ClearWeb never pays, places orders, or accepts contracts.

**Privacy by design.** Emails, UPI IDs, card and payment fields, addresses, long digit sequences, tokens, form values, and cookies are redacted before anything leaves the browser. Raw HTML is never sent, and URLs are stripped of query strings.

**Built to run cheaply and reliably.** A SQLite ledger reserves the cost of every model call before dispatch, under a hard spending cap; a full page analysis costs about three cents. Per-page locks, per-tab session state, request deduplication, retries with backoff, and a rule-based fallback keep analysis stable across many tabs.

**Production-hardened API.** Every request needs an API key, with per-client rate limiting, 64 KB request limits, an LRU result cache, and timeouts on every model call.`,
    postedAt: "2026-09-29T00:00:00+05:30",
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["TypeScript", "React", "Chrome MV3", "FastAPI", "NVIDIA Nemotron", "SQLite"],
    github: "https://github.com/adxthyx/Clearweb",
  },
  {
    id: "reconcile",
    title: "Reconcile — Offline Expense Tracker for Android",
    content:
      "A native Android expense tracker that reads UPI and bank SMS, records every transaction automatically, and keeps budgets, card bills, and shared expenses in one offline app.",
    projectDetails: {
      context: "Android · Native app",
      contribution: "Built the full app: SMS parsing, duplicate detection, budgeting, card cycles, and the Compose UI.",
      outcome: "Automatic expense tracking that runs entirely on your phone, with no internet permission.",
    },
    fullContent: `## Overview
Reconcile is a native Android app that tracks spending automatically. It reads supported Indian bank and UPI transaction SMS, records income and expenses, and organizes them into budgets, accounts, and categories. Cash can be added by hand. Everything stays on the device: the app has no internet permission and no backend.

## Features
- **Automatic entry:** incoming and historical SMS are parsed into transactions, with duplicate and self-transfer detection.
- **Smart categories:** transactions are categorized automatically, and corrections are remembered for next time.
- **Budgets and goals:** monthly and per-category budgets with rollover, plus savings goals.
- **Credit cards:** bill cycles, due dates, and scheduled reminders.
- **Shared expenses:** track money others owe you and mark it settled.
- **Spending insights:** trends, top merchants, category breakdowns, recurring payments, and month-end projections.
- **Everyday Android:** home-screen widget, quick-add shortcut, CSV export, and light and dark themes.

## How it works
1. SMS messages pass through a Kotlin parser that extracts amount, account, merchant, and reference.
2. The repository checks for duplicates, assigns a category, and links the account before writing to Room.
3. ViewModels expose changes through Flow and StateFlow, and the Jetpack Compose UI updates live.

## Tech stack
- **Language:** Kotlin, Coroutines, Flow
- **UI:** Jetpack Compose, Material, Navigation Compose
- **Storage:** Room (financial records), DataStore (preferences)
- **Architecture:** MVVM with a repository layer
- **Testing:** JUnit, with 32 unit tests across SMS parsing, financial calculations, and reminder cycles

## Engineering highlights
**Accurate money math.** Amounts are stored as integer paise, so totals never drift from floating-point rounding.

**Reliable duplicate detection.** SMS fingerprints, transaction references, and time-based matching catch the same payment reported twice by a bank and a UPI app.

**Honest totals.** Transfers between your own accounts and excluded transactions stay out of spending figures, and shared expenses track what you are owed separately.

**Private by design.** With no internet permission and no hosted backend, financial data never leaves the phone.`,
    postedAt: updatedAt,
    type: "project",
    category: "mobile",
    flair: "Android",
    tags: ["Kotlin", "Jetpack Compose", "Room", "Coroutines", "JUnit"],
    github: "https://github.com/adxthyx/Reconcile",
  },
  {
    id: "rag-bench",
    title: "RAG-Bench — A Reproducible Retrieval Evaluation Framework",
    content:
      "A framework for benchmarking RAG retrieval pipelines: keyword, dense, hybrid, and reranked search compared on the same questions, with statistical significance and latency.",
    projectDetails: {
      context: "Search engineering · Evaluation framework",
      contribution:
        "Built config-driven experiments, retrieval pipelines, IR metrics, and statistical testing.",
      outcome:
        "Measured a 21% relative gain in Recall@5 from reranking on FiQA, statistically significant.",
    },
    fullContent: `## Overview
RAG-Bench is a Python framework for answering a practical question: which retrieval pipeline actually finds the right documents? It runs keyword, dense, hybrid, and reranked search on the same labeled questions, then reports quality, latency, and statistical confidence side by side.

## Features
- **Config-driven experiments:** YAML files choose the dataset, embedding model, chunker, fusion method, and reranker.
- **Full retrieval stack:** BM25 keyword search, BGE-M3 dense retrieval on Qdrant, Reciprocal Rank Fusion and weighted fusion, and a BGE cross-encoder reranker.
- **Standard IR metrics:** Recall@5/10/20, nDCG@10, and MRR@10, validated against pytrec_eval.
- **Statistical rigor:** 95% bootstrap confidence intervals with 10,000 resamples, and paired significance tests.
- **Reproducible runs:** every run saves its full configuration, hashes, Git commit, and per-query results.
- **Reports:** JSON results, CSV summaries, Markdown tables, plots, and an analysis notebook.

## How it works
1. A YAML config defines the pipeline under test.
2. Documents are chunked with one of four strategies and embedded, with embeddings cached in SQLite.
3. Each query runs through retrieval, optional fusion, and optional reranking of the top 50 candidates.
4. Chunk scores are max-pooled back to documents and scored against ground-truth relevance labels.
5. Results are compared across configurations with confidence intervals and significance tests.

## Tech stack
- **Language:** Python
- **Retrieval:** BM25, BGE-M3 embeddings, Qdrant, BGE cross-encoder reranker
- **Evaluation:** pytrec_eval, SciPy (bootstrap and Wilcoxon tests)
- **Storage:** SQLite embedding cache
- **Testing:** pytest

## Results
- **26 benchmark runs** across **4 datasets** (SciFact, NFCorpus, FiQA, and an English MLDR subset), covering **2,071 queries** and **67,654 documents**.
- On FiQA, reranking raised **Recall@5 from 0.353 to 0.427, a 21% relative improvement** across 648 queries (Wilcoxon p ≈ 1.6 × 10⁻¹⁰).
- On SciFact, the best pipeline reached **0.803 Recall@5** and **0.757 nDCG@10**.

[Inspect the configurations and per-query results](#benchmark-evidence) behind the FiQA comparison.

## Engineering highlights
**Diagnose, don't just score.** Candidate-pool Recall@50 separates "the document was never retrieved" from "the reranker ranked it poorly", pointing to which stage to fix.

**Fair document-level scoring.** Chunk results are deduplicated and max-pooled, so a document split into many chunks can't inflate the metrics.

**Fast and resumable.** Embeddings are cached by model and text hash, and results are written incrementally, so interrupted runs pick up where they stopped.`,
    postedAt: updatedAt,
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["Python", "BM25", "BGE-M3", "Qdrant", "SQLite", "SciPy", "pytest"],
    github: "https://github.com/adxthyx/RAG_Rerank",
  },
  {
    id: "chart-climber",
    title: "Chart Climber — Ride the Market",
    content:
      "A browser bike game where real stock and crypto price history becomes the terrain: rallies are climbs, crashes are downhill runs.",
    projectDetails: {
      context: "Browser game · Live",
      contribution:
        "Built terrain generation, bike physics, Canvas rendering, market-data integration, and leaderboards.",
      outcome: "A playable game across eight assets and four time ranges, on desktop and mobile.",
    },
    fullContent: `## Overview
Chart Climber turns market charts into a bike game. Pick a stock or cryptocurrency and a time range, and its real price history becomes the track: every rally is a hill to climb and every crash is a descent. Collect coins, manage fuel, land flips, and set a high score.

## Features
- **Eight assets** across US stocks, Indian stocks, and cryptocurrency.
- **Four time ranges,** from one month to five years.
- **Physics-based riding** with collisions, flips, and stunt scoring.
- **Coins and fuel** to keep each run strategic.
- **Global leaderboards** and saved personal bests.
- **Keyboard and touch controls,** with light and dark themes.

## How it works
1. Price history is fetched from CoinGecko or Twelve Data, with caching and bundled historical data as a fallback.
2. Percentage price changes are converted into terrain slopes, so every asset rides consistently whatever its price level.
3. Matter.js simulates the bike, and Canvas draws each frame with requestAnimationFrame and a tracking camera.
4. Scores are saved to a PostgreSQL leaderboard through Next.js API routes.

## Tech stack
- **Framework:** Next.js, React, TypeScript
- **Game engine:** Matter.js physics, HTML Canvas
- **State:** Zustand, localStorage for personal bests
- **Data:** Neon serverless PostgreSQL, CoinGecko and Twelve Data APIs

## Engineering highlights
**Fair terrain for every asset.** Building slopes from relative movement rather than absolute price means a $10 stock and a $60,000 coin produce comparable rides.

**Always playable.** Cached responses and bundled historical data keep the game running even when a market API fails.

**Clean separation.** Physics, rendering, state, and persistence are independent layers, which keeps the game loop fast and the code easy to extend.`,
    postedAt: updatedAt,
    type: "project",
    category: "webdev",
    flair: "Web Dev",
    tags: ["Next.js", "TypeScript", "Matter.js", "Canvas", "PostgreSQL"],
    github: "https://github.com/adxthyx/Chart-Climber",
    demo: "https://www.adithyaholla.com/chart",
  },
  {
    id: "github-quiz",
    title: "GitHub Code-Match Quiz",
    content:
      "A six-round quiz that shows you real code from a popular open-source project, with the giveaways hidden, and asks which repository it came from.",
    projectDetails: {
      context: "Web game · Next.js",
      contribution:
        "Built question generation, identifying-term redaction, balanced answer choices, and three lifelines.",
      outcome: "A complete six-round game with fresh snippets every play, lifelines, and a score recap.",
    },
    fullContent: `## Overview
GitHub Code-Match Quiz tests how well you can read unfamiliar code. Each round shows a real snippet from a popular open-source repository, with project names and identifying terms hidden, and you pick which repository it came from.

## Features
- **Six rounds** with fresh, randomly chosen repositories and code sections every game.
- **Syntax-highlighted snippets** that keep their original formatting.
- **Three lifelines,** once per game: remove two wrong answers, reveal more code, or show a redacted file-path hint.
- **Instant feedback,** progress tracking, and a final score recap with confetti.
- **Responsive design** with smooth animations and reduced-motion support.

## How it works
1. The server picks a repository and fetches a random source file from GitHub.
2. A section of code is selected and identifying terms such as project names are redacted, with formatting preserved.
3. Answer choices are drawn from repositories in the same language, so the language alone never gives it away.
4. Shiki renders the snippet, and the player chooses.

## Tech stack
- **Framework:** Next.js, React, TypeScript
- **Data:** GitHub REST API (server-side only)
- **UI:** Shiki syntax highlighting, Motion animations, Lucide icons, canvas-confetti

## Engineering highlights
**Fair questions.** Redaction removes the obvious giveaways, and same-language answer choices mean you have to read the code to get it right.

**Resilient generation.** Fallback files and replacement repositories keep the game going when a GitHub request fails.

**Secure by design.** All GitHub calls run on the server, so credentials never reach the browser.`,
    postedAt: updatedAt,
    type: "project",
    category: "webdev",
    flair: "Web Dev",
    tags: ["Next.js", "TypeScript", "GitHub API", "Shiki", "Motion"],
    github: "https://github.com/adxthyx/Github-Quiz",
  },
  {
    id: "repo-watch",
    title: "Repo Watch — GitHub Repository Monitor",
    content:
      "A full-stack dashboard that tracks a GitHub repository's issues, pull requests, and CI runs over time, with daily snapshots and trend charts.",
    projectDetails: {
      context: "Developer tooling · Full stack",
      contribution:
        "Built the Next.js dashboard, FastAPI metrics service, GitHub sync pipeline, and daily snapshots.",
      outcome: "Historical and live monitoring of repository health, set up for langfuse/langfuse.",
    },
    fullContent: `## Overview
Repo Watch is a monitoring dashboard for open-source repositories. It collects issues, pull requests, and CI workflow runs from GitHub, stores their full history, and shows how a project's backlog and build health change day by day. It is currently set up to monitor langfuse/langfuse.

## Features
- **Overview, Issues, Pull Requests, and CI pages** in one dashboard.
- **Daily trend charts** for backlog size, merge activity, and workflow failures.
- **Change detection** for closed issues, merged pull requests, and failed workflows.
- **Historical backfill** to build a baseline, plus scheduled and on-demand sync.
- **Daily metric snapshots** for repeatable, point-in-time reporting.

## How it works
1. A GitHub REST integration backfills the repository's history, handling pagination, rate limits, and retries.
2. APScheduler runs incremental syncs to keep data current.
3. Activity and daily snapshots are stored in PostgreSQL.
4. A FastAPI service exposes the metrics, and the Next.js dashboard renders them with Recharts.

## Tech stack
- **Frontend:** Next.js, React, Recharts
- **Backend:** Python, FastAPI, APScheduler
- **Database:** PostgreSQL, SQLAlchemy, Alembic migrations
- **Infrastructure:** Docker Compose
- **Testing:** pytest

## Engineering highlights
**Built for a changing API.** Pagination, rate-limit handling, and retries make syncing reliable against GitHub's limits.

**Durable history.** Snapshots preserve what the repository looked like each day, so trends stay accurate even as issues and pull requests change.

**Clean separation.** Collection, storage, API, and presentation are independent layers, with schema changes managed through Alembic migrations.`,
    postedAt: updatedAt,
    type: "project",
    category: "webdev",
    flair: "Web Dev",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "GitHub API", "Recharts"],
    github: "https://github.com/adxthyx/OSS_Dashboard",
  },
  {
    id: "web-rit",
    title: "RIT Student Portal — Campus in One Place",
    content:
      "A student portal that brought attendance, exam results, notes, and timetables together in one place, with a chatbot for attendance and grades. Used by classmates at RIT.",
    projectDetails: {
      context: "Solo project · Used by students",
      contribution:
        "Built the entire portal in my second semester, including scraping, result extraction, and a Rasa chatbot.",
      outcome: "Students used it for notes, exam preparation, and attendance checks.",
    },
    fullContent: `## Overview
At RIT, attendance, exam results, and timetables each lived on a different college website, and there was no central place for class notes. I built a single portal that brought all of it together, and students used it throughout the semester, especially around exams.

## Features
- **Attendance** at a glance, including how many more classes you can miss.
- **Exam results** extracted and shown in one view.
- **Class and examination timetables** across branches.
- **Notes and documents** organized for exam preparation.
- **Chatbot** answering around 50 kinds of questions, including attendance and grades.

## How it works
1. When a student logs in, Selenium automates sign-in to the college systems.
2. BeautifulSoup scrapes attendance, results, and timetables, and a result extractor parses them.
3. The portal shows everything in one place, refreshed at every login.
4. A Rasa chatbot answers questions from the same data.

## Tech stack
- **Language:** Python
- **Scraping and automation:** BeautifulSoup, Selenium
- **Chatbot:** Rasa

## Engineering highlights
**Built solo, used by real students.** I designed and built the whole portal myself in my second semester, and classmates relied on it for notes and attendance.

**Always current.** Data refreshes at each login, so students always see the latest from the source systems.

**Designed around student tasks.** The portal focused on what students actually needed, such as finding notes, preparing for exams, and knowing how many classes they could skip, rather than mirroring every official page.`,
    postedAt: updatedAt,
    type: "project",
    category: "webdev",
    flair: "Web Dev",
    tags: ["Python", "Rasa", "BeautifulSoup", "Selenium"],
  },
  {
    id: "web-ngo",
    title: "NGO Pitch Platform — HackBangalore Prototype",
    content:
      "A HackBangalore project connecting NGOs with potential donors. I built the AI pitch generator that turns a donor's interests into a tailored PowerPoint presentation.",
    projectDetails: {
      context: "HackBangalore · Team project",
      contribution: "Owned AI pitch generation and much of the Next.js user dashboard.",
      outcome: "Generates tailored, editable PowerPoint pitches from NGO and donor information.",
    },
    fullContent: `## Overview
Built at HackBangalore, this platform helps NGOs reach the right donors. The team gathered public information about NGOs, donors, past initiatives, and interests, then matched causes to supporters. For example, someone who had backed a lake cleanup could be matched with a river-restoration NGO. The platform then generates a pitch tailored to that donor.

## Features
- **AI-generated pitches** written around the donor's interests and history.
- **Editable PowerPoint output,** ready to refine and present.
- **Interest-based matching** between NGOs and potential donors.
- **User dashboard** for organizers and donors.

## How it works
1. The team collected public information from thousands of websites about NGOs, donors, and their past work.
2. Donors and NGOs were grouped by shared causes.
3. My pitch generator sent that context to the OpenAI API to write the presentation content.
4. python-pptx assembled the content into a PowerPoint deck.

## Tech stack
- **Frontend:** Next.js
- **AI:** OpenAI API
- **Presentation generation:** Python, python-pptx

## My contribution
I owned the **AI pitch generator**, from prompt design to PowerPoint assembly, and built much of the **Next.js user dashboard**.

## Engineering highlights
**A real deliverable, not a text box.** Generating an actual PowerPoint gives NGOs a presentation they can edit and use, not just a block of AI text.

**Context-aware content.** Each pitch is grounded in what the donor has supported before, so it speaks to their interests.`,
    postedAt: updatedAt,
    type: "project",
    category: "webdev",
    flair: "Web Dev",
    tags: ["Next.js", "OpenAI", "python-pptx", "Python"],
  },
  {
    id: "ai-vlm",
    title: "Assistive Device for the Blind using a Vision-Language Model",
    content:
      "A wearable assistive device that describes the user's surroundings aloud, using fine-tuned vision-language models to turn camera input into speech.",
    projectDetails: {
      context: "Computer vision · Assistive technology",
      contribution: "Fine-tuned MoonDream and BLIP models and built the camera-to-speech pipeline.",
      outcome: "A wearable prototype that describes the scene through an earphone.",
    },
    fullContent: `## Overview
This assistive device helps people who are blind or visually impaired understand their surroundings. A camera captures the scene, a vision-language model describes it, and the description is spoken through an earphone.

## Features
- **Scene descriptions** generated from live camera input.
- **Spoken output** delivered privately through an earphone.
- **Wearable design,** built to be used on the move.

## How it works
1. A webcam captures the user's surroundings.
2. A fine-tuned vision-language model generates a natural-language description.
3. Text-to-speech reads the description aloud through the earphone.

## Tech stack
- **Models:** MoonDream and BLIP vision-language models, fine-tuned
- **Pipeline:** Python, webcam capture, text-to-speech

## Engineering highlights
**Fine-tuned models.** I fine-tuned both MoonDream and BLIP to produce clear, useful scene descriptions.

**End-to-end loop.** Capture, description, and speech run as one continuous interaction, so the user hears what is in front of them without any interface to operate.`,
    postedAt: updatedAt,
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["MoonDream", "BLIP", "Computer Vision", "Text-to-speech"],
  },
  {
    id: "multicity-routing",
    title: "Multicity Vehicle Routing",
    content: "A hackathon project that plans vehicle routes across multiple cities, built and deployed during a college hackathon.",
    projectDetails: {
      context: "College hackathon",
      contribution: "Built a multicity vehicle-routing application.",
      outcome: "Deployed and working by the end of the hackathon.",
    },
    fullContent: `## Overview
Multicity Vehicle Routing plans routes for vehicles travelling across multiple cities. It was built during a college hackathon.

## Highlights
- Built and deployed a working application within the hackathon timeframe.
- Tackled a classic optimization problem: routing vehicles across several cities.`,
    postedAt: updatedAt,
    type: "project",
    category: "other",
    flair: "Routing",
  },
]
