"use client"

import { useCallback, useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Feed } from "@/components/feed"
import { Sidebar } from "@/components/sidebar"
import { CommunityHeader } from "@/components/community-header"
import { SiteFooter } from "@/components/site-footer"
import { RecruiterView } from "@/components/recruiter-view"
import type { ModalId } from "@/components/command-palette"
import { allPosts, projects } from "@/lib/content"
import { useSaved } from "@/lib/saved"
import { useAchievements } from "@/lib/achievements"
import { usePortfolioNavigation } from "@/lib/use-portfolio-navigation"
import { useCodingStats } from "@/lib/use-coding-stats"
import { useFeedPreferences } from "@/lib/use-feed-preferences"

// Modals are interaction-only: load each chunk on first open, then keep it
// mounted so Radix close animations still run.
const PostModal = dynamic(() => import("@/components/post-modal").then((m) => m.PostModal), { ssr: false })
const ContactModal = dynamic(() => import("@/components/contact-modal").then((m) => m.ContactModal), {
  ssr: false,
})
const AchievementsModal = dynamic(
  () => import("@/components/achievements-modal").then((m) => m.AchievementsModal),
  { ssr: false },
)
const StatsModal = dynamic(() => import("@/components/stats-modal").then((m) => m.StatsModal), { ssr: false })
const ProjectsModal = dynamic(() => import("@/components/projects-modal").then((m) => m.ProjectsModal), {
  ssr: false,
})
const SettingsModal = dynamic(() => import("@/components/settings-modal").then((m) => m.SettingsModal), {
  ssr: false,
})
const ResumeModal = dynamic(() => import("@/components/resume-modal").then((m) => m.ResumeModal), {
  ssr: false,
})
const CommandPalette = dynamic(() => import("@/components/command-palette").then((m) => m.CommandPalette), {
  ssr: false,
})

export default function Portfolio() {
  const {
    selectedPost,
    setSelectedPost,
    activeModal,
    setActiveModal,
    closeModal,
    recruiterMode,
    setRecruiterMode,
  } = usePortfolioNavigation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const {
    filter: activeFilter,
    query: searchQuery,
    sort: sortMode,
    update: updateFeed,
  } = useFeedPreferences()
  const { savedIds, toggleSave } = useSaved()
  const { unlockedIds, unlock } = useAchievements()
  const {
    githubStats,
    leetcodeStats,
    loading: statsLoading,
    retry: retryStats,
  } = useCodingStats(activeModal === "stats")

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
        unlock("shortcut-pro")
        setPaletteOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [unlock])

  // Achievement: browsing in the dead of night
  useEffect(() => {
    if (new Date().getHours() < 5) unlock("night-owl")
  }, [unlock])

  const handleToggleSave = useCallback(
    (postId: string) => {
      if (!savedIds.includes(postId)) unlock("saver")
      toggleSave(postId)
    },
    [savedIds, toggleSave, unlock],
  )

  const toggleRecruiter = () => {
    const next = !recruiterMode
    setRecruiterMode(next)
    if (next) unlock("recruiter")
  }

  const openPalette = () => {
    unlock("shortcut-pro")
    setPaletteOpen(true)
  }

  const handleNavAction = (action: string) => {
    switch (action) {
      case "profile":
        setSelectedPost(allPosts[0])
        break
      case "home":
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })
        updateFeed({ filter: "all", query: "", sort: "featured" })
        setRecruiterMode(false)
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
    onOpenChange: (open: boolean) => (open ? setActiveModal(id) : closeModal(id)),
  })

  const handleSearch = (query: string) => {
    updateFeed({ query: query.slice(0, 500), ...(query.trim() ? { filter: "all" } : {}) })
    // Reset the category when searching across the project collection;
    // typing a search also drops out of recruiter mode so results are visible
    if (query.trim()) {
      setRecruiterMode(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas transition-colors duration-300">
      <Header
        onNavAction={handleNavAction}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onOpenPalette={openPalette}
        recruiterMode={recruiterMode}
        onToggleRecruiter={toggleRecruiter}
      />

      {recruiterMode ? (
        <main id="main-content" className="p-4 sm:p-6">
          <RecruiterView
            onExit={toggleRecruiter}
            onContact={() => setActiveModal("contact")}
            onResume={() => setActiveModal("resume")}
            onSelectPost={setSelectedPost}
          />
        </main>
      ) : (
        <>
          <div id="main-content" className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5">
            <CommunityHeader />
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <main className="min-w-0">
              <Feed
                posts={allPosts}
                searchQuery={searchQuery}
                activeFilter={activeFilter}
                onFilterChange={(filter) => {
                  updateFeed({ filter, query: "" })
                }}
                sortMode={sortMode}
                onSortChange={(sort) => updateFeed({ sort })}
                onSelectPost={setSelectedPost}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                keyboardEnabled={!selectedPost && !activeModal && !paletteOpen}
              />
            </main>
            <aside aria-label="About Adithya and useful links">
              <Sidebar unlockedAchievements={unlockedIds} />
            </aside>
          </div>
        </>
      )}

      <SiteFooter />

      {/* Modals — chunk loads on first open, stays mounted after for close animations */}
      {opened.current.has("post") && (
        <PostModal
          post={selectedPost}
          open={!!selectedPost}
          onOpenChange={(open) => !open && setSelectedPost(null)}
        />
      )}
      {opened.current.has("contact") && <ContactModal {...modalProps("contact")} />}
      {opened.current.has("achievements") && <AchievementsModal {...modalProps("achievements")} />}
      {opened.current.has("stats") && (
        <StatsModal
          {...modalProps("stats")}
          githubStats={githubStats}
          leetcodeStats={leetcodeStats}
          loading={statsLoading}
          onRetry={retryStats}
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
          onToggleRecruiter={toggleRecruiter}
        />
      )}
    </div>
  )
}
