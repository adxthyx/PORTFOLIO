"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { allPosts, type Post } from "@/lib/content"
import type { ModalId } from "@/components/command-palette"

const modals: ModalId[] = ["contact", "achievements", "stats", "projects", "settings", "resume"]
interface NavigationState {
  postId: string | null
  modal: ModalId | null
  recruiter: boolean
}
const initial: NavigationState = { postId: null, modal: null, recruiter: false }

export function usePortfolioNavigation() {
  const [state, setState] = useState(initial)
  const current = useRef(state)

  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search)
      const postId = params.get("post")
      const modal = params.get("modal") as ModalId | null
      const next = {
        postId: allPosts.some((post) => post.id === postId) ? postId : null,
        modal: modal && modals.includes(modal) ? modal : null,
        recruiter: params.get("view") === "recruiter",
      }
      if (next.postId) next.modal = null
      current.current = next
      setState(next)
    }
    sync()
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  const update = useCallback((patch: Partial<NavigationState>) => {
    const previous = current.current
    const next = { ...previous, ...patch }
    const hadOverlay = Boolean(previous.postId || previous.modal)
    const hasOverlay = Boolean(next.postId || next.modal)
    if (hadOverlay && !hasOverlay && window.history.state?.portfolioOverlay) {
      window.history.back()
      return
    }
    const params = new URLSearchParams(window.location.search)
    for (const [key, value] of [
      ["post", next.postId],
      ["modal", next.modal],
      ["view", next.recruiter ? "recruiter" : null],
    ]) {
      if (value) params.set(key!, value)
      else params.delete(key!)
    }
    const query = params.toString()
    const href = query ? `/?${query}` : "/"
    const historyState = {
      ...window.history.state,
      portfolioOverlay: hasOverlay && (!hadOverlay || Boolean(window.history.state?.portfolioOverlay)),
    }
    if (hadOverlay || (!hasOverlay && previous.recruiter === next.recruiter))
      window.history.replaceState(historyState, "", href)
    else window.history.pushState(historyState, "", href)
    current.current = next
    setState(next)
  }, [])

  const setSelectedPost = useCallback(
    (post: Post | null) => update({ postId: post?.id ?? null, modal: null }),
    [update],
  )
  const setActiveModal = useCallback((modal: ModalId | null) => update({ modal, postId: null }), [update])
  const closeModal = useCallback(
    (modal: ModalId) => {
      if (current.current.modal === modal) update({ modal: null, postId: null })
    },
    [update],
  )
  const setRecruiterMode = useCallback((recruiter: boolean) => update({ recruiter }), [update])
  return {
    selectedPost: allPosts.find((post) => post.id === state.postId) ?? null,
    setSelectedPost,
    activeModal: state.modal,
    setActiveModal,
    closeModal,
    recruiterMode: state.recruiter,
    setRecruiterMode,
  }
}
