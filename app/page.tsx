"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Feed, type FilterKey } from "@/components/feed"
import { Sidebar, ProfileCard } from "@/components/sidebar"
import type { ModalId } from "@/components/command-palette"
import { allPosts, projects, profile, type Post } from "@/lib/content"
import { useVotes } from "@/lib/votes"
import type { GitHubStats, LeetCodeStats } from "@/lib/stats"

// Modals are interaction-only: load each chunk on first open, then keep it
// mounted so Radix close animations still run.
const PostModal = dynamic(() => import("@/components/post-modal").then((m) => m.PostModal), { ssr: false })
const ContactModal = dynamic(() => import("@/components/contact-modal").then((m) => m.ContactModal), { ssr: false })
const AchievementsModal = dynamic(
  () => import("@/components/achievements-modal").then((m) => m.AchievementsModal),
  { ssr: false },
)
const StatsModal = dynamic(() => import("@/components/stats-modal").then((m) => m.StatsModal), { ssr: false })
const ProjectsModal = dynamic(() => import("@/components/projects-modal").then((m) => m.ProjectsModal), { ssr: false })
const SettingsModal = dynamic(() => import("@/components/settings-modal").then((m) => m.SettingsModal), { ssr: false })
const ResumeModal = dynamic(() => import("@/components/resume-modal").then((m) => m.ResumeModal), { ssr: false })
const CommandPalette = dynamic(() => import("@/components/command-palette").then((m) => m.CommandPalette), {
  ssr: false,
})

export default function Portfolio() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [activeModal, setActiveModal] = useState<ModalId | null>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { votes, vote, karmaDelta } = useVotes()
  const karma = profile.baseKarma + karmaDelta

  // Defer each modal's chunk until first open, then keep it mounted for exit animations
  const opened = useRef(new Set<string>())
  if (selectedPost) opened.current.add("post")
  if (activeModal) opened.current.add(activeModal)
  if (paletteOpen) opened.current.add("palette")

  // Global ⌘K / Ctrl+K — lives here, not in the lazily-loaded palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

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
      <Header
        onNavAction={handleNavAction}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {/* Mobile Profile Card - shown before posts on mobile */}
      <div className="lg:hidden px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          <ProfileCard
            karma={karma}
            onJoin={() => setActiveModal("contact")}
            onResume={() => setActiveModal("resume")}
            onAskAI={() => setSelectedPost(allPosts[0])}
          />
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
            keyboardEnabled={!selectedPost && !activeModal && !paletteOpen}
          />
        </main>
        <aside className="hidden lg:block" aria-label="Profile and communities">
          <Sidebar
            karma={karma}
            onJoin={() => setActiveModal("contact")}
            onResume={() => setActiveModal("resume")}
            onAskAI={() => setSelectedPost(allPosts[0])}
          />
        </aside>
      </div>

      {/* Mobile Sidebar - communities and highlights at bottom on mobile */}
      <div className="lg:hidden px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="max-w-7xl mx-auto">
          <Sidebar showProfile={false} />
        </div>
      </div>

      {/* Modals — chunk loads on first open, stays mounted after for close animations */}
      {opened.current.has("post") && (
        <PostModal post={selectedPost} open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)} />
      )}
      {opened.current.has("contact") && <ContactModal {...modalProps("contact")} />}
      {opened.current.has("achievements") && <AchievementsModal {...modalProps("achievements")} />}
      {opened.current.has("stats") && (
        <StatsModal
          {...modalProps("stats")}
          githubStats={githubStats}
          leetcodeStats={leetcodeStats}
          loading={statsLoading}
        />
      )}
      {opened.current.has("projects") && <ProjectsModal projects={projects} {...modalProps("projects")} />}
      {opened.current.has("settings") && <SettingsModal {...modalProps("settings")} />}
      {opened.current.has("resume") && <ResumeModal {...modalProps("resume")} />}
      {opened.current.has("palette") && (
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          onSelectPost={setSelectedPost}
          onModal={setActiveModal}
        />
      )}
    </div>
  )
}
