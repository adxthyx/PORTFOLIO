import { projectEntries } from "@/lib/project-content"

export interface Post {
  id: string
  title: string
  content: string
  fullContent: string
  subreddit: string
  author: string
  postedAt: string
  type: "about" | "experience" | "education" | "skills" | "project"
  category: "main" | "aiml" | "webdev" | "mobile" | "other"
  flair: string
  pinned?: boolean
  tags?: string[]
  github?: string
  demo?: string
  awards?: string[]
  faq?: { question: string; answer: string }
  archived?: boolean
  projectDetails?: {
    context: string
    contribution: string
    outcome: string
  }
}

export interface Profile {
  username: string
  displayName: string
  role: string
  subreddit: string
  cakeDay: string
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
  avatar: "/a.jpeg",
  resumePath: "/resume.pdf",
  links: {
    github: "https://github.com/adxthyx",
    linkedin: "https://linkedin.com/in/adxthyx",
    leetcode: "https://leetcode.com/u/adxthyx/",
    email: "adithyanarayana02@gmail.com",
  },
}

type PostInput = Omit<Post, "subreddit" | "author">

function definePost(input: PostInput): Post {
  return {
    ...input,
    subreddit: profile.subreddit,
    author: profile.username,
  }
}

const about = definePost({
  id: "about",
  title: "Hey, I'm Adithya. Ask me anything.",
  content:
    "Software engineer, AI tinkerer, and story-game enthusiast. Ask about my projects, life in Bengaluru, or why RDR2 is so hard to beat.",
  fullContent: `# Ask Me Anything

> Drop a question below — **u/adithya-bot** is an AI assistant that answers from this portfolio.

🎓 **The Academic Chapter**
I graduated from Ramaiah Institute of Technology, Bengaluru with a degree in AI & Machine Learning (Class of 2025). The journey was wild - late night debugging sessions, project deadlines that made me question my life choices, and somehow managing to build some cool stuff along the way.
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
My main project at HPE is AskAPS. I own the application and integration layer that brings existing document retrieval, ticket search, and analytics services into Microsoft Teams and the web.

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
  postedAt: "2026-06-11T14:00:00+05:30",
  type: "skills",
  category: "main",
  flair: "Skills",
})

const archivedProjects: Post[] = [
  definePost({
    id: "ai-kannada",
    archived: true,
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
    postedAt: "2026-06-06T12:00:00+05:30",
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["Deep Learning", "OCR", "Computer Vision", "EdTech"],
  }),
  definePost({
    id: "ai-attendance",
    archived: true,
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
    postedAt: "2026-06-04T10:00:00+05:30",
    type: "project",
    category: "aiml",
    flair: "AI/ML",
    tags: ["VGGFace", "HaarCascade", "Computer Vision", "Python"],
  }),
]

export const mainPosts: Post[] = [about, experience, education, skills]
export const projects: Post[] = projectEntries.map(definePost)
// Preserve existing article URLs while retiring old work from discovery.
export const allProjects: Post[] = [...projects, ...archivedProjects]
export const allPosts: Post[] = [...mainPosts, ...allProjects]

// Structured resume data for the recruiter-mode view. Same facts as the
// posts above, flattened for fast scanning.
export interface ResumeExperience {
  role: string
  company: string
  period: string
  location: string
  points: string[]
}

export interface ResumeEducation {
  degree: string
  school: string
  period: string
  detail: string
}

export interface ResumeSkillGroup {
  label: string
  skills: string[]
}

export interface ResumeData {
  location: string
  summary: string
  experience: ResumeExperience[]
  education: ResumeEducation[]
  skillGroups: ResumeSkillGroup[]
}

export const resume: ResumeData = {
  location: "Bengaluru, India",
  summary:
    "AI/ML software engineer at HPE building Gen AI and LLM applications — RAG pipelines, agentic workflows, and full-stack products with Python, FastAPI, and Next.js.",
  experience: [
    {
      role: "Software Engineer 1",
      company: "Hewlett Packard Enterprise",
      period: "Sept 2025 – Present",
      location: "Bengaluru, India",
      points: [
        "Building AI/ML solutions and web applications with Python and Next.js.",
        "Own the AskAPS application and integration layer: shared Teams/web workflows, scoped document and ticket retrieval, and natural-language analytics backed by existing HPE services.",
        "Built shared FastAPI execution, Teams Adaptive Cards, Redis-backed sessions, and reliable upstream streaming/refinement handling; contributed application packaging and release validation.",
      ],
    },
    {
      role: "Software Engineering Intern",
      company: "Hewlett Packard Enterprise",
      period: "Feb 2025 – Aug 2025",
      location: "Bengaluru, India",
      points: [
        "Built dashboards, agentic AI solutions, and Python automation for the Advanced Planning & Scheduling org.",
        "Converted to a full-time role at the end of the internship.",
      ],
    },
  ],
  education: [
    {
      degree: "B.E. in Artificial Intelligence & Machine Learning",
      school: "Ramaiah Institute of Technology, Bengaluru",
      period: "2021 – 2025",
      detail: "CGPA 8.8/10 · Senior project: LLM-powered solution for supply & demand planners",
    },
  ],
  skillGroups: [
    { label: "Languages", skills: ["Python", "TypeScript", "JavaScript", "SQL"] },
    { label: "Frontend", skills: ["Next.js", "React", "Tailwind CSS", "Streamlit"] },
    { label: "Backend", skills: ["FastAPI", "Flask", "Node.js", "REST API design"] },
    {
      label: "AI/ML",
      skills: [
        "LangChain",
        "RAG",
        "LLM applications",
        "Forecasting",
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
      ],
    },
    { label: "Data & Infra", skills: ["MongoDB", "Docker", "Kubernetes", "Vercel", "Git/GitHub"] },
  ],
}

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
