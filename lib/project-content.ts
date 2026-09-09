import type { Post } from "@/lib/content"

// Project facts supplied by Adithya. Dates below are write-up updates, not launch dates.
// FiQA figures were checked against saved artifacts in ../rag-bench; benchmarks were not rerun.
const updatedAt = "2026-09-08T00:00:00+05:30"

export const projectEntries: Omit<Post, "subreddit" | "author">[] = [
  {
    id: "ai-askaps",
    title: "AskAPS — AI Assistant for HPE Supply Chain Planning",
    content:
      "Planning answers were scattered across dashboards, docs, and tickets. I brought that investigation into Teams and the web.",
    projectDetails: {
      context: "HPE · Actively maintained",
      contribution:
        "Connected Teams and the web to planning services, with filters and reliable follow-up questions.",
      outcome: "Planners can find documentation, related tickets, and planning figures in one place.",
    },
    fullContent: `## Problem
Planning and materials-management teams had to move between dashboards, documentation repositories, and ticketing tools to investigate a question.

For example: **“Which root-cause category is contributing the most to the current error?”** A planner would select the reporting period and product filters, choose the relevant fields, run or export a report, and group the rows. Understanding a root-cause definition or finding a related support ticket required another search in another system.

## My contribution
I owned the **AskAPS application and integration layer**, connecting the Teams and web experiences to existing AI and planning services. My work included:

- **KnowledgeAI:** domain routing, hybrid document-type classification, scoped retrieval, normalized source links, page citations, and refinement handling.
- **TicketingAI:** routing to the correct planning ticket repository, scoped searches, related documentation prefetch, result cards, and ticket-raising destinations.
- **MetricsAI:** workspace profiles, verified field bindings, filters, stateful refinements, result tables, pagination, caching, and email export.
- **Teams and backend:** Adaptive Cards, conversation state, action dispatch, Redis-backed sessions, shared FastAPI chat execution, service adapters, favourites, feedback, usage events, retries, and regression tests.
- **Release integration:** application Docker packaging, environment integration, Kubernetes compatibility, and release validation.

Hippo supplies document and ticket retrieval; GeniAIus supplies text-to-SQL analytics. Those services and the underlying AI, database, identity, and deployment platforms were existing systems or shared responsibilities. Teammates also contributed to the initial Vault, design-system, and CI/CD setup.

## Key decisions
**Share execution across channels.** Teams and the React/Vite web app call application services in one FastAPI application. Presentation stays channel-specific while routing, state, repositories, caching, and business rules stay consistent.

**Treat a refinement as a continuation.** The hardest integration problem was handling different upstream streaming events without losing the question, filters, or session. I built a normalized GeniAIus SSE client, validated a single session ID, and kept refinement state separate from the original question. A continuation sends only the selected refinement value with that exact session ID. Missing or conflicting sessions fail closed with a retry path. Focused tests cover session reuse, filter persistence, domain refinements, and new Teams questions.

**Make scope explicit.** KnowledgeAI combines weighted keywords and embedding similarity to select document types; ambiguous matches ask the planner to choose. Declarative MetricsAI profiles define the data source, verified physical columns, and filter rules. The analytical request includes required fields before it reaches the upstream service.

**Normalize streaming at the backend.** The application consumes upstream progress, refinement, result, and error events, then returns ordinary JSON to Teams and the web. Redis handles cache and session state; MySQL stores durable questions, favourites, feedback, and usage events.

## Outcome
Planners can now investigate documents, support tickets, and planning data from a single Teams or web interface.

- Deployed internally at HPE and actively maintained.
- Source citations, follow-up questions, tables, exports, and saved questions support the investigation.

Usage and feedback are tracked. Published production KPIs are not yet available.`,
    postedAt: updatedAt,
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    pinned: true,
    tags: ["FastAPI", "React", "Redis", "MySQL", "Microsoft Teams", "Kubernetes"],
  },
  {
    id: "reconcile",
    title: "Reconcile — Offline Expense Tracker for Android",
    content:
      "Keeping track of UPI, bank, card, and cash payments takes work. Reconcile reads payment messages and keeps your spending organized, all on your phone.",
    projectDetails: {
      context: "Android · Completed app",
      contribution: "Built automatic expense entry, duplicate checks, and a clear view of everyday spending.",
      outcome: "Budgets, card bills, and shared expenses, saved on your device and available offline.",
    },
    fullContent: `## Problem
Manual expense tracking becomes harder when payments are spread across UPI, bank accounts, credit cards, and cash. Duplicate messages, self-transfers, and shared expenses can also make spending totals misleading.

## My contribution
I built Reconcile, a native Android app that reads supported Indian bank and UPI transaction SMS, records income and expenses, and allows manual cash entries.

The application covers the complete workflow: transaction search and editing, automatic categories that remember corrections, account linking, monthly and category budgets, rollover, savings goals, credit-card bill cycles and reminders, and money owed by others. Spending views show trends, merchants, category breakdowns, recurring payments, and month-end projections.

## Key decisions
**Process and store locally.** Incoming and historical SMS pass through a Kotlin parser. The repository checks duplicates, assigns categories, and links accounts before writing to Room. ViewModels expose changes through Flow and StateFlow to the Compose interface. The app has no internet permission and needs no hosted backend.

**Protect the accounting.** Financial amounts are stored as integer paise to avoid floating-point storage errors. SMS fingerprints, transaction references, and time-based matching help detect duplicates. Transfers and excluded transactions can be kept out of spending totals; shared expenses track the amount owed and its settlement.

**Fit Android's everyday workflows.** The app includes a home-screen widget, quick-add shortcut, CSV export, light and dark themes, and scheduled credit-card reminders. DataStore holds preferences, while Room holds financial records.

## Outcome
A completed expense-tracking app brings automated entry, budgeting, card management, shared expenses, and financial review together offline. The repository includes 32 unit tests covering SMS parsing, financial calculations, reminder cycles, and seed data.

SMS capture depends on supported message formats. The project demonstrates the delivered application and its local architecture; no adoption or financial-benefit metric is claimed.`,
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
      "Which search approach finds the most useful documents? RAG-Bench compares them on the same questions and shows how much extra time each needs.",
    projectDetails: {
      context: "Search engineering · Completed framework",
      contribution:
        "Built repeatable search comparisons and checked quality, response time, and statistical confidence.",
      outcome:
        "A 21% relative improvement in finding relevant documents among the first five results on FiQA.",
    },
    fullContent: `## Problem
Choosing a retrieval pipeline involves tradeoffs that a polished chat demo cannot settle. Keyword, semantic, and hybrid search can behave differently across domains; reranking can improve quality while adding latency. Chunking can change both the candidate pool and the ranking.

## My contribution
I built a Python command-line framework for controlled retrieval experiments with ground-truth relevance labels. YAML configurations select datasets, models, chunkers, fusion methods, and rerankers. The runner saves full configurations, hashes, Git commit identifiers, corpus counts, and per-query measurements, then generates JSON results, CSV summaries, Markdown tables, plots, and an analysis notebook.

The saved benchmark collection contains **26 runs across four datasets and 2,071 distinct evaluation queries**: SciFact, NFCorpus, FiQA, and a constructed English MLDR subset. Together the evaluated corpora contain 67,654 documents. The MLDR subset contains relevant passages and selected hard negatives; it is not the full corpus.

## Key decisions
**Compare retrieval stages separately.** BM25 provides keyword retrieval; BGE-M3 embeddings and local Qdrant provide dense retrieval. Reciprocal Rank Fusion and normalized weighted fusion combine rankings. An optional BGE cross-encoder reranks the top 50 candidates. Candidate-pool Recall@50 helps distinguish missing documents from poor reranking.

**Evaluate documents, not duplicate chunks.** Four chunking approaches are exercised through five configurations. Chunk scores are max-pooled and deduplicated to match document-level relevance labels. Metrics include Recall@5/10/20, nDCG@10, and MRR@10, with checks against pytrec_eval.

**Make experiments repeatable.** SQLite caches document and query embeddings in model-specific namespaces using text hashes. Incremental writes preserve progress during interrupted jobs. The evaluation supports 95% bootstrap confidence intervals with 10,000 resamples and paired significance tests. Behavioral tests cover fusion, chunking invariants, metrics, and a miniature-dataset smoke run.

## Outcome
The saved FiQA runs show **Recall@5 rising from 0.353 for RRF hybrid retrieval to 0.427 with reranking: a 21.0% relative improvement across 648 queries**. The paired Wilcoxon result is approximately p = 1.6 × 10⁻¹⁰.

[Inspect the configurations and saved per-query results](#benchmark-evidence) behind this comparison.

The results also challenge simple assumptions: dense retrieval alone reached 0.399 on FiQA, above plain RRF's 0.353. Hybrid plus reranking recorded the highest Recall@5 on the three BEIR datasets, but did not lead every metric, and improvements were not significant on every dataset. SciFact reached 0.803 Recall@5 and 0.757 nDCG@10. Fixed 256-token chunks reached 0.964 Recall@5 on the constructed MLDR subset; that score should not be generalized to full MLDR.

**The tradeoff matters.** Local reranking recorded roughly 14–16 seconds p95 latency on the documented 8 GB Apple Silicon setup. Query embeddings were cached, so these are not cold-request production timings. Recorded zero-dollar costs mean no model API charges, not free compute.

These figures come from saved benchmark artifacts, not a new benchmark run for this portfolio. The framework evaluates retrieval quality, not generated-answer quality; its use cases are potential applications, not enterprise deployment claims.`,
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
      "Historical stock and crypto charts become bike-game terrain: price rises form climbs, and falls become downhill runs.",
    projectDetails: {
      context: "Browser game · Playable online",
      contribution:
        "Built terrain generation, bike physics, Canvas rendering, market-data integration, and leaderboards.",
      outcome: "Eight assets, four time ranges, and keyboard or touch play with historical-data fallbacks.",
    },
    fullContent: `## Problem
Market charts communicate movement visually. I wanted to make that movement playable: a price climb becomes a hill, and a market drop becomes a descent in a browser-based bike game.

## My contribution
I built a terrain generator that converts percentage price movements into consistent slopes across assets, along with bike physics, collision detection, stunt scoring, camera tracking, and Canvas rendering. The game includes coins, fuel, flips, asset selection, keyboard and mobile touch controls, and light and dark themes.

I also integrated market-data APIs, caching, historical-data fallbacks, PostgreSQL-backed leaderboards, and locally saved personal bests.

## Key decisions
**Normalize percentage changes.** Terrain is based on relative movement, so assets at different price levels can produce comparable riding conditions.

**Keep the game playable when data fails.** CoinGecko and Twelve Data are backed by caching and bundled historical JSON. A failed upstream request does not have to end a game session.

**Separate rendering, physics, and persistence.** Matter.js handles physics while Canvas and requestAnimationFrame draw the game. Zustand manages application state, localStorage keeps personal bests, and Neon PostgreSQL stores leaderboard entries through Next.js API routes.

## Outcome
A playable browser game supports eight assets across US stocks, Indian stocks, and cryptocurrency, with four ranges from one month to five years. Visitors can try the deployed game directly from this case study.`,
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
      "Can you identify an open-source project from its code? A six-round quiz hides the obvious clues and tests how you read unfamiliar source.",
    projectDetails: {
      context: "Web game · Completed project",
      contribution:
        "Built question generation, identifying-term redaction, balanced answer choices, and three lifelines.",
      outcome: "A complete six-round game with fresh snippets, feedback, and a score recap.",
    },
    fullContent: `## Problem
Recognizing a repository name is easier than recognizing its code. This game turns reading unfamiliar source into a short quiz, with identifying terms hidden so the answer requires a closer look.

## My contribution
I built a server-side pipeline that fetches GitHub source files and creates questions from randomized repositories and code sections. The interface presents six multiple-choice rounds, syntax-highlighted snippets, answer feedback, progress, and a final score recap.

Three once-per-game lifelines remove two wrong answers, reveal more code, or show a redacted file-path hint.

## Key decisions
**Remove accidental giveaways.** Redaction hides project names and identifying terms while retaining code formatting. Answer choices use the same programming language so language alone cannot reveal the repository.

**Recover from missing sources.** Fallback files and replacement repositories keep question generation moving when GitHub requests fail. Credentials stay on the server.

**Keep code readable on different screens.** Shiki provides syntax highlighting; the responsive interface supports reduced motion alongside its animations.

## Outcome
A completed Next.js game combines fresh source-based questions, fairer answer choices, lifelines, and an end-of-game recap. The repository is available to inspect; no player-count or learning-effectiveness metric is claimed.`,
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
      "Issues, pull requests, and CI failures tell different parts of a repository's story. Repo Watch collects them into one dashboard with daily trends.",
    projectDetails: {
      context: "Developer tooling · Completed project",
      contribution:
        "Built the dashboard, FastAPI metrics service, GitHub synchronization, and daily database snapshots.",
      outcome:
        "Historical and incremental repository monitoring, currently configured for langfuse/langfuse.",
    },
    fullContent: `## Problem
Understanding an open-source repository's activity means checking its issue backlog, pending pull requests, workflow runs, and how those change over time. Separate lists make that history harder to follow.

## My contribution
I built Repo Watch, a full-stack repository monitoring dashboard with overview, issues, pull requests, and CI pages. A FastAPI service exposes metrics from PostgreSQL, and a GitHub REST integration collects source activity. The project is currently configured for langfuse/langfuse.

The data pipeline supports historical backfills, scheduled updates, and manual synchronization. It detects changes including issue closures, merged pull requests, and failed workflows, and stores repeatable daily metric snapshots.

## Key decisions
**Handle the API as a changing source.** Collection includes pagination, rate-limit handling, and retries. Historical backfills establish the baseline, while incremental synchronization updates the evolving repository state.

**Keep durable history.** PostgreSQL and SQLAlchemy store activity and snapshots, with Alembic migrations for schema changes. Automated tests cover data processing.

**Separate collection from presentation.** APScheduler handles scheduled work in the Python backend; the Next.js interface uses Recharts to display daily trends and workflow summaries.

## Outcome
A completed dashboard brings repository backlogs, pull requests, CI failures, and historical trends together. Monitoring a public repository is the implemented use case; this is not a claim that the Langfuse maintainers use or endorse the tool.`,
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
      "Attendance, results, notes, and timetables lived on different sites. I built a central portal that classmates used to prepare for exams and check attendance.",
    projectDetails: {
      context: "Solo college project · Retired",
      contribution:
        "Built the full portal in my second semester, including scraping, result extraction, and a Rasa chatbot.",
      outcome: "Used by students for notes, exam preparation, and attendance checks before retirement.",
    },
    fullContent: `## Problem
RIT's student information was scattered across separate attendance, examination, and timetable sites, with no central place for class notes and documents. Finding routine information meant knowing which system to open.

## My contribution
I built the complete portal myself during my second semester. It brought together notes, attendance, exam results, examination timetables, and regular class timetables across branches.

The project included a result extractor, data scraping with BeautifulSoup, login automation with Selenium, and a Rasa-based chatbot that handled roughly 50 question types, including attendance and grades.

## Key decisions
**Refresh at login.** Student data updated when someone logged in, keeping the experience tied to the latest available source data.

**Build around actual student tasks.** The portal emphasized finding notes, preparing for exams, and understanding attendance—including how many classes a student could miss—rather than reproducing every official page.

**Treat scraping as ongoing maintenance.** I repeatedly tested extraction for accuracy. Source pages changed every few weeks or months as classes and layouts changed, and those changes required fixes to the app.

## Outcome
Students beyond the development effort used the portal, particularly around exams, for notes and attendance checks. I do not have a measured user count to publish.

I retired it around my fifth or sixth semester when maintaining the changing source integrations became too time-consuming. It was a useful student-facing product, and a direct lesson in the maintenance cost of depending on scraped interfaces.`,
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
      "A hackathon team built a way to connect NGOs and potential donors. My part turned their interests and background into tailored pitch presentations.",
    projectDetails: {
      context: "Team hackathon · Working prototype",
      contribution: "Owned AI pitch generation and much of the Next.js user dashboard.",
      outcome: "Generated tailored PowerPoint pitches from collected NGO and donor information.",
    },
    fullContent: `## Problem
An NGO approaching a potential donor needs to explain how its work connects to that donor's interests. Finding that background and preparing a relevant pitch are separate, time-consuming tasks.

## My contribution
Our team built a working prototype for HackBangalore. I owned the **AI-powered pitch generator** and much of the **Next.js user dashboard**.

I used the OpenAI API to generate presentation content and python-pptx to assemble PowerPoint files. Organizers and potential donors could tailor pitches using the information collected about the other party.

## Key decisions
**Use interests as context.** The team collected public information from thousands of websites about NGOs, donors, past initiatives, and interests. Someone who had supported river or lake cleanup, for example, could be grouped with that cause. That research informed matching and pitch generation.

**Deliver an editable artifact.** Combining generated content with python-pptx produced a presentation people could revise, rather than only showing a block of generated text.

**Keep ownership clear.** My contribution was pitch generation and dashboard work. The wider data collection and matching effort belonged to the team.

## Outcome
We delivered a working hackathon prototype that generated tailored presentations. No NGOs used it in practice, and we stopped development when placements and other college commitments took priority. The outcome is the prototype, not validated matching quality or donor adoption.`,
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
      "A camera-to-audio assistive prototype uses vision-language models to describe a scene aloud through an earphone.",
    projectDetails: {
      context: "Computer vision · Assistive prototype",
      contribution: "Fine-tuned MoonDream and BLIP models and connected camera input to spoken descriptions.",
      outcome:
        "A wearable camera → model → audio prototype; user-study and latency results are not published.",
    },
    fullContent: `## Problem
Visual surroundings can contain information that is difficult to access without sight. This project explores describing camera input through audio in a wearable setup.

## My contribution
I fine-tuned MoonDream and BLIP vision-language models and connected a webcam-to-model-to-speech pipeline, with descriptions played through an earphone.

## Key decisions
The pipeline connects scene capture, language generation, and text-to-speech in one interaction loop. The design targets a wearable, mobile-friendly setup so descriptions can be heard close to the user.

## Outcome
The delivered work is an assistive prototype. No measured latency, user-study findings, or validated accessibility outcome is published here. Those would be needed to assess its practical usefulness beyond the demonstrated pipeline.`,
    postedAt: updatedAt,
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["MoonDream", "BLIP", "Computer Vision", "Text-to-speech"],
  },
  {
    id: "multicity-routing",
    title: "Multicity Vehicle Routing",
    content:
      "A college hackathon project exploring vehicle routing across multiple cities. The application was deployed and working; it is now inactive.",
    projectDetails: {
      context: "College hackathon · Inactive",
      contribution: "Built a multicity vehicle-routing project for a college hackathon.",
      outcome: "Reached a working deployment before becoming inactive.",
    },
    fullContent: `## Project overview
A college hackathon project focused on vehicle routing across multiple cities.

## Outcome
The application reached a working deployment. It is now inactive.`,
    postedAt: updatedAt,
    type: "project",
    category: "other",
    flair: "Routing",
  },
]
