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
  pinned?: boolean
  tags?: string[]
  github?: string
  demo?: string
  awards?: string[]
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
  avatar: "/a.png",
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
    timeAgo: input.pinned ? "pinned" : timeAgo(input.postedAt),
  }
}

const about = definePost({
  id: "about",
  title: "About Me - Developer & Software Engineer",
  content: "Passionate full-stack developer with expertise in modern web technologies and AI/ML...",
  fullContent: `# About Me

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
Coolest project? Built an LLM-powered code reviewer. It's like having a senior dev review your code 24/7 without the judgment (mostly).

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
  pinned: true,
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
})

const aiml: Post[] = [
  definePost({
    id: "ai-1",
    title: "AI-Powered Code Review Assistant",
    content: "Built an intelligent code review system using GPT-4 and static analysis...",
    fullContent: `# AI-Powered Code Review Assistant

## 🎯 Project Overview
An intelligent code review system that automatically analyzes pull requests, suggests improvements, and identifies potential bugs using advanced AI models and static analysis tools.

## 🚀 Key Features
- **Automated Code Analysis**: Scans code for bugs, security vulnerabilities, and performance issues
- **AI-Powered Suggestions**: Uses GPT-4 to provide contextual improvement recommendations
- **Multi-Language Support**: Works with JavaScript, Python, Go, and Java
- **Integration Ready**: Seamlessly integrates with GitHub, GitLab, and Bitbucket
- **Learning System**: Improves suggestions based on team preferences and feedback

## 🛠️ Technical Implementation
- **Backend**: Python with FastAPI for high-performance API
- **AI Models**: OpenAI GPT-4 for natural language suggestions
- **Static Analysis**: ESLint, Pylint, and custom rule engines
- **Database**: PostgreSQL for storing analysis results and user feedback
- **Queue System**: Redis with Celery for processing large codebases
- **Frontend**: React dashboard for reviewing suggestions

## 📊 Impact & Results
- **50% reduction** in code review time
- **30% fewer bugs** reaching production
- **Adopted by 5 teams** with 100+ developers
- **95% accuracy** in identifying critical issues

## 🔗 Links
- [GitHub Repository](https://github.com/adxthyx/ai-code-reviewer)
- [Live Demo](https://ai-code-reviewer.vercel.app)
- [Documentation](https://docs.ai-code-reviewer.com)`,
    upvotes: 456,
    comments: 89,
    postedAt: "2026-06-10T11:00:00+05:30",
    type: "project",
    category: "aiml",
    tags: ["AI", "GPT-4", "Python", "FastAPI", "Code Analysis"],
    github: "https://github.com/adxthyx/ai-code-reviewer",
    demo: "https://ai-code-reviewer.vercel.app",
    awards: ["gold", "helpful"],
  }),
  definePost({
    id: "ai-2",
    title: "Smart Document Summarizer with NLP",
    content: "Advanced document processing system using transformer models for intelligent summarization...",
    fullContent: `# Smart Document Summarizer

## 🎯 Project Overview
An advanced document processing system that can intelligently summarize long documents, extract key insights, and generate actionable reports using state-of-the-art NLP models.

## 🚀 Key Features
- **Multi-Format Support**: PDF, DOCX, TXT, and web articles
- **Intelligent Summarization**: Extractive and abstractive summarization
- **Key Insight Extraction**: Identifies important facts, figures, and conclusions
- **Sentiment Analysis**: Analyzes document tone and sentiment
- **Multi-Language**: Supports 15+ languages
- **API Integration**: RESTful API for easy integration

## 🛠️ Technical Implementation
- **NLP Models**: BERT, T5, and custom transformer models
- **Backend**: Python with Django and Celery for async processing
- **Document Processing**: PyPDF2, python-docx, BeautifulSoup
- **ML Pipeline**: Hugging Face Transformers and custom training
- **Database**: MongoDB for document storage and metadata
- **Caching**: Redis for frequently accessed summaries

## 📊 Performance Metrics
- **Processing Speed**: 1000+ pages per minute
- **Accuracy**: 92% summary quality score
- **Languages Supported**: 15 languages
- **Documents Processed**: 50,000+ successfully

## 🔗 Links
- [GitHub Repository](https://github.com/adxthyx/doc-summarizer)
- [API Documentation](https://api.doc-summarizer.com/docs)`,
    upvotes: 298,
    comments: 67,
    postedAt: "2026-06-08T16:00:00+05:30",
    type: "project",
    category: "aiml",
    tags: ["NLP", "BERT", "Python", "Django", "Transformers"],
    github: "https://github.com/adxthyx/doc-summarizer",
  }),
]

const webdev: Post[] = [
  definePost({
    id: "web-1",
    title: "Real-time Collaborative Workspace Platform",
    content: "Built a Slack-like collaboration platform with real-time messaging, file sharing, and video calls...",
    fullContent: `# Real-time Collaborative Workspace

## 🎯 Project Overview
A comprehensive collaboration platform similar to Slack, featuring real-time messaging, file conferencing, and project management tools for remote teams.

## 🚀 Key Features
- **Real-time Messaging**: Instant messaging with typing indicators and read receipts
- **Video Conferencing**: Built-in video calls with screen sharing
- **File Sharing**: Drag-and-drop file uploads with preview support
- **Channel Management**: Public/private channels with role-based permissions
- **Search Functionality**: Full-text search across messages and files
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Technical Implementation
- **Frontend**: React with TypeScript and Tailwind CSS
- **Real-time**: Socket.io for instant messaging and notifications
- **Backend**: Node.js with Express and MongoDB
- **Video Calls**: WebRTC with PeerJS for peer-to-peer connections
- **File Storage**: AWS S3 with CloudFront CDN
- **Authentication**: JWT with refresh token rotation
- **Deployment**: Docker containers on AWS ECS

## 📊 Scale & Performance
- **Concurrent Users**: Supports 10,000+ simultaneous users
- **Message Throughput**: 100,000+ messages per minute
- **Uptime**: 99.9% availability
- **Global CDN**: Sub-100ms file loading worldwide

## 🔗 Links
- [GitHub Repository](https://github.com/adxthyx/collab-workspace)
- [Live Demo](https://workspace.adxthyx.dev)
- [Case Study](https://adxthyx.dev/case-studies/workspace)`,
    upvotes: 567,
    comments: 123,
    postedAt: "2026-06-11T10:00:00+05:30",
    type: "project",
    category: "webdev",
    tags: ["React", "Node.js", "Socket.io", "WebRTC", "AWS"],
    github: "https://github.com/adxthyx/collab-workspace",
    demo: "https://workspace.adxthyx.dev",
    awards: ["gold"],
  }),
  definePost({
    id: "web-2",
    title: "E-commerce Platform with Advanced Analytics",
    content:
      "Full-stack e-commerce solution with AI-powered recommendations and comprehensive analytics dashboard...",
    fullContent: `# E-commerce Platform with Analytics

## 🎯 Project Overview
A modern e-commerce platform featuring AI-powered product recommendations, advanced analytics, inventory management, and a comprehensive admin dashboard.

## 🚀 Key Features
- **Product Catalog**: Advanced filtering, search, and categorization
- **AI Recommendations**: Machine learning-powered product suggestions
- **Payment Processing**: Stripe integration with multiple payment methods
- **Inventory Management**: Real-time stock tracking and automated reordering
- **Analytics Dashboard**: Sales metrics, user behavior, and performance insights
- **Multi-vendor Support**: Marketplace functionality for multiple sellers

## 🛠️ Technical Implementation
- **Frontend**: Next.js with TypeScript and Chakra UI
- **Backend**: Node.js with Express and PostgreSQL
- **Payments**: Stripe API with webhook handling
- **Recommendations**: Python microservice with scikit-learn
- **Analytics**: Custom dashboard with Chart.js and D3.js
- **Search**: Elasticsearch for fast product discovery
- **Caching**: Redis for session management and caching

## 📊 Business Impact
- **Conversion Rate**: 15% increase with AI recommendations
- **Page Load Speed**: Under 2 seconds average load time
- **Mobile Traffic**: 70% of users on mobile devices
- **Revenue Growth**: 40% increase in average order value

## 🔗 Links
- [GitHub Repository](https://github.com/adxthyx/ecommerce-platform)
- [Live Demo](https://shop.adxthyx.dev)
- [Admin Dashboard](https://admin.shop.adxthyx.dev)`,
    upvotes: 423,
    comments: 87,
    postedAt: "2026-06-09T13:00:00+05:30",
    type: "project",
    category: "webdev",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Elasticsearch", "Analytics"],
    github: "https://github.com/adxthyx/ecommerce-platform",
    demo: "https://shop.adxthyx.dev",
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
