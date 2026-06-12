import { formatDistanceToNowStrict, parseISO } from "date-fns"

export interface Post {
  id: string
  title: string
  content: string
  fullContent: string
  upvotes: number
  comments: number
  subreddit: string
  author: string
  postedAt: string
  timeAgo: string
  type: string
  category: "main" | "aiml" | "webdev"
  flair: string
  pinned?: boolean
  tags?: string[]
  github?: string
  demo?: string
  awards?: string[]
  faq?: { question: string; answer: string }
}

export interface Profile {
  username: string
  displayName: string
  role: string
  subreddit: string
  cakeDay: string
  baseKarma: number
  avatar: string
  resumePath: string
  links: {
    github: string
    linkedin: string
    leetcode: string
    email: string
  }
}

export const profile: Profile = {
  username: "u/adxthyx",
  displayName: "Adithya Narayana Holla",
  role: "Software Engineer @ HPE · AI/ML",
  subreddit: "r/adithya",
  cakeDay: "2025-09-01",
  baseKarma: 2847,
  avatar: "/a.jpeg",
  resumePath: "/resume.pdf",
  links: {
    github: "https://github.com/adxthyx",
    linkedin: "https://linkedin.com/in/adxthyx",
    leetcode: "https://leetcode.com/u/adxthyx/",
    email: "adithyanarayana02@gmail.com",
  },
}

export function timeAgo(postedAt: string): string {
  return formatDistanceToNowStrict(parseISO(postedAt), { addSuffix: true })
}

type PostInput = Omit<Post, "timeAgo" | "subreddit" | "author">

function definePost(input: PostInput): Post {
  return {
    ...input,
    subreddit: profile.subreddit,
    author: profile.username,
    timeAgo: timeAgo(input.postedAt),
  }
}

const about = definePost({
  id: "about",
  title: "I'm Adithya — AI/ML Software Engineer @ HPE. Ask Me Anything.",
  content:
    "Fresh AI & ML grad, now building Gen AI / LLM things full-time at HPE. AMA about my work, my projects, or why tea is a war crime. (There's a u/adithya-bot in the comments that answers as me — go poke it.)",
  fullContent: `# Ask Me Anything

> Drop a question in the comments — **u/adithya-bot** answers as me, trained on everything below.

🎓 **The Academic Chapter**
Just graduated from Ramaiah Institute of Technology, Bengaluru with a degree in AI & Machine Learning (Class of 2025). The journey was wild - late night debugging sessions, project deadlines that made me question my life choices, and somehow managing to build some cool stuff along the way.
Spent Feb-Aug 2025 as a Software Engineering Intern at HPE India, and now I've transitioned to a full-time role there. Still feels surreal that I'm getting paid to write code.

💻 **What I Actually Do**
I'm all about AI, Gen AI, and Forecasting. There's something addictive about building models that can predict stuff or generate content. LLMs are my current obsession - especially building practical applications with them.
My comfort zone: Python, NextJS, FastAPI, Flask, JS, Streamlit (and honestly, too many more to list without sounding like I'm padding my resume 😅).

**Tech Stack Preference:**
**Frontend:** NextJS/ReactJS (I'm a frontend guy at heart)
**Backend:** FastAPI (Python gang rise up)
**Databases:** SQL and MongoDB (currently deepening my DBMS knowledge)
**AI Stuff:** LangChain for LLM applications

If I had to pick my favorite tech combo: NextJS + FastAPI. Fast, modern, scalable. Chef's kiss.
Coolest project? AskAPS — a multi-module AI assistant I built for HPE's supply chain planners that lives right inside Microsoft Teams. RAG over docs, similarity search over tickets, and natural-language-to-SQL for metrics, all from one chat box.

🏍️ **When I'm Not Coding**

**The Active Stuff:**
Bike riding - Nothing beats the feeling of wind in your face on a Bangalore highway
Trekking/Hiking - Weekends are for nearby hill stations. Recently got into this and I'm hooked
Sports - Football, badminton, cricket. Down to play anything, honestly
Traveling - Sometimes. When the bank account allows it

**The Indoor Stuff:**
Gaming - BIG into story mode games. GTA 5, RDR2, Uncharted series, Spider-Man series, God of War series. If it has a good story, I'm playing it. Also FC25 (FIFA) when I want to rage quit
Movies - Movie nights with friends are sacred
Reading - Just started getting into books. Currently on self-help (I know, typical tech bro). Planning to dive into fantasy if I can build the habit

**Music While Coding:**
It's chaotic, honestly. Sometimes Kannada songs, otherwise English pop. Completely random - depends on the vibe and the bug I'm trying to fix.
🌍 **Where I'm From**
Originally from Belthangady (near Mangalore), currently based in Bangalore.
Languages: Kannada, Tulu, Hindi (fluently) + can understand Tamil (thanks, Bangalore).

☕ **Hot Takes & Random Facts**
Coffee > Tea (Tea is a big NO. Both the drink and the gossip kind)
Dark mode supremacy. Light mode users, why do you hate your eyes?
Tabs > Spaces (fight me)
I'm a vegetarian - one of the few things I'm picky about
Got 2 Dachshund dogs (yes, the sausage dogs - they're adorable)
Setup: MacBook for personal projects, Windows for office work. Trying to be a minimalist but failing slowly
I'm extremely random. Down to try anything except food experiments (see: vegetarian)
Social paradox: Sometimes love being alone, but get irritated if I'm alone too long 🤷‍♂️

🎯 **What I'm About**
Just started my career journey
Amateur at everything, expert at nothing (yet)
Active on social media but never post.
Want to contribute to open source but haven't taken the plunge yet

**The Goal:**
I want to be the person everyone admires and seeks help from. That guy who knows his stuff and can actually help when someone's stuck. Building that reputation one project at a time.
🚀 **What I'm Learning**
Right now focusing on:

ReactJS (getting really good at this)
DBMS - SQL and MongoDB depth
LangChain - for building better LLM applications
Generally trying to go from "it works" to "it works well"

📫 **Let's Connect**
I'm active on GitHub, LinkedIn, and here on Reddit. Always down to discuss tech, swap project ideas, or debate why RDR2 has the best story in gaming history.
If you're working on something cool or need help with AI/web dev stuff, hit me up. Still learning, but happy to figure things out together.`,
  upvotes: 342,
  comments: 67,
  postedAt: "2026-05-01T10:00:00+05:30",
  type: "about",
  category: "main",
  flair: "AMA",
  pinned: true,
  faq: {
    question: "Coffee or tea?",
    answer: "Coffee. Always coffee. Tea is a big NO — both the drink and the gossip kind. ☕",
  },
})

const experience = definePost({
  id: "experience",
  title: "My Professional Journey - From Intern to SWE @ HPE",
  content: "Started as an intern, now building AI/ML solutions full-time at Hewlett Packard Enterprise...",
  fullContent: `# Professional Experience

## SWE-1 @ Hewlett Packard Enterprise
**Sept 2025 - Present | Bengaluru, Karnataka**

Working as a Software Engineer focusing on AI/ML solutions and web applications using Python and NextJS.

---

## Intern @ Hewlett Packard Enterprise
**Feb 2025 - August 2025 | Bengaluru, Karnataka**

Started my professional journey building dashboards, Agentic AI solutions, and Python automation.

---

**Technologies Used:**
Python, NextJS, FastAPI, Streamlit, SQL, LangChain`,
  upvotes: 189,
  comments: 34,
  postedAt: "2026-06-12T09:00:00+05:30",
  type: "experience",
  category: "main",
  flair: "Experience",
})

const education = definePost({
  id: "education",
  title: "Education - Building My Foundation",
  content: "AI & Machine Learning degree from Ramaiah Institute of Technology, Bengaluru...",
  fullContent: `# Education

## 🎓 Bachelor of Engineering in Artificial Intelligence and Machine Learning
**Ramaiah Institute of Technology | 2021 - 2025**
- **CGPA:** 8.8/10.0
- **Relevant Coursework:** Data Structures, Algorithms, Database Systems, Software Engineering, Machine Learning
- **Senior Project:** LLM Powered Solution for Supply and Demand Planners and AI Powered CLI System`,
  upvotes: 156,
  comments: 28,
  postedAt: "2026-06-12T07:00:00+05:30",
  type: "education",
  category: "main",
  flair: "Education",
})

const skills = definePost({
  id: "skills",
  title: "My Tech Arsenal - What I Actually Use",
  content: "Python, NextJS, FastAPI, LangChain - the tools I reach for every day...",
  fullContent: `# Technical Skills

## 💻 Frontend Development
### Daily Drivers:
- **Next.js / React** - My frontend home base; hooks, app router, server components
- **TypeScript** - Typed everything, fewer 3am bugs
- **Tailwind CSS** - Utility-first styling and custom design systems
- **Streamlit** - Quick ML demos and internal dashboards

---

## ⚙️ Backend Development
### Daily Drivers:
- **Python** - My primary language; automation, APIs, data work
- **FastAPI** - Fast, modern, typed APIs (favorite combo with NextJS)
- **Flask** - Lightweight services and quick prototypes

### Working Knowledge:
- **Node.js** - Comfortable when the project calls for it
- **REST API design** - Versioning, auth, sensible error handling

---

## 🤖 AI/ML & Data
### Focus Areas:
- **LLM Applications** - LangChain, RAG pipelines, agentic workflows
- **Gen AI** - Prompt engineering and LLM-powered tools
- **Forecasting** - Time series analysis and demand prediction
- **Classical ML** - Scikit-learn, Pandas, NumPy from my AI/ML degree
- **Deep Learning** - TensorFlow and PyTorch fundamentals

---

## 🗄️ Databases
- **SQL** - Schema design and query optimization (actively deepening this)
- **MongoDB** - Document modeling and aggregation pipelines

---

## 🛠️ Tools & Workflow
- **Git/GitHub** - Branching workflows and collaboration
- **Docker** - Containerized dev and deployment
- **Vercel** - Frontend deployment and edge functions
- **Agile** - Sprints, standups, the whole HPE workflow`,
  upvotes: 234,
  comments: 45,
  postedAt: "2026-06-11T14:00:00+05:30",
  type: "skills",
  category: "main",
  flair: "Skills",
})

const aiml: Post[] = [
  definePost({
    id: "ai-askaps",
    title: "AskAPS — AI Assistant for HPE Supply Chain Planning",
    content:
      "My main project at HPE. A multi-module AI assistant that lives inside Microsoft Teams and lets supply chain planners query docs, tickets, and metrics in natural language — without leaving their workflow.",
    fullContent: `# AskAPS — AI Assistant for HPE Supply Chain Planning

## 🎯 What it is
A production, multi-module AI assistant built for HPE's Advanced Planning & Scheduling (APS) supply chain team. Deployed on Microsoft Teams, it lets planners query documents, tickets, and metrics in natural language without leaving their workflow.

## 🧩 Modules

### KnowledgeAI
RAG pipeline over SharePoint documents. A COT/DOE service auto-tags documents based on folder and file structure using an LLM — so tagging is automated, not manual. Planners ask questions and get answers grounded in actual internal documentation.

### TicketingAI
Similarity search against Monday.com tickets. Routes queries through \`hippo_search\` with domain identifiers — \`sp\` for supply planning, \`dp\` for demand planning. The same query interface serves two different planning domains with separate ticket corpora.

### MetricsAI / BOA
Natural language to SQL. A planner types a question about supply chain metrics; it generates and runs SQL, then streams the result back via SSE. No need to know the schema or write queries by hand.

## 🛠️ Architecture
- **FastAPI backend** — a single app handling both Teams Bot Framework requests and AskAPS module logic
- **No separate HTTP hop** between the bot layer and the AI logic — direct function calls within the same app
- **Adaptive Cards** for responses — ColumnSet tables for structured data, monospace blocks for SQL, accent colors per module
- **SSE streaming** for MetricsAI / BOA responses
- **Auth** via Bearer token through HPE's One AI ITG API Hub
- **Deployed on Kubernetes**
- **Secrets** managed via Vault

## 💡 Why it matters
Supply chain planners normally context-switch between SharePoint, Monday.com, and BI dashboards to answer a single question. AskAPS collapses that into one Teams message. The three modules cover the three most common query types — "what does this doc say", "has this been raised before", and "show me the numbers" — all from one interface, in natural language.

*Internal HPE project — no public repository.*`,
    upvotes: 512,
    comments: 94,
    postedAt: "2026-06-10T11:00:00+05:30",
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["RAG", "FastAPI", "LLM", "NL-to-SQL", "Kubernetes", "Teams"],
  }),
  definePost({
    id: "ai-vlm",
    title: "Assistive Device for the Blind using a Vision-Language Model",
    content:
      "Finetuned MoonDream and BLIP vision-language models and wired them into a wearable setup (webcam + earphone) to describe surroundings to blind users in realtime.",
    fullContent: `# Assistive Device for the Blind using a VLM

## 🎯 Project Overview
A wearable assistive system that helps blind users understand their surroundings in realtime by describing what a camera sees, out loud.

## 🚀 What it does
- Captures the scene from a head/body-mounted **webcam**
- Runs it through a **vision-language model** to generate a natural description
- Speaks the description back through an **earphone** — all in realtime

## 🛠️ Technical Implementation
- **Models**: Finetuned **MoonDream** and **BLIP** for scene description and visual question answering
- **Hardware loop**: Webcam input → VLM inference → text-to-speech → earphone output
- **Target**: A mobile-friendly architecture so the whole pipeline can run close to the user

## 💡 Why it matters
Off-the-shelf VLMs are heavy and verbose. Finetuning smaller models like MoonDream made realtime, on-the-go description practical for an assistive wearable instead of a lab demo.`,
    upvotes: 387,
    comments: 58,
    postedAt: "2026-06-08T16:00:00+05:30",
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["VLM", "MoonDream", "BLIP", "Computer Vision", "Accessibility"],
  }),
  definePost({
    id: "ai-kannada",
    title: "Regional Language (Kannada) Handwritten Character Recognition",
    content:
      "Built a model to recognize handwritten Kannada characters, then wrapped it in a gamified website that teaches children the language.",
    fullContent: `# Kannada Handwritten Character Recognition

## 🎯 Project Overview
A team project to recognize handwritten **Kannada** characters and turn it into an interactive, gamified way for children to learn the language.

## 🚀 What it does
- Recognizes handwritten Kannada characters from user input
- Powers an **interactive learning website** where children trace and write characters
- **Gamified experience** — learning the script feels like play, not drills

## 🛠️ Technical Implementation
- **Model**: Trained a character-recognition model on handwritten Kannada samples
- **Frontend**: Interactive web app for drawing and immediate feedback
- **Collaboration**: Built with classmates, coordinating the model and the learning experience

## 💡 Why it matters
Regional Indian scripts are underrepresented in handwriting datasets and tooling. Pairing recognition with a kids' learning game makes the tech useful for language preservation, not just a benchmark.`,
    upvotes: 264,
    comments: 41,
    postedAt: "2026-06-06T12:00:00+05:30",
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["Deep Learning", "OCR", "Computer Vision", "EdTech"],
  }),
  definePost({
    id: "ai-attendance",
    title: "Attendance Tracker via Face Recognition",
    content:
      "Built a face-recognition ML model (VGGFace + HaarCascade) that detects every person in a classroom photo and marks attendance automatically.",
    fullContent: `# Attendance Tracker / Face Recognition

## 🎯 Project Overview
An automated attendance system that recognizes every student in a single classroom image and updates the register dynamically.

## 🚀 What it does
- Takes one photo of the class
- **Detects** every face in the frame
- **Recognizes** each person and marks them present — no roll call

## 🛠️ Technical Implementation
- **Face detection**: HaarCascade to locate every face in the image
- **Face recognition**: VGGFace embeddings to identify each detected person
- **Attendance**: Matches recognized faces against the class roster and updates records dynamically

## 💡 Why it matters
Manual attendance for a full class is slow and error-prone. One photo and a detection + recognition pipeline turns it into a few seconds of work.`,
    upvotes: 231,
    comments: 37,
    postedAt: "2026-06-04T10:00:00+05:30",
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["VGGFace", "HaarCascade", "Computer Vision", "Python"],
  }),
]

const webdev: Post[] = [
  definePost({
    id: "web-ngo",
    title: "SaaS Platform for NGOs — Investor Matching + AI Pitch Decks",
    content:
      "Full-stack Next.js platform that helps NGOs find investors via semantic search, and auto-generates pitch presentations using OpenAI and python-pptx.",
    fullContent: `# SaaS Platform for NGOs

## 🎯 Project Overview
A full-stack Next.js platform that connects NGOs with potential investors and helps them pitch — using semantic search to find the right matches and AI to build the deck.

## 🚀 Key Features
- **Semantic investor search** — NGOs describe their mission and get matched to relevant investors by meaning, not just keywords
- **AI pitch presentations** — generates dynamic pitch decks using **OpenAI** for content and **python-pptx** to assemble the slides
- **Activity dashboard** — tracks NGO activity and manages connections between NGOs and investors

## 🛠️ Technical Implementation
- **Frontend & app**: Full-stack **Next.js**
- **Matching**: Semantic search over investor/NGO profiles
- **Pitch generation**: OpenAI for slide content + **python-pptx** for the actual \`.pptx\` output
- **Dashboard**: Tracks activities and surfaces NGO ↔ investor connections

## 💡 Why it matters
Small NGOs rarely have the time or design skills to court investors. This collapses "find the right investor" and "make a convincing pitch" into a single tool.`,
    upvotes: 298,
    comments: 52,
    postedAt: "2026-06-09T13:00:00+05:30",
    type: "project",
    category: "webdev",
    flair: "Web Dev",
    tags: ["Next.js", "OpenAI", "python-pptx", "Semantic Search", "SaaS"],
  }),
  definePost({
    id: "web-rit",
    title: "Minimalist Student Portal for RIT — with Chatbot",
    content:
      "A clean student portal for RIT students with an integrated chatbot. Scrapes data with BeautifulSoup, auto-logs-in via Selenium, and answers questions about grades, attendance, events, and timetables.",
    fullContent: `# Minimalist Student Portal for RIT (with Chatbot)

## 🎯 Project Overview
A minimalist portal for Ramaiah Institute of Technology students that pulls together everything scattered across the official systems — grades, attendance, events, timetables — behind one clean interface and a chatbot.

## 🚀 Key Features
- **Minimalist dashboard** for the data students actually check
- **Integrated chatbot** that answers questions about grades, attendance, events, and timetables
- **Auto-login** so students don't re-enter credentials every time

## 🛠️ Technical Implementation
- **Data extraction**: **BeautifulSoup** to scrape data from the institute's systems
- **Automation**: **Selenium** for automated logins
- **Chatbot**: Connected to a database so it can answer queries about grades, attendance, events, and timetables on demand

## 💡 Why it matters
The official portals are clunky and split across pages. This puts the day-to-day info one question away, in a UI that doesn't fight you.`,
    upvotes: 276,
    comments: 48,
    postedAt: "2026-06-07T15:00:00+05:30",
    type: "project",
    category: "webdev",
    flair: "Web Dev",
    tags: ["Python", "BeautifulSoup", "Selenium", "Chatbot", "Web Scraping"],
  }),
]

export const mainPosts: Post[] = [about, experience, education, skills]
export const projects: Post[] = [...aiml, ...webdev]
export const allPosts: Post[] = [...mainPosts, ...projects]

export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) return posts

  const searchTerm = query.toLowerCase().trim()

  return posts.filter((post) => {
    if (post.title.toLowerCase().includes(searchTerm)) return true
    if (post.content.toLowerCase().includes(searchTerm)) return true
    if (post.fullContent.toLowerCase().includes(searchTerm)) return true
    if (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))) return true
    return false
  })
}
