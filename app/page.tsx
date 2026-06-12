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
import { allPosts, mainPosts, projects, searchPosts, type Post } from "@/lib/content"
import type { GitHubStats, LeetCodeStats } from "@/lib/stats"

export default function Portfolio() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
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

  useEffect(() => {
    const loadStats = async () => {
      try {
        const githubResponse = await fetch("/api/github-stats")
        if (githubResponse.ok) {
          const githubData = await githubResponse.json()
          setGithubStats(githubData)
        }

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

  const getFilteredContent = () => {
    let posts: Post[]
    switch (activeFilter) {
      case "aiml":
        posts = projects.filter((p) => p.category === "aiml")
        break
      case "webdev":
        posts = projects.filter((p) => p.category === "webdev")
        break
      case "main":
        posts = mainPosts
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
        setSelectedPost(allPosts[0])
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
    <div className="min-h-screen bg-[#dae0e6] dark:bg-gray-900 transition-colors duration-300">
      <Header onNavAction={handleNavAction} onSearch={handleSearch} searchQuery={searchQuery} />

      {/* Mobile Profile Card - shown before posts on mobile */}
      <div className="lg:hidden px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          <ProfileCard />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 p-3 sm:p-4">
        <main className="flex-1 space-y-3 sm:space-y-4">
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
        </main>
        <aside className="hidden lg:block" aria-label="Profile and communities">
          <Sidebar />
        </aside>
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
      {showProjects && <ProjectsModal projects={projects} onClose={() => setShowProjects(false)} />}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </div>
  )
}
