"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Feed, type FilterKey } from "@/components/feed"
import { Sidebar, ProfileCard } from "@/components/sidebar"
import { PostModal } from "@/components/post-modal"
import { ContactModal } from "@/components/contact-modal"
import { AchievementsModal } from "@/components/achievements-modal"
import { StatsModal } from "@/components/stats-modal"
import { ProjectsModal } from "@/components/projects-modal"
import { SettingsModal } from "@/components/settings-modal"
import { ResumeModal } from "@/components/resume-modal"
import { allPosts, projects, profile, type Post } from "@/lib/content"
import { useVotes } from "@/lib/votes"
import type { GitHubStats, LeetCodeStats } from "@/lib/stats"

type ModalId = "contact" | "achievements" | "stats" | "projects" | "settings" | "resume"

export default function Portfolio() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [activeModal, setActiveModal] = useState<ModalId | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { votes, vote, karmaDelta } = useVotes()
  const karma = profile.baseKarma + karmaDelta

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

  const handleNavAction = (action: string) => {
    switch (action) {
      case "profile":
        setSelectedPost(allPosts[0])
        break
      case "home":
        window.scrollTo({ top: 0, behavior: "smooth" })
        setActiveFilter("all")
        setSearchQuery("")
        break
      case "achievements":
      case "stats":
      case "projects":
      case "settings":
      case "resume":
      case "contact":
        setActiveModal(action)
        break
    }
  }

  const modalProps = (id: ModalId) => ({
    open: activeModal === id,
    onOpenChange: (open: boolean) => setActiveModal(open ? id : null),
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Reset filter to "all" when searching to search across all content
    if (query.trim()) {
      setActiveFilter("all")
    }
  }

  return (
    <div className="min-h-screen bg-canvas transition-colors duration-300">
      <Header onNavAction={handleNavAction} onSearch={handleSearch} searchQuery={searchQuery} />

      {/* Mobile Profile Card - shown before posts on mobile */}
      <div className="lg:hidden px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          <ProfileCard karma={karma} onJoin={() => setActiveModal("contact")} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 p-3 sm:p-4">
        <main className="flex-1">
          <Feed
            posts={allPosts}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            onFilterChange={(filter) => {
              setActiveFilter(filter)
              setSearchQuery("")
            }}
            votes={votes}
            onVote={vote}
            onSelectPost={setSelectedPost}
          />
        </main>
        <aside className="hidden lg:block" aria-label="Profile and communities">
          <Sidebar karma={karma} onJoin={() => setActiveModal("contact")} />
        </aside>
      </div>

      {/* Mobile Sidebar - communities and highlights at bottom on mobile */}
      <div className="lg:hidden px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="max-w-7xl mx-auto">
          <Sidebar showProfile={false} />
        </div>
      </div>

      {/* Modals — always mounted so Radix can animate open/close */}
      <PostModal
        post={selectedPost}
        open={!!selectedPost}
        onOpenChange={(open) => !open && setSelectedPost(null)}
      />
      <ContactModal {...modalProps("contact")} />
      <AchievementsModal {...modalProps("achievements")} />
      <StatsModal
        {...modalProps("stats")}
        githubStats={githubStats}
        leetcodeStats={leetcodeStats}
        loading={statsLoading}
      />
      <ProjectsModal projects={projects} {...modalProps("projects")} />
      <SettingsModal {...modalProps("settings")} />
      <ResumeModal {...modalProps("resume")} />
    </div>
  )
}
