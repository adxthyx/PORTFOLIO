"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { PostCard } from "@/components/post-card"
import { Sidebar, ProfileCard } from "@/components/sidebar"
import { PostModal } from "@/components/post-modal"
import { ContactModal } from "@/components/contact-modal"
import { AchievementsModal } from "@/components/achievements-modal"
import { StatsModal } from "@/components/stats-modal"
import { ProjectsModal } from "@/components/projects-modal"
import { SettingsModal } from "@/components/settings-modal"
import { ResumeModal } from "@/components/resume-modal"
import { ThemeProvider } from "@/components/theme-provider"

interface GitHubStats {
  totalRepos: number
  totalCommits: number
  totalPRs: number
  totalStars: number
  totalForks: number
  followers: number
  following: number
  yearsActive: number
  currentStreak: number
  profileViews: number
  topLanguages: Array<{
    name: string
    percentage: number
    color: string
  }>
}

interface LeetCodeStats {
  totalSolved: number
  easy: number
  medium: number
  hard: number
  ranking: number
  languages: Array<{
    name: string
    solved: number
  }>
  userAvatar: string
  realName: string
}

const portfolioData = {
  about: {
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
    subreddit: "r/webdev",
    author: "u/adxthyx",
    timeAgo: "pinned",
    type: "about",
    category: "main",
  },
  experience: {
    id: "experience",
    title: "My Professional Journey - 5+ Years in Tech",
    content: "From junior developer to senior full-stack engineer, here's my career progression...",
    fullContent: `# Professional Experience

SWE-1 @ Hewlett Packard Enterprise
Sept 2025 - Present | Bengaluru, Karnataka**

Working as a Software Enginner focusing on AI/ML solutions and web applications using Python and NextJS.


Intern @ Hewlett Packard Enterprise
Feb 2025 - August 2025 | Bengaluru, Karnataka**

Started my professional journey building Dashboards and Agentic AI solution and Python Automation


echnologies Used:
HTML, CSS, JavaScript, PHP, MySQL, WordPress`,
    upvotes: 189,
    comments: 34,
    subreddit: "r/cscareerquestions",
    author: "u/adxthyx",
    timeAgo: "3h ago",
    type: "experience",
    category: "main",
  },
  education: {
    id: "education",
    title: "Education & Certifications - Building My Foundation",
    content: "Computer Science degree plus continuous learning through certifications...",
    fullContent: `# Education & Certifications

## 🎓 Bachelor of Engineering in Artificial Intelligence and Machine Learning
**Ramaiah Institute of Technology | 2021 - 2025**
- **CGPA:** 8.8/10.0
- **Relevant Coursework:** Data Structures, Algorithms, Database Systems, Software Engineering, Machine Learning
- **Senior Project:** LLM Powered Solution for Supply and Demand Planners and AI Powered CLI System

---

// ## 📜 Professional Certifications

// ### AWS Certified Solutions Architect
// **Amazon Web Services | 2023**
// - Cloud architecture and deployment
// - Scalable system design
// - Security best practices

// ### Google Cloud Professional Developer
// **Google Cloud Platform | 2022**
// - Application development on GCP
// - Containerization and orchestration
// - CI/CD implementation

// ### MongoDB Certified Developer
// **MongoDB University | 2021**
// - Database design and optimization
// - Aggregation framework
// - Performance tuning

// ---

// ## 📚 Continuous Learning

// ### Online Courses Completed:
// - **Machine Learning Specialization** - Stanford University (Coursera)
// - **Full Stack Web Development** - The Odin Project
// - **Advanced React Patterns** - Kent C. Dodds
// - **System Design Interview** - Grokking the System Design

// ### Workshops & Conferences:
// - **React Conf 2023** - Speaker on "Building Accessible Components"
// - **AI/ML Summit 2022** - Attendee
// - **DockerCon 2022** - Workshop participant
// - **Local Tech Meetups** - Regular attendee and occasional speaker

// ---

## 🏆 Academic Achievements
- Dean's List for 6 consecutive semesters
- Computer Science Department Outstanding Student Award
- Winner of University Hackathon 2018
- Published research paper on "Optimizing Neural Networks for Edge Computing"`,
    upvotes: 156,
    comments: 28,
    subreddit: "r/cscareerquestions",
    author: "u/adxthyx",
    timeAgo: "5h ago",
    type: "education",
    category: "main",
  },
  skills: {
    id: "skills",
    title: "My Tech Arsenal - Technologies I Master",
    content: "Frontend, Backend, AI/ML, DevOps - here's everything I work with...",
    fullContent: `# Technical Skills

## 💻 Frontend Development
### Expert Level:
- **React.js** - 4+ years, including hooks, context, and advanced patterns
- **TypeScript** - Strong typing, generics, and advanced type manipulation
- **Next.js** - SSR, SSG, API routes, and performance optimization
- **Tailwind CSS** - Utility-first styling and custom design systems

### Proficient:
- **Vue.js** - Composition API, Vuex, and component architecture
- **Angular** - Services, RxJS, and enterprise applications
- **Svelte** - Modern reactive framework
- **CSS/SASS** - Advanced animations and responsive design

---

## ⚙️ Backend Development
### Expert Level:
- **Node.js** - Express, Fastify, and microservices architecture
- **Python** - Django, Flask, and data processing
- **PostgreSQL** - Complex queries, optimization, and database design
- **MongoDB** - Document modeling and aggregation pipelines

### Proficient:
- **Python** - Concurrent programming and API development
- **JavaScript/TypeScript** - Development Projects
- **SQL** - Schema design and resolver optimization
- **REST APIs** - Design patterns and best practices

---

## 🤖 AI/ML & Data Science
### Machine Learning:
- **TensorFlow** - Neural networks and deep learning
- **PyTorch** - Research and production models
- **Scikit-learn** - Classical ML algorithms
- **Pandas/NumPy** - Data manipulation and analysis

### Specialized Areas:
- **Natural Language Processing** - Text analysis and chatbots
- **Computer Vision** - Image recognition and processing
- **Time Series Analysis** - Forecasting and anomaly detection

---

## ☁️ DevOps & Cloud
### Cloud Platforms:
- **AWS** - EC2, S3, Lambda, RDS, CloudFormation
- **Google Cloud** - Compute Engine, Cloud Functions, BigQuery
- **Vercel** - Deployment and edge functions

### DevOps Tools:
- **Docker** - Containerization and multi-stage builds
- **Kubernetes** - Orchestration and scaling
- **GitHub Actions** - CI/CD pipelines
- **Terraform** - Infrastructure as code

---

## 🛠️ Tools & Methodologies
- **Git** - Advanced workflows and collaboration
- **Agile/Scrum** - Sprint planning and retrospectives
- **Testing** - Jest, Cypress, pytest, TDD practices
- **Monitoring** - Datadog, New Relic, custom dashboards`,
    upvotes: 234,
    comments: 45,
    subreddit: "r/programming",
    author: "u/adxthyx",
    timeAgo: "1d ago",
    type: "skills",
    category: "main",
  },
}

const projectsData = {
  aiml: [
    {
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
      subreddit: "r/MachineLearning",
      author: "u/adxthyx",
      timeAgo: "2d ago",
      type: "project",
      category: "aiml",
      tags: ["AI", "GPT-4", "Python", "FastAPI", "Code Analysis"],
      github: "https://github.com/adxthyx/ai-code-reviewer",
      demo: "https://ai-code-reviewer.vercel.app",
      interactionType: "modal",
    },
    {
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
      subreddit: "r/MachineLearning",
      author: "u/adxthyx",
      timeAgo: "4d ago",
      type: "project",
      category: "aiml",
      tags: ["NLP", "BERT", "Python", "Django", "Transformers"],
      github: "https://github.com/adxthyx/doc-summarizer",
      interactionType: "accordion",
    },
  ],
  webdev: [
    {
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
      subreddit: "r/webdev",
      author: "u/adxthyx",
      timeAgo: "1d ago",
      type: "project",
      category: "webdev",
      tags: ["React", "Node.js", "Socket.io", "WebRTC", "AWS"],
      github: "https://github.com/adxthyx/collab-workspace",
      demo: "https://workspace.adxthyx.dev",
      interactionType: "slidePanel",
    },
    {
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
      subreddit: "r/webdev",
      author: "u/adxthyx",
      timeAgo: "3d ago",
      type: "project",
      category: "webdev",
      tags: ["Next.js", "PostgreSQL", "Stripe", "Elasticsearch", "Analytics"],
      github: "https://github.com/adxthyx/ecommerce-platform",
      demo: "https://shop.adxthyx.dev",
      interactionType: "cardFlip",
    },
  ],
}

export default function Portfolio() {
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showContact, setShowContact] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Pre-load stats data
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  // Load stats data on component mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Load GitHub stats
        const githubResponse = await fetch("/api/github-stats")
        if (githubResponse.ok) {
          const githubData = await githubResponse.json()
          setGithubStats(githubData)
        }

        // Load LeetCode stats
        const leetcodeResponse = await fetch("/api/leetcode-stats")
        if (leetcodeResponse.ok) {
          const leetcodeData = await leetcodeResponse.json()
          setLeetcodeStats(leetcodeData)
        }
      } catch (error) {
        console.error("Failed to load stats:", error)
      } finally {
        setStatsLoading(false)
      }
    }

    loadStats()
  }, [])

  const allProjects = [...projectsData.aiml, ...projectsData.webdev]
  const allPosts = [
    portfolioData.about,
    portfolioData.experience,
    portfolioData.education,
    portfolioData.skills,
    ...allProjects,
  ]

  // Search function
  const searchPosts = (posts: any[], query: string) => {
    if (!query.trim()) return posts

    const searchTerm = query.toLowerCase().trim()

    return posts.filter((post) => {
      // Search in title
      if (post.title.toLowerCase().includes(searchTerm)) return true

      // Search in content
      if (post.content.toLowerCase().includes(searchTerm)) return true

      // Search in full content
      if (post.fullContent.toLowerCase().includes(searchTerm)) return true

      // Search in tags (for projects)
      if (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))) return true

      return false
    })
  }

  const getFilteredContent = () => {
    let posts
    switch (activeFilter) {
      case "aiml":
        posts = projectsData.aiml
        break
      case "webdev":
        posts = projectsData.webdev
        break
      case "main":
        posts = [portfolioData.about, portfolioData.experience, portfolioData.education, portfolioData.skills]
        break
      default:
        posts = allPosts
    }

    return searchPosts(posts, searchQuery)
  }

  const handleNavAction = (action: string) => {
    switch (action) {
      case "achievements":
        setShowAchievements(true)
        break
      case "stats":
        setShowStats(true)
        break
      case "projects":
        setShowProjects(true)
        break
      case "settings":
        setShowSettings(true)
        break
      case "profile":
        setSelectedPost(portfolioData.about)
        break
      case "resume":
        setShowResume(true)
        break
      case "contact":
        setShowContact(true)
        break
      case "home":
        window.scrollTo({ top: 0, behavior: "smooth" })
        setActiveFilter("all")
        setSearchQuery("")
        break
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Reset filter to "all" when searching to search across all content
    if (query.trim()) {
      setActiveFilter("all")
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#dae0e6] dark:bg-gray-900 transition-colors duration-300">
        <Header onNavAction={handleNavAction} onSearch={handleSearch} searchQuery={searchQuery} />
        
        {/* Mobile Profile Card - shown before posts on mobile */}
        <div className="lg:hidden px-3 sm:px-4 pt-3 sm:pt-4">
          <div className="max-w-7xl mx-auto">
            <ProfileCard />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 p-3 sm:p-4">
          <div className="flex-1 space-y-3 sm:space-y-4">
            {/* Filter Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 transition-colors duration-300">
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {[
                  { key: "all", label: "All Posts", icon: "🏠" },
                  { key: "main", label: "About & Skills", icon: "👤" },
                  { key: "aiml", label: "AI/ML Projects", icon: "🤖" },
                  { key: "webdev", label: "Web Development", icon: "💻" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => {
                      setActiveFilter(filter.key)
                      setSearchQuery("")
                    }}
                    className={`flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 px-1 sm:px-2 md:px-3 py-1.5 sm:py-2 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium transition-all duration-200 ${
                      activeFilter === filter.key
                        ? "bg-[#FF4500] text-white shadow-lg transform scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-102"
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{filter.icon}</span>
                    <span className="truncate leading-tight">{filter.label}</span>
                  </button>
                ))}
              </div>
              {searchQuery && (
                <div className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Showing results for: <span className="font-medium text-[#FF4500]">"{searchQuery}"</span>
                </div>
              )}
            </div>

            {/* Filtered Content */}
            {getFilteredContent().length > 0 ? (
              getFilteredContent().map((item) => (
                <PostCard key={item.id} {...item} onClick={() => setSelectedPost(item)} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors duration-300">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? `No posts found matching "${searchQuery}". Try different keywords.`
                    : "No posts available in this category."}
                </p>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>

        {/* Mobile Sidebar - Tech Communities and Recent Activity at bottom on mobile */}
        <div className="lg:hidden px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="max-w-7xl mx-auto">
            <Sidebar />
          </div>
        </div>

        {/* Modals */}
        {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
        {showContact && <ContactModal onClose={() => setShowContact(false)} />}
        {showAchievements && <AchievementsModal onClose={() => setShowAchievements(false)} />}
        {showStats && (
          <StatsModal
            onClose={() => setShowStats(false)}
            githubStats={githubStats}
            leetcodeStats={leetcodeStats}
            loading={statsLoading}
          />
        )}
        {showProjects && <ProjectsModal projects={allProjects} onClose={() => setShowProjects(false)} />}
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </div>
    </ThemeProvider>
  )
}
